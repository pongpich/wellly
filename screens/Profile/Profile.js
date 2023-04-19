import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Animated, StatusBar, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback, Button } from 'react-native';
import ComponentsStyle from '../../constants/components';
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate } from "../../redux/get";
import { insertNutritionActivity, insertExerciseActivity, } from "../../redux/update";
import colors from '../../constants/colors';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import { logoutUser, deleteAccount, resetStatusDeleteAcc } from "../../redux/auth";
import { withTranslation } from 'react-i18next';

class Profile extends Component {


    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            popupDeleteAccShow: false,
        };
    }


    componentDidMount() {
        this.props.resetStatusDeleteAcc();
    }

    componentDidUpdate(prevProps) {
        const { statusDeleteAcc } = this.props;
        if ((prevProps.statusDeleteAcc !== statusDeleteAcc) && (statusDeleteAcc === "success")) {
            setTimeout(() => {
                this.props.logoutUser();
            }, 5000);
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



    render() {

        const { user, statusDeleteAcc } = this.props;
        const { popupDeleteAccShow } = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/icon/Logo_profile.png')} style={{ height: 180, backgroundColor: colors.mayaBlue60 }}>
                    <View style={{ height: 44, zIndex: 10, width: "100%" }}>
                        <StatusBar barStyle="dark-content" />
                    </View>
                    <View style={{ height: 48, zIndex: 3, width: "100%" }}>
                        <View style={{ marginLeft: 16 }}>
                            <Pressable onPress={() => this.props.navigation.goBack()}>
                                <Image
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
                        <Image
                            style={{ width: 12, height: 12, marginLeft: 8, marginTop: 10 }}
                            source={require('../../assets/images/activity/Note.png')}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={{ marginTop: 25 }}>
                        <Pressable onPress={() => this.props.navigation.navigate("Badge")}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                        source={require('../../assets/images/icon/Badge_3x.png')}
                                    />
                                    <Text style={styles.manuName}>ตราของฉัน</Text>
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
                                    <Text style={styles.manuName}>ข้อมูลสุขภาพ</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                    source={require('../../assets/images/icon/right.png')}
                                />
                            </View>
                        </Pressable>
                        <View style={styles.line2} />
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    style={{ width: 24, height: 24, marginLeft: 16 }}
                                    source={require('../../assets/images/icon/Password_3x.png')}
                                />
                                <Text style={styles.manuName}>เปลี่ยนรหัสผ่าน</Text>
                            </View>
                            <Image
                                style={{ width: 24, height: 24, marginRight: 16 }}
                                source={require('../../assets/images/icon/right.png')}
                            />
                        </View>
                        <View style={styles.line}>
                            <View style={styles.line1} />
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    style={{ width: 24, height: 24, marginLeft: 16 }}
                                    source={require('../../assets/images/icon/Language_3x.png')}
                                />
                                <Text style={styles.manuName}>ภาษา</Text>
                            </View>
                            <Image
                                style={{ width: 24, height: 24, marginRight: 16 }}
                                source={require('../../assets/images/icon/right.png')}
                            />
                        </View>
                        <View style={styles.line2} />
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    style={{ width: 24, height: 24, marginLeft: 16 }}
                                    source={require('../../assets/images/icon/PDPA_3x.png')}
                                />
                                <Text style={styles.manuName}>การยินยอมและเงื่อนไข</Text>
                            </View>
                            <Image
                                style={{ width: 24, height: 24, marginRight: 16 }}
                                source={require('../../assets/images/icon/right.png')}
                            />
                        </View>
                        <View style={styles.line}>
                            <View style={styles.line1} />
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    style={{ width: 24, height: 24, marginLeft: 16 }}
                                    source={require('../../assets/images/icon/About_3x.png')}
                                />
                                <Text style={styles.manuName}>เกี่ยวกับ Wellly</Text>
                            </View>
                            <Image
                                style={{ width: 24, height: 24, marginRight: 16 }}
                                source={require('../../assets/images/icon/right.png')}
                            />
                        </View>
                        <View style={styles.line2} />
                        <Pressable onPress={() => this.onDeleteAccount()}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        style={{ width: 24, height: 24, marginLeft: 16 }}
                                    />
                                    <Text style={styles.manuName}>ลบบัญชี</Text>
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
                                    <Text style={styles.manuName}>ออกจากระบบ</Text>
                                </View>
                                <Image
                                    style={{ width: 24, height: 24, marginRight: 16 }}
                                />
                            </View>
                        </Pressable>
                    </View>
                    <Text style={styles.version}>เวอร์ชั่น 1.2</Text>
                </ScrollView>
                <View View style={styles.centeredView} >


                    <Modal isVisible={popupDeleteAccShow}

                        style={{}}
                    >
                        <View style={styles.centeredView}>
                            {
                                statusDeleteAcc === "success" ?
                                    <View style={styles.modalView}>
                                        <Text style={styles.missionHead}>ระบบทำการลบบัญชีของคุณแล้ว</Text>
                                    </View>
                                    :
                                    <View style={styles.modalView}>
                                        <Text style={styles.missionHead}>การลบบัญชีไม่สามารถย้อนกลับได้</Text>
                                        <Text style={styles.missionHead}>ข้อมูลบัญชีจะไม่สามารถกู้คืนได้</Text>
                                        <Text style={styles.missionHead}>คุณแน่ใจหรือไม่ ?</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "space-between", width: "100%" }}>
                                            <View style={styles.button}>
                                                <Text onPress={() => this.setState({ popupDeleteAccShow: !popupDeleteAccShow })} style={ComponentsStyle.textButton} >ยกเลิก</Text>
                                            </View>
                                            <View style={styles.buttonGrey}>
                                                <Text onPress={() => this.props.deleteAccount(user && user.user_id)} style={ComponentsStyle.textButtonGrey} >ยืนยัน</Text>
                                            </View>
                                        </View>
                                    </View>
                            }

                        </View>
                    </Modal>
                </View>
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "100%",
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 35,
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
});

const mapStateToProps = ({ authUser }) => {
    const { user, statusDeleteAcc } = authUser;

    return { user, statusDeleteAcc };
};

const mapActionsToProps = { logoutUser, deleteAccount, resetStatusDeleteAcc };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Profile));



