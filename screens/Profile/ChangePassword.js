import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';
import i18next from 'i18next';
import md5 from 'md5';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: true,
            stylePassword: true, // เปลี่ยนสี borderColor PassWord [true,false]
            isFocused2: false,
            password: null,
            statusSetPassword: false,
            textErrorPassWord: null,
        };
    }


    handleChange(p, e) {
        this.setState({
            password: e
        })
    }


    submitChange() {
        const { password } = this.state;
        const { user } = this.props;
        const md5Password = md5(password)
        if (md5Password === user.password) {

            console.log("",);
            this.setState({ statusSetPassword: true })
        } else {
            this.setState({
                stylePassword: true
            })
            if (password === null || password === '') {
                this.setState({
                    textErrorPassWord: 1
                })
            } else {
                this.setState({
                    textErrorPassWord: 2
                })
            }
        }
    }


    handleChangeEntry(e) {
        this.setState({
            entry: e
        })
    }


    changePassword() {
        const { stylePassword, isFocused2, entry, password, textErrorPassWord } = this.state;
        const { t } = this.props;
        const handleFocus2 = () => this.setState({ isFocused2: true })
        const handleBlur2 = () => this.setState({ isFocused2: false })
        return (
            <>
                <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Image style={{ width: 120, height: 120 }}
                        source={require('../../assets/images/icon/ChangePassword.png')}
                    />
                    <Text style={styles.headText}>กรอกรหัสผ่านเดิม</Text>

                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "100%", zIndex: 1 }}>
                            <TextInput
                                style={{
                                    width: "100%",
                                    height: 56,
                                    borderWidth: stylePassword ? isFocused2 ? 2 : 1 : 2,
                                    paddingLeft: 16,
                                    paddingRight: 45,
                                    justifyContent: "center",
                                    marginTop: 19,
                                    borderRadius: 8,
                                    color: colors.grey1,
                                    backgroundColor: ComponentsStyle.white,
                                    fontFamily: "IBMPlexSansThai-Regular",
                                    zIndex: 0,
                                    borderColor: stylePassword ? isFocused2 ? colors.persianBlue : colors.grey4 : colors.negative1,
                                    fontSize: (entry && password) ? 25 : 16,
                                    //เอาออกเพราะ android Error
                                    paddingTop: (entry && password) ? 10 : 0
                                }}
                                onChangeText={(text) => this.handleChange("password", text)}
                                placeholder={(password === null) || (password === '') ? t('atleast8char') : null}
                                autoCapitalize='none'
                                secureTextEntry={entry}
                                value={password}
                                onFocus={handleFocus2}
                                onBlur={handleBlur2}
                            />
                        </View>
                        <View style={{ zIndex: 4, marginRight: 50 }}>
                            {
                                entry === false ?

                                    <Pressable /* style={styles.entry} */ onPress={() => this.handleChangeEntry(true)}>
                                        <Image style={{ marginRight: 100 }}
                                            source={require('../../assets/images/icon/entry_off.png')}
                                        />
                                    </Pressable>

                                    :

                                    <Pressable /* style={styles.entry} */ onPress={() => this.handleChangeEntry(false)}>
                                        <Image
                                            /*  style={styles.entryImage} */
                                            source={require('../../assets/images/icon/entry_op.png')}
                                        />
                                    </Pressable>

                            }
                        </View>
                    </View>
                    <View style={ComponentsStyle.viewTextError}>
                        {
                            stylePassword === false ?
                                textErrorPassWord === 1 ?
                                    <Text style={ComponentsStyle.textError}>{t('please_enter_password')}</Text>
                                    : textErrorPassWord === 2 ?
                                        <Text style={ComponentsStyle.textError}>รหัสผ่านไม่ถูกต้อง</Text>
                                        : null
                                : null
                        }
                    </View>
                </View>
                <Text style={styles.forgot}>ลืมรหัสผ่าน?</Text>
                <View style={styles.submit}>
                    <Pressable style={ComponentsStyle.button} onPress={() => this.submitChange()} >
                        <Text style={ComponentsStyle.textButton}>{t('next')}</Text>
                    </Pressable>
                </View>
            </>
        )
    }

    setPassword() {
        const { stylePassword, isFocused2, entry, password, textErrorPassWord } = this.state;
        const { t } = this.props;
        const handleFocus2 = () => this.setState({ isFocused2: true })
        const handleBlur2 = () => this.setState({ isFocused2: false })
        return (
            <>
                {/*  <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Image style={{ width: 120, height: 120 }}
                        source={require('../../assets/images/icon/ChangePassword.png')}
                    />
                    <Text style={styles.headText}>ตั้งรหัสผ่านใหม่</Text>

                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View style={styles.inputPassword2}>
                        <TextInput
                            style={{
                                width: "100%",
                                height: 56,
                                borderWidth: stylePassword ? isFocused2 ? 2 : 1 : 2,
                                paddingLeft: 16,
                                paddingRight: 45,
                                justifyContent: "center",
                                marginTop: 19,
                                borderRadius: 8,
                                color: colors.grey1,
                                backgroundColor: ComponentsStyle.white,
                                fontFamily: "IBMPlexSansThai-Regular",
                                zIndex: 0,
                                borderColor: stylePassword ? isFocused2 ? colors.persianBlue : colors.grey4 : colors.negative1,
                                fontSize: (entry && password) ? 25 : 16,
                                //เอาออกเพราะ android Error
                                paddingTop: (entry && password) ? 10 : 0
                            }}
                            onChangeText={(text) => this.handleChange("password", text)}
                            placeholder={(password === null) || (password === '') ? t('atleast8char') : null}
                            autoCapitalize='none'
                            secureTextEntry={entry}
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
                                        <Text style={ComponentsStyle.textError}>รหัสผ่านไม่ถูกต้อง</Text>
                                        : null
                                : null
                        }
                    </View>
                </View>
                <Text style={styles.forgot}>ลืมรหัสผ่าน?</Text>
                <View style={styles.submit}>
                    <Pressable style={ComponentsStyle.button} onPress={() => this.submitLogin()} >
                        <Text style={ComponentsStyle.textButton}>{t('login')}</Text>
                    </Pressable>
                </View> */}
            </>
        )
    }

    render() {
        const { statusSetPassword } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
                {
                    statusSetPassword == true ?
                        this.setPassword()
                        : this.changePassword()
                }
            </KeyboardAvoidingView >
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
})

const mapStateToProps = ({ authUser }) => {
    const { user, status } = authUser;
    return { user, status };
};

const mapActionsToProps = {};


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ChangePassword));
