import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { logoutUser, loginUser } from "../redux/auth";
import { getNutritionMission, getNutritionActivity, getExerciserActivity } from "../redux/get";
import { insertNutritionActivity, insertExerciseActivity, } from "../redux/update";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName } from "../redux/personalUser";
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


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
            const mission_activities = JSON.parse(exerciserActivity[0].mission_activities);
            this.setState({
                latest_exercise_activity: exerciserActivity[0],
                latest_exercise_mission: mission_activities
            })

        }
    }

    render() {
        const { user } = this.props;
        const { latest_nutrition_activity, latest_exercise_activity, latest_exercise_mission } = this.state;
        return (
            <View style={ComponentsStyle.container}>
                <ScrollView>
                    {/* <StatusBar
                    animated={false}
                    backgroundColor="blue"
                    barStyle="default"
                    showHideTransition={statusBarTransition}
                    hidden={hidden}
                /> */}

                    <Text style={styles.contentHead}>สวัสดี {user && user.display_name}</Text>
                    <Text style={styles.content}>ภารกิจของคุณในสัปดาห์นี้</Text>

                    <Pressable
                    /* onPress={() => navigation.navigate("ArticleTemplate", { id: latest_nutrition_activity.week_in_program, mission_id: latest_nutrition_activity.mission_id, heading: latest_nutrition_activity.heading })} key={latest_nutrition_activity.week_in_program + "tfb"} */
                    >
                        <View style={styles.row}>
                            <View style={[styles.numberView, { backgroundColor: colors.mayaBlue20, }]}>
                                <Text style={[styles.number, { color: colors.mayaBlue }]}>{latest_nutrition_activity.week_in_program}</Text>
                            </View>
                            <View style={styles.missionData}>
                                <Text style={styles.missionHead}>{latest_nutrition_activity.heading}</Text>
                                <Text style={styles.missionContent}> {latest_nutrition_activity.short_content}</Text>
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
                    //onPress={() => navigation.navigate("ExArticleTemplate", { id: item.week_in_program, mission_id: item.mission_id, heading: item.heading, mission_activities: item.mission_activities, statusPags: "Exercise" })} key={i + "tfb"}
                    >
                        <View style={styles.row}>
                            <View style={[styles.numberView, { backgroundColor: colors.persianBlue20 }]}>
                                <Text style={[styles.number, { color: colors.persianBlue }]}>{latest_exercise_activity.week_in_program}</Text>
                            </View>
                            <View style={styles.missionData}>
                                <Text style={styles.missionHead}>{latest_exercise_activity.heading}</Text>
                                <Text style={styles.missionContent}>{latest_exercise_activity.short_content}</Text>
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
                                    <View key={i} style={styles.row}>
                                        <View style={styles.numberView}>
                                            {/*  < Text > {item.name}</Text>
                                            < Text >จน. {item.number_completed} / {item.number}</Text>
                                            < Text >คะแนน {item.score * item.number_completed} / {item.score * item.number} </Text> */}
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
                                        <View style={styles.missionData}>
                                            <Text style={styles.missionHead}>{item.name}</Text>
                                            <View style={{ flexDirection: "row" }}>
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
                    <Text></Text>

                    <View style={styles.buttonTop}>
                        {
                            <Pressable style={ComponentsStyle.button} onPress={() => this.props.logoutUser()}  >
                                <Text style={ComponentsStyle.textButton}>{'Logout'}</Text>
                            </Pressable>
                        }
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
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    content: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
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
        marginTop: 0,
        zIndex: 3,
        fontSize: 16,
        color: colors.grey1,
        marginBottom: 8,
        fontFamily: "IBMPlexSansThai-Bold",
    },
});

const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusExerciserActivity, exerciserActivity } = getData;
    return { user, nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusExerciserActivity, exerciserActivity, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, routeName, insertNutritionActivity, insertExerciseActivity, loginUser, getNutritionActivity, getExerciserActivity };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


