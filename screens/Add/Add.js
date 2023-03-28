import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TextInput, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getActivityList } from "../../redux/get";

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stsusColor: "เข้มข้นต่ำ",
            isModalVisible: false,
            isModalConter: false,
            study: "ทั้งหมด",
            statusCreate: "listDataViews",
            statusViolence: null,
            missionName: null,
            editmission: false,
            confirmDelete: false,
            confirmActivityDeleted: false,
            message: null,
            data: true,
            activity_list_show: []
        };
    }


    componentDidMount() {
        const { user, activity_list } = this.props;

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("aaa", this.props.route.params);

            this.setState({
                isModalConter: true,
                activity_list_show: [...activity_list.light_intensity, ...activity_list.moderate_intensity, ...activity_list.vigorous_intensity]
            })

        });




        // this.props.routeName(null); // ถ้าเข้าให้ home ให้ทำคำสั่งนี้ 1 ครั้ง

    }

    componentWillUnmount() {
        this._unsubscribe();
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
    deleteActivity(mess) {

        this.setState({
            confirmActivityDeleted: true,
            statusCreate: "editView",
            statusViolence: null,
            missionName: null,
            editmission: false,
            confirmDelete: false,
            message: mess
        })
        setTimeout(() => {
            this.setState({
                confirmActivityDeleted: false
            })
        }, 2000);

        /*  this.props.navigation.popToTop() */
    }
    violence(e) {
        this.setState({
            statusViolence: e
        })
    }

    addMissionName(e) {

        this.setState({
            statusCreate: e,
            data: true
        })
    }



    editMissionName(ev, value) {
        this.setState({
            editmission: true,
            statusViolence: ev,
            missionName: value
        })
    }

    seveEitMissionName() {
        this.setState({
            editmission: false
        })
    }

    nextAddActivity(activity, intensity, type) {
        this.setState({
            isModalConter: false,
        })
        this.props.navigation.navigate("AddActivity", { activity: activity, intensity: intensity, type: type })
    }


    listDataViews() {
        const { stsusColor, isModalVisible, isModalConter, study, data, activity_list_show } = this.state;
        const { activity_list } = this.props;
        return (
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
                        <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "editView" })}>
                            <Text style={styles.headEdit}>เเก้ไข</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.missionView, { marginTop: 16, justifyContent: "space-between" }]}>
                        <View style={study == "ทั้งหมด" ? styles.boxHeadingActive : styles.boxHeading}>
                            <Pressable onPress={() => this.setState({
                                study: "ทั้งหมด",
                                activity_list_show: [...activity_list.light_intensity, ...activity_list.moderate_intensity, ...activity_list.vigorous_intensity]
                            })}>
                                <Text style={study == "ทั้งหมด" ? styles.sectionActive : styles.section}> ทั้งหมด</Text>
                            </Pressable>
                        </View>
                        <View style={study == "ต่ำ" ? styles.boxHeadingActive : styles.boxHeading}>
                            <Pressable onPress={() => this.setState({
                                study: "ต่ำ",
                                activity_list_show: [...activity_list.light_intensity]
                            })}>
                                <Text style={study == "ต่ำ" ? styles.sectionActive : styles.section}> ต่ำ</Text>
                            </Pressable>
                        </View>
                        <View style={study == "ปานกลาง" ? styles.boxHeadingActive : styles.boxHeading}>
                            <Pressable onPress={() => this.setState({
                                study: "ปานกลาง",
                                activity_list_show: [...activity_list.moderate_intensity]
                            })}>
                                <Text style={study == "ปานกลาง" ? styles.sectionActive : styles.section}> ปานกลาง</Text>
                            </Pressable>
                        </View>
                        <View style={study == "สูง" ? styles.boxHeadingActive : styles.boxHeading}>
                            <Pressable onPress={() => this.setState({
                                study: "สูง",
                                activity_list_show: [...activity_list.vigorous_intensity]
                            })}>
                                <Text style={study == "สูง" ? styles.sectionActive : styles.section}> สูง</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ marginTop: 24 }}>

                        {data == true ?

                            <ScrollView>
                                {
                                    activity_list_show &&
                                    activity_list_show.map((item, i) => {
                                        return (
                                            <TouchableWithoutFeedback onPress={() => this.nextAddActivity(item.activity, item.intensity, item.type)}>
                                                <View>
                                                    <View style={styles.missionView}>
                                                        <Image
                                                            style={styles.activityImage}
                                                            source={item.intensity === 'light_intensity' ? require('../../assets/images/activity/Activitylow.png') : item.intensity === 'moderate_intensity' ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')}
                                                        />
                                                        <View style={styles.groupText2}>
                                                            <Text style={styles.headText2}>{item.activity}</Text>
                                                            <Text
                                                                style={[styles.groupStatus, { color: item.intensity === 'light_intensity' ? colors.secondary_MayaBlue : item.intensity === 'moderate_intensity' ? colors.tertiaryYellow : colors.tertiaryMagenta }]}
                                                            >
                                                                {(item.intensity === 'light_intensity') && 'เข้มข้นต่ำ'}
                                                                {(item.intensity === 'moderate_intensity') && 'เข้มข้นปานกลาง'}
                                                                {(item.intensity === 'vigorous_intensity') && 'เข้มข้นสูง'}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.viewIconRight2}>
                                                        <Text style={[styles.groupStatus, { color: item.intensity === 'light_intensity' ? colors.secondary_MayaBlue : item.intensity === 'moderate_intensity' ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>
                                                            {(item.intensity === 'light_intensity') && 'เข้มข้นต่ำ'}
                                                            {(item.intensity === 'moderate_intensity') && 'เข้มข้นปานกลาง'}
                                                            {(item.intensity === 'vigorous_intensity') && 'เข้มข้นสูง'}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                                {/*            <TouchableWithoutFeedback onPress={() => this.nextAddActivity()}>
                                    <View>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={stsusColor == "เข้มข้นต่ำ" ? require('../../assets/images/activity/Activitylow.png') : stsusColor == "เข้มข้นปานกลาง" ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText2}>เดินเร็วaaa</Text>
                                                <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                            </View>
                                        </View>
                                        <View style={styles.viewIconRight2}>
                                            <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback> */}
                                {/* <View>
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
                                </View> */}
                                {/*  <View>
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
                                </View> */}
                                <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "createView" })}>
                                    <View>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={require('../../assets/images/activity/frame13811.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText3}>เพิ่มกิจกรรมใหม่</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                            :
                            <View style={styles.emptyStateCenter}>
                                <Image
                                    style={{ height: 84, width: 120, zIndex: 1 }}
                                    source={require('../../assets/images/exercise/Empty_State.png')}
                                />
                                <Text style={styles.imptyTextHead}>ยังไม่มีกิจกรรม</Text>
                                <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "createView" })}>
                                    <View style={[styles.buttonWhite, { marginTop: 16 }]}>
                                        <Text style={styles.textButtonWhite}>เพิ่มกิจกรรมใหม่</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        }

                    </View>
                </View>
            </View>
        )
    }

    createView() {
        const { isModalVisible, statusViolence, missionName } = this.state;
        return (
            <>
                <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                    <View style={styles.modalViewConter}>
                        <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between" }]}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "listDataViews" })}>
                                <Text style={styles.headEdit}>ยกเลิก</Text>
                            </TouchableWithoutFeedback>
                            <Text style={styles.headActivity}>เพิ่มกิจกรรม</Text>
                            {
                                statusViolence !== null && missionName !== null ?
                                    <TouchableWithoutFeedback onPress={() => this.addMissionName("listDataViews")}>
                                        <Text style={styles.headEdit}>เพิ่ม</Text>
                                    </TouchableWithoutFeedback>
                                    :
                                    <Text style={styles.headEditgrey}>เพิ่ม</Text>
                            }


                        </View>
                        <Text style={[styles.headActivity, { marginTop: 19 }]}>ความเข้มข้น</Text>
                        {/*   <TouchableWithoutFeedback></TouchableWithoutFeedback> */}
                        <View style={[styles.missionView, { marginTop: 8 }]}>
                            <TouchableWithoutFeedback onPress={() => this.violence("ต่ำ")}>
                                <View style={[styles.boxCreate, statusViolence == "ต่ำ" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                    <Image
                                        style={{ height: 32, width: 32, zIndex: 1 }}
                                        source={require('../../assets/images/activity/Activitylow.png')}
                                    />
                                    <Text style={styles.textImageBoxCreate}>ต่ำ</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.violence("ปานกลาง")}>
                                <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "ปานกลาง" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                    <Image
                                        style={{ height: 32, width: 32, zIndex: 1 }}
                                        source={require('../../assets/images/activity/Activitycenter.png')}
                                    />
                                    <Text style={styles.textImageBoxCreate}>ปานกลาง</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.violence("สูง")}>
                                <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "สูง" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                    <Image
                                        style={{ height: 32, width: 32, zIndex: 1 }}
                                        source={require('../../assets/images/activity/Activityhign.png')}
                                    />
                                    <Text style={styles.textImageBoxCreate}>สูง</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ missionName: text })}
                            /*  value={number} */
                            placeholder="ชื่อกิจกรรม"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </>
        )
    }

    editView() {
        const { stsusColor, isModalVisible, isModalConter, study, data, message, confirmActivityDeleted, confirmDelete, editmission, statusViolence, missionName } = this.state;
        return (
            <>

                {
                    editmission === false ?
                        <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                            <View style={styles.modalViewConter}>
                                <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between", alignItems: "center" }]}>
                                    <View></View>
                                    <Text style={styles.headActivity}>เเก้ไขกิจกรรมตามความเข้มข้น</Text>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "listDataViews" })}>
                                        <Text style={styles.headEdit}>เสร็จ</Text>
                                    </TouchableWithoutFeedback>
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
                                    <TouchableWithoutFeedback onPress={() => this.editMissionName("เข้มข้นต่ำ", "เดินเร็ว")}>
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
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "createView" })}>
                                        <View>
                                            <View style={styles.missionView}>
                                                <Image style={styles.activityImage} source={require('../../assets/images/activity/frame13811.png')} />
                                                <View style={styles.groupText2}>
                                                    <Text style={styles.headText3}>เพิ่มกิจกรรมใหม่</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                {
                                    confirmActivityDeleted === true ?
                                        <View style={styles.activityDeleted}>
                                            <View style={styles.boxActivityDeleted}>
                                                <Image
                                                    style={{ height: 32, width: 32, zIndex: 1 }}
                                                    source={require('../../assets/images/activity/Checked.png')}
                                                />
                                                <Text style={styles.textActivityDeleted}> {message}</Text>
                                            </View>
                                        </View>
                                        : null

                                }

                            </View>
                        </View>
                        :

                        <>
                            <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                                <View style={styles.modalViewConter}>
                                    <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between" }]}>
                                        <TouchableWithoutFeedback onPress={() => this.setState({ editmission: false })}>
                                            <Image
                                                style={{ width: 24, height: 24 }}
                                                source={require('../../assets/images/activity/chenronLe.png')}
                                            />
                                        </TouchableWithoutFeedback>
                                        <Text style={styles.headActivity}>เเก้ไขกิจกรรม</Text>
                                        {
                                            statusViolence !== null && missionName !== null ?
                                                <TouchableWithoutFeedback onPress={() => this.seveEitMissionName("listDataViews")}>
                                                    <Text style={styles.headEdit}>บันทึก</Text>
                                                </TouchableWithoutFeedback>
                                                :
                                                <Text style={styles.headEditgrey}>บันทึก</Text>
                                        }


                                    </View>
                                    <Text style={[styles.headActivity, { marginTop: 19 }]}>ความเข้มข้น</Text>
                                    {/*   <TouchableWithoutFeedback></TouchableWithoutFeedback> */}
                                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                                        <View>
                                            <View style={[styles.missionView, { marginTop: 8 }]}>
                                                <TouchableWithoutFeedback onPress={() => this.violence("ต่ำ")}>
                                                    <View style={[styles.boxCreate, statusViolence == "เข้มข้นต่ำ" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                                        <Image
                                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                                            source={require('../../assets/images/activity/Activitylow.png')}
                                                        />
                                                        <Text style={styles.textImageBoxCreate}>ต่ำ</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => this.violence("ปานกลาง")}>
                                                    <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "เข้มข้นปานกลาง" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                                        <Image
                                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                                            source={require('../../assets/images/activity/Activitycenter.png')}
                                                        />
                                                        <Text style={styles.textImageBoxCreate}>ปานกลาง</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => this.violence("สูง")}>
                                                    <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "เข้มข้นสูง" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                                        <Image
                                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                                            source={require('../../assets/images/activity/Activityhign.png')}
                                                        />
                                                        <Text style={styles.textImageBoxCreate}>สูง</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={(text) => this.setState({ missionName: text })}
                                                value={missionName}
                                                placeholder="ชื่อกิจกรรม"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        {confirmDelete === false ?
                                            <View style={{ alignItems: "center" }}>
                                                <Pressable onPress={() => this.setState({ confirmDelete: true })} >
                                                    <Text style={styles.deleteActivity}>ลบกิจกรรมนี้</Text>
                                                </Pressable>
                                            </View>
                                            : null}

                                    </View>
                                </View>
                            </View>

                        </>
                }
                <>
                    {
                        confirmDelete === true ?
                            <View style={styles.confirm}>
                                <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                                    <View style={styles.modalView}>
                                        <Text style={styles.headModal}>แน่ใจที่ลบกิจกรรมนี้หรือไม่</Text>
                                        <View style={[styles.missionView, { marginTop: 32, marginBottom: 40, }]}>
                                            <TouchableWithoutFeedback onPress={() => this.setState({ confirmDelete: false })}>
                                                <View style={styles.buttonWhite}>
                                                    <Text style={styles.textButtonWhite}>ย้อนกลับ</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => this.deleteActivity("ลบกิจกรรมแล้ว")}>
                                                <View style={styles.buttonRed}>
                                                    <Text style={styles.textButtonRed}>ลบกิจกรรม</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            : null

                    }
                </>

            </>
        )
    }




    render() {
        const { stsusColor, isModalVisible, isModalConter, study, data, statusCreate, statusViolence, missionName } = this.state;

        return (
            <>
                <View style={styles.fill}>
                    <View style={{ zIndex: 0 }}>
                        <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisible)} />
                        <Modal isVisible={isModalConter}
                            style={{ margin: 0 }}
                        >
                            {statusCreate === "listDataViews" ?
                                this.listDataViews()
                                :
                                statusCreate === "createView" ?
                                    this.createView()
                                    : this.editView()

                            }

                        </Modal>
                    </View>
                </View >
                <View style={[styles.activityDeleted, { marginRight: 16 }]}>
                    <View style={styles.boxActivityDeleted}>
                        <Image
                            style={{ height: 32, width: 32, zIndex: 1 }}
                            source={require('../../assets/images/activity/Checked.png')}
                        />
                        <Text style={styles.textActivityDeleted}> บันทึกกิจกรรมแล้ว</Text>
                    </View>
                </View>
            </>
        )
    }
}
const deviceWidth = Math.round(Dimensions.get('window').width);
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
    headEditgrey: {
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey4
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
    emptyStateCenter: {
        height: "100%",
        marginTop: -80,
        alignItems: "center",
        justifyContent: "center"
    },
    imptyTextHead: {
        marginTop: 8,
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    boxCreate: {
        width: 104,
        height: 93,
        bgcolor: "#f0f0f0",
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    textImageBoxCreate: {
        marginTop: 8,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    input: {
        height: 40,
        marginTop: 24,
        borderWidth: 1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
        paddingLeft: 16,
        borderColor: colors.grey4,
        borderRadius: 8
    },
    confirm: {
        backgroundColor: colors.grey1,
        opacity: 0.8,
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: 6
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

})

const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { activity_list, statusGetActivityList } = getData;
    return { user, activity_list, statusGetActivityList };
};

const mapActionsToProps = { getActivityList };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Add));