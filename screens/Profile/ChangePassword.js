import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Image, Pressable, ScrollView, Dimensions, Platform } from 'react-native';
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
            isFocusOld: false,
            password: null,
            statusSetPassword: false,
            textErrorPassWord: null,
        };
    }


    componentDidUpdate(prevProps, prevState) {
        const { statusSetPassword } = this.state;
        if ((prevState.statusSetPassword !== statusSetPassword) && (statusSetPassword === true)) {
            this.props.navigation.navigate("SetPassword");
        }
    }

    handleChange(p, e) {
        this.setState({
            [p]: e
        })
    }


    submitChange() {
        const { statusSetPassword, password } = this.state
        this.passwordOld()
    }


    handleChangeEntry(e) {
        this.setState({
            entry: e
        })
    }

    passwordOld() {
        const { password } = this.state;
        const { user } = this.props;
        if ((password != null) && (password != '')) {
            const md5Password = md5(password)
            if (md5Password === user.password) {
                this.setState({ statusSetPassword: true })
            } else {
                this.setState({
                    stylePassword: false,
                    textErrorPassWord: 2
                })
            }
        } else {
            this.setState({
                stylePassword: false,
                textErrorPassWord: 1
            })
        }
    }

    outFocusOld() {
        this.setState({ isFocusOld: false })
        this.passwordOld()
    }






    render() {
        const { stylePassword, isFocusOld, entry, password, textErrorPassWord } = this.state;
        const { t } = this.props;
        const handleFocusOld = () => this.setState({ isFocusOld: true })
        const handleOutFocusOld = () => this.outFocusOld()
        return (

            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100} >
                <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Image style={{ width: 120, height: 120 }}
                        source={require('../../assets/images/icon/ChangePassword.png')}
                    />
                    <Text style={styles.headText}>กรอกรหัสผ่านเดิม</Text>

                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 19 }}>
                            <TextInput
                                style={{
                                    width: '100%',
                                    height: 56,
                                    borderRadius: 8,
                                    paddingLeft: 16,
                                    paddingRight: 60,
                                    backgroundColor: ComponentsStyle.white,
                                    borderWidth: stylePassword ? isFocusOld ? 2 : 1 : 2,
                                    borderColor: stylePassword ? isFocusOld ? colors.persianBlue : colors.grey4 : colors.negative1,
                                    fontSize: entry && password ? 25 : 16,
                                    paddingTop: entry && password ? 10 : 0,
                                    fontFamily: 'IBMPlexSansThai-Regular',
                                    color: colors.grey1,
                                }}
                                onChangeText={(text) => this.handleChange('password', text)}
                                placeholder={password === null || password === '' ? t('atleast8char') : null}
                                autoCapitalize='none'
                                secureTextEntry={entry}
                                value={password}
                                onFocus={handleFocusOld}
                                onBlur={handleOutFocusOld}
                            />
                            <Pressable onPress={() => this.handleChangeEntry(!entry)} style={{ position: 'absolute', right: 16 }}>
                                <Image source={entry ? require('../../assets/images/icon/entry_op.png') : require('../../assets/images/icon/entry_off.png')} />
                            </Pressable>
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
                <Text style={[styles.forgot, { marginBottom: 70 }]}>ลืมรหัสผ่าน?</Text>
                <View style={styles.submit}>
                    <Pressable style={ComponentsStyle.button} onPress={() => this.submitChange()} >
                        <Text style={ComponentsStyle.textButton}>{t('next')}</Text>
                    </Pressable>
                </View>
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
)(withTranslation()(ChangePassword));
