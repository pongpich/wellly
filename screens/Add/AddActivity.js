import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getActivityList, getExerciserActivity } from "../../redux/get";
import { updateNumberCompleted } from "../../redux/update";

class AddActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stsusColor: "เข้มข้นต่ำ",
            isModalVisible: false,
            isModalConter: false,
            study: "ทั้งหมด"
        };
    }

    componentDidUpdate(prevProps) {
        const { statusUpdateNumbComp, user } = this.props;

        if ((prevProps.statusUpdateNumbComp !== statusUpdateNumbComp) && (statusUpdateNumbComp === "success")) {
            this.props.getExerciserActivity(user && user.user_id);
            this.props.navigation.navigate("Add");
        }
    }


    toggleModal(isModalVisible) {
        console.log("adas");

        this.setState({
            isModalVisible: !isModalVisible
        })
    };
    isModalConter(isModalConter) {
        console.log("adas");

        this.setState({
            isModalConter: !isModalConter
        })
    };
    deleteActivity(isModalVisible) {

        this.setState({
            isModalVisible: !isModalVisible
        })
        this.props.navigation.popToTop()
    }

    saveMission() {
        const { user } = this.props;
        //this.props.navigation.navigate("Add")
        const activity_id = 'moderate_intensity';
        const week_in_program = 5;
        this.props.updateNumberCompleted((user && user.user_id), activity_id, week_in_program);
    }

    render() {
        const { stsusColor, isModalVisible, isModalConter, study } = this.state;
        return (
            <View style={styles.fill}>
                <View style={{ height: 58, zIndex: 10, width: "100%", backgroundColor: colors.white }}>
                    <StatusBar barStyle="dark-content" />
                </View>
                <View style={{ height: 48, width: "100%", backgroundColor: colors.white }}>
                    <View style={{ marginLeft: 16 }}>
                        {/*           //  this.props.navigation.dispatch(StackActions.replace('Home')) */}
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <Image
                                source={require('../../assets/images/icon/caret.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.boxConter}>
                    <View style={styles.missionView}>
                        <Image style={styles.activityImage} source={require('../../assets/images/activity/Activitylow.png')} />
                        <View style={styles.groupText}>
                            <Text style={styles.headText}>เดินเร็ว</Text>
                            <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                        </View>
                    </View>
                    <View style={styles.viewIconRight}>
                        <Pressable onPress={() => this.isModalConter(isModalConter)}>
                            <Image
                                style={styles.chevronImage}
                                source={require('../../assets/images/activity/Chevron.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.boxConter2, { justifyContent: "space-between" }]}>
                    <View>
                        <View style={styles.rowDetails}>
                            <Image
                                style={styles.chevronImage}
                                source={require('../../assets/images/activity/Calendar.png')}
                            />
                            <Text style={styles.textDetails}>31 ธ.ค. 2566 - 17:50 น.</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: colors.grey6,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={styles.rowDetails}>
                            <Image
                                style={styles.chevronImage}
                                source={require('../../assets/images/activity/Clock.png')}
                            />
                            <Text style={styles.textDetails}>1 ชั่วโมง</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: colors.grey6,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={styles.rowDetails}>
                            <Image
                                style={styles.chevronImage}
                                source={require('../../assets/images/activity/Note.png')}
                            />
                            <Text style={styles.textDetails}>เดินกินลมม</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: colors.grey6,
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                    </View>
                    {/*  <View style={{ alignItems: "center" }}>
                        <Pressable onPress={() => this.toggleModal(isModalVisible)} >
                            <Text style={styles.deleteActivity}>ลบกิจกรรมนี้</Text>
                        </Pressable>
                    </View> */}
                    <View style={[styles.missionView, { marginTop: 32, marginBottom: 40, }]}>
                        <TouchableWithoutFeedback onPress={() => this.toggleModal(isModalVisible)}>
                            <View style={styles.buttonWhite}>
                                <Text style={styles.textButtonWhite}>ละทิ้ง</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.saveMission()}>
                            <View style={styles.buttonBlue}>
                                <Text style={styles.textButtonRed}>บันทึก</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View>
                    <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisible)} />
                    <Modal isVisible={isModalVisible}
                        style={{ margin: 0 }}
                    >
                        <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                            <View style={styles.modalView}>
                                <Text style={styles.headModal}>แน่ใจที่ลบกิจกรรมนี้หรือไม่</Text>
                                <View style={[styles.missionView, { marginTop: 32, marginBottom: 40, }]}>
                                    <TouchableWithoutFeedback onPress={() => this.toggleModal(isModalVisible)}>
                                        <View style={styles.buttonWhite}>
                                            <Text style={styles.textButtonWhite}>ย้อนกลับ</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback /* onPress={() => this.deleteActivity(isModalVisible)} */>
                                        <View style={styles.buttonRed}>
                                            <Text style={styles.textButtonRed}>ลบกิจกรรม</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View>
                    <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisible)} />
                    <Modal isVisible={isModalConter}
                        style={{ margin: 0 }}
                    >
                        <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                            <View style={styles.modalViewConter}>
                                <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between" }]}>
                                    <TouchableWithoutFeedback onPress={() => this.isModalConter(isModalConter)}>
                                        <Image
                                            style={styles.cross}
                                            source={require('../../assets/images/activity/cross.png')}
                                        />
                                    </TouchableWithoutFeedback>
                                    <Text style={styles.headActivity}>กิจกรรมตามความเข้มข้น</Text>

                                    <Text style={styles.headEdit}>เเก้ไข</Text>
                                </View>
                                <View style={[styles.missionView, { marginTop: 16, justifyContent: "space-between" }]}>
                                    <View style={study == "ทั้งหมด" ? styles.boxHeadingActive : styles.boxHeading}>
                                        <Pressable onPress={() => this.setState({
                                            study: "ทั้งหมด"
                                        })}>
                                            <Text style={study == "ทั้งหมด" ? styles.sectionActive : styles.section}> ทั้งหมด</Text>
                                        </Pressable>
                                    </View>
                                    <View style={study == "ต่ำ" ? styles.boxHeadingActive : styles.boxHeading}>
                                        <Pressable onPress={() => this.setState({
                                            study: "ต่ำ"
                                        })}>
                                            <Text style={study == "ต่ำ" ? styles.sectionActive : styles.section}> ต่ำ</Text>
                                        </Pressable>
                                    </View>
                                    <View style={study == "ปานกลาง" ? styles.boxHeadingActive : styles.boxHeading}>
                                        <Pressable onPress={() => this.setState({
                                            study: "ปานกลาง"
                                        })}>
                                            <Text style={study == "ปานกลาง" ? styles.sectionActive : styles.section}> ปานกลาง</Text>
                                        </Pressable>
                                    </View>
                                    <View style={study == "สูง" ? styles.boxHeadingActive : styles.boxHeading}>
                                        <Pressable onPress={() => this.setState({
                                            study: "สูง"
                                        })}>
                                            <Text style={study == "สูง" ? styles.sectionActive : styles.section}> สูง</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ marginTop: 24 }}>
                                    <View>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={stsusColor == "เข้มข้นต่ำ" ? require('../../assets/images/activity/Activitylow.png') : stsusColor == "เข้มข้นปานกลาง" ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText2}>เดินเร็ว</Text>
                                                <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                            </View>
                                        </View>
                                        <View style={styles.viewIconRight2}>
                                            <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={stsusColor == "เข้มข้นต่ำ" ? require('../../assets/images/activity/Activitylow.png') : stsusColor == "เข้มข้นปานกลาง" ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText2}>เดินเร็ว</Text>
                                                <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                            </View>
                                        </View>
                                        <View style={styles.viewIconRight2}>
                                            <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={stsusColor == "เข้มข้นต่ำ" ? require('../../assets/images/activity/Activitylow.png') : stsusColor == "เข้มข้นปานกลาง" ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText2}>เดินเร็ว</Text>
                                                <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                            </View>
                                        </View>
                                        <View style={styles.viewIconRight2}>
                                            <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={require('../../assets/images/activity/frame13811.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText3}>เพิ่มกิจกรรมใหม่</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.grey7,
    },
    boxConter: {
        backgroundColor: colors.white,
        paddingHorizontal: 16
    },
    missionView: {
        flexDirection: "row"
    },
    activityImage: {
        width: 32,
        height: 32,
        marginTop: 16,
        marginLeft: 16
    },
    headText: {
        marginTop: 15,
        marginLeft: 13,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
    },
    headText2: {
        marginTop: 15,
        marginLeft: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
    },
    headText3: {
        marginTop: 15,
        marginLeft: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey2,
    },
    groupText: {
        flexDirection: "column",
        paddingBottom: 24
    },
    groupText2: {
        flexDirection: "column",

    },
    groupStatus: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize14,
        marginLeft: 16
    },
    chevronImage: {
        width: 24,
        height: 24,

    },
    viewIconRight: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    viewIconRight2: {
        marginTop: -10,
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    boxConter2: {
        paddingHorizontal: 16,
        marginTop: 8,
        backgroundColor: colors.white,
        /*        height: "100%" */
        flex: 1
    },
    textDetails: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        marginLeft: 20
    },
    rowDetails: {
        flexDirection: "row",
        marginBottom: 24,
        marginTop: 24,
    },
    deleteActivity: {
        marginBottom: 54,
        color: colors.negative1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16
    },
    modalView: {
        position: "relative",
        zIndex: 3,
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 16,
        height: 200,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: 0,
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    headModal: {
        marginTop: 32,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
    },
    buttonWhite: {
        width: "47%",
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
    modalViewConter: {
        position: "relative",
        zIndex: 3,
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 16,
        height: "90%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: 0,
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    textButtonWhite: {
        color: colors.persianBlue,
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    buttonRed: {
        marginLeft: 16,
        width: "47%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.negative1,
        borderRadius: 24,
        height: 48,
        borderColor: colors.negative1,
        borderWidth: 2
    },
    textButtonRed: {
        color: colors.white,
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    buttonBlue: {
        marginLeft: 16,
        width: "47%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.persianBlue,
        borderRadius: 24,
        height: 48,
        borderColor: colors.persianBlue,
        borderWidth: 2
    },

    cross: {
        width: 16,
        height: 16,
        marginLeft: 2
    },
    headActivity: {
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1
    },
    headEdit: {
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.persianBlue
    },
    textHeadConter: {
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    boxHeadingActive: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "25%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "25%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.grey4
    },
    sectionActive: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        width: "25%",
        textAlign: "center",
    },
    section: {
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center",
    },


})

const mapStateToProps = ({ authUser, getData, updateData }) => {
    const { user } = authUser;
    const { activity_list, statusGetActivityList } = getData;
    const { statusUpdateNumbComp } = updateData;
    return { user, activity_list, statusGetActivityList, statusUpdateNumbComp };
};

const mapActionsToProps = { getActivityList, updateNumberCompleted, getExerciserActivity };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(AddActivity));