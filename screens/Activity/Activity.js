import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { getExerciserActivity } from "../../redux/get";
import { List } from 'react-native-paper';
import { Video, AVPlaybackStatus } from 'expo-av';
import { update_popUp_stars } from "../../redux/update";
import { checkStar, checkTrophy, calculateWeekInProgram, convertFormatDate } from "../../helpers/utils";
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





const Exercise = ({ navigation }) => {

    const dispatch = useDispatch();

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
            ////*  */
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
                    <>
                        <View style={styles.boxChart}>
                            <View style={styles.missionView}>
                                <Pressable style={[{ width: "auto", paddingHorizontal: 8 }, statusChart === 1 ? styles.missionPre : styles.programPre]} onPress={() => setStatusChart(1)} >
                                    <Text style={[styles.mission, statusChart === 1 ? { color: colors.white } : { color: colors.persianBlue }]}>สัปดาห์</Text>
                                </Pressable>
                                <Pressable style={[{ marginLeft: 8, width: "auto", paddingHorizontal: 8 }, statusChart === 2 ? styles.missionPre : styles.programPre]} onPress={() => setStatusChart(2)}>
                                    <Text style={[styles.mission, statusChart === 2 ? { color: colors.white } : { color: colors.persianBlue }]}>เดือน</Text>
                                </Pressable>
                                <Pressable style={[{ marginLeft: 8, width: "auto", paddingHorizontal: 16 }, statusChart === 3 ? styles.missionPre : styles.programPre]} onPress={() => setStatusChart(3)}>
                                    <Text style={[styles.mission, statusChart === 3 ? { color: colors.white } : { color: colors.persianBlue }]}>ปี</Text>
                                </Pressable>
                            </View>

                        </View>
                        <Text style={styles.nutritionWeek}>กิจกรรมสัปดาห์นี้</Text>
                        {
                            data ?
                                data.map((item, i) => {

                                    return (
                                        <Pressable key={i + "tfb"}>
                                            <View key={i} style={styles.row}>
                                                <Image style={styles.activityImage} source={require('../../assets/images/activity/Activitylow.png')} />
                                                <View style={styles.missionData}>
                                                    <Text style={styles.missionHead}>ปกติ</Text>
                                                    <View style={styles.missionView}>
                                                        <Text style={styles.dateData}>
                                                            31 ธ.ค. 2566
                                                        </Text>
                                                        <Text style={styles.li}>{"\u2B24" + " "}</Text>
                                                        <Text style={styles.dateData}>
                                                            เข้มข้นต่ำ
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.timeData}>29 นาที</Text>
                                                    <View style={styles.missionView}>
                                                        <Image
                                                            style={{ height: 12, width: 12, marginTop: 5, marginRight: 4 }}
                                                            source={require('../../assets/images/activity/Note.png')}
                                                        />
                                                        <Text style={styles.editNote}>เดินกินลม</Text>
                                                    </View>

                                                </View>
                                                <View style={styles.viewIconRight}>
                                                    <Pressable onPress={() => refresh()}>
                                                        <Image
                                                            style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                            source={require('../../assets/images/icon/right.png')}
                                                        />
                                                    </Pressable>
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
        fontSize: 5,
        color: colors.grey4,
    },
    editNote: {
        fontSize: 14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    }



});



export default Exercise;
