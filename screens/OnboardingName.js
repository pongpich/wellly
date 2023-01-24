import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Switch } from 'react-native';
import { getProfanity } from "../redux/get";
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';
import { userName } from "../redux/personalUser";
import { connect } from 'react-redux';

class OnboardingName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            switchOn: false,
            isFocused: false,
            errorInput: false,
            words: null
        };
    }

    componentDidMount() {
        this.props.getProfanity();
    }

    componentDidUpdate(prevProps, prevState) {
        const { profanity } = this.props;
        console.log("profanity", profanity);
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
        const { name, words } = this.state;
        const result = words.filter(word => word == name);

        if (result && result.length > 0) {
            this.setState({
                errorInput: true
            })
        } else {
            this.props.userName(name);
            this.props.navigation.navigate("PersonalData")
        }

        /* this.props.userName(name); */
        /*         this.props.navigation.navigate("PersonalData") */
    }

    render() {
        const { name, switchOn, isFocused, errorInput, word } = this.state;
        const handleFocus = () => this.setState({ isFocused: true })
        const handleBlur = () => this.setState({ isFocused: false })
        /*  console.log("word",word); */
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ justifyContent: "center", textAlign: "center", flex: 1, paddingHorizontal: 16 }}>
                    <View>
                        <Text style={{ fontFamily: "IBMPlexSansThai-Bold", fontSize: 24, justifyContent: "center", marginBottom: 10 }}>อยากให้เราเรียกคุณว่าอะไร?</Text>
                    </View>

                    <View>
                        <TextInput style={
                            errorInput === true ? ComponentsStyle.inputError : isFocused === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            numberOfLines={6}
                            maxLength={50}
                            placeholder='ชื่อของคุณ'
                            autoCapitalize='none'
                            onChangeText={(name) => this.setState({ name })}
                        />
                        <View style={styles.error}>
                            {
                                errorInput === true ?
                                    <Text style={ComponentsStyle.errorText}>ชื่อต้องเป็นคำที่สุภาพ</Text>
                                    : null
                            }
                        </View>
                    </View>
                    <Text style={{ textAlign: "right" }}>
                        {name.length}/50
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                    <Text>ฉันยอมรับ
                        <Text style={{ color: 'blue' }}
                            onPress={() => Linking.openURL('http://google.com')}>
                            เงื่อนไขและข้อตกลง
                        </Text>
                        การใช้งาน{"\n"} WELLLY
                    </Text>
                    <Switch
                        value={switchOn}
                        onValueChange={(value) => this.setState({ switchOn: value })}
                        trackColor={{ false: "#ff0000", true: "#0000ff" }}
                    />
                </View>
                <View style={styles.areaViewButton}>
                    {
                        (name.length > 0) && (switchOn == true) ?
                            <Pressable style={ComponentsStyle.button} onPress={() => this.submit()} >
                                <Text style={ComponentsStyle.textButton}>ถัดไป</Text>
                            </Pressable>
                            :
                            <Pressable s style={ComponentsStyle.buttonGrey} >
                                <Text style={ComponentsStyle.textButtonGrey}>ถัดไป</Text>
                            </Pressable>
                    }
                </View>
            </SafeAreaView>

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



})

const mapStateToProps = ({ getData, personalDataUser }) => {
    const { profanity } = getData;
    const { username } = personalDataUser;
    return { profanity };
};

const mapActionsToProps = { getProfanity, userName };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(OnboardingName);


