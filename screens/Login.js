import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            entry: true, // เปิด-ปิด passWord
            styleEmil: true, // เปลี่ยนสี borderColor Email [true,false]
            textErrorEmail: null, // สถานะข้อความ Email [1,2,null] 
            stylePassword: true, // เปลี่ยนสี borderColor PassWord [true,false]
            textErrorPassWord: null // สถานะข้อความ Password [1,2,null] 

        };
    }
    /*     componentDidUpdate(prevProps) {
            const { entry } = this.state;
            if (prevProps.entry !== entry) {
              
            }
    
        } */

    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    render() {

        const { entry, styleEmil, textErrorEmail, textErrorPassWord, stylePassword } = this.state;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#59CBE4', '#59CBE4','white', 'white', 'white', 'white']}
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
                                returnKeyType={"next"}
                               /*  autoFocus={true} */
                                placeholder="อีเมล"
                            />
                            <View style={styles.error}>
                                {
                                    styleEmil === false ?
                                        textErrorEmail === 1 ?
                                            <Text style={styles.errorText}>กรุณากรอกอีเมล</Text>
                                            : textErrorEmail === 2 ?
                                                <Text style={styles.errorText}>รูปแบบของอีเมลไม่ถูกต้อง</Text>
                                                : null
                                        : null
                                }
                            </View>

                        </View>

                        <View style={styles.inputPassword}>
                            {
                                entry === false ?

                                    <TouchableOpacity style={styles.entry} onPress={() => this.handleChange("entry", true)}>
                                        <Image
                                            source={require('../assets/images/icon/entry_op.png')}
                                        />
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity style={styles.entry} onPress={() => this.handleChange("entry", false)}>
                                        <Image
                                            style={styles.entryImage}
                                            source={require('../assets/images/icon/entry_off.png')}
                                        />
                                    </TouchableOpacity>

                            }
                            <View style={styles.inputPassword2}>
                                <TextInput
                                    style={styleEmil === true ? styles.password : styles.errorPassword}
                                    placeholder="รหัสผ่านอย่างน้อย 8 หลัก"
                                    secureTextEntry={entry}
                                />
                            </View>

                        </View>
                        <View style={styles.error}>
                            {
                                styleEmil === false ?
                                    textErrorEmail === 1 ?
                                        <Text style={styles.errorText}>กรุณากรอกรหัสผ่าน</Text>
                                        : textErrorEmail === 2 ?
                                            <Text style={styles.errorText}>รหัสผ่านต้องมากกว่า 8 หลักขึ้นไป</Text>
                                            : null
                                    : null
                            }
                        </View>
                        <Pressable style={styles.buttonLogin} >
                            <Text style={styles.textLogin}>ล็อกอิน</Text>
                        </Pressable>
                        <Pressable style={styles.buttonForgotPassword} >
                            <Text style={styles.textForgotPassword}>ลืมรหัสผ่าน?</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
                <Pressable style={styles.buttonThi_eng} >
                    <Text style={styles.textThi_eng}>English?</Text>
                </Pressable>
            </LinearGradient>

        )
    }
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        height: (deviceWidth > 900) ? "190%" : (deviceWidth > 675) ? "120%" : "100%",
        width:"100%"

    },
    view: {
       
        alignItems: "center",

/*         alignItems: "center",
        opacity: 1,
        zIndex: 2,
        justifyContent:"center",
        display: "flex", */
    },
    tinyLogo: {
        opacity: 1,
        marginTop:"40%"
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
        height: 56,
        borderWidth: 1,
        padding: 10,
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
        padding: 10,
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
        zIndex: 1,

    },
    inputPassword2: {
        width: "100%",
        alignItems: "center",
        position: "relative",
        zIndex: 1,

    },
    entry: {
        position: "absolute",
        marginTop: 35,
        zIndex: 4,
        width: "15%"
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
        justifyContent: 'center',
    },
    textThi_eng: {
        fontSize: 16,
        color: "#697D96",
        fontFamily: "Prompt-Light"
    }
});


export default Login;