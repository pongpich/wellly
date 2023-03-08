import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { getNutritionActivity } from "../../redux/get";
import { List } from 'react-native-paper';


const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const data = Array.from({ length: 30 });
const startData = Array.from({ length: 3 });
const data2 = Array.from({ length: 3 });

const Exercise = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(({ authUser }) => authUser ? authUser.user : "");
    const nutrition_activity = useSelector(({ getData }) => getData ? getData.nutrition_activity : "");
    const statusGetNutritionActivity = useSelector(({ getData }) => getData ? getData.statusGetNutritionActivity : "");

    const [statusNotified, setStatusNotified] = useState(null);
    const [statusMission, setStatusMission] = useState(true);
    const [status_male_female, setStatus_male_female] = useState(true);
    const [modalVisibleEx, setModalVisibleEx] = useState(false);
    const [isModalVisibleEx, setIsModalVisibleEx] = useState(false);
    const [isModalVisibleVedio, setIsModalVisibleVedio] = useState(false);
    const [start, setStart] = useState(1);
    const [trophy, setTrophy] = useState(1);
    const [expanded, setExpanded] = useState(false);

    const animatedScrollYValue = useRef(new Animated.Value(0)).current;

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
    const Max_Header_Height = 550;
    const Min_Header_Height = 170;
    const Scroll_Distance = Max_Header_Height - Min_Header_Height

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
        if (data.length) {
            navigation.navigate("ExHistory")
        }


    }

    /*   const toggleModal = (isModalVisible) => {
  
          this.setState({
              isModalVisible: !isModalVisible
          })
      }; */

    const closeeModal = () => {
        setIsModalVisibleVedio(!isModalVisibleVedio)

    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            dispatch(getNutritionActivity((user && user.user_id)));
            // setModalVisibleEx(true)
            /*  setTimeout(() => {
                 setModalVisibleEx(false)
             }, 3000); */

        });



        return unsubscribe;

    }, [navigation]);


    return (
        <View style={styles.fill}>

            <Animated.ScrollView
                style={styles.fill2}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }], { useNativeDriver: false })}
            >
                <View style={styles.scrollViewContent}>
                    {/* <View style={styles.missionText}>
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
                                  
                                    <Pressable onPress={() => refresh()}>
                                        <Image style={styles.iconImageRight} source={require('../../assets/images/icon/History1.png')} />
                                    </Pressable>
                                </>
                                :
                                null
                        }

                    </View> */}
                    {statusMission === true ?
                        <>
                            {
                                data ?

                                    data.map((item, i) => {
                                        if (true) {
                                            return (
                                                <Pressable onPress={() => navigation.navigate("ExArticleTemplate", { id: i, statusPags: "Exercise" })} key={i + "tfb"}>
                                                    <View key={i} style={styles.row}>
                                                        <View style={styles.numberView} key="i+ v1">
                                                            <Text style={styles.number} key="i+ v1t">{++i}</Text>
                                                        </View>
                                                        <View style={styles.missionData} key="i+ v2">
                                                            <Text style={styles.missionHead} key="i+ v2t">Body Pump</Text>
                                                            <Text style={styles.missionContent} key="i+ v3t">
                                                                โปรแกรมออกกำลังกายลดความเสี่ยงโรคเบาหวาน
                                                            </Text>
                                                            {
                                                                statusNotified == 1 ?
                                                                    <View style={styles.notifiedRed} key="i+ v3">
                                                                        <Text style={styles.notifiedTextRed} key="i+ v4t">
                                                                            วันสุดท้าย
                                                                        </Text>
                                                                    </View> :
                                                                    statusNotified != 2 ?
                                                                        <View style={styles.notifiedYellow} key="i+ v4">
                                                                            <Text style={styles.notifiedTextYellow} key="i+ v5t">
                                                                                ภารกิจที่ยังทำไม่เสร็จ
                                                                            </Text>
                                                                        </View> : null
                                                            }
                                                        </View>
                                                        <View style={styles.viewIconRight} key="i+ v5">
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
                                data ?

                                    data.map((item, i) => {
                                        return (
                                            <Pressable key={i + "vp"} onPress={() => closeeModal()} >
                                                <View key={i + "vd"} style={styles.rowProgram}>
                                                    <View style={styles.imageProgramView} key={i + "vd2"}>
                                                        <Image
                                                            style={{ height: "100%", width: "100%", zIndex: 1 }} key="i+ v1ig"
                                                            source={require('../../assets/images/exercise/Group13765.png')}
                                                        />
                                                    </View>
                                                    <View style={styles.programData} key="i+ vd2">
                                                        <Text style={styles.missionHead} key="i+ v6t">Core + Balance Training</Text>
                                                        <Text style={styles.missionContent} key="i+ v7t">
                                                            45 นาที
                                                        </Text>
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

                                        <Pressable onPress={() => refresh()} style={styles.historyRight}>
                                            <Image style={styles.iconImageRight} source={require('../../assets/images/icon/History1.png')} />
                                        </Pressable>
                                    </>
                                    :
                                    null
                            }

                        </View>
                    </View>
                </Animated.View >
            </View>

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
                <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisibleVedio)} />

                <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisibleEx}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setState({ modalVisibleEx: !modalVisibleEx });
                    }}

                    style={{ margin: 0 }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.centeredView2}>
                            <Text style={styles.textHeadWeek}>ผลลัพธ์ภารกิจสัปดาห์ที่ 1</Text>
                            <Image
                                style={{ width: 160, height: 160, }}
                                source={
                                    (trophy == 1) && (start == 3) ?
                                        require('../../assets/images/icon/Trophy.png')
                                        :
                                        require('../../assets/images/icon/Trophy2.png')
                                }
                            />
                            <View style={styles.starView}>
                                {
                                    startData && startData.map((item, i) => {
                                        return (
                                            <Image style={[i > 0 ? { marginLeft: 16 } : null, { width: 40, height: 40, }]} key={i + "sr"} source={

                                                start >= ++i ?
                                                    require('../../assets/images/icon/Star_3.png')
                                                    :
                                                    require('../../assets/images/icon/Star.png')


                                            } />
                                        )

                                    })
                                }
                            </View>


                            {
                                start == 0 ?
                                    <>
                                        <Text style={styles.textStar}>ไม่เป็นไร!</Text>
                                        <Text style={styles.textStar2}>ลองพยายามอีกครั้งในสัปดาห์นี้</Text>
                                    </>
                                    :
                                    start == 1 ?
                                        <>
                                            <Text style={styles.textStar}>ค่อนข้างดีแล้ว!</Text>
                                            <Text style={styles.textStar2}>สัปดาห์นี้พยายามขึ้นอีกนิด เพื่อรับดาวเพิ่มเติม</Text>
                                        </>
                                        :
                                        start == 2 ?
                                            <>
                                                <Text style={styles.textStar}>ทำได้ดีแล้ว!</Text>
                                                <Text style={styles.textStar2}>สัปดาห์นี้พยายามขึ้นอีกนิด เพื่อรับดาวเพิ่มเติม</Text>
                                            </>
                                            :
                                            start == 3 ?
                                                <>
                                                    <Text style={styles.textStar}>ดีมาก!</Text>
                                                    <Text style={styles.textStar2}>ลองพิชิตภารกิจให้สำเร็จในสัปดาห์นี้ เพื่อรับถ้วยรางวัลเพิ่มเติม</Text>
                                                </>
                                                :
                                                start == 3 ?
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
                </Modal>
            </View>


            {/*
            //! Modal  ในส่วนของโปรเเกรมออกกำลังกาย 
            */}


            <View style={styles.centeredVedio}>


                <Modal isVisible={isModalVisibleVedio}

                    style={{ marginHorizontal: 0, marginTop: 150, }}
                >
                    <View style={styles.centeredVedio}>
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
                                        source={require('../../assets/images/exercise/Alternating.png')}
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
                                        <Text style={styles.textModeHead}>Core + Balance Training</Text>
                                        <Text style={styles.textModeConter}>เสริมสร้างความแข็งแรงของกล้ามท้อง และ ลำตัว ป้องกันการบาดเจ็บกระดูกสันหลัง เคลื่อนไหวได้ปลอดภัย ลดอาการปวดหลัง</Text>
                                        <View style={{ flexDirection: "row", marginTop: 16 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image
                                                    style={{
                                                        height: 16, width: 16,
                                                    }}
                                                    source={require('../../assets/images/icon/Clock3x.png')}
                                                />
                                                <Text style={styles.textMinute}>45 นาที</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginLeft: 37 }}>
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
                                                    <Pressable style={[{ width: 63 }, status_male_female === true ? styles.missionPre : styles.programPre]} onPress={() => setStatus_male_female(true)} >
                                                        <Text style={[styles.mission, status_male_female === true ? { color: colors.white } : { color: colors.persianBlue }]}>ชาย</Text>
                                                    </Pressable>
                                                    <Pressable style={[{ marginLeft: 8, width: 71 }, status_male_female !== true ? styles.missionPre : styles.programPre]} onPress={() => setStatus_male_female(false)} >
                                                        <Text style={[styles.mission, status_male_female !== true ? { color: colors.white } : { color: colors.persianBlue }]}>หญิง</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </View>
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
                                                                style={{ width: 16, height: 16 }}
                                                            />
                                                    )}

                                                    />}
                                                expanded={expanded}
                                                onPress={() => setExpanded(!expanded)}>
                                                {
                                                    data2.map((item, i) => {
                                                        return (
                                                            <View style={styles.exerciseBox} key={i + "box"}>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                    <Text style={styles.missionHead}>Single-Leg Windmill</Text>
                                                                    <View style={{ flexDirection: "row" }}>
                                                                        <Image
                                                                            source={require('../../assets/images/icon/Howto3x.png')}
                                                                            style={{ width: 24, height: 24 }}
                                                                        />
                                                                        <Image
                                                                            source={require('../../assets/images/icon/Play3x.png')}
                                                                            style={{ width: 24, height: 24, marginLeft: 16 }}
                                                                        />
                                                                    </View>
                                                                </View>
                                                                <View style={{ flexDirection: "row" }}>
                                                                    <View>
                                                                        <Text style={styles.setText}>เซต</Text>
                                                                        <Text style={styles.setText2}>2</Text>
                                                                    </View>
                                                                    <View style={{ marginLeft: 16 }}>
                                                                        <Text style={styles.setText}>ครั้ง</Text>
                                                                        <Text style={styles.setText2}>12-20</Text>
                                                                    </View>
                                                                    <View style={{ marginLeft: 16 }}>
                                                                        <Text style={styles.setText}>จังหวะ</Text>
                                                                        <Text style={styles.setText2}>ช้า (4-6 วินาที/ครั้ง)</Text>
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
                    </View>
                    <Text style={styles.textSub}>โปรแกรมจะบันทึกคะแนนเมื่อเล่นวีดีโอจนจบ</Text>
                    <View style={styles.boxSub}>
                        <Pressable>
                            <View style={ComponentsStyle.button} >
                                <Text style={ComponentsStyle.textButton}>
                                    เริ่มออกกำลังกาย
                                </Text>
                            </View>
                        </Pressable>
                    </View>
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
        color: colors.mayaBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.mayaBlue20,
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
    centeredView1: {
        backgroundColor: colors.grey1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,
        zIndex: 0,
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",

    },
    boxModel: {
        width: "100%",
        maxHeight: deviceHeight - 80,
        zIndex: 1,
    },
    boxModel2: {
        width: "100%",
        maxHeight: deviceHeight,
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
        marginTop: 8,
        textAlign: "center",
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: "#646463",
        zIndex: 3
    },
    boxSub: {
        height: 40,
        backgroundColor: colors.white,
        marginBottom: -20, height: 80,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,

    }




});

/* const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { statusGetNutritionActivity, nutrition_activity } = getData;
    return { statusGetNutritionActivity, nutrition_activity, user };
};

const mapActionsToProps = { getNutritionActivity }; */

export default Exercise;
