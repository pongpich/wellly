import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Pressable, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { getProfanity } from "../redux/get";
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';
import { updateDisplayName } from "../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Switch } from 'react-native-switch';
import { t } from 'i18next';
import Pdpa_th from '../screens/Profile/Pdpa_th';
import i18next from 'i18next';
import Pdpa_eng from '../screens/Profile/Pdpa_eng';
import Modal from "react-native-modal";

class OnboardingName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            switchOn: false,
            isFocused: false,
            errorInput: false,
            words: null,
            isModalConter: false

        };
    }

    componentDidMount() {
        const { user } = this.props;
        const display_name = user && user.display_name;

        this.props.getProfanity();
        /*  if (display_name) {
             this.props.navigation.navigate("PersonalData")
         } */
    }

    componentDidUpdate(prevProps, prevState) {
        const { profanity, statusUpdateDisplayName } = this.props;
        const { name, words } = this.state;
        if ((prevProps.statusUpdateDisplayName !== statusUpdateDisplayName) && (statusUpdateDisplayName === "success")) {
            this.props.navigation.navigate("PersonalData");
        }
        if ((prevProps.profanity !== profanity) && (profanity !== "loading")) {
            let profanities = profanity && profanity.profanities;
            const keyWord = [];
            const map1 = profanities && profanities.map((val, i) => {
                keyWord.push(val.word);
            });
            this.setState({
                words: keyWord
            })
        }
    }

    submit() {
        const { name, errorInput } = this.state;
        const { user } = this.props;

        if (!errorInput && name) {
            this.props.updateDisplayName(user.user_id, name);
        }

    }


    outHandleBlur() {
        this.setState({ isFocused: false })
        const { name, words } = this.state;
        if (name && words) {
            let result = false;
            for (let i = 0; i < words.length; i++) {
                if (name.includes(words[i])) {
                    result = true
                }
            }

            //result === true คือมีคำหยาบ
            if (result) {
                this.setState({
                    errorInput: true
                })
            } else {
                this.setState({
                    errorInput: false
                })
            }
        }
    }
    render() {
        const { name, switchOn, isFocused, errorInput, word, isModalConter } = this.state;
        const handleFocus = () => this.setState({ isFocused: true })
        const handleBlur = () => this.outHandleBlur()
        const { t } = this.props;

        const languages = i18next.languages[0];

        return (
            <View style={styles.container}>
                <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                    <View style={{ justifyContent: "center", textAlign: "center", flex: 1, paddingHorizontal: 16 }}>


                        <View>
                            <Text style={styles.whatName}>{t('what_do_we_call_you')}</Text>
                        </View>

                        <View>
                            <TextInput style={
                                errorInput === true ? ComponentsStyle.inputError : isFocused === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                numberOfLines={6}
                                maxLength={30}
                                placeholder={t('your_name')}
                                autoCapitalize='none'
                                returnKeyType={'done'}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </View>
                        <View style={styles.error}>

                            {
                                errorInput === true ?
                                    <Text style={ComponentsStyle.textError}>{t('name_must_be_polite')}</Text>
                                    : <Text style={ComponentsStyle.textError}></Text>
                            }

                            <Text style={{ textAlign: "right", marginTop: 6 }}>
                                {name.length}/30
                            </Text>

                        </View>


                    </View>

                    <View style={styles.acceptSwitch}>
                        <Text style={styles.accept}>{t('i_accept')}
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({ isModalConter: true })
                            }}>
                                <Text style={{ color: 'blue' }}>
                                    {t('terms_and_conditions')}
                                </Text>
                            </TouchableWithoutFeedback>

                            {t('use_of_wellly')}
                        </Text>
                        <View style={styles.viewsWitch}>
                            <Switch
                                value={switchOn}
                                onValueChange={(value) => this.setState({ switchOn: value })}
                                backgroundActive={colors.persianBlue}
                                backgroundInactive={colors.grey4}
                                style={styles.switch}
                                renderActiveText={false}
                                renderInActiveText={false}
                                innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                                circleSize={30}
                                barHeight={35}
                                switchLeftPx={2.5}
                                switchRightPx={2.5}
                                switchWidthMultiplier={2}
                                switchBorderRadius={30}
                                circleBorderWidth={0}

                            />
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        {
                            (name.length > 0) && (switchOn == true) && (!errorInput) ?
                                <Pressable style={ComponentsStyle.button} onPress={() => this.submit()} >
                                    <Text style={ComponentsStyle.textButton}>{t('next')}</Text>
                                </Pressable>
                                :
                                <Pressable s style={ComponentsStyle.buttonGrey} >
                                    <Text style={ComponentsStyle.textButtonGrey}>{t('next')}</Text>
                                </Pressable>
                        }
                    </View>
                </Pressable>

                <Modal isVisible={isModalConter} style={{ zIndex: 1, marginTop: 50, backgroundColor: colors.white, marginHorizontal: 0, marginBottom: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableWithoutFeedback onPress={() => {

                            this.setState({ isModalConter: false })
                        }}>
                            <View style={{ width: 70, height: 60, justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    style={styles.cross}
                                    source={require('../assets/images/activity/cross.png')}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 1, marginTop: -20 }}>
                        {languages == "th" ? <Pdpa_th /> : <Pdpa_eng />}


                    </View>
                </Modal >
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    areaViewButton: {
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        marginBottom: 40,
    },
    acceptSwitch: {

        flexDirection: "row",
        paddingLeft: 16,
        paddingRight: 43,


    },
    switch: {
        /* marginLeft: 16, */

    },
    error: {
        marginTop: 8,
        marginRight: 32,
        flexDirection: "row"
    },
    accept: {
        width: "90%",
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
        color: colors.grey1,
    },

    whatName: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
        justifyContent: "center",
        marginBottom: 24
    },
    cross: {
        width: 24,
        height: 24,

    }



})

const mapStateToProps = ({ getData, authUser }) => {
    const { profanity } = getData;
    const { user, statusUpdateDisplayName } = authUser;
    return { profanity, user, statusUpdateDisplayName };
};

const mapActionsToProps = { getProfanity, updateDisplayName };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(OnboardingName));


