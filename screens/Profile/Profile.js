import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, ImageBackground, Animated, StatusBar, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback, TextInput } from 'react-native';
import ComponentsStyle from '../../constants/components';
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate } from "../../redux/get";
import { insertNutritionActivity, insertExerciseActivity, } from "../../redux/update";
import colors from '../../constants/colors';
import { getProfanity } from "../../redux/get";
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import { logoutUser, deleteAccount, resetStatusDeleteAcc, updateDisplayName } from "../../redux/auth";
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
class Profile extends Component {


    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            popupDeleteAccShow: false,
            isModalVisible: false,
            userName: '',
            errorInput: false,
            words: null,
            message: null,
            statusMessage: false,
            statusPageSetPassword: false
        };
    }


    componentDidMount() {
        const { user } = this.props;
        this.props.getProfanity();
        this.props.resetStatusDeleteAcc();
        this.setState({
            userName: user && user.display_name
        })


    }

    componentDidUpdate(prevProps, prevState) {
        const { statusDeleteAcc, profanity, statusUpdateDisplayName } = this.props;
        const { message, statusPageSetPassword } = this.state;
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
        if ((prevProps.statusDeleteAcc !== statusDeleteAcc) && (statusDeleteAcc === "success")) {
            setTimeout(() => {
                this.props.logoutUser();
            }, 5000);
        }
        if ((prevProps.statusUpdateDisplayName !== statusUpdateDisplayName) && (statusUpdateDisplayName === "success")) {
            this.setState({
                message: "บันทึกชื่อแล้ว"
            })
        }
        if (prevState.message !== message && message !== null) {
            this.setState({
                statusMessage: true
            })

            setTimeout(() => {
                this.setState({
                    statusMessage: false
                })
            }, 1500);
        }


        if ((this.props.route.params) && (statusPageSetPassword === false)) {
            this.setState({
                statusMessage: true,
                message: "ตั้งรหัสผ่านใหม่เรียบร้อย"
            })
            this.setState({
                statusPageSetPassword: true,

            })
        }
    }




    onDeleteAccount() {
        this.setState({
            popupDeleteAccShow: true
        })
    }

    checkFistChar(name) {
        let firstChar;
        if (name.match(/^[\u0E00-\u0E7F\s]+$/)) {
            let consonants = name.match(/[ก-ฮ]/g);
            firstChar = consonants[0];
        } else {

            firstChar = name.charAt(0)

        }
        return firstChar;
    }


    onEditName(e) {
        const { user } = this.props;

        if (e == false) {
            this.setState({
                userName: '',
                isModalVisible: e
            })
        } else {
            this.setState({
                userName: user && user.display_name,
                isModalVisible: e
            })
        }
    }
    updateUserName() {
        const { userName, words } = this.state;
        const { user } = this.props;

        let result = null;
        for (let i = 0; i < words.length; i++) {
            if (userName.includes(words[i])) {
                result = true
            }
        }
        if (result) {
            this.setState({
                errorInput: true
            })
        } else {



            if (userName != null && userName != '') {
                this.props.updateDisplayName(user.user_id, userName);
                this.setState({
                    errorInput: false,
                    isModalVisible: false
                })
            }
        }
    }


    render() {

        const { user, statusDeleteAcc } = this.props;
        const { popupDeleteAccShow, isModalVisible, userName, errorInput, message, statusMessage } = this.state;
        const { t } = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/icon/Logo_profile.png')} style={{ height: 180, backgroundColor: colors.mayaBlue60 }}>
                    <View style={{ height: 44, zIndex: 10, width: "100%" }}>
                        <StatusBar barStyle="dark-content" />
                    </View>
                    <View style={{ height: 48, zIndex: 3, width: "100%" }}>
                        <View style={{ marginLeft: 16 }}>
                            <Pressable onPress={() => this.props.navigation.goBack()}>
                                <Image style={{ width: 24, height: 24 }}
                                    source={require('../../assets/images/icon/caret.png')}
                                />
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>




                <View style={styles.boxNameCenter}>
                    <View style={styles.boxName}>
                        <Text style={styles.nameIcon}>{user && this.checkFistChar(user.display_name)}</Text>
                    </View>
                    <View style={{ marginTop: 8, flexDirection: "row" }}>
                        <Text style={styles.name}>{user && user.display_name}</Text>
                        <Pressable onPress={() => this.onEditName(true)}>
                            <Image
                                style={{ width: 12, height: 12, marginLeft: 8, marginTop: 10 }}
                                source={require('../../assets/images/activity/Note.png')}
                            />
                        </Pressable>

                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 25 }}>
                        <Pressable onPress={() => this.props.navigation.navigate("Badge")}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                        source={require('../../assets/images/icon/Badge_3x.png')}
                                    />
                                    <Text style={styles.manuName}>{t('my_badge')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                    source={require('../../assets/images/icon/right.png')}
                                />
                            </View>
                        </Pressable>
                        <View style={styles.line}>
                            <View style={styles.line1} />
                        </View>
                        <Pressable onPress={() => this.props.navigation.navigate("MyHealth")}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                        source={require('../../assets/images/icon/My_health_3x.png')}
                                    />
                                    <Text style={styles.manuName}>{t('health_information')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                    source={require('../../assets/images/icon/right.png')}
                                />
                            </View>
                        </Pressable>
                        <View style={styles.line2} />
                        <Pressable onPress={() => this.props.navigation.navigate("ChangePassword")}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                        source={require('../../assets/images/icon/Password_3x.png')}
                                    />
                                    <Text style={styles.manuName}>{t('change')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                    source={require('../../assets/images/icon/right.png')}
                                />
                            </View>
                        </Pressable>
                        <View style={styles.line}>
                            <View style={styles.line1} />
                        </View>

                        {
                            (i18next.language === 'th') ?
                                <Pressable style={styles.buttonThi_eng} onPress={() => i18next.changeLanguage("en")} >
                                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Image
                                                style={{ width: 24, height: 24, marginLeft: 16 }}
                                                source={require('../../assets/images/icon/Language_3x.png')}
                                            />
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.manuName}>{t('language')}</Text>
                                                <Text style={{ marginLeft: 10, marginTop: 2, color: colors.grey4, fontFamily: "IBMPlexSansThai-Regular", }}>ไทย</Text>
                                            </View>
                                        </View>
                                        <Image
                                            style={{ width: 24, height: 24, marginRight: 16 }}
                                            source={require('../../assets/images/icon/right.png')}
                                        />
                                    </View>
                                </Pressable>
                                :
                                <Pressable style={styles.buttonThi_eng} onPress={() => i18next.changeLanguage("th")} >
                                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <Image
                                                style={{ width: 24, height: 24, marginLeft: 16 }}
                                                source={require('../../assets/images/icon/Language_3x.png')}
                                            />
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.manuName}>{t('language')}</Text>
                                                <Text style={{ marginLeft: 10, marginTop: 3, color: colors.grey4, fontFamily: "IBMPlexSansThai-Regular", }}>English</Text>
                                            </View>
                                        </View>
                                        <Image
                                            style={{ width: 24, height: 24, marginRight: 16 }}
                                            source={require('../../assets/images/icon/right.png')}
                                        />
                                    </View>
                                </Pressable>

                        }
                        <View style={styles.line2} />
                        <Pressable onPress={() => this.props.navigation.navigate("Pdpa")}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                        source={require('../../assets/images/icon/PDPA_3x.png')}
                                    />
                                    <Text style={styles.manuName}>{t('consent')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                    source={require('../../assets/images/icon/right.png')}
                                />
                            </View>
                        </Pressable>
                        <View style={styles.line}>
                            <View style={styles.line1} />
                        </View>
                        <Pressable onPress={() => this.props.navigation.navigate("About")}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                        source={require('../../assets/images/icon/About_3x.png')}
                                    />
                                    <Text style={styles.manuName}>{t('about_wellly')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                    source={require('../../assets/images/icon/right.png')}
                                />
                            </View>
                        </Pressable>

                        <View style={styles.line2} />
                        <Pressable onPress={() => this.onDeleteAccount()}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                    />
                                    <Text style={styles.manuName}>{t('delete_account')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                />
                            </View>
                        </Pressable>
                        <View style={styles.line}>
                            <View style={styles.line1} />
                        </View>
                        <Pressable onPress={() => this.props.logoutUser()}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row", }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                    />
                                    <Text style={styles.manuName}>{t('logout')}</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                />
                            </View>
                        </Pressable>
                    </View>
                    <Text style={styles.version}>{t('version')} 1.9.2</Text>
                </ScrollView >
                <View View style={styles.centeredView} >
                    <Modal isVisible={popupDeleteAccShow}
                        style={{ margin: 0 }}
                    >
                        <View style={styles.centeredView}>
                            {
                                statusDeleteAcc === "success" ?
                                    <View style={styles.modalView}>
                                        <Text style={styles.missionHead}>{t('account_has')}</Text>
                                    </View>
                                    :
                                    <View style={styles.modalView}>
                                        <Text style={styles.missionHead}>{t('deletion_irreversible')}</Text>
                                        <Text style={styles.missionHead}>{t('recovered')}</Text>
                                        <Text style={styles.missionHead}>{t('are_you_sure')}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "space-between", width: "100%" }}>
                                            <TouchableWithoutFeedback onPress={() => this.setState({ popupDeleteAccShow: !popupDeleteAccShow })}>
                                                <View style={styles.button}>
                                                    <Text style={ComponentsStyle.textButton} >{t('cancel')}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => this.props.deleteAccount(user && user.user_id)}>
                                                <View style={styles.buttonGrey}>
                                                    <Text style={ComponentsStyle.textButtonGrey} >{t('confirm')}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                            }

                        </View>
                    </Modal>
                </View>


                {/* ส่งนเเก้ไขชื่อ */}

                <View View style={styles.centeredViewName} >
                    <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisible)} />
                    <Modal isVisible={isModalVisible}
                        style={{ margin: 0 }}
                    >
                        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                            <View style={styles.centeredViewName}>
                                <View style={styles.modalViewName}>
                                    <Text style={styles.whatName}>{t('what_do_we_call_you')}</Text>
                                    <View>
                                        <TextInput style={
                                            ComponentsStyle.inputIsFocused}
                                            numberOfLines={6}
                                            maxLength={30}
                                            placeholder={t('your_name')}
                                            autoCapitalize='none'
                                            value={userName}
                                            onChangeText={(userName) => userName.length <= 30 && this.setState({ userName })}
                                        />
                                    </View>
                                    <View style={styles.error}>

                                        {
                                            errorInput === true ?
                                                <Text style={ComponentsStyle.textError}>{t('name_must_be_polite')}</Text>
                                                : <Text style={ComponentsStyle.textError}></Text>
                                        }

                                        <Text style={{ textAlign: "right", marginTop: 6 }}>
                                            {userName.length}/30
                                        </Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "space-between", width: "100%" }}>
                                        <TouchableWithoutFeedback onPress={() => this.onEditName(false)}>
                                            <View style={styles.buttonWhite}>
                                                <Text style={ComponentsStyle.textButtonWhite} >{t('cancel')}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.updateUserName()}>
                                            <View style={styles.button}>
                                                <Text style={ComponentsStyle.textButton} >{t('record')}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>
                </View>
                {
                    statusMessage &&
                    <View style={styles.activityDeleted}>
                        <View style={styles.boxActivityDeleted}>
                            <Image
                                style={{ height: 32, width: 32, zIndex: 1 }}
                                source={require('../../assets/images/activity/Checked.png')}
                            />
                            <Text style={styles.textActivityDeleted}>{message}</Text>
                        </View>
                    </View>
                }

            </View >
        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    boxName: {
        height: 96,
        width: 96,
        borderColor: colors.white,
        borderWidth: 4,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: colors.grey4,
        justifyContent: "center"
    },
    boxNameCenter: {
        width: deviceWidth,
        marginTop: - 60,
        alignItems: "center"

    },
    nameIcon: {
        color: colors.grey3,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 32
    },
    name: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 20
    },
    manuName: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
        marginLeft: 8
    },

    line: {
        paddingHorizontal: 16,
        width: "100%",

    },
    line1: {
        marginTop: 17,
        width: "100%",
        height: 1,
        backgroundColor: colors.grey6,
        marginBottom: 18,
    },
    line2: {
        marginTop: 17,
        width: "100%",
        height: 8,
        backgroundColor: colors.grey6,
        marginBottom: 24,
    },
    version: {
        marginTop: 161,
        marginBottom: 40,
        textAlign: "center",
        color: colors.grey3,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    modalView: {
        width: "100%",
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 35,
        paddingBottom: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    missionHead: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        color: "red",
    },
    textButton: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.persianBlue
    },
    deleteAccount: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    button: {
        width: "48%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.persianBlue,
        borderRadius: 24,
        height: 48
    },
    buttonGrey: {
        width: "48%",
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.grey4,
        borderRadius: 24,
        height: 50,
    },
    buttonWhite: {

        width: "48%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.white,
        borderRadius: 24,
        height: 48,
        borderColor: colors.persianBlue,
        borderWidth: 2
    },
    centeredViewName: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    modalViewName: {
        width: "100%",
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: 278,
        paddingTop: 32,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    whatName: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
        justifyContent: "center",
        marginBottom: 8
    },
    activityDeleted: {
        position: "absolute",
        /*     alignItems: "center", */
        justifyContent: "flex-end",
        height: "100%",
        width: deviceWidth - 30,
        zIndex: 7,
    },
    boxActivityDeleted: {
        paddingLeft: 16,
        paddingTop: 8,
        flexDirection: "row",
        backgroundColor: colors.white,
        height: 50,
        width: "100%",
        shadowColor: colors.grey1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginLeft: 16,
        marginBottom: 40,
        borderRadius: 8
    },
    textActivityDeleted: {
        marginLeft: 8,
        marginTop: 4,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
    }

});

const mapStateToProps = ({ getData, authUser }) => {
    const { user, statusDeleteAcc, statusUpdateDisplayName } = authUser;
    const { profanity } = getData;
    return { user, statusDeleteAcc, profanity, statusUpdateDisplayName };
};

const mapActionsToProps = { logoutUser, getProfanity, deleteAccount, resetStatusDeleteAcc, updateDisplayName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Profile));



