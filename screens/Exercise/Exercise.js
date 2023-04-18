import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { getExerciserActivity, getAllTrainingSet, getTrainingSet } from "../../redux/get";
import { List } from 'react-native-paper';
import { Video, AVPlaybackStatus } from 'expo-av';
import { update_popUp_stars } from "../../redux/update";
import { checkStar, checkTrophy, calculateWeekInProgram, convertFormatDate } from "../../helpers/utils";
import { useRoute } from '@react-navigation/native';


const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;




const data = Array.from({ length: 30 });
const startData = Array.from({ length: 3 });
const data2 = Array.from({ length: 30 });




const Exercise = ({ navigation }) => {
    const route = useRoute();
    const dispatch = useDispatch();
    const user = useSelector(({ authUser }) => authUser ? authUser.user : "");
    const { exerciserActivity, nutrition_activity, statusExerciserActivity, statusAllTrainingSet, allTrainingSet, statusTrainingSet, trainingSet } = useSelector(({ getData }) => getData ? getData : "");
    const { statusPopupSary } = useSelector(({ updateData }) => updateData ? updateData : "");
    const { coreBalanceRoute } = useSelector(({ personalDataUser }) => personalDataUser ? personalDataUser : "");

    const [statusNotified, setStatusNotified] = useState(null);
    const [statusMission, setStatusMission] = useState(true);
    const [status_male_female, setStatus_male_female] = useState("ชาย");
    const [modalVisibleEx, setModalVisibleEx] = useState(false);
    const [isModalVisibleEx, setIsModalVisibleEx] = useState(false);
    const [isModalVisibleVedio, setIsModalVisibleVedio] = useState(false);
    const [isModalVisibleExVideo, setIsModalVisibleExVideo] = useState(false);
    const [play, setPlay] = useState(false);
    const [start, setStart] = useState(1);
    const [trophy, setTrophy] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const video = React.useRef(null);
    const [days, setDays] = useState(null);
    const [status, setStatus] = React.useState({});
    const [week_program_user, setWeek_program_user] = useState(null);
    const [weekStaryLevel, setWeekStaryLevel] = useState(null);
    const [weekStaryMission, setWeekStaryMission] = useState(null);
    const [group, setGroup] = useState(null);
    const [groupName, setGroupName] = useState(null);
    const [urlPlay, setUrlPlay] = useState(null);
    const [status_resistance, setStatus_resistance] = useState("ยิม");
    const deviceHeight = Math.round(Dimensions.get('window').height);
    const animatedScrollYValue = useRef(new Animated.Value(0)).current;


    const Max_Header_Height = (deviceHeight <= 667) ? deviceHeight - 256 : (deviceHeight >= 668) && (deviceHeight <= 736) ? deviceHeight - 156 :
        (deviceHeight >= 737) && (deviceHeight <= 800) ? deviceHeight - 246 : (deviceHeight >= 801) && (deviceHeight <= 844) ? deviceHeight - 286 : (deviceHeight >= 845) && (deviceHeight <= 926) ? deviceHeight - 326 : deviceHeight - 276;
    const Min_Header_Height = 170;
    const Scroll_Distance = Max_Header_Height - Min_Header_Height



    const headerHeight = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.20],
        extrapolate: 'clamp',
    });
    const headerHeight1 = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1],
        extrapolate: 'clamp',
    });


    const animatedHeaderHeight = animatedScrollYValue.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [Max_Header_Height, Min_Header_Height],
        extrapolate: 'clamp',
        zIndex: 20
    })


    const animateHeaderBackgroundColor = animatedScrollYValue.interpolate({
        inputRange: [0, Max_Header_Height - Min_Header_Height],
        outputRange: [1, 1],
        extrapolate: 'clamp',

    })


    const refresh = () => {
        navigation.navigate("ExHistory")
    }
    const clickProgram = () => {
        setIsModalVisibleVedio(!isModalVisibleVedio);
        setTimeout(() => {
            navigation.navigate("ExProgram", { status_male_female: status_male_female, category: group })
        }, 200);


    }

    /*   const toggleModal = (isModalVisible) => {
  
          this.setState({
              isModalVisible: !isModalVisible
          })
      }; */

    const closeeModal = (e, m) => {
        console.log("e", e);
        setStatus_resistance("ยิม")
        setStatus_male_female("ชาย")
        setExpanded(false)
        setGroup(e)
        setGroupName(m)

        if (e === "resistance") {
            dispatch(getTrainingSet("resistance_fullbody_gym"));
        } else {
            dispatch(getTrainingSet(e));
        }


        if (statusTrainingSet === "success") {
            setIsModalVisibleVedio(!isModalVisibleVedio)
        }
        /*  setIsModalVisibleVedio(!isModalVisibleVedio) */


    };
    const closeeModalPlayExample = (e) => {


        setUrlPlay(null)

        setIsModalVisibleExVideo(!isModalVisibleExVideo)

    };
    const clickPlayExample = (e) => {


        setUrlPlay(e)




    };
    useEffect(() => {

        if (urlPlay !== null) {
            setIsModalVisibleExVideo(!isModalVisibleExVideo)
        }

    }, [urlPlay]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {


            dispatch(getExerciserActivity((user && user.user_id)));
            const week_program_user = calculateWeekInProgram(user.start_date);
            dispatch(getAllTrainingSet((user && user.user_id), week_program_user));

        });

        return unsubscribe;

    }, [navigation]);





    /*   useEffect(() => {  // ตอนกดมาจากหน้าภารกิจ
          const unsubscribe = navigation.addListener('focus', () => {
  
              const { name } = route.params;
              console.log("coreBalanceRoute", name);
          });
  
          return unsubscribe;
  
      }, [route.params]); */

    useEffect(() => {
        if (statusExerciserActivity === "success") {
            //setExerciser_activity(exerciserActivity);
            const week_program_user = calculateWeekInProgram(user.start_date);
            if (week_program_user) {
                setWeek_program_user(week_program_user)
            }
            const days = convertFormatDate();
            if (days == "Sunday") {
                setDays("Sunday")
            } else {
                setDays(null)
            }


            if (week_program_user != 1) {
                exerciserActivity && exerciserActivity.map((item, i) => {
                    let weekStary = week_program_user - 1;

                    if ((weekStary == item.week_in_program && (item.popup_stary == null))) {

                        setWeekStaryLevel(JSON.parse(item.activities_level))
                        setWeekStaryMission(JSON.parse(item.mission_activities))
                        if (exerciserActivity) {
                            setModalVisibleEx(true)
                        }

                        dispatch(update_popUp_stars(user.user_id, weekStary, "1"));

                    }
                })
            }
        }
    }, [statusExerciserActivity])


    const statusResistance = (e) => {
        setStatus_resistance(e)

        if (e === "ยิม") {
            dispatch(getTrainingSet("resistance_fullbody_gym"));
        }
        if (e === "ดัมเบล") {
            dispatch(getTrainingSet("resistance_home_gym"));
        }
        if (e === "ตัวเปล่า") {
            dispatch(getTrainingSet("resistance_body_weight"));
        }
    }

    const videoPlay = () => {


        return (

            <View style={{ position: "relative", width: 375, alignItems: "flex-end" }}>
                <Pressable onPress={() => closeeModalPlayExample()} style={{ zIndex: 3, position: "absolute" }}>
                    <Image
                        source={require('../../assets/images/icon/close_white.png')}
                        style={{
                            width: 24, height: 24, marginTop: 16, marginRight: 16

                        }}
                    />
                </Pressable>
                {/*    <Video
                     ref={video}
                     style={styles.video}
                     source={{
                         uri: e,
                     }}
                     useNativeControls
                     resizeMode="contain"
                     isLooping
                     onPlaybackStatusUpdate={status => setStatus(() => status)}
                 >
                 </Video> */}
                <Image
                    style={styles.video}
                    source={{ uri: urlPlay }}
                    resizeMode="contain"
                    animated={true}
                />
            </View>

        )

    }

    const program = () => {
        const dataTrainingSet = trainingSet && Object.entries(trainingSet);
        /*  console.log("dataTrainingSet", dataTrainingSet); */



        return (
            <>
                <View style={[styles.centeredVedio, { marginTop: play == true ? 0 : 150 }]}>
                    <View style={styles.modalView}>
                        <View style={styles.boxModel}>
                            <View style={{
                                height: 212,
                                zIndex: 1,
                            }}>
                                <Image
                                    style={{
                                        height: "100%", width: "100%",
                                        borderTopLeftRadius: 16,
                                        borderTopRightRadius: 16,
                                    }}
                                    source={
                                        group === "core_balance" ? require('../../assets/images/cover_page/core_balance.jpg') :
                                            group === "core_balance_plyo" ? require('../../assets/images/cover_page/core_balance_plyo.jpg') :
                                                group === "flexibility" ? require('../../assets/images/cover_page/flexibility.jpg') :
                                                    require('../../assets/images/cover_page/resistance.jpg')}
                                />
                                <View style={{ position: "absolute", width: "100%", alignItems: "flex-end" }}>
                                    <Pressable onPress={() => closeeModal()}>
                                        <Image
                                            style={{
                                                height: 24, width: 24,
                                                zIndex: 2,
                                                marginTop: 16,
                                                marginRight: 16,

                                            }}
                                            source={require('../../assets/images/exercise/Close.png')}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={{ marginTop: 16, marginHorizontal: 16, height: "auto" }}>
                                    <Text style={styles.textModeHead}>{groupName}</Text>
                                    <Text style={styles.textModeConter}>เสริมสร้างความแข็งแรงของกล้ามท้อง และ ลำตัว ป้องกันการบาดเจ็บกระดูกสันหลัง เคลื่อนไหวได้ปลอดภัย ลดอาการปวดหลัง</Text>
                                    <View style={{ flexDirection: "row", marginTop: 16 }}>
                                        {/*      <View style={{ flexDirection: "row" }}>
                                            <Image
                                                style={{
                                                    height: 16, width: 16,
                                                }}
                                                source={require('../../assets/images/icon/Clock3x.png')}
                                            />
                                            <Text style={styles.textMinute}>45 นาที</Text>
                                        </View> */}
                                        <View style={{ flexDirection: "row",/*  marginLeft: 37 */ }}>
                                            <Image
                                                style={{
                                                    height: 16, width: 16,
                                                }}
                                                source={require('../../assets/images/icon/Equipment3x.png')}
                                            />
                                            <Text style={styles.textMinute}>ไม่ใช้</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 22 }}>
                                        <Text style={styles.missionHead}>ผู้ฝึกสอน</Text>
                                        <View>
                                            <View style={styles.missionView}>
                                                <Pressable style={[{ width: 63 }, status_male_female === "ชาย" ? styles.missionPre : styles.programPre]} onPress={() => setStatus_male_female("ชาย")} >
                                                    <Text style={[styles.mission, status_male_female === "ชาย" ? { color: colors.white } : { color: colors.persianBlue }]}>ชาย</Text>
                                                </Pressable>
                                                {
                                                    group === "resistance" &&
                                                    <Pressable Pressable style={[{ marginLeft: 8, width: 71 }, status_male_female === "หญิง" ? styles.missionPre : styles.programPre]} onPress={() => setStatus_male_female("หญิง")} >
                                                        <Text style={[styles.mission, status_male_female === "หญิง" ? { color: colors.white } : { color: colors.persianBlue }]}>หญิง</Text>
                                                    </Pressable>

                                                }

                                            </View>
                                        </View>
                                    </View>
                                    {
                                        group === "resistance" &&
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 22 }}>
                                            <Text style={styles.missionHead}>อุปกรณ์</Text>
                                            <View>
                                                <View style={styles.missionView}>
                                                    <Pressable style={[{ width: 63 }, status_resistance === "ยิม" ? styles.missionPre : styles.programPre]} onPress={() => statusResistance("ยิม")} >
                                                        <Text style={[styles.mission, status_resistance === "ยิม" ? { color: colors.white } : { color: colors.persianBlue }]}>ยิม</Text>
                                                    </Pressable>

                                                    <Pressable Pressable style={[{ marginLeft: 8, width: 71 }, status_resistance === "ดัมเบล" ? styles.missionPre : styles.programPre]} onPress={() => statusResistance("ดัมเบล")} >
                                                        <Text style={[styles.mission, status_resistance === "ดัมเบล" ? { color: colors.white } : { color: colors.persianBlue }]}>ดัมเบล</Text>
                                                    </Pressable>
                                                    <Pressable Pressable style={[{ marginLeft: 8, width: 71 }, status_resistance === "ตัวเปล่า" ? styles.missionPre : styles.programPre]} onPress={() => statusResistance("ตัวเปล่า")} >
                                                        <Text style={[styles.mission, status_resistance === "ตัวเปล่า" ? { color: colors.white } : { color: colors.persianBlue }]}>ตัวเปล่า</Text>
                                                    </Pressable>


                                                </View>
                                            </View>
                                        </View>
                                    }

                                    <List.Section style={{ marginLeft: -16, marginTop: 16, zIndex: 0, marginBottom: 60 }}>
                                        <List.Accordion style={{ backgroundColor: colors.white }}
                                            title={<Text style={styles.missionHead}>ท่าฝึก</Text>}
                                            right={props =>
                                                <List.Icon {...props} icon={({ size, color, direction }) => (
                                                    expanded ?
                                                        <Image
                                                            source={require('../../assets/images/icon/ChevronUp.png')}
                                                            style={{ width: 16, height: 16 }}
                                                        />
                                                        :

                                                        <Image
                                                            source={require('../../assets/images/icon/ChevronDown.png')}
                                                            style={{ width: 16, height: 16 }} />
                                                )}

                                                />}
                                            expanded={expanded}
                                            onPress={() => setExpanded(!expanded)}>
                                            {
                                                dataTrainingSet && dataTrainingSet.map((item, i) => {
                                                    /*             console.log("item", item); */
                                                    return (
                                                        <View style={styles.exerciseBox} key={i + "box"}>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <Text style={styles.missionHead}>{item[1][0].name}</Text>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <Pressable onPress={() => clickPlayExample()}>
                                                                        <Image
                                                                            source={require('../../assets/images/icon/Howto3x.png')}
                                                                            style={{ width: 24, height: 24 }}
                                                                        />
                                                                    </Pressable>
                                                                    <Pressable onPress={() => clickPlayExample(status_male_female === "ชาย" ? item[1][0].img_url_m : item[1][0].img_url_f)}>
                                                                        <Image
                                                                            source={require('../../assets/images/icon/Play3x.png')}
                                                                            style={{ width: 24, height: 24, marginLeft: 16 }}
                                                                        />
                                                                    </Pressable>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: "row" }}>
                                                                <View>
                                                                    <Text style={styles.setText}>เซต</Text>
                                                                    <Text style={styles.setText2}>{item[1][0].set}</Text>
                                                                </View>
                                                                <View style={{ marginLeft: 16 }}>
                                                                    <Text style={styles.setText}>ครั้ง</Text>
                                                                    <Text style={styles.setText2}>{item[1][0].rep}</Text>
                                                                </View>
                                                                <View style={{ marginLeft: 16 }}>
                                                                    <Text style={styles.setText}>จังหวะ</Text>
                                                                    <Text style={styles.setText2}>{item[1][0].tempo}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )

                                                })
                                            }
                                        </List.Accordion>
                                    </List.Section >
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View >
                <Text style={styles.textSub}>โปรแกรมจะบันทึกคะแนนเมื่อเล่นวีดีโอจนจบ</Text>
                <View style={styles.boxSub}>
                    <Pressable onPress={() => clickProgram()}>
                        <View style={ComponentsStyle.button} >
                            <Text style={ComponentsStyle.textButton}>
                                เริ่มออกกำลังกาย
                            </Text>
                        </View>
                    </Pressable>
                </View>

            </>
        )
    }


    /*     console.log("statusAllTrainingSet ", statusAllTrainingSet, allTrainingSet); */


    return (
        <View style={styles.fill}>

            <Animated.ScrollView
                style={styles.fill2}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }], { useNativeDriver: false })}
            >
                <View style={styles.scrollViewContent}>
                    {statusMission === true ?
                        <>
                            {
                                exerciserActivity ?

                                    exerciserActivity.map((item, i) => {
                                        if (item.status_mission_activities !== "completed") {
                                            return (
                                                <Pressable onPress={() => navigation.navigate("ExArticleTemplate", { id: item.week_in_program, mission_id: item.mission_id, heading: item.heading, mission_activities: item.mission_activities, statusPags: "Exercise" })} key={i + "tfb"}>
                                                    <View key={i} style={styles.row}>
                                                        <View style={styles.numberView}>
                                                            <Text style={styles.number}>{item.week_in_program}</Text>
                                                        </View>
                                                        <View style={styles.missionData}>
                                                            <Text style={styles.missionHead} >{item.heading}</Text>
                                                            <Text style={[styles.missionContent, { marginRight: 16 }]} key="i+ v3t">
                                                                {item.short_content}
                                                            </Text>
                                                            {
                                                                (days == "Sunday") && (week_program_user == item.week_in_program) ?
                                                                    <View style={styles.notifiedRed}>
                                                                        <Text style={styles.notifiedTextRed}>
                                                                            วันสุดท้าย
                                                                        </Text>
                                                                    </View> :
                                                                    ((item.quiz_activities_number == null) && (week_program_user != item.week_in_program)) ?
                                                                        <View style={styles.notifiedYellow} >
                                                                            <Text style={styles.notifiedTextYellow}>
                                                                                ภารกิจที่ยังทำไม่เสร็จ
                                                                            </Text>
                                                                        </View> : null
                                                            }
                                                        </View>
                                                        <View style={styles.viewIconRight}>
                                                            <Image
                                                                style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                                source={require('../../assets/images/icon/right.png')}
                                                            />
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            )
                                        }


                                    })
                                    :
                                    <View style={styles.imptyImage}>
                                        <Image
                                            style={{ height: 84, width: 120, zIndex: 1 }}
                                            source={require('../../assets/images/exercise/Empty_State.png')}
                                        />
                                        <Text style={styles.imptyTextHead}>ยังไม่มีภารกิจในตอนนี้</Text>
                                    </View>
                            }

                        </>
                        :
                        <>
                            {
                                allTrainingSet && allTrainingSet ?

                                    allTrainingSet && allTrainingSet.map((item, i) => {
                                        return (
                                            <Pressable key={i + "vp"} onPress={() => closeeModal(item.id, item.name)} >
                                                <View key={i + "vd"} style={styles.rowProgram}>
                                                    <View style={styles.imageProgramView} key={i + "vd2"}>
                                                        <Image
                                                            style={{ height: "100%", width: "100%", zIndex: 1 }}
                                                            source={
                                                                item.id === "core_balance" ? require('../../assets/images/cover_page/core_balance.jpg') :
                                                                    item.id === "core_balance_plyo" ? require('../../assets/images/cover_page/core_balance_plyo.jpg') :
                                                                        item.id === "flexibility" ? require('../../assets/images/cover_page/flexibility.jpg') :
                                                                            require('../../assets/images/cover_page/resistance.jpg')}
                                                        />
                                                    </View>
                                                    <View style={styles.programData}>
                                                        <Text style={styles.missionHead}>{item.name}</Text>
                                                        {/*  <Text style={styles.missionContent} >
                                                            45 นาที
                                                        </Text> */}
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )
                                    })
                                    :
                                    <View style={styles.imptyImage}>
                                        <Image
                                            style={{ height: 84, width: 120, zIndex: 1 }}
                                            source={require('../../assets/images/exercise/Empty_State.png')}
                                        />
                                        <Text style={styles.imptyTextHeadProgram}>โปรแกรมออกกำลังกายจะปลดล็อคตั้งแต่ภารกิจที่ 4 เป็นต้นไป</Text>
                                    </View>
                            }
                        </>

                    }
                </View>
            </Animated.ScrollView >
            <Text style={styles.nutritionText}>ออกกำลังกาย</Text>
            <View style={styles.nutritionBox}>
                <Animated.View
                    style={[
                        styles.header2,
                        {
                            height: animatedHeaderHeight,
                        }

                    ]}
                >
                    <View style={styles.nutritionBox}>
                        <View style={styles.missionText}>
                            <View style={styles.missionView}>
                                <Pressable style={[{ width: 71 }, statusMission === true ? styles.missionPre : styles.programPre]} onPress={() => setStatusMission(true)} >
                                    <Text style={[styles.mission, statusMission === true ? { color: colors.white } : { color: colors.persianBlue }]}>ภารกิจ</Text>
                                </Pressable>
                                <Pressable style={[{ marginLeft: 8, width: 89 }, statusMission !== true ? styles.missionPre : styles.programPre]} onPress={() => setStatusMission(false)} >
                                    <Text style={[styles.mission, statusMission !== true ? { color: colors.white } : { color: colors.persianBlue }]}>โปรแกรม</Text>
                                </Pressable>
                            </View>
                            {
                                statusMission == true ?
                                    <>
                                        {
                                            exerciserActivity && exerciserActivity.length > 0 ?
                                                <Pressable Pressable onPress={() => refresh()} style={styles.historyRight}>
                                                    <Image style={styles.iconImageRight} source={require('../../assets/images/icon/History1.png')} />
                                                </Pressable>
                                                :
                                                <Pressable style={styles.historyRight}>
                                                    <Image style={styles.iconImageRight} source={require('../../assets/images/icon/History.png')} />
                                                </Pressable>
                                        }
                                    </>
                                    :
                                    null
                            }

                        </View>
                    </View>
                </Animated.View >
            </View >
            <Animated.View opacity={headerHeight} style={[styles.header]}>
                <View style={styles.imageView}>
                    <ImageBackground
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                        source={require('../../assets/images/exercise/bg_landing.png')}
                    />
                </View>
            </Animated.View>

            {/*
             //! Modal  ในส่วนของ trophy เเละ start
             */}



            <View style={styles.centeredView}>

                <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisibleEx}
                    onRequestClose={() => {

                        setModalVisibleEx(!modalVisibleEx);
                    }}

                    style={{ margin: 0 }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisibleEx(false)}>
                        <View style={styles.centeredView}>
                            <View style={styles.centeredView2}>
                                <Text style={styles.textHeadWeek}>ผลลัพธ์ภารกิจสัปดาห์ที่ {week_program_user - 1} </Text>
                                <Image
                                    style={{ width: 160, height: 160, }}
                                    source={
                                        checkTrophy(weekStaryMission, weekStaryLevel) == 1 && checkStar(weekStaryMission, weekStaryLevel) == 3 ?
                                            require('../../assets/images/icon/Trophy.png')
                                            :
                                            require('../../assets/images/icon/Trophy2.png')
                                    }
                                />
                                <View style={styles.starView}>
                                    {
                                        startData && startData.map((item, i) => {
                                            /*         console.log("weekStaryMission", weekStaryMission);
                                                    console.log("weekStaryLevel", weekStaryLevel); */
                                            return (
                                                <Image style={[i > 0 ? { marginLeft: 16 } : null, { width: 40, height: 40, }]} key={i + "sr"} source={
                                                    /* const [weekStaryLevel, setWeekStaryLevel] = useState(null);
                                                    const [weekStaryMission, setWeekStaryMission] = useState(null); */

                                                    checkStar(weekStaryMission, weekStaryLevel) >= ++i ?
                                                        require('../../assets/images/icon/Star_3.png')
                                                        :
                                                        require('../../assets/images/icon/Star.png')


                                                } />
                                            )

                                        })
                                    }
                                </View>


                                {
                                    checkStar(weekStaryMission, weekStaryLevel) == 0 ?
                                        <>
                                            <Text style={styles.textStar}>ไม่เป็นไร!</Text>
                                            <Text style={styles.textStar2}>ลองพยายามอีกครั้งในสัปดาห์นี้</Text>
                                        </>
                                        :
                                        checkStar(weekStaryMission, weekStaryLevel) == 1 ?
                                            <>
                                                <Text style={styles.textStar}>ค่อนข้างดีแล้ว!</Text>
                                                <Text style={styles.textStar2}>สัปดาห์นี้พยายามขึ้นอีกนิด เพื่อรับดาวเพิ่มเติม</Text>
                                            </>
                                            :
                                            checkStar(weekStaryMission, weekStaryLevel) == 2 ?
                                                <>
                                                    <Text style={styles.textStar}>ทำได้ดีแล้ว!</Text>
                                                    <Text style={styles.textStar2}>สัปดาห์นี้พยายามขึ้นอีกนิด เพื่อรับดาวเพิ่มเติม</Text>
                                                </>
                                                :
                                                checkStar(weekStaryMission, weekStaryLevel) == 3 ?
                                                    <>
                                                        <Text style={styles.textStar}>ดีมาก!</Text>
                                                        <Text style={styles.textStar2}>ลองพิชิตภารกิจให้สำเร็จในสัปดาห์นี้ เพื่อรับถ้วยรางวัลเพิ่มเติม</Text>
                                                    </>
                                                    :
                                                    checkStar(weekStaryMission, weekStaryLevel) == 3 ?
                                                        <>
                                                            <Text style={styles.textStar}>ดีมาก!</Text>
                                                            <Text style={styles.textStar2}>คุณพิชิตภารกิจสำเร็จ พยายามรักษาวินัยเอาไว้ในสัปดาห์นี้</Text>
                                                        </>
                                                        :
                                                        <>
                                                            <Text style={styles.textStar}>ไม่เป็นไร!</Text>
                                                            <Text style={styles.textStar2}>ลองพยายามอีกครั้งในสัปดาห์นี้</Text>
                                                        </>
                                }
                            </View>
                            <View style={styles.modalView2}>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>


            {/*
            //! Modal  ในส่วนของโปรเเกรมออกกำลังกาย 
            */}


            <View style={styles.centeredView}>


                <Modal isVisible={isModalVisibleVedio}

                    style={{ marginHorizontal: 0, zIndex: 1, marginBottom: -40, marginTop: -40 }}
                >


                    {program()}

                    {isModalVisibleExVideo === true ?

                        <>
                            <View style={styles.boxPlay2}>
                                {videoPlay()}
                            </View>
                            <View style={[styles.boxPlay]}>

                            </View>
                        </>


                        : null}


                </Modal>
            </View >
        </View >
    )
}


Exercise.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
const deviceHeight = Math.round(Dimensions.get('window').height);
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.grey7,
    },
    fill2: {
        marginTop: 170,
        zIndex: 1,
    },

    nutritionText: {
        marginHorizontal: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey1,
        marginHorizontal: 16,
        marginTop: 60,
        opacity: 1,
        zIndex: 10,
        position: 'absolute'
    },

    nutritionBox: {
        opacity: 1,
        zIndex: 10,
        position: 'absolute',
        width: "100%"
    },
    row: {
        position: "relative",

        height: "auto",

        marginBottom: 16,
        backgroundColor: colors.white,
        borderRadius: 16,
        flexDirection: "row",
        marginLeft: 16,
        marginRight: (deviceHeight > 1023) ? 32 : 16
    },
    rowProgram: {
        position: "relative",
        height: "auto",
        marginBottom: 16,
        borderRadius: 16,
        flexDirection: "row",
        marginLeft: 16,
        marginRight: (deviceHeight > 1023) ? 32 : 16
    },

    missionText: {
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        marginBottom: 16,
        position: "relative",
        width: "100%",
    },

    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    missionData: {
        flexWrap: "nowrap",
        width: "75%",
        margin: 16

    },
    programData: {
        /* marginHorizontal: 16, */
        flexWrap: "nowrap",
        width: "75%",
        marginHorizontal: 16,

    },
    missionHead: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    missionContent: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    header: {
        position: 'absolute',
        width: "100%",

    },
    header2: {
        position: 'absolute',
        width: "100%",
        justifyContent: "flex-end",
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.persianBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.persianBlue20,
        marginTop: 16,
        marginLeft: 16,
        marginBottom: 16,
    },
    imageView: {
        width: "100%",
        height: (deviceHeight > 1023) ? deviceHeight : 500
    },
    scrollViewContent: {
        marginTop: (deviceHeight < 688) ? "33%" : (deviceHeight > 1023) ? "40%" : "51%",
        opacity: 1,
        paddingBottom: 100

    },
    notifiedRed: {
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        width: 71,
        height: 25,
        borderRadius: 16,
        backgroundColor: colors.negative2,
        paddingHorizontal: 8,
        paddingVertical: 3,

    },
    notifiedTextRed: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.negative1,
    },
    notifiedYellow: {
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        height: 25,
        borderRadius: 16,
        backgroundColor: colors.warning2,
        paddingHorizontal: 8,
        paddingVertical: 3,

    },
    notifiedTextYellow: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.warning1,
    },
    iconRight: {
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey3,
        marginRight: 3,
    },
    viewIconRight: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",

    },
    imptyImage: {
        justifyContent: "center",
        alignItems: "center"
    },
    imptyTextHead: {
        marginTop: 8,
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    imptyTextStartDate: {
        marginTop: 8,
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    iconImageRight: {
        height: 24,
        width: 24,
        zIndex: 1,
        marginRight: (deviceHeight > 1023) ? 16 : 0
    },
    missionView: {
        flexDirection: "row"
    },
    missionPre: {
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.persianBlue,
        borderRadius: 100,
    },
    programPre: {
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.persianBlue20,
        borderRadius: 100,
    },
    imageProgramView: {
        width: 140,
        height: 79,
        borderRadius: 8,
        backgroundColor: colors.grey4
    },
    imptyTextHeadProgram: {
        marginTop: 8,
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        width: "80%",
        textAlign: "center",
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    centeredView2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 12
    },
    centeredView1: {
        backgroundColor: colors.grey1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
        flex: 1
    },
    centeredView2: {
        width: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        zIndex: 10
    },
    textHeadWeek: {
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.white,
        marginBottom: 24,
        width: "80%",
        textAlign: "center"
    },
    starView: {
        marginTop: 24,
        marginHorizontal: 16,
        flexDirection: "row"
    },
    starView: {
        marginTop: 24,
        marginHorizontal: 16,
        flexDirection: "row"
    },
    textStar: {
        marginTop: 24,
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.white,
        width: "90%",
        textAlign: "center"
    },
    textStar2: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.white,
        textAlign: "center",
        marginHorizontal: 16,
    },
    centeredVedio: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: -20

    },
    modalView: {
        position: "relative",
        zIndex: 3,
        backgroundColor: "white",
        width: "100%",
        height: "auto",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
        marginBottom: -20
    },
    modalView2: {
        position: "relative",
        zIndex: 3,
        backgroundColor: colors.grey1,
        opacity: 0.8,
        width: "100%",
        paddingHorizontal: 16,
        height: "100%",
        paddingTop: 32,
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",

    },
    boxModel: {
        width: "100%",
        maxHeight: deviceHeight - 80,
        zIndex: 1,
    },
    textModeHead: {
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    textModeConter: {
        marginTop: 16,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
    },
    textMinute: {
        marginLeft: 8,
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    exerciseBox: {
        marginLeft: 16,
        marginBottom: 16,
        height: 105,
        backgroundColor: colors.grey7,
        borderRadius: 16,
        padding: 16
    },
    setText: {
        marginTop: 5,
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    setText2: {
        fontSize: 14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
    },
    textSub: {
        marginBottom: 16,
        textAlign: "center",
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: "#646463",
        zIndex: 3,
    },
    boxSub: {
        marginTop: -10,
        height: 40,
        backgroundColor: colors.white,
        marginBottom: -20, height: 80,
        paddingHorizontal: 16,
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 8
        },
        marginBottom: 40,

        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
        zIndex: 3

    },
    video: {
        alignSelf: 'center',
        width: 375,
        height: 212,
        zIndex: 1,

    },
    boxPlay: {
        zIndex: 3,
        backgroundColor: "#1E1E1E",
        height: "100%",
        width: deviceWidth,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    boxPlay2: {
        zIndex: 6,
        height: "100%",
        marginTop: "90%",
        alignItems: "center",
        zIndex: 4,
        opacity: 1,
        width: deviceWidth,

    }






});

/* const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { statusGetNutritionActivity, nutrition_activity } = getData;
    return { statusGetNutritionActivity, nutrition_activity, user };
};

const mapActionsToProps = { getNutritionActivity }; */

export default Exercise;
