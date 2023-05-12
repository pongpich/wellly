import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, ScrollView, StatusBar, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser, register } from "../redux/auth";
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class Register extends Component {

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
            confirm_password: null,
            isModalVisible: false,
            styleConfirmPassword: true,
            isFocused: false,
            isFocused2: false,
            isFocused3: false,
            registerSuccess: false
        };
    }

    componentDidMount() {
        const { user } = this.props;

        //เช็คว่าถ้าloginค้างไว้อยู่แล้วให้ส่งไปหน้าถัดไป
        if (user) {
            this.props.navigation.navigate("Walkthrough")
        }

    }


    componentDidUpdate(prevProps, prevState) {
        const { status, user, statusRegister } = this.props;
        const { isModalVisible, email, password, registerSuccess } = this.state;


        if ((prevProps.statusRegister !== statusRegister) && (statusRegister === "success")) {
            this.setState({ registerSuccess: true })
        }
        if ((prevProps.statusRegister !== statusRegister) && (statusRegister === "fail")) {
            this.setState({ textErrorEmail: 3 });
        }
        if ((prevProps.status !== status) && (status === "success")) {
            this.props.navigation.navigate("Walkthrough")
        }
        if ((prevProps.status !== status) && (status === "fail")) {
            this.setState({
                isModalVisible: !isModalVisible
            });
        }






    }

    submitRegister() {

        const { email, password, confirm_password } = this.state;
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
        } else if (confirm_password !== password) {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 3
            });
        } else {
            this.props.register(email, password)

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


    outHandleBlur() {
        this.setState({ isFocused: false })
        const { email } = this.state

        if (email !== null) {

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (email && reg.test(email) === false) {
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
    }

    outHandleBlur2() {
        this.setState({ isFocused2: false })
        const { password } = this.state

        if (password !== null) {
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
    outHandleBlur3() {
        this.setState({ isFocused3: false })
        const { confirm_password, password } = this.state

        if (confirm_password !== null) {
            if (confirm_password && confirm_password.length < 8) {
                this.setState({
                    styleConfirmPassword: false,
                    textErrorPassWord: 2
                });
            } else if (confirm_password !== password) {
                this.setState({
                    styleConfirmPassword: false,
                    textErrorPassWord: 3
                });
            } else {
                this.setState({
                    styleConfirmPassword: true,
                    textErrorPassWord: null
                });
            }
        }
    }

    render() {
        const { registerSuccess, entry, styleEmil, textErrorEmail, textErrorPassWord, stylePassword, password, email, confirm_password, isModalVisible, isFocused, isFocused2, isFocused3, styleConfirmPassword } = this.state;
        const { t, statusRegister } = this.props;
        const handleFocus = () => this.setState({ isFocused: true })
        const handleBlur = () => this.outHandleBlur()
        const handleFocus2 = () => this.setState({ isFocused2: true })
        const handleBlur2 = () => this.outHandleBlur2()
        const handleFocus3 = () => this.setState({ isFocused3: true })
        const handleBlur3 = () => this.outHandleBlur3()

        return (
            <LinearGradient
                style={ComponentsStyle.container}
                colors={['#59CBE4', 'white', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >


                <View style={{ height: 44, zIndex: 10, width: "100%" }}>
                    {
                        <StatusBar barStyle="dark-content" />
                    }
                </View>
                <View style={{
                    height: 48, zIndex: 3, width: "100%",
                }}>
                    <View style={{ marginLeft: 16 }}>
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <Image style={{ width: 24, height: 24 }}
                                source={require('../assets/images/icon/chevron.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                    <View style={{ marginTop: -80, marginBottom: 40 }}>
                        {
                            (registerSuccess) ?
                                <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: "center", marginTop: "80%" }}>
                                    <Text style={{ textAlign: "center", fontSize: 24, color: "green" }}>Register Success</Text>
                                    <View style={styles.buttonTop}>
                                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Login")} >
                                            <Text style={ComponentsStyle.textButton}>{t('login')}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                :

                                <View style={ComponentsStyle.viewStyle}>
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
                                        <Text style={{ marginBottom: 10 }}>Email</Text>
                                        <View style={{
                                            width: "100%",
                                            alignItems: "center",
                                        }}>
                                            <TextInput
                                                style={
                                                    styleEmil ?
                                                        isFocused ?
                                                            ComponentsStyle.inputIsFocused
                                                            :
                                                            ComponentsStyle.input
                                                        :
                                                        ComponentsStyle.inputError
                                                }
                                                onChangeText={(text) => this.handleChange("email", text)}
                                                keyboardType="email-address"
                                                returnKeyType={"next"}
                                                autoFocus={true}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
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
                                                {
                                                    (textErrorEmail === 3) &&
                                                    <Text style={ComponentsStyle.textError}>{"Email already exists"}</Text>
                                                }
                                            </View>
                                        </View>

                                        <Text style={{ marginTop: 10 }}>Password</Text>
                                        <View style={styles.inputPassword}>

                                            <View style={styles.inputPassword2}>
                                                <TextInput
                                                    style={{
                                                        width: "100%",
                                                        height: 56,
                                                        borderWidth: stylePassword ? isFocused2 ? 2 : 1 : 2,
                                                        paddingLeft: 16,
                                                        paddingRight: 45,
                                                        justifyContent: "center",
                                                        marginTop: 16,
                                                        borderRadius: 8,
                                                        color: colors.grey1,
                                                        backgroundColor: colors.white,
                                                        fontFamily: "IBMPlexSansThai-Regular",
                                                        zIndex: 0,
                                                        borderColor: stylePassword ? isFocused2 ? colors.persianBlue : colors.grey4 : colors.negative1,
                                                    }}
                                                    onChangeText={(text) => this.handleChange("password", text)}
                                                    placeholder={(password === null) || (password === '') ? t('atleast8char') : null}
                                                    autoCapitalize='none'
                                                    secureTextEntry={true}
                                                    value={password}
                                                    onFocus={handleFocus2}
                                                    onBlur={handleBlur2}
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

                                        <Text style={{ marginTop: 10 }}>Confirm password</Text>
                                        <View style={styles.inputPassword}>

                                            <View style={styles.inputPassword2}>
                                                <TextInput
                                                    style={{
                                                        width: "100%",
                                                        height: 56,
                                                        borderWidth: styleConfirmPassword ? isFocused3 ? 2 : 1 : 2,
                                                        paddingLeft: 16,
                                                        paddingRight: 45,
                                                        justifyContent: "center",
                                                        marginTop: 16,
                                                        borderRadius: 8,
                                                        color: colors.grey1,
                                                        backgroundColor: colors.white,
                                                        fontFamily: "IBMPlexSansThai-Regular",
                                                        zIndex: 0,
                                                        borderColor: styleConfirmPassword ? isFocused3 ? colors.persianBlue : colors.grey4 : colors.negative1,
                                                    }}
                                                    onChangeText={(text) => this.handleChange("confirm_password", text)}
                                                    placeholder={(confirm_password === null) || (confirm_password === '') ? t('atleast8char') : null}
                                                    autoCapitalize='none'
                                                    secureTextEntry={true}
                                                    value={confirm_password}
                                                    onFocus={handleFocus3}
                                                    onBlur={handleBlur3}
                                                />
                                            </View>
                                            <View style={ComponentsStyle.viewTextError}>
                                                {
                                                    (styleConfirmPassword === false) ?
                                                        (!confirm_password) ?
                                                            <Text style={ComponentsStyle.textError}>{t('please_enter_password')}</Text>
                                                            : (confirm_password && confirm_password.length < 8) ?
                                                                <Text style={ComponentsStyle.textError}>{t('atleast8char')}</Text>
                                                                : null
                                                        : null
                                                }
                                                {
                                                    (textErrorPassWord === 3) &&
                                                    <Text style={ComponentsStyle.textError}>{"Password and Confirm password validation"}</Text>
                                                }
                                            </View>
                                        </View>
                                        <View style={styles.buttonTop}>
                                            {
                                                (statusRegister !== "loading") &&
                                                < Pressable style={ComponentsStyle.button} onPress={() => this.submitRegister()} >
                                                    <Text style={ComponentsStyle.textButton}>{t('register')}</Text>
                                                </Pressable>
                                            }
                                        </View>


                                    </View>
                                </View>

                        }
                    </View>

                </ScrollView>

            </LinearGradient >
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
    buttonTop: {
        marginTop: 140
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
    const { user, status, statusRegister } = authUser;
    return { user, status, statusRegister };
};

const mapActionsToProps = { loginUser, register };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Register));