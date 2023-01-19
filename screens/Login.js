import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser } from "../redux/auth";
import Components from '../constants/components';
import { connect } from 'react-redux'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entry: true, // เปิด-ปิด passWord
            styleEmil: true, // เปลี่ยนสี borderColor Email [true,false]
            textErrorEmail: null, // สถานะข้อความ Email [1,2,null] 
            stylePassword: true, // เปลี่ยนสี borderColor PassWord [true,false]
            textErrorPassWord: null, // สถานะข้อความ Password [1,2,null] 
            modalStatusLogin: false,
            email: null,
            password: null,
        };
    }
    setModalVisible(visible) {
        this.setState({ modalStatusLogin: visible });
    }

    componentDidUpdate(prevProps, prevState) {
        const { status, user } = this.props;
        const { modalStatusLogin } = this.state;
        if ((prevProps.status !== status) && (status === "success")) {
            this.props.navigation.navigate("Walkthrough")
        }
        if ((prevProps.status !== status) && (status === "fail")) {
            this.setState({
                modalStatusLogin: true
            });
        }
    }

    submitLogin() {
        const { email, password } = this.state;
        /* let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; */
       /*  if ((email === "") || (email === null)) {
            this.setState({
                styleEmil: false,
                textErrorEmail: 1
            });
        } else if (reg.test(email) === false) {
            this.setState({
                styleEmil: false,
                textErrorEmail: 2
            });
        } else  */if ((password === " ") || (password === null)) {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 1
            });
        } else if (password.length < 8) {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 2
            });
        } else {
            this.props.loginUser(email, password)
            console.log("submitLogin");
        }


        /*  */
    }

    /*     componentDidUpdate(prevProps) {
            const { entry } = this.state;
            if (prevProps.entry !== entry) {
              
            }
    
        } */

    handleChange(fieldName, text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        this.setState({
            styleEmil: true,
            textErrorEmail: null
        });
        if (fieldName === "email") {
            if ((text === "") || (text === null)) {
                this.setState({
                    styleEmil: false,
                    textErrorEmail: 1
                });
            } else if (reg.test(text) === false) {
                this.setState({
                    styleEmil: false,
                    textErrorEmail: 2
                });
            } else {
                this.setState({
                    [fieldName]: text
                })
            }
        } else {
            this.setState({
                [fieldName]: text
            })
        }

    }

    handleChangeEntry(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    render() {
        const { entry, styleEmil, textErrorEmail, textErrorPassWord, stylePassword, modalStatusLogin, password } = this.state;

        console.log("Colors", Components);

        return (
            <LinearGradient
                style={styles.container}
                colors={['#59CBE4', '#59CBE4', 'white', 'white', 'white', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >

                <SafeAreaView>
                    <View style={styles.view}>
                        <View style={styles.circle_1} />
                        <View style={styles.circle_2} />
                        <View style={styles.circle_3} />
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/images/logo/Logo.png')}
                        />
                        <View style={styles.inputEmil}>
                            <TextInput
                                style={styleEmil === true ? styles.emil : styles.errorEmail}
                                onChangeText={(text) => this.handleChange("email", text)}
                                keyboardType="email-address"
                                returnKeyType={"next"}
                                autoFocus={true}
                                placeholder="อีเมล"
                                autoCapitalize='none'
                            />
                            <View style={styles.error}>
                                {
                                    styleEmil === false ?
                                        textErrorEmail === 1 ?
                                            <Text style={Components.textErrorInput}>กรุณากรอกอีเมล</Text>
                                            : textErrorEmail === 2 ?
                                                <Text style={Components.textErrorInput}>รูปแบบของอีเมลไม่ถูกต้อง</Text>
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
                                    placeholder={(password === null) || (password === '') ? "รหัสผ่านอย่างน้อย 8 หลัก" : null}
                                    secureTextEntry={entry}

                                />
                            </View>
                        </View>
                        <View style={styles.error}>
                            {
                                stylePassword === false ?
                                    textErrorPassWord === 1 ?
                                        <Text style={Components.textErrorInput}>กรุณากรอกรหัสผ่าน</Text>
                                        : textErrorPassWord === 2 ?
                                            <Text style={Components.textErrorInput}>รหัสผ่านต้องมากกว่า 8 หลักขึ้นไป</Text>
                                            : null
                                    : null
                            }
                        </View>
                        <Pressable style={Components.buttonLogin} onPress={() => this.submitLogin()} >
                            <Text style={Components.textButtonLogin}>ล็อกอิน</Text>
                        </Pressable>
                        <Pressable style={styles.buttonForgotPassword} onPress={() => this.props.navigation.navigate("ForgotPassword")} >
                            <Text style={styles.textForgotPassword}>ลืมรหัสผ่าน?</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
                <Pressable style={styles.buttonThi_eng} >
                    <Text style={styles.textThi_eng}>English</Text>
                </Pressable>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalStatusLogin}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalStatusLogin);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Image

                                    source={require('../assets/images/icon/generic.png')}
                                />
                                <Text style={styles.modalText}>ไม่พบบัญชีผู้ใช้</Text>
                                <Text style={styles.modalText2}>ตรวจสอบชื่อผู้ใช้ หรือรหัสผ่านอีกครั้ง หรือติดต่อแผนกบุคคล</Text>
                                <Pressable style={styles.buttonModel} onPress={() => this.setModalVisible(!modalStatusLogin)} >
                                    <Text style={styles.textLogin}>ตกลง</Text>
                                </Pressable>
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
    container: {
        flex: 1,
        justifyContent: "center",
        height: (deviceWidth > 900) ? "190%" : (deviceWidth > 675) ? "120%" : "100%",
        width: "100%"

    },
    view: {
        alignItems: "center",
        opacity: 1,
    },
    tinyLogo: {
        opacity: 1,
        marginTop: "40%",
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
    emil: {
        width: "90%",
        height: 56,
        borderWidth: 1,
        padding: 10,
        marginTop: "15%",
        borderRadius: 8,
        borderColor: "#93a8c1",
        color: "#2a323c",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light"
    },
    errorEmail: {
        width: "90%",
        height: 56,
        borderWidth: 1,
        padding: 10,
        marginTop: "25%",
        borderRadius: 8,
        borderColor: "#D43A3A",
        color: "#2a323c",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light"
    },
    error: {
        width: "90%",
        marginTop: 10,
    },
    errorText: {
        color: "#D43A3A",
        alignItems: "flex-start",
        fontFamily: "Prompt-Light"
    },
    inputEmil: {
        width: "100%",
        alignItems: "center"
    },
    password: {
        width: "90%",
        paddingRight: 40,
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 40,
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 8,
        borderColor: "#93a8c1",
        color: "#2a323c",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        zIndex: 0,
    },
    passwordEntry: {
        width: "90%",
        height: 56,
        paddingRight: 40,
        borderWidth: 1,
        paddingLeft: 5,
        paddingTop: 8,
        fontSize: 40,
        marginTop: 20,
        borderRadius: 8,
        /* letterSpacing: -15, */
        borderColor: "#93a8c1",
        color: "#2a323c",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light"
    },
    passwordEntryLength: {
        width: "90%",
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 40,
        paddingTop: 5,
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 8,
        borderColor: "#93a8c1",
        color: "#2a323c",

        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light"
    },
    errorPassword: {
        width: "90%",
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 40,
        paddingTop: 5,
        marginTop: 20,
        borderRadius: 8,
        borderColor: "#D43A3A",
        color: "#2a323c",
        position: "relative",
        zIndex: 1,
        fontFamily: "Prompt-Light"
    },
    inputPassword: {
        width: "100%",
        alignItems: "flex-end",
        position: "relative",
        zIndex: 0,

    },
    inputPassword2: {
        width: "100%",
        alignItems: "center",
        position: "relative",
        zIndex: 0,

    },
    entry: {
        position: "absolute",
        marginTop: 36,
        zIndex: 4,
        width: "15%"
    },
    entryImage: {
        zIndex: 4
    },
    buttonLogin: {
        marginTop: 20,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50
    },
    textLogin: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Prompt-Bold"
    },
    buttonForgotPassword: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        color: "#3762FC"
    },
    textForgotPassword: {
        color: "#3762FC",
        fontSize: 16,
        fontFamily: "Prompt-Bold"
    },
    buttonThi_eng: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end",
        marginBottom: -30,
    },
    textThi_eng: {
        fontSize: 16,
        color: "#697D96",
        fontFamily: "Prompt-Light"
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",

    },
    modalView: {
        zIndex: 3,
        margin: 20,
        backgroundColor: "white",
        width: "100%",
        height: "55%",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: -50,
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24
    },
    buttonModel: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50,
        marginBottom: 40
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 20,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#2A323C"

    },
    modalText2: {
        width: "75%",
        marginBottom: 16,
        textAlign: "center",
        fontFamily: "Prompt-Light",
        color: "#697D96",
        fontSize: 16,
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
)(Login);