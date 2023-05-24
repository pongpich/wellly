import React, { Component } from 'react';
import { View, StyleSheet, Pressable, ImageBackground, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, Animated, Easing, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, InputAccessoryView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { logoutUser, loginUser } from "../redux/auth";
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList, getMemberActivityLogInWeek, getYearActivityLogGraph, getMonthActivityLogGraph, getWeekActivityLogGraph, setIntensityFromExArticleTemplate } from "../redux/get";
import { insertNutritionActivity, insertExerciseActivity, checkUpdateBadgeWin } from "../redux/update";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName, setSelectedTab, setTeachUserHome } from "../redux/personalUser";
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';
import { calculateWeekInProgram, currentTime } from "../helpers/utils";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from "react-native-modal";
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import Constants from 'expo-constants';

import i18next from 'i18next';



import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { CommonActions } from '@react-navigation/native';
import { BackHandler } from 'react-native';



class Home extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.state = {
            latest_nutrition_activity: {},
            latest_exercise_activity: {},
            latest_exercise_mission: [],
            statusChart: 1,
            dataItem: {
                "lightDuration": 0,
                "moderateDuration": 0,
                "virgorousDuration": 0
            },
            month: 1,
            selectedMonth: 1,
            labelsWeek: ["สัปดาห์ที่แล้ว", "สัปดาห์นี้"],
            labelsMonth: ["1", "2", "3", "4", "5"],
            labelsYear: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            isLoading: false,
            weekData: [],
            monthData: [],
            yearData: [],
            year: [1],
            week_in_program: null,
            thisYear: 2023,
            selectedYear: 2023,
            /*    teachUserHome: true, */
            stipTeach: 1
        };
    }

    componentDidMount() {
        const { dataItem } = this.state
        const { user } = this.props;
        const currDate = new Date();
        const currYear = currDate.getFullYear();
        const currMonth = currDate.getMonth() + 1; //ต้อง +1 เพราะ index เริ่มจาก 0
        const itemsYear = []; // สร้าง array เพื่อเก็บ object ปี

        for (var year = currYear - 5; year <= currYear; year++) {
            var buddhistYear = year + 543; // แปลงเป็นปี พ.ศ.
            itemsYear.push({ label: buddhistYear.toString(), value: year }); // เพิ่ม object ปีเข้าไปใน array
        }
        const week_in_program = calculateWeekInProgram(user.start_date);

        this._unsubscribe = this.props.navigation.addListener('focus', () => {



            this.setState({
                weekData: [[dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,]],

                monthData: [[dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,]],

                yearData: [[dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
                [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],],
                week_in_program: week_in_program
            })
            // do something
            this.props.getActivityList(user && user.user_id);
            this.props.checkUpdateBadgeWin(user && user.user_id);

            if (!user) { // $student_two["Chemistry"] = 92
                this.props.navigation.navigate("Login");
            }

            this.props.insertNutritionActivity(user && user.user_id);
            this.props.insertExerciseActivity(user && user.user_id);
            this.props.getNutritionActivity(user && user.user_id);
            this.props.getExerciserActivity(user && user.user_id);

            this.animate();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);


            this.props.getMemberActivityLogInWeek(user.user_id);
            this.props.getYearActivityLogGraph((user && user.user_id), currYear);
            this.props.getMonthActivityLogGraph((user && user.user_id), currMonth);
            this.props.getWeekActivityLogGraph((user && user.user_id));



            this.setState({
                month: currMonth,
                selectedMonth: currMonth,
                year: itemsYear,
                week_in_program: week_in_program
            })




        });


        this.props.insertNutritionActivity(user && user.user_id);
        this.props.insertExerciseActivity(user && user.user_id);
        this.props.getNutritionActivity(user && user.user_id);
        this.props.getExerciserActivity(user && user.user_id);
        this.setState({
            weekData: [[dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,]],

            monthData: [[dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,]],

            yearData: [[dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],
            [dataItem.lightDuration, dataItem.moderateDuration, dataItem.virgorousDuration,],]
        })

        this.props.getMemberActivityLogInWeek(user.user_id);
        this.props.getYearActivityLogGraph((user && user.user_id), currYear);
        this.props.getMonthActivityLogGraph((user && user.user_id), currMonth);
        this.props.getWeekActivityLogGraph((user && user.user_id));
        this.setState({
            month: currMonth,
            selectedMonth: currMonth,
            year: itemsYear,
        })
        const { teachUserHome } = this.props;


        /*  if (teachUserHome === 'undefined') {  // สอน การใช้งาน  home ถ้า ต้องการ ให้ขึ้นเเค่ ครั่ง เเรก ให้ ใช้  == "undefined" รอลบ
             this.props.setTeachUserHome(true);
         } */


        // this.props.routeName(null); // ถ้าเข้าให้ home ให้ทำคำสั่งนี้ 1 ครั้ง

    }







    componentWillUnmount() {
        this._unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    /* 
        handleBackPress = () => {
    
            const { navigation, route } = this.props;
    
            if (navigation.canGoBack() && route.name === "Home") {
                BackHandler.exitApp();
                return true;
            } else {
                return false;
            }
        };
     */

    handleBackPress = () => {
        if (this.props.navigation.isFocused() && this.props.route.name === 'Home') {
            BackHandler.exitApp();
            return true;
        } else {
            return false;
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const { user, statusGetNutritionMission, statusGetNutritionActivity, nutrition_mission, route_name, nutrition_activity, exerciserActivity, statusExerciserActivity, statusInsertNutritionActivity, statusInsertExerciseActivity,
            member_activity_log_in_week, statusGetYearActLogGraph, statusGetMonthActLogGraph, statusGetWeekActLogGraph, weekLog, monthLog, yearLog, } = this.props;
        if ((prevProps.user !== user) && (!user)) {
            this.props.navigation.navigate("Login");
        }

        const { selectedYear, selectedMonth, statusChart } = this.state;


        if ((prevProps.statusGetWeekActLogGraph !== statusGetWeekActLogGraph) && (statusGetWeekActLogGraph === "success")) {
            this.setState({
                weekData: [
                    [weekLog[0][0].lightDuration, weekLog[0][0].moderateDuration, weekLog[0][0].virgorousDuration],
                    [weekLog[1][0].lightDuration, weekLog[1][0].moderateDuration, weekLog[1][0].virgorousDuration],
                ]
            })
        }
        if ((prevProps.statusGetMonthActLogGraph !== statusGetMonthActLogGraph) && (statusGetMonthActLogGraph === "success")) {
            this.setState({
                monthData: [
                    [monthLog[0][0].lightDuration, monthLog[0][0].moderateDuration, monthLog[0][0].virgorousDuration],
                    [monthLog[1][0].lightDuration, monthLog[1][0].moderateDuration, monthLog[1][0].virgorousDuration],
                    [monthLog[2][0].lightDuration, monthLog[2][0].moderateDuration, monthLog[2][0].virgorousDuration],
                    [monthLog[3][0].lightDuration, monthLog[3][0].moderateDuration, monthLog[3][0].virgorousDuration],
                    [monthLog[4][0].lightDuration, monthLog[4][0].moderateDuration, monthLog[4][0].virgorousDuration],
                ]
            })
        }

        if ((prevProps.statusGetYearActLogGraph !== statusGetYearActLogGraph) && (statusGetYearActLogGraph === "success")) {

            this.setState({
                yearData: [
                    [yearLog[0][0].lightDuration, yearLog[0][0].moderateDuration, yearLog[0][0].virgorousDuration],
                    [yearLog[1][0].lightDuration, yearLog[1][0].moderateDuration, yearLog[1][0].virgorousDuration],
                    [yearLog[2][0].lightDuration, yearLog[2][0].moderateDuration, yearLog[2][0].virgorousDuration],
                    [yearLog[3][0].lightDuration, yearLog[3][0].moderateDuration, yearLog[3][0].virgorousDuration],
                    [yearLog[4][0].lightDuration, yearLog[4][0].moderateDuration, yearLog[4][0].virgorousDuration],
                    [yearLog[5][0].lightDuration, yearLog[5][0].moderateDuration, yearLog[5][0].virgorousDuration],
                    [yearLog[6][0].lightDuration, yearLog[6][0].moderateDuration, yearLog[6][0].virgorousDuration],
                    [yearLog[7][0].lightDuration, yearLog[7][0].moderateDuration, yearLog[7][0].virgorousDuration],
                    [yearLog[8][0].lightDuration, yearLog[8][0].moderateDuration, yearLog[8][0].virgorousDuration],
                    [yearLog[9][0].lightDuration, yearLog[9][0].moderateDuration, yearLog[9][0].virgorousDuration],
                    [yearLog[10][0].lightDuration, yearLog[10][0].moderateDuration, yearLog[10][0].virgorousDuration],
                    [yearLog[11][0].lightDuration, yearLog[11][0].moderateDuration, yearLog[11][0].virgorousDuration],
                ]
            })
        }


        /* if ((prevProps.statusGetNutritionMission !== statusGetNutritionMission) && (statusGetNutritionMission === "success")) {
            //ถ้าตรงตามเงื่อนไขด้านบนแสดงว่าได้ค่า  nutrition_mission แล้ว
        } */

        if ((prevProps.statusGetNutritionActivity !== statusGetNutritionActivity) && (statusGetNutritionActivity === "success")) {

            this.setState({ latest_nutrition_activity: nutrition_activity[0] })
        }

        if ((prevProps.statusInsertNutritionActivity !== statusInsertNutritionActivity) && (statusInsertNutritionActivity === "success")) {
            this.props.getNutritionActivity(user && user.user_id);
        }
        if ((prevProps.statusInsertExerciseActivity !== statusInsertExerciseActivity) && (statusInsertExerciseActivity === "success")) {
            this.props.getExerciserActivity(user && user.user_id);
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


        if (prevState.selectedMonth != selectedMonth) {
            this.props.getMonthActivityLogGraph(user && user.user_id, selectedMonth);
        }
        if (prevState.selectedYear != selectedYear) {

            this.props.getYearActivityLogGraph(user && user.user_id, selectedYear);
        }
        if ((prevState.statusChart !== statusChart) && (statusChart == 1)) {
            this.props.getWeekActivityLogGraph((user && user.user_id));
        }



        /*  if (prevProps.teachUserHome == teachUserHome && teachUserHome == false) {
             this.setState({
                 teachUserHome: false
             })
         } */

    }


    actionPress(id) {

        const resetAction = CommonActions.reset({
            index: 0, // ตำแหน่งของหน้าที่จะใช้เป็นหน้าแรก
            routes: [{
                name: 'Add2'
            }], // เส้นทางที่ต้องการเปลี่ยน
        });
        // set ความเข้มไปใน redux
        this.props.setIntensityFromExArticleTemplate(id)
        /*  this.props.navigation.dispatch(resetAction); */
        this.props.navigation.navigate("Add", { activity_id: id });


    }

    actionPress(id, name) {

        //  Core+Balance+Plyometric  Core+Balance
        if ((name == "Core+Balance+Plyometric") || (name == "Core+Balance") || (name == "Resistance") || (name == "Flexibility")) {
            /*  this.props.navigation.navigate("Exercise", { name: name }) */
            this.props.setSelectedTab(name);
        } else {
            this.props.setIntensityFromExArticleTemplate(id)
            this.props.navigation.navigate("Add", { activity_id: id })
        }


    }

    checkFistChar(name) {
        let firstChar;
        if (name.match(/^[\u0E00-\u0E7F\s]+$/)) {
            let consonants = name.match(/[ก-ฮ]/g);
            firstChar = consonants[0];
        } else {

            firstChar = name.charAt(0)

        }
        return firstChar;
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

    getThaiMonth = (month) => {
        const thaiMonths = [
            'ม.ค.',
            'ก.พ.',
            'มี.ค.',
            'เม.ย.',
            'พ.ค.',
            'มิ.ย.',
            'ก.ค.',
            'ส.ค.',
            'ก.ย.',
            'ต.ค.',
            'พ.ย.',
            'ธ.ค.',
        ];
        return thaiMonths[month - 1];
    };

    setTeachHome = () => {
        this.props.setTeachUserHome(false);
        this.props.navigation.navigate('NutritionTab');
    }

    render() {
        const { user, activity_list } = this.props;
        const { latest_nutrition_activity, latest_exercise_activity, latest_exercise_mission, statusChart, isLoading, labelsWeek, weekData, monthData,
            yearData, labelsMonth, labelsYear, month, selectedMonth, year, thisYear, selectedYear, week_in_program, stipTeach } = this.state;

        const languages = i18next.languages[0];



        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 1],
        });
        const scale = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1, 1],
        });

        function substringText(text) {
            const startIndex = 0;
            let endIndex = 0;
            //วนลูปเพื่อทดลอง Text ว่าแต่ละอันควรกำหนด endIndex เป็นเท่าไหร่ เพื่อให้ได้ความกว้าง 59 ตัวอักษรแบบไม่นับสระที่อยู่ด้านบน กับ ด้านล่าง
            for (let i = 0; i < text.length; i++) {
                const substring1 = text.substring(startIndex, i);
                let consonants = substring1.match(/[ก-ฮ ะาเแโใไำ]/g);
                if (consonants) {
                    //ความกว้างที่เหมาะสมคือ 59 โดยไม่นับพวกสระที่อยู่ด้านบน,ล่างของพยัญชนะ เพราะไม่เพิ่มความกว้างข้อความ
                    if (consonants.length === 59) {
                        endIndex = i;
                    }
                    //ถ้าวนลูปรอบสุดท้ายแล้วยังไม่ได้ 59 ก็ให้กำหนดความยาว i เลย
                    if ((i >= (text.length - 1)) && (consonants.length < 59)) {
                        endIndex = i;
                    }
                }
            }
            const substring2 = text.substring(startIndex, endIndex);
            return substring2 + "...";
        };

        const isNotchDevice = Dimensions.get('window').height >= 812;

        const { teachUserHome } = this.props;

        return (

            <View style={[ComponentsStyle.container, { backgroundColor: colors.mayaBlue60, paddingTop: 40 }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ImageBackground source={require('../assets/images/home/Logo.png')} style={{ marginTop: 0, width: "auto" }} >

                        <View style={{ marginBottom: 100, marginTop: -40 }}>

                            <View style={{ height: 44, width: "100%" }}>
                                <StatusBar barStyle="dark-content" />
                            </View>
                            <View style={{ height: 48, flexDirection: "row", justifyContent: "space-between", marginTop: 24, paddingHorizontal: 16 }}>
                                <View>

                                    <Text style={styles.contentHead}>สวัสดี {user && user.display_name}</Text>

                                    <Text style={styles.content}>ภารกิจของคุณในสัปดาห์นี้</Text>
                                </View>

                                <View style={{ marginRight: 8 }}>
                                    <Pressable onPress={() => this.props.navigation.navigate("Profile")}  >
                                        <View style={styles.boxName}>
                                            <Text style={styles.nameIcon}>{user && this.checkFistChar(user.display_name)}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{ paddingLeft: 16, marginTop: -53 }}>

                        {

                            (latest_nutrition_activity && latest_nutrition_activity.quiz_activities_number == null) || (latest_nutrition_activity && latest_nutrition_activity.assessment_kit_number == null) ?

                                <Pressable
                                    onPress={() => latest_nutrition_activity.short_content && this.props.navigation.navigate("ArticleTemplate", { id: latest_nutrition_activity && latest_nutrition_activity.week_in_program, mission_id: latest_nutrition_activity && latest_nutrition_activity.mission_id, heading: latest_nutrition_activity && latest_nutrition_activity.heading, statusPags: "Home" })} key={latest_nutrition_activity && latest_nutrition_activity.week_in_program + "_na"}
                                >
                                    <View style={styles.row}>
                                        <View style={[styles.numberView, { backgroundColor: latest_nutrition_activity && latest_nutrition_activity.heading && latest_nutrition_activity.short_content ? colors.mayaBlue20 : "#D4E0F0" }]}>
                                            <Text style={[styles.number, { color: colors.mayaBlue }]}>{latest_nutrition_activity && latest_nutrition_activity.week_in_program}</Text>
                                        </View>
                                        <View style={styles.missionData}>
                                            {latest_nutrition_activity && latest_nutrition_activity.heading && latest_nutrition_activity.short_content ?
                                                <>
                                                    <Text style={styles.missionHead}>{latest_nutrition_activity && latest_nutrition_activity.heading}</Text>
                                                    <Text style={[styles.missionContent, { marginRight: 16 }]}>

                                                        {substringText(latest_nutrition_activity && latest_nutrition_activity.short_content)}
                                                    </Text>
                                                </>
                                                :
                                                <>
                                                    <Animated.View style={{ opacity, transform: [{ scale }] }}>
                                                        <View style={styles.activityindicator}></View>
                                                        <View style={styles.activityindicator1}></View>
                                                        <View style={styles.activityindicator2}></View>
                                                        <View style={styles.activityindicator2}></View>
                                                    </Animated.View>

                                                </>
                                            }

                                        </View>
                                        {
                                            latest_nutrition_activity && latest_nutrition_activity.heading && latest_nutrition_activity.short_content &&
                                            <View style={styles.viewIconRight}>
                                                <Image
                                                    style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                    source={require('../assets/images/icon/right.png')}
                                                />
                                            </View>
                                        }

                                    </View>
                                </Pressable>
                                : null
                        }



                        {
                            latest_exercise_activity && latest_exercise_activity.status_mission_activities !== "completed" &&
                            <Pressable
                                onPress={() => latest_exercise_activity.short_content && this.props.navigation.navigate("ExArticleTemplate", { id: latest_exercise_activity.week_in_program, mission_id: latest_exercise_activity.mission_id, heading: latest_exercise_activity.heading, mission_activities: latest_exercise_activity.mission_activities, statusPags: "Home" })} key={latest_exercise_activity.week_in_program + "_ea"}
                            >
                                <View style={styles.row}>

                                    <View style={[styles.numberView, { backgroundColor: latest_exercise_activity.heading && latest_exercise_activity.short_content ? colors.persianBlue20 : "#D4E0F0" }]}>
                                        <Text style={[styles.number, { color: colors.persianBlue }]}>{latest_exercise_activity.week_in_program}</Text>
                                    </View>
                                    <View style={styles.missionData}>
                                        {latest_exercise_activity.heading && latest_exercise_activity.short_content ?
                                            <>
                                                <Text style={styles.missionHead}>{latest_exercise_activity.heading}</Text>
                                                <Text style={[styles.missionContent, { marginRight: 16 }]}>

                                                    {substringText(latest_exercise_activity.short_content)}
                                                </Text>
                                            </>
                                            :
                                            <>
                                                <Animated.View style={{ opacity, transform: [{ scale }] }}>
                                                    <View style={styles.activityindicator}></View>
                                                    <View style={styles.activityindicator1}></View>
                                                    <View style={styles.activityindicator2}></View>
                                                    <View style={styles.activityindicator2}></View>
                                                </Animated.View>
                                            </>
                                        }


                                    </View>
                                    {
                                        latest_exercise_activity.heading && latest_exercise_activity.short_content &&
                                        <View style={styles.viewIconRight}>
                                            <Image
                                                style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                source={require('../assets/images/icon/right.png')}
                                            />

                                        </View>
                                    }

                                </View>
                            </Pressable>
                        }

                    </View>


                    {
                        latest_exercise_mission.length > 0 ?
                            <>
                                <View style={styles.boxRowView} >

                                    <View style={styles.line}>
                                        <View style={styles.line1} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />
                                        <View style={styles.line2} />

                                        <View style={[styles.line1, { marginLeft: 15 }]} />
                                    </View>
                                    <Text style={styles.challenge}>ชาเลนจ์</Text>

                                    {

                                        latest_exercise_mission.map((item, i) => {
                                            var dataLength = latest_exercise_mission.length;
                                            const multiple = (100 / item.number) * item.number_completed;
                                            var maxScore = item.number * item.score;
                                            var score_completed = item.number_completed * item.score;




                                            return (

                                                <View key={i + "rv"}>
                                                    <Pressable
                                                        onPress={() =>
                                                            /*console.log(item.id, item.name) */
                                                            this.actionPress(item.id, item.name)}
                                                        key={i + "tfb"}
                                                    >
                                                        <View key={i + "h"} style={{ flexDirection: "row", marginBottom: 16 }}>
                                                            <View style={styles.numberView} key={i + "hom"}>
                                                                <AnimatedCircularProgress
                                                                    size={64}
                                                                    width={6}
                                                                    fill={multiple}
                                                                    tintTransparency={true}
                                                                    rotation={360}
                                                                    tintColor={colors.positive1}
                                                                    backgroundColor={colors.grey6} key={i + "hom2"}>
                                                                    {

                                                                        (fill) => (
                                                                            <>
                                                                                <View style={{ flexDirection: "row", marginTop: 10 }} key={i + "an"}>
                                                                                    <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: item.number_completed == 0 ? "IBMPlexSansThai-Regular" : "IBMPlexSansThai-Bold", marginTop: 0 }} key={i + "an2"}>{item.number_completed}</Text>
                                                                                    <Text style={{ color: colors.grey1, fontSize: 12, fontFamily: "IBMPlexSansThai-Regular", marginTop: 4 }} key={i + "an3"}> /{item.number}</Text>
                                                                                </View>
                                                                                <Text style={{ color: colors.grey2, fontSize: 12, fontFamily: "IBMPlexSansThai-Regular", marginTop: -5 }} key={i + "an4"}>ครั้ง</Text>
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
                                                            {


                                                                <View style={styles.viewIconRight} key={i + "home6"}>
                                                                    <Image
                                                                        style={{ height: 24, width: 24, zIndex: 1, marginRight: -8 }}
                                                                        source={require('../assets/images/icon/right.png')}
                                                                        key={i + "home7"} />

                                                                </View>
                                                            }


                                                        </View>
                                                    </Pressable>
                                                </View>

                                            )
                                        })


                                    }
                                </View>

                            </>
                            : <View style={{ flex: 1, backgroundColor: "#F3F7FB", marginTop: 24, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                                <View style={{ width: "100%", height: 674, flex: 1, justifyContent: "flex-end" }} />

                            </View>
                    }

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
                        {
                            statusChart === 2 &&
                            <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', marginVertical: 8, paddingHorizontal: 16, paddingBottom: 8 }}>
                                    {[...Array(month)].map((_, index) => (
                                        month === index + 1 ?
                                            <Pressable key={index + 1} onPress={() => this.setState({
                                                selectedMonth: index + 1
                                            })}>
                                                <Text style={[styles.leftMonth2, selectedMonth === index + 1 ? null : { color: colors.grey1 }]}>เดือนนี้</Text>
                                            </Pressable> :
                                            <Pressable key={index + 1} onPress={() => this.setState({
                                                selectedMonth: index + 1
                                            })}>
                                                <Text style={[styles.leftMonth, selectedMonth === index + 1 ? { color: colors.persianBlue } : null]}>{`${this.getThaiMonth(index + 1)}`}</Text>
                                            </Pressable>
                                    ))}

                                </View>
                            </ScrollView>
                        }
                        {
                            statusChart === 3 &&
                            <View style={{ flexDirection: 'row', marginVertical: 8, paddingHorizontal: 16, paddingBottom: 8 }} >
                                {year && year.map((item, i) => (
                                    thisYear == item.value ?
                                        <Pressable key={i + 1} onPress={() => this.setState({
                                            selectedYear: item.value
                                        })}>
                                            <Text style={[styles.leftMonth2, selectedYear === item.value ? null : { color: colors.grey1 }]}>ปีนี้</Text>
                                        </Pressable> :
                                        <Pressable key={i + 1} onPress={() => this.setState({
                                            selectedYear: item.value
                                        })}>
                                            <Text style={[styles.leftMonth, selectedYear === item.value ? { color: colors.persianBlue } : null]}>{item.value} </Text>
                                        </Pressable>
                                ))}
                            </View>
                        }

                        <Text style={styles.watch}>(ชม.)</Text>
                        <StackedBarChart
                            data={{
                                labels: (statusChart === 1) ? labelsWeek : (statusChart === 2) ? labelsMonth : labelsYear,
                                legend: [],
                                data: (statusChart === 1) ? weekData : (statusChart === 2) ? monthData : yearData,
                                barColors: ["#59CBE4", "#FDAB44", "#F15E79"]
                            }}
                            width={Dimensions.get("window").width - 40} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1

                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 0,
                                barPercentage: statusChart == 1 ? 2 : 0.5,
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

                </ScrollView >
                <Modal isVisible={teachUserHome} style={{ zIndex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => this.setTeachHome()}>
                        <Text style={{
                            fontSize: ComponentsStyle.fontSize16,
                            fontFamily: "IBMPlexSansThai-Bold",
                            color: colors.white,
                            marginTop: Platform.OS === 'android' ? -10 : 20,
                            textAlign: "right",
                            marginRight: 20,

                        }}>ข้าม</Text>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-end" }}>
                        <View style={{
                            width: 288,
                            height: 117,
                            backgroundColor: "white",
                            marginBottom: 20,
                            borderRadius: 16,
                            paddingTop: 16,
                            paddingHorizontal: 16,

                        }}>
                            <Text style={{
                                fontSize: ComponentsStyle.fontSize14,
                                fontFamily: "IBMPlexSansThai-Regular",
                                color: colors.grey1,
                            }}>
                                {
                                    stipTeach === 1 ? "ดูภารกิจโภชนาการที่จะช่วยให้เข้าใจกลไกของร่างกายได้ดีขึ้น" : stipTeach === 2 ? "ดูภารกิจออกกำลังกาย ที่จะช่วยให้คุณมีสุขภาพแข็งแรงและท้าทาย" : "บันทึกการออกกำลังกายหรือส่งการบ้านตามภารกิจที่ได้รับ"
                                }

                            </Text>
                            <View style={stipTeach === 1 ? { alignItems: "flex-end" } : { flexDirection: "row", justifyContent: "space-between" }}>
                                {
                                    stipTeach > 1 &&
                                    <TouchableWithoutFeedback onPress={() => this.setState({ stipTeach: stipTeach === 1 ? 1 : stipTeach - 1 })}>
                                        <View style={{
                                            backgroundColor: colors.white, width: 52, height: 27, alignItems: "center",
                                            borderRadius: 16, justifyContent: "center", marginTop: 16,
                                        }}>
                                            <Text style={{
                                                fontSize: ComponentsStyle.fontSize16,
                                                fontFamily: "IBMPlexSansThai-Bold",
                                                color: colors.persianBlue,
                                            }}>กลับ</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                                <TouchableWithoutFeedback onPress={() => this.setState({
                                    stipTeach: stipTeach < 3 ? stipTeach + 1 :
                                        this.setTeachHome()
                                })}>

                                    <View style={{
                                        backgroundColor: colors.persianBlue, width: 52, height: 27, alignItems: "center",
                                        borderRadius: 16, justifyContent: "center", marginTop: 16,
                                    }}>
                                        <Text style={{
                                            fontSize: ComponentsStyle.fontSize16,
                                            fontFamily: "IBMPlexSansThai-Bold",
                                            color: colors.white,
                                        }}>ถัดไป</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {
                                stipTeach === 3 && <Image
                                    style={{ height: 16, width: 32, zIndex: 1, marginTop: 10, marginLeft: "45%" }}
                                    source={require('../assets/images/icon/Rectangle10.png')}
                                />
                            }

                        </View>
                        <View style={{
                            marginBottom: Platform.OS === 'android' ? stipTeach === 3 ? -10 : -20 : isNotchDevice ? stipTeach === 3 ? 17 : 10 : stipTeach === 3 ? -10 : -20,
                            marginLeft: stipTeach === 1 ? "-45%" : stipTeach === 2 ? "45%" : 0,
                            backgroundColor: 'white',
                            width: 75,
                            height: 75,
                            borderRadius: 50,
                            padding: stipTeach === 1 ? 10 : 0,
                            shadowColor: "#ffffff",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 5,
                            shadowRadius: 5,
                            elevation: 24,
                            opacity: 1,
                            borderWidth: 0,
                            alignItems: "center",
                            justifyContent: "center",

                        }}>
                            {
                                stipTeach === 1 ?
                                    <>
                                        <Image
                                            style={{ width: 24, height: 24, marginTop: 20 }}
                                            source={require('../assets/images/icon/menuNutrition.png')}
                                        />
                                        <Text style={styles.teach_bottom}>{
                                            languages === "th" ? "โภชนาการ" : "Nutrition"
                                        }</Text>
                                    </>
                                    :
                                    stipTeach === 2 ?
                                        <>
                                            <Image
                                                style={{ width: 24, height: 24, marginTop: 20 }}
                                                source={require('../assets/images/icon/menuExercise.png')}
                                            />
                                            <Text style={styles.teach_bottom}>{
                                                languages === "th" ? "ออกกำลังกาย" : "Exercise"
                                            }</Text>
                                        </> :
                                        <>
                                            <Image
                                                style={{ width: 80, height: 80, marginTop: 17 }}
                                                source={require('../assets/images/icon/Add.png')}
                                            />

                                        </>
                            }

                        </View>
                    </View>
                </Modal >
            </View >

        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);
const deviceWidth = Math.round(Dimensions.get('window').width);
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
        marginTop: -16,
        backgroundColor: colors.white,
        borderRadius: 16,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 40
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
        /*         marginTop: 8, */
        zIndex: 3,
        fontSize: 16,
        /*         marginLeft: 16, */
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
    boxName: {
        height: 64,
        width: 64,
        borderColor: colors.white,
        borderWidth: 4,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: colors.grey4,
        justifyContent: "center"
    },
    nameIcon: {
        color: colors.grey3,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 32
    },
    activityindicator: {
        height: 15,
        backgroundColor: "#D4E0F0",
        width: "100%",
        marginBottom: 8,
        borderRadius: 16,
    },
    activityindicator1: {
        height: 15,
        backgroundColor: "#D4E0F0",
        width: "50%",
        marginBottom: 8,
        borderRadius: 16,
    },
    activityindicator2: {
        height: 10,
        backgroundColor: "#D4E0F0",
        width: "100%",
        marginBottom: 8,
        borderRadius: 16,
    },
    line: {
        marginTop: -2,
        position: "absolute",
        paddingHorizontal: 16,
        flexDirection: "row",
        zIndex: 4
    },
    line1: {
        zIndex: 4,
        borderColor: colors.mayaBlue60,
        borderWidth: 2,
        width: 10


    },
    line2: {
        marginLeft: 11,
        zIndex: 4,
        borderColor: colors.mayaBlue60,
        borderWidth: 2,
        width: 10
    },
    leftMonth: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
        marginRight: 14
    },
    leftMonth2: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.persianBlue,
        marginRight: 14
    },
    teach_bottom: {
        fontSize: 12,
        paddingBottom: 10,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey3
    }

});

const mapStateToProps = ({ authUser, getData, personalDataUser, updateData }) => {
    const { user } = authUser;
    const { route_name, teachUserHome } = personalDataUser;
    const { statusInsertNutritionActivity, statusInsertExerciseActivity } = updateData;
    const { nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusExerciserActivity, exerciserActivity, activity_list, statusGetActivityList,
        member_activity_log_in_week, statusGetYearActLogGraph, statusGetMonthActLogGraph, statusGetWeekActLogGraph, weekLog, monthLog, yearLog } = getData;
    return {
        user, nutrition_mission, nutrition_activity, statusGetNutritionMission, statusGetNutritionActivity, statusInsertNutritionActivity, statusInsertExerciseActivity,
        member_activity_log_in_week, statusExerciserActivity, exerciserActivity, activity_list, statusGetActivityList, route_name, statusGetYearActLogGraph, statusGetMonthActLogGraph,
        statusGetWeekActLogGraph, statusGetWeekActLogGraph, weekLog, monthLog, yearLog, teachUserHome
    };
};

const mapActionsToProps = {
    logoutUser, getNutritionMission, routeName, setSelectedTab, insertNutritionActivity, insertExerciseActivity, getMemberActivityLogInWeek, loginUser, getNutritionActivity,
    getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate, checkUpdateBadgeWin, getYearActivityLogGraph, getMonthActivityLogGraph, getWeekActivityLogGraph, setTeachUserHome
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


