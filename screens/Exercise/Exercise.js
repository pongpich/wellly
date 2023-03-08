import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, Modal, ImageBackground, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { getNutritionActivity } from "../../redux/get";
const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const data = Array.from({ length: 30 });
const startData = Array.from({ length: 3 });

const Exercise = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(({ authUser }) => authUser ? authUser.user : "");
    const nutrition_activity = useSelector(({ getData }) => getData ? getData.nutrition_activity : "");
    const statusGetNutritionActivity = useSelector(({ getData }) => getData ? getData.statusGetNutritionActivity : "");

    const [statusNotified, setStatusNotified] = useState(null);
    const [statusMission, setStatusMission] = useState(true);
    const [modalVisibleEx, setModalVisibleEx] = useState(false);
    const [isModalVisibleEx, setIsModalVisibleEx] = useState(false);
    const [start, setStart] = useState(1);
    const [trophy, setTrophy] = useState(1);

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

    /*     toggleModal = () => {
    
        } */

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            dispatch(getNutritionActivity((user && user.user_id)));
            setModalVisibleEx(true)
            setTimeout(() => {
                setModalVisibleEx(false)
            }, 3000);

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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleEx}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setState({ modalVisibleEx: !modalVisibleEx });
                    }}
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

                            {/*    startData; */}
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
                        <View style={styles.centeredView1}>

                        </View>

                    </View>
                </Modal>
            </View>


            {/*
            //! Modal  ในส่วนของโปรเเกรมออกกำลังกาย 
            */}


            {/*  <View style={styles.centeredView}>
                <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisibleEx)} />

                <Modal isVisible={isModalVisibleEx}

                    style={{ margin: 0 }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                        </View>
                    </View>
                </Modal>
            </View> */}
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
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        zIndex: 1
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
    historyRight: {

    }


});

/* const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { statusGetNutritionActivity, nutrition_activity } = getData;
    return { statusGetNutritionActivity, nutrition_activity, user };
};

const mapActionsToProps = { getNutritionActivity }; */

export default Exercise;
