import React, { Component } from 'react';
import { View, StyleSheet, Pressable, ImageBackground, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { logoutUser, loginUser } from "../redux/auth";
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate } from "../redux/get";
import { insertNutritionActivity, insertExerciseActivity, } from "../redux/update";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName } from "../redux/personalUser";
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { CommonActions } from '@react-navigation/native';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latest_nutrition_activity: {},
            latest_exercise_activity: {},
            latest_exercise_mission: [],
            statusChart: 1
        };
    }

    componentDidMount() {
        const { user } = this.props;

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            //  console.log("user.user_id", user.user_id);
            this.props.insertNutritionActivity(user && user.user_id);
            this.props.getNutritionActivity(user && user.user_id);
            this.props.getExerciserActivity(user && user.user_id);
            this.props.getActivityList(user && user.user_id)

            if (!user) { // $student_two["Chemistry"] = 92
                this.props.navigation.navigate("Login");
            }


            this.props.insertNutritionActivity(user.user_id);
            this.props.insertExerciseActivity(user.user_id);
            this.props.getNutritionActivity(user && user.user_id);
            this.props.getExerciserActivity(user && user.user_id);
        });




        // this.props.routeName(null); // ถ้าเข้าให้ home ให้ทำคำสั่งนี้ 1 ครั้ง

    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate(prevProps) {
        const { user, statusGetNutritionMission, statusGetNutritionActivity, nutrition_mission, route_name, nutrition_activity, exerciserActivity, statusExerciserActivity } = this.props;
        if ((prevProps.user !== user) && (!user)) {
            this.props.navigation.navigate("Login");
        }



        if ((prevProps.statusGetNutritionMission !== statusGetNutritionMission) && (statusGetNutritionMission === "success")) {
            //ถ้าตรงตามเงื่อนไขด้านบนแสดงว่าได้ค่า  nutrition_mission แล้ว
        }

        if ((prevProps.statusGetNutritionActivity !== statusGetNutritionActivity) && (statusGetNutritionActivity === "success")) {
            this.setState({ latest_nutrition_activity: nutrition_activity[0] })
        }

        if ((prevProps.statusExerciserActivity !== statusExerciserActivity) && (statusExerciserActivity === "success")) {
            if (exerciserActivity[0]) {
                const mission_activities = JSON.parse(exerciserActivity[0].mission_activities);
                this.setState({
                    latest_exercise_activity: exerciserActivity[0],
                    latest_exercise_mission: mission_activities
                })
            }
        }
    }


    actionPress(id) {

        const resetAction = CommonActions.reset({
            index: 0, // ตำแหน่งของหน้าที่จะใช้เป็นหน้าแรก
            routes: [{
                name: 'Add',
            }], // เส้นทางที่ต้องการเปลี่ยน
        });
        // set ความเข้มไปใน redux
        this.props.setIntensityFromExArticleTemplate(id)
        this.props.navigation.dispatch(resetAction);


    }

    render() {
        const { user, activity_list } = this.props;
        const { latest_nutrition_activity, latest_exercise_activity, latest_exercise_mission, statusChart } = this.state;

        return (
            <View style={[ComponentsStyle.container, { backgroundColor: colors.grey6 }]}>
                <ImageBackground source={require('../assets/images/home/Rectangl.png')} style={{ height: 164, zIndex: 10, width: "100%" }}  >
                    <View style={{ height: 44, width: "100%", }}>
                        <StatusBar barStyle="light-content" />
                    </View>
                    <View style={{ height: 48, flexDirection: "row", justifyContent: "space-between", marginTop: 24, paddingHorizontal: 16 }}>
                        <View>
                            <Text style={styles.contentHead}>สวัสดี {user && user.display_name}</Text>
                            <Text style={styles.content}>ภารกิจของคุณในสัปดาห์นี้</Text>
                        </View>
                        <View>
                            <Image
                                style={{ height: 64, width: 64, zIndex: 1, marginRight: 8 }}
                                source={require('../assets/images/home/Profile.png')}
                            />
                            <Pressable onPress={() => this.props.logoutUser()}  >
                                <Text style={{ marginLeft: 10, marginTop: 5, color: colors.grey2 }}>Logout</Text>
                            </Pressable>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    {/* <StatusBar
                    animated={false}
                    backgroundColor="blue"
                    barStyle="default"
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                /> */}



                    <Pressable
                        onPress={() => this.props.navigation.navigate("ArticleTemplate", { id: latest_nutrition_activity.week_in_program, mission_id: latest_nutrition_activity.mission_id, heading: latest_nutrition_activity.heading, statusPags: "Home" })} key={latest_nutrition_activity.week_in_program + "_na"}
                    >
                        <View style={styles.row}>
                            <View style={[styles.numberView, { backgroundColor: colors.mayaBlue20, }]}>
                                <Text style={[styles.number, { color: colors.mayaBlue }]}>{latest_nutrition_activity.week_in_program}</Text>
                            </View>
                            <View style={styles.missionData}>
                                <Text style={styles.missionHead}>{latest_nutrition_activity.heading}</Text>
                                <Text style={[styles.missionContent, { marginRight: 16 }]}> {latest_nutrition_activity.short_content}</Text>
                            </View>
                            <View style={styles.viewIconRight}>
                                <Image
                                    style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                    source={require('../assets/images/icon/right.png')}
                                />
                            </View>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => this.props.navigation.navigate("ExArticleTemplate", { id: latest_exercise_activity.week_in_program, mission_id: latest_exercise_activity.mission_id, heading: latest_exercise_activity.heading, mission_activities: latest_exercise_activity.mission_activities, statusPags: "Home" })} key={latest_exercise_activity.week_in_program + "_ea"}
                    >
                        <View style={styles.row}>
                            <View style={[styles.numberView, { backgroundColor: colors.persianBlue20 }]}>
                                <Text style={[styles.number, { color: colors.persianBlue }]}>{latest_exercise_activity.week_in_program}</Text>
                            </View>
                            <View style={styles.missionData}>
                                <Text style={styles.missionHead}>{latest_exercise_activity.heading}</Text>
                                <Text style={[styles.missionContent, { marginRight: 16 }]}>{latest_exercise_activity.short_content}</Text>
                            </View>
                            <View style={styles.viewIconRight}>
                                <Image
                                    style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                    source={require('../assets/images/icon/right.png')}
                                />

                            </View>
                        </View>
                    </Pressable>

                    <Text style={styles.challenge}>ชาเลนจ์</Text>
                    <View style={styles.boxRowView}>
                        {
                            latest_exercise_mission &&
                            latest_exercise_mission.map((item, i) => {
                                var dataLength = latest_exercise_mission.length;
                                const multiple = (100 / item.number) * item.number_completed;
                                var maxScore = item.number;
                                var score_completed = item.number_completed;

                                return (
                                    <View key={i + "rv"}>
                                        <Pressable
                                            onPress={() => this.actionPress(item.id)}
                                        >
                                            <View key={i + "h"} style={{ flexDirection: "row", marginBottom: 16 }}>
                                                <View style={styles.numberView} key={i + "hom"}>
                                                    <AnimatedCircularProgress
                                                        size={64}
                                                        width={8}
                                                        fill={multiple}
                                                        tintTransparency={true}
                                                        rotation={360}
                                                        tintColor={colors.positive1}
                                                        backgroundColor={colors.grey6} key={i + "hom2"}>
                                                        {

                                                            (fill) => (
                                                                <>
                                                                    <View style={{ flexDirection: "row", marginTop: 10 }} key={i + "an"}>
                                                                        <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Bold", marginTop: 0 }} key={i + "an2"}>{item.number_completed}</Text>
                                                                        <Text style={{ color: colors.grey1, fontSize: 14, fontFamily: "IBMPlexSansThai-Regular", marginTop: 4 }} key={i + "an3"}> /{item.number}</Text>
                                                                    </View>
                                                                    <Text style={{ color: colors.grey2, fontSize: 16, fontFamily: "IBMPlexSansThai-Regular", marginTop: -10 }} key={i + "an4"}>ครั้ง</Text>
                                                                </>
                                                            )

                                                        }
                                                    </AnimatedCircularProgress>
                                                </View>
                                                <View style={styles.missionData2} key={i + "home3"}>
                                                    <Text style={[styles.missionHead, { marginLeft: 8, marginRight: 8 }]} key={i + "home4"}>{item.name}</Text>
                                                    <View style={{ flexDirection: "row", marginLeft: 8 }} key={i + "home5"}>
                                                        {
                                                            Array.from({ length: maxScore }) && Array.from({ length: maxScore }).map((item, i) => {
                                                                return (
                                                                    <Image style={[i > 0 ? { marginLeft: 4 } : null, { width: 16, height: 16, marginTop: 8 }]} source={
                                                                        score_completed >= ++i ?
                                                                            require('../assets/images/icon/Firepoint.png')
                                                                            :
                                                                            require('../assets/images/icon/Firepoint2.png')
                                                                    } key={i + "img"} />
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                                <View style={styles.viewIconRight} key={i + "home6"}>
                                                    <Image
                                                        style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                        source={require('../assets/images/icon/right.png')}
                                                        key={i + "home7"} />
                                                </View>

                                            </View>
                                        </Pressable>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <Text style={styles.reportChallenge}>รายงานการทำกิจกรรม</Text>
                    <View style={{ marginHorizontal: 16, backgroundColor: colors.white, borderRadius: 16, paddingTop: 18, marginBottom: 40 }}>
                        <View style={styles.missionView}>
                            <Pressable style={[{ width: "auto", paddingHorizontal: 8 }, statusChart === 1 ? styles.missionPre : styles.programPre]} onPress={() => this.setState({ statusChart: 1 })} >
                                <Text style={[styles.mission, statusChart === 1 ? { color: colors.white } : { color: colors.persianBlue }]}>สัปดาห์</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, width: "auto", paddingHorizontal: 8 }, statusChart === 2 ? styles.missionPre : styles.programPre]} onPress={() => this.setState({ statusChart: 2 })}>
                                <Text style={[styles.mission, statusChart === 2 ? { color: colors.white } : { color: colors.persianBlue }]}>เดือน</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, width: "auto", paddingHorizontal: 16 }, statusChart === 3 ? styles.missionPre : styles.programPre]} onPress={() => this.setState({ statusChart: 3 })}>
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

                </ScrollView>
            </View >

        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        /*         backgroundColor: 'red', */
    },
    buttonsContainer: {
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
    contentHead: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    content: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        //color: colors.mayaBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        marginTop: 16,
        marginLeft: 16,
        marginBottom: 16,
    },
    missionData: {
        /* marginHorizontal: 16, */
        flexWrap: "nowrap",
        width: "75%",
        margin: 16

    },
    missionData2: {
        /* marginHorizontal: 16, */
        flexWrap: "nowrap",
        width: "75%",
        marginLeft: 16,

    },
    row: {
        marginBottom: 16,
        backgroundColor: colors.white,
        borderRadius: 16,
        position: "relative",
        height: "auto",
        flexDirection: "row",
        marginRight: (deviceHeight > 1023) ? 32 : 16
    },
    boxRowView: {
        backgroundColor: colors.white,
        borderRadius: 16,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 14
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
    challenge: {
        marginTop: 8,
        zIndex: 3,
        fontSize: 16,
        marginLeft: 16,
        color: colors.grey1,
        marginBottom: 8,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    reportChallenge: {
        marginTop: 24,
        zIndex: 3,
        fontSize: 16,
        marginLeft: 16,
        color: colors.grey1,
        marginBottom: 8,
        fontFamily: "IBMPlexSansThai-Bold",
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
    missionView: {
        flexDirection: "row",
        marginLeft: 16
    },
    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },

});

const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusExerciserActivity, exerciserActivity, activity_list, statusGetActivityList } = getData;
    return { user, nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusExerciserActivity, exerciserActivity, activity_list, statusGetActivityList, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, routeName, insertNutritionActivity, insertExerciseActivity, loginUser, getNutritionActivity, getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


