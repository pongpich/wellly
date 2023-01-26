import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser } from "../redux/auth";
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entry: true, // เปิด-ปิด passWord
            styleEmil: true, // เปลี่ยนสี borderColor Email [true,false]
            textErrorEmail: null, // สถานะข้อความ Email [1,2,null] 
            stylePassword: true, // เปลี่ยนสี borderColor PassWord [true,false]
            textErrorPassWord: null, // สถานะข้อความ Password [1,2,null] 
            email: null,
            password: null,
            isModalVisible: false
        };
    }


    componentDidUpdate(prevProps, prevState) {
        const { status, user } = this.props;
        const { isModalVisible, email, password } = this.state;
        if ((prevProps.status !== status) && (status === "success")) {
            this.props.navigation.navigate("Walkthrough")
        }
        if ((prevProps.status !== status) && (status === "fail")) {
            this.setState({
                isModalVisible: !isModalVisible
            });
        }

        if (prevState.email != email) {
            console.log("email", email);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(email) === false) {
                this.setState({
                    styleEmil: false,
                    textErrorEmail: 2
                });
            } else {
                this.setState({
                    styleEmil: true,
                    textErrorEmail: null,
                });
            }
        }

        if (prevState.password != password) {
            if (password && password.length < 8) {
                this.setState({
                    stylePassword: false,
                    textErrorPassWord: 2
                });
            } else {
                this.setState({
                    stylePassword: true,
                    textErrorPassWord: null
                });
            }
        }
    }

    submitLogin() {
        const { email, password } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if ((email === "") || (email === null)) {
            this.setState({
                styleEmil: false,
                textErrorEmail: 1
            });
        } else if (reg.test(email) === false) {
            this.setState({
                styleEmil: false,
                textErrorEmail: 2
            });
        } else if ((password === " ") || (password === null)) {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 1
            });
        } else if (password.length < 7) {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 2
            });
        } else {
            this.props.loginUser(email, password)

        }



    }

    handleChange(fieldName, text) {

        this.setState({
            [fieldName]: text
        })
    }



    handleChangeEntry(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    toggleModal = (isModalVisible) => {

        this.setState({
            isModalVisible: !isModalVisible
        })
    };


    render() {
        const { entry, styleEmil, textErrorEmail, textErrorPassWord, stylePassword, password, email, isModalVisible } = this.state;
        const { t } = this.props;


        return (
            <LinearGradient
                style={ComponentsStyle.container}
                colors={['#59CBE4', 'white', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

                <SafeAreaView style={ComponentsStyle.viewStyle}>
                    <View style={ComponentsStyle.viewStyle_1}>
                        <View style={styles.viewtinyLogo}>
                            <View style={styles.circle_1} />
                            <View style={styles.circle_2} />
                            <View style={styles.circle_3} />
                            <View style={styles.tinyLogo}>
                                <Image
                                    style={styles.logoImage}
                                    source={require('../assets/images/logo/Logo3x.png')}
                                />
                            </View>

                        </View>

                        <View style={ComponentsStyle.viewInput}>
                            <TextInput
                                style={styleEmil === true ? ComponentsStyle.input : ComponentsStyle.inputError}
                                onChangeText={(text) => this.handleChange("email", text)}
                                keyboardType="email-address"
                                returnKeyType={"next"}
                                autoFocus={true}
                                placeholder={t('email')}
                                value={email}
                                autoCapitalize='none'
                            />
                            <View style={ComponentsStyle.viewTextError}>
                                {
                                    styleEmil === false ?
                                        textErrorEmail === 1 ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_email')}</Text>
                                            : textErrorEmail === 2 ?
                                                <Text style={ComponentsStyle.textError}>{t('invalid_email_format')}</Text>
                                                : null
                                        : null
                                }
                            </View>
                        </View>

                        <View style={styles.inputPassword}>
                            {
                                entry === false ?

                                    <TouchableOpacity style={styles.entry} onPress={() => this.handleChangeEntry("entry", true)}>
                                        <Image
                                            source={require('../assets/images/icon/entry_off.png')}
                                        />
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity style={styles.entry} onPress={() => this.handleChangeEntry("entry", false)}>
                                        <Image
                                            style={styles.entryImage}
                                            source={require('../assets/images/icon/entry_op.png')}
                                        />
                                    </TouchableOpacity>

                            }
                            <View style={styles.inputPassword2}>
                                <TextInput
                                    style={stylePassword === true ? entry === true ? (password === null) || (password === '') ? styles.passwordEntryLength : styles.passwordEntry : styles.password : styles.errorPassword}
                                    onChangeText={(text) => this.handleChange("password", text)}
                                    placeholder={(password === null) || (password === '') ? t('atleast8char') : null}
                                    autoCapitalize='none'
                                    secureTextEntry={entry}
                                    value={password}
                                />
                            </View>
                            <View style={ComponentsStyle.viewTextError}>
                                {
                                    stylePassword === false ?
                                        textErrorPassWord === 1 ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_password')}</Text>
                                            : textErrorPassWord === 2 ?
                                                <Text style={ComponentsStyle.textError}>{t('atleast8char')}</Text>
                                                : null
                                        : null
                                }
                            </View>
                        </View>

                        <View style={styles.buttonTop}>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.submitLogin()} >
                                <Text style={ComponentsStyle.textButton}>{t('login')}</Text>
                            </Pressable>
                            <Pressable style={styles.buttonForgotPassword} onPress={() => this.props.navigation.navigate("ForgotPassword")} >
                                <Text style={styles.textForgotPassword}>{t('forgot_password')}?</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={ComponentsStyle.viewStyle_2}>
                        {
                            (i18next.language === 'th') ?
                                <Pressable style={styles.buttonThi_eng} onPress={() => i18next.changeLanguage("en")} >
                                    <Text style={styles.textThi_eng}>English</Text>
                                </Pressable>
                                :
                                <Pressable style={styles.buttonThi_eng} onPress={() => i18next.changeLanguage("th")}  >
                                    <Text style={styles.textThi_eng}>ภาษาไทย</Text>
                                </Pressable>
                        }
                    </View>
                </SafeAreaView>


                <View style={styles.centeredView}>
                    <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisible)} />

                    <Modal isVisible={isModalVisible}

                        style={{ margin: 0 }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Image
                                    style={styles.imageGeneric}
                                    source={require('../assets/images/icon/generic.png')}
                                />
                                <Text style={styles.modalText}>{t('user_account_not_found')}</Text>
                                <Text style={styles.modalText2}>{t('check_username')}</Text>
                                <View style={styles.buttonView}>
                                    <Pressable style={ComponentsStyle.button} onPress={() => this.toggleModal(isModalVisible)} >
                                        <Text style={ComponentsStyle.textButton}>{t('agree')}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </LinearGradient>

        )
    }
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({

    viewtinyLogo: {
        alignItems: "center"
    },
    tinyLogo: {
        opacity: 1,
        marginTop: "40%",
        marginBottom: "5%"
    },
    logoImage: {
        width: 200,
        height: 80
    },
    circle_1: {
        marginTop: "20%",
        width: 400,
        height: 400,
        backgroundColor: "rgba(255,255,255, 0.1)",
        border: "solid 5px darkcyan",
        borderRadius: 500,
        left: -170,
        zIndex: 0,
        position: "absolute",
    },
    circle_2: {
        marginTop: "20%",
        width: 400,
        height: 400,
        backgroundColor: "rgba(255,255,255, 0.1);",
        borderRadius: 500,
        right: -170,
        zIndex: 0,
        position: "absolute",
    },
    circle_3: {
        marginTop: "40%",
        width: 600,
        height: 700,
        backgroundColor: "rgba(255,255,255,0.1);",
        borderRadius: 500,
        position: "absolute",
    },
    password: {
        width: "100%",
        height: 56,
        borderWidth: 1,
        paddingLeft: 16,
        paddingRight: 45,
        justifyContent: "center",
        marginTop: 16,
        borderRadius: 8,
        borderColor: colors.grey4,
        color: colors.grey1,
        backgroundColor: ComponentsStyle.white,
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Regular",
        zIndex: 0,
    },
    passwordEntry: {
        width: "100%",
        height: 56,
        paddingLeft: 16,
        paddingRight: 45,
        borderWidth: 1,
        marginTop: 16,

        borderRadius: 8,
        justifyContent: "center",
        borderColor: colors.grey4,
        color: colors.grey1,
        backgroundColor: colors.white,
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    passwordEntryLength: {
        width: "100%",
        height: 56,
        borderWidth: 1,
        paddingLeft: 16,
        paddingRight: 45,
        marginTop: 16,
        borderRadius: 8,
        borderColor: colors.grey4,
        color: colors.grey1,
        backgroundColor: colors.white,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    buttonTop: {
        marginTop: 16
    },
    errorPassword: {
        width: "100%",
        height: 56,
        borderWidth: 2,
        paddingLeft: 16,
        paddingRight: 45,
        paddingTop: 5,
        marginTop: 16,
        borderRadius: 8,
        borderColor: colors.negative1,
        color: colors.grey1,
        position: "relative",
        zIndex: 1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    textViewError: {
        paddingTop: 8
    },
    inputPassword: {
        width: "100%",
        alignItems: "flex-end",
        position: "relative",
        /*   marginTop: 8 */
    },
    inputPassword2: {

        width: "100%",
        alignItems: "center",
        position: "relative",
        zIndex: 0,

    },
    entry: {
        position: "absolute",
        marginTop: 34,
        zIndex: 4,
        width: "12%"
    },
    entryImage: {
        zIndex: 4
    },
    buttonForgotPassword: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    textForgotPassword: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    buttonThi_eng: {
        alignItems: 'center',
        justifyContent: "flex-end",
        marginBottom: 36,
    },
    textThi_eng: {
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey2,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",

    },
    modalView: {
        position: "relative",
        zIndex: 3,
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 16,
        height: 372,
        paddingTop: 32,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: 0,
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24
    },
    imageGeneric: {
        position: "relative",

    },
    buttonView: {
        width: "100%",
        marginBottom: 50
    },
    modalText: {
        marginTop: 24,
        textAlign: "center",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    modalText2: {
        width: "90%",
        marginTop: 8,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
    }
});




const mapStateToProps = ({ authUser }) => {
    const { user, status } = authUser;
    return { user, status };
};

const mapActionsToProps = { loginUser };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Login));