import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { getNutritionActivity } from "../../redux/get";
import { convertFormatDate, calculateWeekInProgram } from "../../helpers/utils";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';



const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const data = Array.from({ length: 30 });




const Nutrition = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(({ authUser }) => authUser ? authUser.user : "");
    const nutrition_activity = useSelector(({ getData }) => getData ? getData.nutrition_activity : "");
    const statusGetNutritionActivity = useSelector(({ getData }) => getData ? getData.statusGetNutritionActivity : "");

    const [statusNotified, setStatusNotified] = useState(null);
    const [startDate, setStartDate] = useState(1);
    const [days, setDays] = useState(null);
    const [week_program_user, setWeek_program_user] = useState(null);
    const [quiz_activities, setQuiz_activities] = useState(null);
    const [quiz_activities_number, setQuiz_activities_number] = useState(null);
    const [assessment_kit_activties, setAssessment_kit_activties] = useState(null);
    const [assessment_kit_number, setAssessment_kit_number] = useState(null);

    const animatedScrollYValue = useRef(new Animated.Value(0)).current;
    const headerHeight = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.20],
        extrapolate: 'clamp',
    });

    const insets = useSafeAreaInsets();

    const headerHeight2 = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT + insets.top, insets.top + 140],
        extrapolate: 'clamp'
    });

    const refresh = () => {

        navigation.navigate("History")



    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            dispatch(getNutritionActivity((user && user.user_id)));

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




            if (statusGetNutritionActivity == 'success') {
                if (nutrition_activity.quiz_activities) {
                    setQuiz_activities(nutrition_activity.quiz_activities)
                }
                if (nutrition_activity.quiz_activities_number >= 0) {
                    setQuiz_activities_number(nutrition_activity.quiz_activities_number)
                }
                if (nutrition_activity.assessment_kit_activties) {
                    setAssessment_kit_activties(nutrition_activity.assessment_kit_activties)
                }
                if (nutrition_activity.assessment_kit_number == 1) {
                    setAssessment_kit_number()
                }
            }

        });



        return unsubscribe;

    }, [navigation]);


    function substringText(text) {
        const startIndex = 0;
        const endIndex = 70;
        const substring = text.substring(startIndex, endIndex);
        return substring + "...";
    };

    return (
        <View style={styles.fill}>
            <Animated.ScrollView
                style={styles.fill2}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }], { useNativeDriver: false })}
            >
                <View style={styles.scrollViewContent}>
                    <View style={styles.missionText}>
                        <Text style={styles.mission}>ภารกิจล่าสุด</Text>
                        {
                            (nutrition_activity && nutrition_activity.length > 0) ?
                                <Pressable onPress={() => refresh()}>
                                    <Image
                                        style={styles.iconImageRight}

                                        source={require('../../assets/images/icon/History1.png')}
                                    //  this.props.navigation.navigate("Walkthrough")
                                    />
                                </Pressable>
                                :
                                <Image
                                    style={styles.iconImageRight}
                                    source={require('../../assets/images/icon/History.png')}
                                //  this.props.navigation.navigate("Walkthrough")
                                />
                        }

                    </View>

                    {nutrition_activity ?

                        nutrition_activity.map((item, i) => {

                            if (((item.quiz_activities == null) || (item.assessment_kit_number != "1")) && (item.week_in_program != "4")) {
                                if ((item.mission_id == "snc1") && (item.assessment_kit_number == null)) {
                                    return (
                                        <Pressable onPress={() => navigation.navigate("ArticleTemplate", { id: item.week_in_program, mission_id: item.mission_id, heading: item.heading })} key={i + "tfb"}>
                                            <View key={i} style={styles.row}>
                                                <View style={styles.numberView}>
                                                    <Text style={styles.number}>{item.week_in_program}</Text>
                                                </View>
                                                <View style={styles.missionData}>
                                                    <Text style={styles.missionHead}>{item.heading}</Text>
                                                    <Text style={[styles.missionContent, { marginRight: 16 }]}>
                                                        {/* เพิ่ม substringText เพื่อย่อเนื้อหาใน card ให้เหลือ 2บรรทัด... */}
                                                        {substringText(item.short_content)}
                                                    </Text>
                                                    {

                                                        (days == "Sunday") && (week_program_user == item.week_in_program) ?
                                                            <View style={styles.notifiedRed}>
                                                                <Text style={styles.notifiedTextRed}>
                                                                    วันสุดท้าย
                                                                </Text>
                                                            </View> :
                                                            ((!quiz_activities) && (!quiz_activities_number) && (week_program_user != item.week_in_program)) || ((!assessment_kit_activties) && (!assessment_kit_number) && (week_program_user != item.week_in_program)) ?
                                                                <View style={styles.notifiedYellow}>
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
                                                    {/*   <AntDesign name="right" style={styles.iconRight} /> */}
                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                }
                                if ((item.mission_id !== "snc1")) {
                                    return (
                                        <Pressable onPress={() => navigation.navigate("ArticleTemplate", { id: item.week_in_program, mission_id: item.mission_id, heading: item.heading })} key={i + "tfb"}>
                                            <View key={i} style={styles.row}>
                                                <View style={styles.numberView}>
                                                    <Text style={styles.number}>{item.week_in_program}</Text>
                                                </View>
                                                <View style={styles.missionData}>
                                                    <Text style={styles.missionHead}>{item.heading}</Text>
                                                    <Text style={[styles.missionContent, { marginRight: 16 }]}>
                                                        {/* เพิ่ม substringText เพื่อย่อเนื้อหาใน card ให้เหลือ 2บรรทัด... */}
                                                        {substringText(item.short_content)}
                                                    </Text>
                                                    {

                                                        (days == "Sunday") && (week_program_user == item.week_in_program) ?
                                                            <View style={styles.notifiedRed}>
                                                                <Text style={styles.notifiedTextRed}>
                                                                    วันสุดท้าย
                                                                </Text>
                                                            </View> :
                                                            ((!quiz_activities) && (!quiz_activities_number) && (week_program_user != item.week_in_program)) || ((!assessment_kit_activties) && (!assessment_kit_number) && (week_program_user != item.week_in_program)) ?
                                                                <View style={styles.notifiedYellow}>
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
                                                    {/*   <AntDesign name="right" style={styles.iconRight} /> */}
                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                }

                            }


                        }) :
                        <View style={styles.imptyImage}>
                            <Image
                                style={{ height: 84, width: 120, zIndex: 1 }}
                                source={require('../../assets/images/logo/EmptyState.png')}
                            />
                            <Text style={styles.imptyTextHead}>ยังไม่มีภารกิจในตอนนี้</Text>
                            {
                                !startDate ? null : <Text style={styles.imptyTextStartDate}>ภารกิจใหม่จะเริ่มในวันที่ 12 สิงหาคม 2564</Text>
                            }

                        </View>
                    }
                </View>
            </Animated.ScrollView >
            <Text style={styles.nutritionText}>โภชนาการ</Text>
            <Animated.View opacity={headerHeight2} >

            </Animated.View>
            <Animated.View opacity={headerHeight} style={[styles.header]}>
                <View style={styles.imageView}>
                    <ImageBackground
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                        source={require('../../assets/images/logo/Sample.png')}
                    />
                </View>
            </Animated.View>
        </View >
    );
};

Nutrition.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.grey6
    },
    fill2: {
        marginTop: 107,
        flex: 1,
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
    },
    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    missionData: {
        /* marginHorizontal: 16, */
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
    }
});

/* const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { statusGetNutritionActivity, nutrition_activity } = getData;
    return { statusGetNutritionActivity, nutrition_activity, user };
};

const mapActionsToProps = { getNutritionActivity }; */

export default Nutrition;