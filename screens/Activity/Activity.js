import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { getExerciserActivity, getMemberActivityLogInWeek } from "../../redux/get";
import { List } from 'react-native-paper';
import { Video, AVPlaybackStatus } from 'expo-av';
import { update_popUp_stars } from "../../redux/update";
import { checkStar, checkTrophy, calculateWeekInProgram, convertFormatDate, currentDate } from "../../helpers/utils";
import { withTranslation } from 'react-i18next'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";






const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;




const data = Array.from({ length: 30 });

/* 
const minValue = 80;

function* yLabel() {
    yield* [minValue, 90, 100];
}

const datapoints = [89, 88, 96, 97, 94, 91, 88].map(
    (datapoint) => datapoint - minValue - 1,
);

const data2 = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
        {
            data: datapoints,
        },
    ],
};
 */

const Activity = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(({ authUser }) => authUser ? authUser.user : "");
    const { statusGetMemberActLogInWeek, member_activity_log_in_week } = useSelector(({ getData }) => getData ? getData : "");

    const [statusMission, setStatusMission] = useState(true);
    const [statusChart, setStatusChart] = useState(1);
    const deviceHeight = Math.round(Dimensions.get('window').height);
    const animatedScrollYValue = useRef(new Animated.Value(0)).current;


    const Max_Header_Height = 170;
    const Min_Header_Height = 170;
    const Scroll_Distance = Max_Header_Height - Min_Header_Height



    const headerHeight = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.20],
        extrapolate: 'clamp',
    });


    const animatedHeaderHeight = animatedScrollYValue.interpolate({
        inputRange: [0, 170],
        outputRange: [Max_Header_Height, Min_Header_Height],
        extrapolate: 'clamp',
        zIndex: 20
    })


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getMemberActivityLogInWeek((user && user.user_id)));
        });

        return unsubscribe;

    }, [navigation]);


    /*   const screenWidth = Dimensions.get('window').width;
      const yLabelIterator = yLabel(); */


    return (
        <View style={styles.fill}>
            <Animated.ScrollView
                style={styles.fill2}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }], { useNativeDriver: false })}
            >
                <View style={styles.scrollViewContent}>
                    <>
                        <View style={{ marginHorizontal: 16, backgroundColor: colors.white, borderRadius: 16, paddingTop: 18 }}>
                            <View style={styles.missionView}>
                                <Pressable style={[{ width: "auto", paddingHorizontal: 8, marginLeft: 16 }, statusChart === 1 ? styles.missionPre : styles.programPre]} onPress={() => setStatusChart(1)} >
                                    <Text style={[styles.mission, statusChart === 1 ? { color: colors.white } : { color: colors.persianBlue }]}>สัปดาห์</Text>
                                </Pressable>
                                <Pressable style={[{ marginLeft: 8, width: "auto", paddingHorizontal: 8 }, statusChart === 2 ? styles.missionPre : styles.programPre]} onPress={() => setStatusChart(2)}>
                                    <Text style={[styles.mission, statusChart === 2 ? { color: colors.white } : { color: colors.persianBlue }]}>เดือน</Text>
                                </Pressable>
                                <Pressable style={[{ marginLeft: 8, width: "auto", paddingHorizontal: 16 }, statusChart === 3 ? styles.missionPre : styles.programPre]} onPress={() => setStatusChart(3)}>
                                    <Text style={[styles.mission, statusChart === 3 ? { color: colors.white } : { color: colors.persianBlue }]}>ปี</Text>
                                </Pressable>
                            </View>

                            <Text style={styles.watch}>(ชม.)</Text>
                            <StackedBarChart
                                data={{
                                    labels: ["สัปดาห์ที่แล้ว", "สัปดาห์นี้"],
                                    legend: [],
                                    data: [
                                        [1, 2.5, 3],
                                        [1, 0.5, 2]
                                    ],
                                    barColors: ["#59CBE4", "#FDAB44", "#F15E79"]
                                }}
                                width={Dimensions.get("window").width - 40} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1

                                chartConfig={{
                                    barPercentage: 2,
                                    backgroundColor: "#fff",
                                    backgroundGradientFrom: "#fff",
                                    backgroundGradientTo: "#fff",
                                    decimalPlaces: 0,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(146, 164, 187, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(146, 164, 187, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                            <View style={{ flexDirection: "row", marginBottom: 40, justifyContent: "center" }}>
                                <View style={{ justifyContent: "center", textAlign: "center", alignItems: "center" }}>
                                    <View style={{ width: 10, height: 10, backgroundColor: "#59CBE4", borderRadius: 100, }}></View>
                                    <Text style={styles.textWatch}>ต่ำ</Text>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 10, textAlign: "center", alignItems: "center" }}>
                                    <View style={{ width: 10, height: 10, backgroundColor: "#FDAB44", borderRadius: 100, }}></View>
                                    <Text style={styles.textWatch}>กลาง</Text>
                                </View>
                                <View style={{ justifyContent: "center", marginLeft: 10, textAlign: "center", alignItems: "center" }}>
                                    <View style={{ width: 10, height: 10, backgroundColor: "#F15E79", borderRadius: 100, }}></View>
                                    <Text style={styles.textWatch}>สูง</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.nutritionWeek}>กิจกรรมสัปดาห์นี้</Text>
                        {
                            member_activity_log_in_week ?
                                member_activity_log_in_week.map((item, i) => {
                                    console.log("item", member_activity_log_in_week);

                                    return (
                                        <Pressable key={i + "tfb"} onPress={() => navigation.navigate("ActAcivity", { activity: item.activity, duration: item.duration, note: item.note, intensity: item.intensity, type: item.type })/* navigation.navigate("ActAcivity") */}>
                                            <View key={i} style={styles.row}>
                                                <Image
                                                    style={styles.activityImage}
                                                    source={item.intensity === 'light_intensity' ? require('../../assets/images/activity/Activitylow.png') : item.intensity === 'moderate_intensity' ? require('../../assets/images/activity/Activitycenter.png') : require('../../assets/images/activity/Activityhign.png')}
                                                />
                                                <View style={styles.missionData}>
                                                    <Text style={styles.missionHead}>{item.activity}</Text>
                                                    <View style={styles.missionView}>
                                                        <Text style={styles.dateData}>
                                                            {/* {currentDate()} */}
                                                            {item.created_at}
                                                        </Text>
                                                        <Text style={styles.li}>{"\u2B24" + " "}</Text>
                                                        <Text style={styles.dateData}>
                                                            {item.intensity === 'light_intensity' && 'เข้มข้นต่ำ'}
                                                            {item.intensity === 'moderate_intensity' && 'เข้มข้นปานกลาง'}
                                                            {item.intensity === 'vigorous_intensity' && 'เข้มข้นสูง'}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.timeData}>{item.duration} {item.id} นาที</Text>
                                                    <View style={styles.missionView}>
                                                        <Image
                                                            style={{ height: 12, width: 12, marginTop: 5, marginRight: 4 }}
                                                            source={require('../../assets/images/activity/Note.png')}
                                                        />
                                                        <Text style={styles.editNote}>{item.note}</Text>
                                                    </View>

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

                                })
                                :
                                <View style={styles.imptyImage}>
                                    <Image
                                        style={{ height: 84, width: 120, zIndex: 1 }}
                                        source={require('../../assets/images/exercise/Empty_State.png')}
                                    />
                                    <Text style={styles.imptyTextHead}>ยังไม่มีกิจกรรมในตอนนี้</Text>
                                </View>
                        }

                    </>
                </View>
            </Animated.ScrollView >
            <Text style={styles.nutritionText}>กิจกรรม</Text>
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
                                <Pressable style={[{ width: "auto", paddingHorizontal: 8 }, statusMission === true ? styles.missionPre : styles.programPre]} onPress={() => setStatusMission(true)} >
                                    <Text style={[styles.mission, statusMission === true ? { color: colors.white } : { color: colors.persianBlue }]}>ออกกำลังการ</Text>
                                </Pressable>
                                <Pressable style={[{ marginLeft: 8, width: 89 }, statusMission !== true ? styles.missionPre : styles.programPre]} onPress={() => setStatusMission(false)} >
                                    <Text style={[styles.mission, statusMission !== true ? { color: colors.white } : { color: colors.persianBlue }]}>สุขภาพ</Text>
                                </Pressable>
                            </View>
                            {

                                <>
                                    {
                                        data && data.length > 0 ?
                                            <Pressable onPress={() => navigation.navigate("ActHistoty")} style={styles.historyRight}>
                                                <Image style={styles.iconImageRight} source={require('../../assets/images/icon/History1.png')} />
                                            </Pressable>
                                            :
                                            <Pressable style={styles.historyRight}>
                                                <Image style={styles.iconImageRight} source={require('../../assets/images/icon/History.png')} />
                                            </Pressable>
                                    }
                                </>

                            }

                        </View>
                    </View>
                </Animated.View >
            </View >

        </View >
    )
}


Activity.propTypes = {
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
        /*  marginTop: (deviceHeight < 688) ? "33%" : (deviceHeight > 1023) ? "40%" : "51%", */
        opacity: 1,
        paddingBottom: 100

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
    boxChart: {
        marginTop: 16,
        width: 355,
        height: 251,
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginHorizontal: 16,
        borderRadius: 16
    },
    nutritionWeek: {
        marginTop: 24,
        marginBottom: 8,
        marginHorizontal: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
        marginHorizontal: 16,
    },
    activityImage: {
        width: 32,
        height: 32,
        marginTop: 16,
        marginLeft: 16
    },
    dateData: {
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey3,
    },
    timeData: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
    },
    li: {
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        fontSize: 3,
        color: colors.grey4,
    },
    editNote: {
        fontSize: 14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    watch: {
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey8,
        marginLeft: 16,
        marginTop: 16
    },
    textWatch: {

        marginTop: 4,
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
    },



});

export default Activity;
