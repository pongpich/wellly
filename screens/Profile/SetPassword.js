import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: true,
            stylePassword: true, // เปลี่ยนสี borderColor PassWord [true,false]
            isFocusNew: false,
            password: null,
            statusSetPassword: false,
            textErrorPassWord: null,
            newpassword: null,
            textforgot1: 3,
            textforgot2: 3,
            textforgot3: 3,
            statusNewPassword: false,
            confirmPassword: null,
            isFocusConfirm: false,
            confirmStylePassword: true,
            confirmTextErrorPassWord: null,
            confirmStatusPassword: false

        };
    }


    handleChange(p, e) {
        this.setState({
            [p]: e
        })
    }


    submitChange() {
        const { statusSetPassword } = this.state

        if (statusSetPassword === true) {
            this.setState({
                statusNewPassword: true
            })
        } else {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 1
            })
        }
    }


    handleChangeEntry(e) {
        this.setState({
            entry: e
        })
    }

    outFocusNew() {
        const { newpassword } = this.state;
        this.setState({ isFocusNew: false })

        if ((newpassword != null) && (newpassword != '')) {
            const hasperChar = this.hasUpperCaseChar(newpassword);
            const haspernumber = this.hasNumber(newpassword);

            if (newpassword.length > 7) {
                this.setState({
                    textforgot1: 1
                })
            } else {
                this.setState({
                    textforgot1: 2
                })
            }

            if (hasperChar === true) {
                this.setState({
                    textforgot2: 1
                })
            } else {
                this.setState({
                    textforgot2: 2
                })
            }

            if (haspernumber === true) {
                this.setState({
                    textforgot3: 1
                })
            } else {
                this.setState({
                    textforgot3: 2
                })
            }

        }



    }

    outFocusConfirm() {
        const { confirmPassword, newpassword } = this.state;

        this.setState({
            isFocusConfirm: true
        })
        if ((confirmPassword !== null) && (confirmPassword != '')) {

            if (confirmPassword === newpassword) {
                this.setState({
                    confirmStatusPassword: true
                })
            } else {
                this.setState({
                    confirmStylePassword: false,
                    confirmTextErrorPassWord: 2
                })
            }

        } else {
            this.setState({
                confirmStylePassword: false,
                confirmTextErrorPassWord: 1
            })
        }


    }

    hasUpperCaseChar(newpassword) {
        const regex = /[A-Z]/; // สร้าง Regular Expression ในการเช็คอักษรตัวใหญ่
        return regex.test(newpassword); // ตรวจสอบว่ามีตัวอักษรตัวใหญ่อย่างน้อย 1 ตัวหรือไม่
    }

    hasNumber(newpassword) {
        const regex = /\d/; // สร้าง Regular Expression ในการเช็คตัวเลข
        return regex.test(newpassword); // ตรวจสอบว่ามีตัวเลขอย่างน้อย 1 ตัวหรือไม่
    }


    render() {
        const { stylePassword, isFocusNew, entry, password, textErrorPassWord, newpassword, textforgot1, textforgot2, textforgot3, confirmPassword, isFocusConfirm, confirmStylePassword, confirmTextErrorPassWord } = this.state;
        const { t } = this.props;
        const handleFocusNew = () => this.setState({ isFocusNew: true })
        const handleOutFocusNew = () => this.outFocusNew()
        const handleFocusConfirm = () => this.setState({ isFocusConfirm: true })
        const handleOutFocusConfirm = () => this.outFocusConfirm()
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={0}>
                <ScrollView>
                    <View style={{ alignItems: "center", marginTop: 24 }}>
                        <Image style={{ width: 120, height: 120 }}
                            source={require('../../assets/images/icon/ChangePassword.png')}
                        />
                        <Text style={styles.headText}>ตั้งรหัสผ่านใหม่</Text>

                    </View>
                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={[styles.headTextInput, { marginTop: 19 }]}>รหัสผ่านใหม่</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8 }}>
                            <TextInput
                                style={{
                                    width: '100%',
                                    height: 56,
                                    borderRadius: 8,
                                    paddingLeft: 16,
                                    paddingRight: 60,
                                    backgroundColor: ComponentsStyle.white,
                                    borderWidth: stylePassword ? isFocusNew ? 2 : 1 : 2,
                                    borderColor: stylePassword ? isFocusNew ? colors.persianBlue : colors.grey4 : colors.negative1,
                                    fontSize: entry && newpassword ? 25 : 16,
                                    paddingTop: entry && newpassword ? 10 : 0,
                                    fontFamily: 'IBMPlexSansThai-Regular',
                                    color: colors.grey1,
                                }}
                                maxLength={30}
                                onChangeText={(text) => this.handleChange('newpassword', text)}
                                placeholder={newpassword === null || newpassword === '' ? t('atleast8char') : null}
                                autoCapitalize='none'
                                secureTextEntry={entry}
                                value={newpassword}
                                onFocus={handleFocusNew}
                                onBlur={handleOutFocusNew}
                            />
                            <Pressable onPress={() => this.handleChangeEntry(!entry)} style={{ position: 'absolute', right: 16 }}>
                                <Image source={entry ? require('../../assets/images/icon/entry_op.png') : require('../../assets/images/icon/entry_off.png')} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={[styles.viewTextForgot, { marginTop: 8 }]}>
                        <Image style={{ width: 16, height: 16, marginTop: 4 }} source={textforgot1 == 1 ? require('../../assets/images/icon/radioButtonActive.png') : textforgot1 == 2 ? require('../../assets/images/icon/warningCircleSolid.png') : require('../../assets/images/icon/radioButtonChecked.png')} />
                        <Text style={[styles.textforgot,]}>8-30 ตัวอักษร?</Text>
                    </View>
                    <View style={styles.viewTextForgot}>
                        <Image style={{ width: 16, height: 16, marginTop: 4 }} source={textforgot2 == 1 ? require('../../assets/images/icon/radioButtonActive.png') : textforgot2 == 2 ? require('../../assets/images/icon/warningCircleSolid.png') : require('../../assets/images/icon/radioButtonChecked.png')} />
                        <Text style={styles.textforgot}>ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว</Text>
                    </View>
                    <View style={styles.viewTextForgot}>
                        <Image style={{ width: 16, height: 16, marginTop: 4 }} source={textforgot3 == 1 ? require('../../assets/images/icon/radioButtonActive.png') : textforgot3 == 2 ? require('../../assets/images/icon/warningCircleSolid.png') : require('../../assets/images/icon/radioButtonChecked.png')} />
                        <Text style={styles.textforgot}>ตัวเลขอย่างน้อย 1 ตัว</Text>
                    </View>
                    <View style={{ paddingHorizontal: 16, marginTop: 20, marginBottom: 40 }}>
                        <Text style={[styles.headTextInput, { marginTop: 19 }]}>ยืนยันรหัสผ่าน</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 8 }}>
                            <TextInput
                                style={{
                                    width: '100%',
                                    height: 56,
                                    borderRadius: 8,
                                    paddingLeft: 16,
                                    paddingRight: 60,
                                    backgroundColor: ComponentsStyle.white,
                                    borderWidth: stylePassword ? isFocusConfirm ? 2 : 1 : 2,
                                    borderColor: stylePassword ? isFocusConfirm ? colors.persianBlue : colors.grey4 : colors.negative1,
                                    fontSize: entry && confirmPassword ? 25 : 16,
                                    paddingTop: entry && confirmPassword ? 10 : 0,
                                    fontFamily: 'IBMPlexSansThai-Regular',
                                    color: colors.grey1,
                                }}
                                maxLength={30}
                                onChangeText={(text) => this.handleChange('confirmPassword', text)}
                                placeholder={confirmPassword === null || confirmPassword === '' ? 'กรอกรหัสด้านบนอีกครั้ง' : null}
                                autoCapitalize='none'
                                secureTextEntry={entry}
                                value={confirmPassword}
                                onFocus={handleFocusConfirm}
                                onBlur={handleOutFocusConfirm}
                            />
                            <Pressable onPress={() => this.handleChangeEntry(!entry)} style={{ position: 'absolute', right: 16 }}>
                                <Image source={entry ? require('../../assets/images/icon/entry_op.png') : require('../../assets/images/icon/entry_off.png')} />
                            </Pressable>
                        </View>
                        <View style={ComponentsStyle.viewTextError}>
                            {
                                confirmStylePassword === false ?

                                    confirmTextErrorPassWord === 1 ?
                                        <Text style={ComponentsStyle.textError}>{t('please_enter_password')}</Text>
                                        : confirmTextErrorPassWord === 2 ?
                                            <Text style={ComponentsStyle.textError}>รหัสผ่านไม่ถูกต้อง</Text>
                                            : null
                                    : null
                            }
                        </View>
                    </View>

                    <View style={[styles.submit, { marginBottom: 40 }]}>
                        <Pressable style={ComponentsStyle.button} /* onPress={() => this.submitLogin()} */ >
                            <Text style={ComponentsStyle.textButton}>{t('login')}</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
    headText: {
        marginTop: 24,
        marginHorizontal: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 20,
    },
    forgot: {
        marginTop: 14,
        textAlign: "center",
        color: colors.persianBlue,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
    },
    text: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
    },
    headTextInput: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
    },
    submit: {
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 40
    },
    entry: {
        position: "absolute",
        marginTop: 34,
        zIndex: 4,
        /*  width: "12%" */

    },
    entryImage: {
        zIndex: 4,

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
    textforgot: {
        marginLeft: 4,
        color: colors.grey2,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 14,
    },
    viewTextForgot: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 4
    }
})

const mapStateToProps = ({ authUser }) => {
    const { user, status } = authUser;
    return { user, status };
};

const mapActionsToProps = {};


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(SetPassword));
