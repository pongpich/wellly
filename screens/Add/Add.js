import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TextInput, Image, Animated, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { withTranslation } from 'react-i18next';

import { connect } from 'react-redux';
import { getActivityList, setIntensityFromExArticleTemplate } from "../../redux/get";
import { addActivityListAddOn, deleteActivityListAddOn, editActivityListAddOn } from "../../redux/update";
import { BackHandler } from 'react-native';
import { t } from 'i18next';
import i18next from 'i18next';
import { CommonActions, StackActions, useNavigationState, useNavigation, NavigationContainerRef } from '@react-navigation/native';



class Add extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
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
            activity_list_show: [],
            activity_list_addon_show: [],
            intensityFromExArticle: null,
            activity_id_edit_focus: '',
            statusAnimated: false,
            activityId3: null
        };
    }


    componentDidMount() {
        const { user, activity_list, intensityFromExArticleTemplate, } = this.props;
        const { isModalConter } = this.state;



        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            const { intensityFromExArticleTemplate } = this.props;

            var activityId2 = null;

            console.log("activity_list", activity_list);

            if (this.props.route.params == null || this.props.route.params == "undefined") {

                activityId2 = "null";
            } else {
                activityId2 = this.props.route.params.activity_id;
                this.setState({ activityId3: activityId2 })
            }

            if (this.props.route.params) {
                const { message } = this.props.route.params
                if (message !== "null") {
                    this.setState({
                        message: message,
                        confirmActivityDeleted: true
                    })
                    setTimeout(() => {
                        this.setState({
                            message: null,
                            confirmActivityDeleted: false
                        })
                    }, 2000);
                    // ลบ params ทิ้ง

                    this.props.navigation.setParams({ message: "null" });
                }


            }


            if (activityId2 == "light_intensity") {
                this.setState({
                    study: "ต่ำ",
                    intensityFromExArticle: "light_intensity",
                    activity_list_show: [...activity_list.light_intensity]
                })
            }
            else if (activityId2 == "moderate_intensity") {
                this.setState({
                    study: "ปานกลาง",
                    intensityFromExArticle: "moderate_intensity",
                    activity_list_show: [...activity_list.moderate_intensity]
                })
            } else if (activityId2 == "vigorous_intensity") {
                this.setState({
                    study: "สูง",
                    intensityFromExArticle: "vigorous_intensity",
                    activity_list_show: [...activity_list.vigorous_intensity]
                })

            } else {

                this.setState({
                    activity_list_show: [...activity_list.light_intensity, ...activity_list.moderate_intensity, ...activity_list.vigorous_intensity],
                    activity_list_addon_show: [
                        ...(activity_list.light_intensity.filter(item => item.type === 'addon')),
                        ...(activity_list.moderate_intensity.filter(item => item.type === 'addon')),
                        ...(activity_list.vigorous_intensity.filter(item => item.type === 'addon')),
                    ],
                    study: "ทั้งหมด",
                })
            }


            this.setState({
                isModalConter: !isModalConter,
            })
            this.setState({
                intensityFromExArticle: null
            })


            if (intensityFromExArticleTemplate === true) {
                this.setState({
                    intensityFromExArticle: intensityFromExArticleTemplate.intensity
                })

            }


            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

            this.animate()



        });





    }

    componentWillUnmount() {
        this._unsubscribe();


    }


    /** 
     * !   get Routename ห่อนหน้า
      */

    getPreviousRoute = () => {
        const navigation = this.props.navigation;
        const previousRoute = navigation?.getState()?.routes?.[navigation?.getState()?.routes?.length - 2];

        if (previousRoute) {
            return previousRoute.name;
        }

        return null;
    };


    handleBackPress = () => {

        const { navigation, route } = this.props;


        if (navigation.canGoBack() && route.name === "Add") {
            /*  BackHandler.exitApp(); */
            navigation.dispatch(StackActions.replace('Home'));
            return true;
        } else {
            return false;
        }
    };


    componentDidUpdate(prevProps, prevState) {

        const { intensityFromExArticle, study, isModalConter, missionName } = this.state;
        const { user, activity_list, intensityFromExArticleTemplate, statusAddActListAddOn, statusDeleteActListAddOn, statusGetActivityList, statusEditActListAddOn, } = this.props;


        if ((prevState.intensityFromExArticle !== intensityFromExArticle) && (intensityFromExArticle !== null)) {

            if (intensityFromExArticle == "light_intensity") {
                this.setState({
                    activity_list_show: [...activity_list.light_intensity]
                })
            }
            if (intensityFromExArticle == "moderate_intensity") {
                this.setState({
                    activity_list_show: [...activity_list.moderate_intensity]
                })
            }
            if (intensityFromExArticle == "vigorous_intensity") {
                this.setState({
                    activity_list_show: [...activity_list.vigorous_intensity]
                })
            }


            this.props.setIntensityFromExArticleTemplate(null)
        }

        if ((prevProps.statusAddActListAddOn !== statusAddActListAddOn) && (statusAddActListAddOn === 'success')) {

            this.props.getActivityList(user && user.user_id);
        }
        if ((prevProps.statusDeleteActListAddOn !== statusDeleteActListAddOn) && (statusDeleteActListAddOn === 'success')) {
            this.props.getActivityList(user && user.user_id);
            this.setMessage("ลบกิจกรรมแล้ว")
            this.setState({
                statusAnimated: false
            })
        }
        if ((prevProps.statusEditActListAddOn !== statusEditActListAddOn) && (statusEditActListAddOn === 'success')) {

            this.props.getActivityList(user && user.user_id);

            this.setMessage("บันทึกกิจกรรมแล้ว")
            this.setState({
                statusAnimated: false
            })

        }
        if ((prevProps.statusGetActivityList !== statusGetActivityList) && (statusGetActivityList === 'success')) { //ใช้เพื่อให้ตอน add, delete รายการเพิ่มหน้าแสดงผลอัพเดทเรียลไทม์

            this.setState({
                statusAnimated: false
            })

            if (missionName != null) {
                this.setMessage("บันทึกกิจกรรมแล้ว")
                this.setState({
                    missionName: null,
                })
            }


            if (study === 'ต่ำ') { }// ปานกลาง สูง ทั้งหมด
            this.setState({
                //activity_list_show ของหน้าปกติโชว์ทั้งหมด
                activity_list_show: (study === 'ทั้งหมด') ?
                    [...activity_list.light_intensity, ...activity_list.moderate_intensity, ...activity_list.vigorous_intensity]
                    :
                    (study === 'ต่ำ') ?
                        [...activity_list.light_intensity]
                        :
                        (study === 'ปานกลาง') ?
                            [...activity_list.moderate_intensity]
                            :
                            //  (study === 'สูง')
                            [...activity_list.vigorous_intensity],

                //activity_list_show ของหน้าแก้ไขโชว์เฉพาะอันที่ผู้ใช้เพิ่มเอง
                activity_list_addon_show: (study === 'ทั้งหมด') ?
                    [
                        ...(activity_list.light_intensity.filter(item => item.type === 'addon')),
                        ...(activity_list.moderate_intensity.filter(item => item.type === 'addon')),
                        ...(activity_list.vigorous_intensity.filter(item => item.type === 'addon')),
                    ]
                    :
                    (study === 'ต่ำ') ?
                        [...(activity_list.light_intensity.filter(item => item.type === 'addon')),]
                        :
                        (study === 'ปานกลาง') ?
                            [...(activity_list.moderate_intensity.filter(item => item.type === 'addon'))]
                            :
                            //  (study === 'สูง')
                            [...(activity_list.vigorous_intensity.filter(item => item.type === 'addon'))],
            })
        }

        /*         if (prevState ==) {
        
                } */

    }

    toggleModal(isModalVisible) {


        this.setState({
            isModalVisible: !isModalVisible
        })
    };
    modalConter(isModalConter) {


        this.setState({
            isModalConter: !isModalConter
        })
        const resetAction = CommonActions.reset({
            index: 0, // ตำแหน่งของหน้าที่จะใช้เป็นหน้าแรก
            routes: [{
                name: 'HomeTab',
                /** 
                * ! ตรงนี้ให้ใช้  HomeTab  ห้ามใช้ Home ปัญหา กดหน้า   Exercise เเล้ว มันขึ้นหน้า Add
                * */
            }], // เส้นทางที่ต้องการเปลี่ยน
        });
        this.props.navigation.dispatch(resetAction)



    };
    deleteActivity(mess) {
        const { user } = this.props;
        const { activity_id_edit_focus } = this.state;
        this.props.deleteActivityListAddOn(user.user_id, activity_id_edit_focus)
        this.setState({
            statusCreate: "editView",
            statusViolence: null,
            missionName: null,
            editmission: false,
            confirmDelete: false,
            statusAnimated: true
        })


    }
    violence(e) {
        this.setState({
            statusViolence: e
        })
    }

    addMissionName(e, activity_name, intensity, mess) { //ใช้เพิ่มรายการ activity
        const { user } = this.props;
        this.setState({
            statusCreate: e,
            data: true,

            statusAnimated: true
        })


        this.props.addActivityListAddOn(user.user_id, activity_name, intensity);
    }



    editMissionName(ev, value, activity_id) {
        //นำ activity_id ทีจะ edit มา
        this.setState({
            editmission: true,
            statusViolence: ev,
            missionName: value,
            activity_id_edit_focus: activity_id
        })
    }

    seveEitMissionName(mess) {
        const { user } = this.props;
        const { activity_id_edit_focus, missionName, statusViolence } = this.state;

        this.props.editActivityListAddOn(user.user_id, activity_id_edit_focus, missionName, statusViolence)
        this.setState({
            editmission: false,
            statusAnimated: true
        })

        /* this.setMessage(mess) */
    }

    nextAddActivity(activity, intensity, type) {
        this.setState({
            isModalConter: false,
            isModalVisible: false
        })
        if (this.props.route.params) {
            const { activity_id } = this.props.route.params;
            this.props.navigation.navigate("AddActivity", { activity: activity, intensity: intensity, type: type, activity_id: activity_id ? activity_id : intensity })
        } else {
            this.props.navigation.navigate("AddActivity", { activity: activity, intensity: intensity, type: type, activity_id: intensity })
        }


    }

    setMessage(e) {

        this.setState({
            confirmActivityDeleted: true,
            message: e
        });

        setTimeout(() => {
            this.setState({
                confirmActivityDeleted: false,
                message: null
            })
        }, 2000);
    }

    animate = () => {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start(() => this.animate());
    }

    checkEditView() {
        const { activityId3 } = this.state;
        const { activity_list } = this.props;


        if (activityId3 == "light_intensity") {
            this.setState({
                activity_list_addon_show: [...activity_list.light_intensity]
            })
        }
        if (activityId3 == "moderate_intensity") {
            this.setState({
                activity_list_addon_show: [...activity_list.moderate_intensity]
            })
        }
        if (activityId3 == "vigorous_intensity") {
            this.setState({
                activity_list_addon_show: [...activity_list.vigorous_intensity]
            })
        }

        this.setState({ statusCreate: "editView" })
    }




    listDataViews() {
        const { stsusColor, isModalVisible, isModalConter, study, data, activity_list_show, intensityFromExArticle, confirmActivityDeleted, message, statusAnimated } = this.state;
        const { activity_list } = this.props;

        const languages = i18next.languages[0];

        console.log("languages", languages);
        /* 
                console.log("activity_list_show", activity_list_show); */

        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 1],
        });
        const scale = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 1],
        });


        return (
            <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                <View style={styles.modalViewConter}>
                    <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between", marginHorizontal: 16 }]}>

                        {
                            intensityFromExArticle === null ?
                                <TouchableWithoutFeedback onPress={() => {


                                    this.modalConter(isModalConter);
                                }}>

                                    <View style={{ marginTop: -20, marginLeft: -20, width: 70, height: 60 }} >
                                        <Image
                                            style={[styles.cross, {
                                                marginLeft: 20, marginTop: 20,

                                            }]}
                                            source={require('../../assets/images/activity/cross.png')}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>


                                : <View></View>
                        }

                        {intensityFromExArticle === null ? <Text style={[styles.headActivity, {}]}>{t('activities_by_intensity')}</Text>
                            :
                            intensityFromExArticle == "light_intensity" ? <Text style={styles.headActivity}>{t('activity_based_on_low')}</Text>
                                :
                                intensityFromExArticle == "moderate_intensity" ? <Text style={styles.headActivity}>{t('activity_based_on_moderate')}</Text>
                                    : <Text style={styles.headActivity}>{t('activity_based_on_high')}</Text>
                        }

                        {
                            intensityFromExArticle === null ?
                                <TouchableWithoutFeedback onPress={() => this.checkEditView()}>
                                    <View style={{ width: 60, marginTop: -16, alignItems: "center" }}>
                                        <Text style={[styles.headEdit, { marginTop: 16 }]}>{t('edit')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <TouchableWithoutFeedback onPress={() => {
                                    /*   this.props.navigation.goBack(); */
                                    this.modalConter(isModalConter);

                                }}>
                                    <Image
                                        style={styles.cross}
                                        source={require('../../assets/images/activity/cross.png')}
                                    />
                                </TouchableWithoutFeedback>
                        }

                    </View>
                    {
                        intensityFromExArticle === null ?
                            <View style={[styles.missionView, { marginTop: 16, justifyContent: "space-between", marginHorizontal: 16 }]}>
                                <Pressable onPress={() => this.setState({
                                    study: "ทั้งหมด",
                                    activity_list_show: [...activity_list.light_intensity, ...activity_list.moderate_intensity, ...activity_list.vigorous_intensity]
                                })}>
                                    <View style={[study == "ทั้งหมด" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>


                                        <Text style={study == "ทั้งหมด" ? styles.sectionActive : styles.section}> {t('all')}</Text>


                                    </View>
                                </Pressable>
                                <Pressable onPress={() => this.setState({
                                    study: "ต่ำ",
                                    activity_list_show: [...activity_list.light_intensity]
                                })}>
                                    <View style={[study == "ต่ำ" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>

                                        <Text style={study == "ต่ำ" ? styles.sectionActive : styles.section}> {t('low')}</Text>

                                    </View>
                                </Pressable>
                                <Pressable onPress={() => this.setState({
                                    study: "ปานกลาง",
                                    activity_list_show: [...activity_list.moderate_intensity]
                                })}>
                                    <View style={[study == "ปานกลาง" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>
                                        <Text style={study == "ปานกลาง" ? styles.sectionActive : styles.section}> {t('moderate')}</Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => this.setState({
                                    study: "สูง",
                                    activity_list_show: [...activity_list.vigorous_intensity]
                                })}>
                                    <View style={[study == "สูง" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>

                                        <Text style={study == "สูง" ? styles.sectionActive : styles.section}> {t('high')}</Text>
                                    </View>
                                </Pressable>
                            </View>
                            : null
                    }

                    <View style={{ marginTop: 24 }}>

                        {data == true ?

                            <ScrollView showsVerticalScrollIndicator={false}>

                                {
                                    statusAnimated === true &&
                                    <Animated.View style={{ paddingHorizontal: 16, opacity, transform: [{ scale }] }}>
                                        <View style={styles.activityindicator}></View>
                                    </Animated.View>
                                }





                                {
                                    activity_list_show &&
                                    activity_list_show.map((item, i) => {
                                        return (
                                            <TouchableWithoutFeedback key={i} onPress={() => this.nextAddActivity(languages == "th" ? item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity, item.intensity, item.type)}>
                                                <View style={{ marginRight: 16 }}>
                                                    <View style={styles.missionView}>

                                                        <Image
                                                            style={styles.activityImage}
                                                            source={item.intensity === 'light_intensity' ? require('../../assets/images/activity/Activitylow.png') : item.intensity === 'moderate_intensity' ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')}
                                                        />

                                                        <View style={[styles.groupText2, { width: "69%" }]}>
                                                            <Text style={styles.headText2}>{languages == "th" ? languages == "th" ? item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity}</Text>
                                                            {/*   <Text
                                                                style={[styles.groupStatus, { color: item.intensity === 'light_intensity' ? colors.secondary_MayaBlue : item.intensity === 'moderate_intensity' ? colors.tertiaryYellow : colors.tertiaryMagenta }]}
                                                            >
                                                                {(item.intensity === 'light_intensity') && 'เข้มข้นต่ำ'}
                                                                {(item.intensity === 'moderate_intensity') && 'เข้มข้นปานกลาง'}
                                                                {(item.intensity === 'vigorous_intensity') && 'เข้มข้นสูง'}
                                                            </Text> */}
                                                        </View>
                                                    </View>
                                                    <View style={styles.viewIconRight2}>
                                                        <Text style={[styles.groupStatus, { color: item.intensity === 'light_intensity' ? colors.secondary_MayaBlue : item.intensity === 'moderate_intensity' ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>
                                                            {(item.intensity === 'light_intensity') && `${t('low_concentration')}`}
                                                            {(item.intensity === 'moderate_intensity') && `${t('moderate_concentration')}`}
                                                            {(item.intensity === 'vigorous_intensity') && `${t('hight_concentration')}`}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                                <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "createView" })}>
                                    <View style={{ marginBottom: 200 }}>
                                        <View style={styles.missionView}>
                                            <Image style={styles.activityImage} source={require('../../assets/images/activity/frame13811.png')} />
                                            <View style={styles.groupText2}>
                                                <Text style={styles.headText3}>{t('add_new_event')}</Text>
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
                                <Text style={styles.imptyTextHead}>{t('no_activity')}</Text>
                                <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "createView" })}>
                                    <View style={[styles.buttonWhite, { marginTop: 16 }]}>
                                        <Text style={styles.textButtonWhite}>{t('add_new_event')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        }

                    </View>
                </View>
                {
                    (confirmActivityDeleted === true && message) &&
                    <View style={styles.activityDeleted}>
                        <View style={styles.boxActivityDeleted}>
                            <Image
                                style={{ height: 32, width: 32, zIndex: 1 }}
                                source={require('../../assets/images/activity/Checked.png')}
                            />
                            <Text style={styles.textActivityDeleted}>{message}</Text>
                        </View>
                    </View>


                }
            </View >
        )
    }

    createView() {
        const { isModalVisible, statusViolence, missionName, statusAnimated } = this.state;
        const { statusAddActListAddOn } = this.props;
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 1],
        });
        const scale = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 1],
        });

        return (
            <>
                {
                    statusAnimated === true &&
                    <Animated.View style={{ paddingHorizontal: 16, opacity, transform: [{ scale }] }}>
                        <View style={styles.activityindicator}></View>
                    </Animated.View>
                }
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                        <View style={[styles.modalViewConter, { paddingHorizontal: 16 }]}>
                            <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between" }]}>
                                <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "listDataViews" })}>
                                    <Text style={styles.headEdit}>{t('cancel')}</Text>
                                </TouchableWithoutFeedback>
                                <Text style={styles.headActivity}>{t('add_activity')}</Text>
                                {
                                    statusViolence && missionName && (statusAddActListAddOn !== "loading") ?
                                        <TouchableWithoutFeedback onPress={() => this.addMissionName("listDataViews", missionName, statusViolence, "เพิ่มกิจกรรมแล้ว")}>
                                            <Text style={styles.headEdit}>{t('add')}</Text>
                                        </TouchableWithoutFeedback>
                                        :
                                        <Text style={styles.headEditgrey}>{t('add')}</Text>
                                }


                            </View>
                            <Text style={[styles.headActivity, { marginTop: 19 }]}>{t('concentration')}</Text>
                            {/*   <TouchableWithoutFeedback></TouchableWithoutFeedback> */}
                            <View style={[styles.missionView, { marginTop: 8 }]}>
                                <TouchableWithoutFeedback onPress={() => this.violence("light_intensity")}>
                                    <View style={[styles.boxCreate, statusViolence == "light_intensity" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                        <Image
                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                            source={require('../../assets/images/activity/Activitylow.png')}
                                        />
                                        <Text style={styles.textImageBoxCreate}>{t('low')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.violence("moderate_intensity")}>
                                    <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "moderate_intensity" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                        <Image
                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                            source={require('../../assets/images/activity/Activitycenter.png')}
                                        />
                                        <Text style={styles.textImageBoxCreate}>{t('moderate')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.violence("vigorous_intensity")}>
                                    <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "vigorous_intensity" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                        <Image
                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                            source={require('../../assets/images/activity/Activityhign.png')}
                                        />
                                        <Text style={styles.textImageBoxCreate}>{t('high')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Text style={styles.textAdd}>
                                {
                                    statusViolence == "light_intensity" && `${t('less_strenuous_activity')}`

                                }
                                {
                                    statusViolence == "moderate_intensity" && `${t('quite_heavy_physical_exertion')}`
                                }
                                {
                                    statusViolence == "vigorous_intensity" && `${t('very_strenuous_activity')}`
                                }
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({ missionName: text })}
                                value={missionName}
                                placeholder={t('event_name')}
                            />
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </>
        )
    }

    editView() {
        const { stsusColor, isModalVisible, isModalConter, study, data, message, confirmActivityDeleted, confirmDelete, editmission, statusAnimated, statusViolence, missionName, activity_list_addon_show, activity_id_edit_focus } = this.state;
        const { activity_list } = this.props;
        const languages = i18next.languages[0];
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 1],
        });
        const scale = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 1],
        });

        return (
            <>

                {
                    editmission === false ?
                        <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                            <View style={[styles.modalViewConter, { paddingHorizontal: 16 }]}>
                                <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between", alignItems: "center" }]}>
                                    <View></View>
                                    <Text style={[styles.headActivity, { marginLeft: 32, marginTop: -16 }]}>{t('modify_activities')}</Text>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "listDataViews" })}>
                                        <View style={{ width: 60, marginTop: -16, height: 60, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={styles.headEdit}>{t('finish')}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.missionView, { marginTop: 16, justifyContent: "space-between" }]}>
                                    <Pressable onPress={() => this.setState({
                                        study: "ทั้งหมด",
                                        activity_list_addon_show: [
                                            ...(activity_list.light_intensity.filter(item => item.type === 'addon')),
                                            ...(activity_list.moderate_intensity.filter(item => item.type === 'addon')),
                                            ...(activity_list.vigorous_intensity.filter(item => item.type === 'addon')),
                                        ]
                                    })}>
                                        <View style={[study == "ทั้งหมด" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>
                                            <Text style={study == "ทั้งหมด" ? styles.sectionActive : styles.section}> {t('all')}</Text>
                                        </View>
                                    </Pressable>
                                    <Pressable onPress={() => this.setState({
                                        study: "ต่ำ",
                                        activity_list_addon_show: [...(activity_list.light_intensity.filter(item => item.type === 'addon'))]
                                    })}>
                                        <View style={[study == "ต่ำ" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>
                                            <Text style={study == "ต่ำ" ? styles.sectionActive : styles.section}> {t('low')}</Text>
                                        </View>
                                    </Pressable>
                                    <Pressable onPress={() => this.setState({
                                        study: "ปานกลาง",
                                        activity_list_addon_show: [...(activity_list.moderate_intensity.filter(item => item.type === 'addon'))]
                                    })}>
                                        <View style={[study == "ปานกลาง" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>

                                            <Text style={study == "ปานกลาง" ? styles.sectionActive : styles.section}> {t('moderate')}</Text>

                                        </View>
                                    </Pressable>
                                    <Pressable onPress={() => this.setState({
                                        study: "สูง",
                                        activity_list_addon_show: [...(activity_list.vigorous_intensity.filter(item => item.type === 'addon'))]
                                    })}>
                                        <View style={[study == "สูง" ? styles.boxHeadingActive : styles.boxHeading, { width: 100 }]}>
                                            <Text style={study == "สูง" ? styles.sectionActive : styles.section}> {t('high')}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <View style={{ marginTop: 24 }}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {
                                            statusAnimated === true &&
                                            <Animated.View style={{ paddingHorizontal: 16, opacity, transform: [{ scale }] }}>
                                                <View style={styles.activityindicator}></View>
                                            </Animated.View>
                                        }
                                        {
                                            activity_list_addon_show &&
                                            activity_list_addon_show.map((item, i) => {
                                                return (
                                                    <TouchableWithoutFeedback key={i} onPress={() => this.editMissionName(item.intensity, languages == "th" ? languages == "th" ? item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity, item.id)}>
                                                        <View style={{ marginRight: 16 }}>
                                                            <View style={styles.missionView}>
                                                                <Image
                                                                    style={styles.activityImage}
                                                                    source={item.intensity === 'light_intensity' ? require('../../assets/images/activity/Activitylow.png') : item.intensity === 'moderate_intensity' ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')}
                                                                />
                                                                <View style={[styles.groupText2, { width: "69%" }]}>
                                                                    <Text style={styles.headText2}>{languages == "th" ? languages == "th" ? item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity : item.hasOwnProperty("activity_eng") ? item.activity_eng : item.activity}</Text>
                                                                    {/*   <Text
                                                                        style={[styles.groupStatus, { color: item.intensity === 'light_intensity' ? colors.secondary_MayaBlue : item.intensity === 'moderate_intensity' ? colors.tertiaryYellow : colors.tertiaryMagenta }]}
                                                                    >
                                                                        {(item.intensity === 'light_intensity') && 'เข้มข้นต่ำ'}
                                                                        {(item.intensity === 'moderate_intensity') && 'เข้มข้นปานกลาง'}
                                                                        {(item.intensity === 'vigorous_intensity') && 'เข้มข้นสูง'}
                                                                    </Text> */}
                                                                </View>
                                                            </View>
                                                            <View style={styles.viewIconRight2}>
                                                                <Text style={[styles.groupStatus, { color: item.intensity === 'light_intensity' ? colors.secondary_MayaBlue : item.intensity === 'moderate_intensity' ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>
                                                                    {(item.intensity === 'light_intensity') && `${t('low_concentration')}`}
                                                                    {(item.intensity === 'moderate_intensity') && `${t('moderate_concentration')}`}
                                                                    {(item.intensity === 'vigorous_intensity') && `${t('hight_concentration')}`}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            })
                                        }
                                        {/* <TouchableWithoutFeedback onPress={() => this.editMissionName("ต่ำ", "เดินเร็ว")}>
                                        <View>
                                            <View style={styles.missionView}>
                                                <Image style={styles.activityImage} source={stsusColor == "เข้มข้นต่ำ" ? require('../../assets/images/activity/Activitylow.png') : stsusColor == "เข้มข้นปานกลาง" ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')} />
                                                <View style={styles.groupText2}>
                                                    <Text style={styles.headText2}>เดินเร็วกก</Text>
                                                    <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                                </View>
                                            </View>
                                            <View style={styles.viewIconRight2}>
                                                <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback> */}
                                        <TouchableWithoutFeedback onPress={() => this.setState({ statusCreate: "createView" })}>
                                            <View style={{ marginBottom: 100, paddingBottom: 100 }}>
                                                <View style={styles.missionView}>
                                                    <Image style={styles.activityImage} source={require('../../assets/images/activity/frame13811.png')} />
                                                    <View style={styles.groupText2}>
                                                        <Text style={styles.headText3}>{t('add_new_event')}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </ScrollView>
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
                                <View style={[styles.modalViewConter, { paddingHorizontal: 16 }]}>
                                    <View style={[styles.missionView, { marginTop: 20, justifyContent: "space-between" }]}>
                                        <TouchableWithoutFeedback onPress={() => this.setState({ editmission: false })}>
                                            <Image
                                                style={{ width: 24, height: 24 }}
                                                source={require('../../assets/images/activity/chenronLe.png')}
                                            />
                                        </TouchableWithoutFeedback>
                                        <Text style={styles.headActivity}>{t('edit_activity')}</Text>
                                        {
                                            statusViolence && missionName ?
                                                <TouchableWithoutFeedback onPress={() => this.seveEitMissionName("บันทึกกิจกรรมแล้ว")}>
                                                    <Text style={styles.headEdit}>{t('record')}</Text>
                                                </TouchableWithoutFeedback>
                                                :
                                                <Text style={styles.headEditgrey}>{t('record')}</Text>
                                        }


                                    </View>
                                    <Text style={[styles.headActivity, { marginTop: 19 }]}>{t('concentration')}</Text>
                                    {/*   <TouchableWithoutFeedback></TouchableWithoutFeedback> */}
                                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                                        <View>
                                            <View style={[styles.missionView, { marginTop: 8 }]}>
                                                <TouchableWithoutFeedback onPress={() => this.violence("light_intensity")}>
                                                    <View style={[styles.boxCreate, statusViolence == "light_intensity" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                                        <Image
                                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                                            source={require('../../assets/images/activity/Activitylow.png')}
                                                        />
                                                        <Text style={styles.textImageBoxCreate}>{t('low')}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => this.violence("moderate_intensity")}>
                                                    <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "moderate_intensity" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                                        <Image
                                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                                            source={require('../../assets/images/activity/Activitycenter.png')}
                                                        />
                                                        <Text style={styles.textImageBoxCreate}>{t('moderate')}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => this.violence("vigorous_intensity")}>
                                                    <View style={[styles.boxCreate, { marginLeft: 16 }, statusViolence == "vigorous_intensity" ? { borderWidth: 2, borderColor: colors.persianBlue } : null]}>
                                                        <Image
                                                            style={{ height: 32, width: 32, zIndex: 1 }}
                                                            source={require('../../assets/images/activity/Activityhign.png')}
                                                        />
                                                        <Text style={styles.textImageBoxCreate}>{t('high')}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={(text) => this.setState({ missionName: text })}
                                                value={missionName}
                                                placeholder="ชื่อกิจกรรม"
                                            />
                                        </View>

                                        {confirmDelete === false ?
                                            <View style={{ alignItems: "center" }}>
                                                <Pressable onPress={() => this.setState({ confirmDelete: true, })} >
                                                    <Text style={styles.deleteActivity}>{t('delete_this_event')}</Text>
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
                                        <Text style={styles.headModal}>{t('want_delete')}</Text>
                                        <View style={[styles.missionView, { marginTop: 32, marginBottom: 40, }]}>
                                            <TouchableWithoutFeedback onPress={() => this.setState({ confirmDelete: false })}>
                                                <View style={styles.buttonWhite}>
                                                    <Text style={styles.textButtonWhite}>{t('backward')}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => this.deleteActivity("ลบกิจกรรมแล้ว")}>
                                                <View style={styles.buttonRed}>
                                                    <Text style={styles.textButtonRed}>{t('delete_activity')}</Text>
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
            /*  <>
     
                 {
                     editmission === false ?
                         <View style={{ flex: 1, justifyContent: "flex-end" }} onPress={() => this.toggleModal(isModalVisible)} >
                             <View style={styles.modalViewConter}>
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
                                 <View style={[styles.modalViewConter, { paddingHorizontal: 16 }]}>
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
     
             </> */
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

                    {/* 
                    {statusCreate === "listDataViews" ?
                        this.listDataViews()
                        :
                        statusCreate === "createView" ?
                            this.createView()
                            : this.editView()

                    } */}
                </View>


            </>
        )
    }
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    fill: {
        flex: 1,
        /*   backgroundColor: colors.grey1, */

    },
    boxConter: {
        backgroundColor: colors.white,
        paddingHorizontal: 16
    },
    missionView: {
        flexDirection: "row"
    },
    activityImage: {
        width: 32.545,

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
        justifyContent: "center"

    },
    groupStatus: {
        /*  marginTop: 32, */
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
        marginTop: 8,
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
        width: 24,
        height: 24,
        /*    marginLeft: 2 */
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
        /*         width: "25%", */
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
    },
    textAdd: {
        marginLeft: 8,
        marginTop: 16,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
    },
    activityindicator: {

        height: 12,
        backgroundColor: "#D4E0F0",
        width: "100%",
        marginBottom: 8,
        borderRadius: 16,
    },


})

const mapStateToProps = ({ authUser, getData, updateData }) => {
    const { user } = authUser;
    const { activity_list, statusGetActivityList, intensityFromExArticleTemplate } = getData;
    const { statusAddActListAddOn, statusDeleteActListAddOn, statusEditActListAddOn } = updateData;
    return { user, activity_list, statusGetActivityList, intensityFromExArticleTemplate, statusAddActListAddOn, statusDeleteActListAddOn, statusEditActListAddOn };
};

const mapActionsToProps = { getActivityList, setIntensityFromExArticleTemplate, addActivityListAddOn, deleteActivityListAddOn, editActivityListAddOn };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Add));