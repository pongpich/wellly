import React, { Component } from 'react';
import { View, StyleSheet, Pressable, ImageBackground, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { logoutUser, loginUser } from "../redux/auth";
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList } from "../redux/get";
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


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latest_nutrition_activity: {},
            latest_exercise_activity: {},
            latest_exercise_mission: []
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
            this.props.getActivityList()

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

    render() {
        const { user, activity_list } = this.props;
        const { latest_nutrition_activity, latest_exercise_activity, latest_exercise_mission } = this.state;

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
                                    <Pressable
                                    //onPress={() => this.props.navigation.popToTop()} key={i + "tfb"}
                                    >
                                        <View key={i} style={{ flexDirection: "row", marginBottom: 16 }}>
                                            <View style={styles.numberView}>
                                                <AnimatedCircularProgress
                                                    size={64}
                                                    width={8}
                                                    fill={multiple}
                                                    tintTransparency={true}
                                                    rotation={360}
                                                    tintColor={colors.positive1}
                                                    backgroundColor={colors.grey6} >
                                                    {

                                                        (fill) => (
                                                            <>
                                                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                                    <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Bold", marginTop: 0 }}>{item.number_completed}</Text>
                                                                    <Text style={{ color: colors.grey1, fontSize: 14, fontFamily: "IBMPlexSansThai-Regular", marginTop: 4 }}> /{item.number}</Text>
                                                                </View>
                                                                <Text style={{ color: colors.grey2, fontSize: 16, fontFamily: "IBMPlexSansThai-Regular", marginTop: -10 }}>ครั้ง</Text>
                                                            </>
                                                        )

                                                    }
                                                </AnimatedCircularProgress>
                                            </View>
                                            <View style={styles.missionData2}>
                                                <Text style={[styles.missionHead, { marginLeft: 8, marginRight: 8 }]}>{item.name}</Text>
                                                <View style={{ flexDirection: "row", marginLeft: 8 }}>
                                                    {
                                                        Array.from({ length: maxScore }) && Array.from({ length: maxScore }).map((item, i) => {
                                                            return (
                                                                <Image style={[i > 0 ? { marginLeft: 4 } : null, { width: 16, height: 16, marginTop: 8 }]} source={
                                                                    score_completed >= ++i ?
                                                                        require('../assets/images/icon/Firepoint.png')
                                                                        :
                                                                        require('../assets/images/icon/Firepoint2.png')
                                                                } />
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.viewIconRight}>
                                                <Image
                                                    style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                    source={require('../assets/images/icon/right.png')}
                                                />
                                            </View>

                                        </View>
                                    </Pressable>
                                )
                            })
                        }
                    </View>

                    <Text style={styles.reportChallenge}>รายงานการทำกิจกรรม</Text>
                    <View style={{ margin: 16, padding: 16 }}>
                        <Text>Bezier Line Chart</Text>
                        <StackedBarChart
                            data={{
                                labels: ["Test1", "Test2"],
                                legend: ["L1", "L2", "L3"],
                                data: [
                                    [60, 60, 60],
                                    [30, 30, 60]
                                ],
                                barColors: ["#59CBE4", "#FDAB44", "#F15E79"]
                            }}
                            width={Dimensions.get("window").width}
                            height={220}
                            yAxisLabel="%"
                            yAxisSuffix=""
                            yAxisInterval={1}
                            showLegend={true}
                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}


                            withCustomBarColorFromData={true} // ให้สีของแต่ละ bar มาจาก data.barColors
                            flatColor={true} // ไม่ให้มี gradient สำหรับแต่ละ bar
                            barPercentage={0.8} // กำหนดความกว้างของแต่ละ bar ใน 80% ของขนาด segment
                            style={{ // กำหนด style ให้กับ container ที่ห่อ StackedBarChart
                                marginVertical: 8,
                                borderRadius: 16,
                                marginLeft: 20, // กำหนดความห่าง 20px จากซ้าย
                            }}
                            hideLegend={false}
                            segments={3} // จำนวนของ segments ที่ต้องการให้แต่ละ index ของ array

                        />

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
});

const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusExerciserActivity, exerciserActivity, activity_list, statusGetActivityList } = getData;
    return { user, nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusExerciserActivity, exerciserActivity, activity_list, statusGetActivityList, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, routeName, insertNutritionActivity, insertExerciseActivity, loginUser, getNutritionActivity, getExerciserActivity, getActivityList };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


