import React, { Component } from 'react'
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, AntDesign, Image, Text, Pressable, Animated, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission, getNutritionActivityIdMission, getExerciserActivity, setIntensityFromExArticleTemplate, getTeachUserExercise, setTeachUserExercise, getTeachUserExArtTemp, setTeachUserExArticleTemplate, getTeachUserExerciseProgram, setTeachUserExerciseProgram } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName, coreBalance } from "../../redux/personalUser";
import Mission from '../Nutrition/Mission';
import Modal from "react-native-modal";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { List } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { convertFormatDate, calculateWeekInProgram } from "../../helpers/utils";
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import i18next, { t } from 'i18next';



//บทความ
import Ab1 from '../../components/exercise/Ab1';
import Ab2 from '../../components/exercise/Ab2';
import Cd1 from '../../components/exercise/Cd1';
import C2 from '../../components/exercise/C2';
import C3 from '../../components/exercise/C3';
import C4 from '../../components/exercise/C4';
import C5 from '../../components/exercise/C5';
import C6 from '../../components/exercise/C6';
import Continuous from '../../components/exercise/Continuous';

//บทความ
import Ab1_eng from '../../components/exercise/Ab1_eng';
import Ab2_eng from '../../components/exercise/Ab2_eng';
import Cd1_eng from '../../components/exercise/Cd1_eng';
import C2_eng from '../../components/exercise/C2_eng';
import C3_eng from '../../components/exercise/C3_eng';
import C4_eng from '../../components/exercise/C4_eng';
import C5_eng from '../../components/exercise/C5_eng';
import C6_eng from '../../components/exercise/C6_eng';


const data = Array.from({ length: 3 });
var lines1 = 1;

class ArticleTemplate extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            scrollY: new Animated.Value(0),
            study: true,
            statusBarColor: "light",
            id: null,
            expanded: false,
            start: 1,
            heading: null,
            mission_activities: null,
            week_in_program: null,
            stipTeach: 1,

        };
    }

    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission, route, exerciserActivity, statusExerciserActivity, teachUserExArticleTemplate } = this.props;

        const { statusPags, id, heading, mission_activities } = this.props.route.params;

        const week_in_program = calculateWeekInProgram(user && user.start_date);
        this.setState({
            week_in_program: week_in_program,
            heading: heading,
        })

        if (statusPags == "ExHistory") {
            this.setState({
                study: false
            })
        }

        exerciserActivity && exerciserActivity.map((item, i) => {
            if (item.week_in_program === id) {
                this.setState({
                    id: id,
                    mission_activities: JSON.parse(item.mission_activities)
                })
            }

        })


        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.getExerciserActivity(user && user.user_id);
        });



    }


    componentWillUnmount() {
        this._unsubscribe();
    }


    componentDidUpdate(prevProps, prevState) {
        const { nutrition_mission, user, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, exerciserActivity, statusExerciserActivity } = this.props;
        const { id } = this.state;

        if ((prevProps.statusExerciserActivity !== statusExerciserActivity) && (statusExerciserActivity === "success")) {

            exerciserActivity && exerciserActivity.map((item, i) => {
                if (item.week_in_program === id) {
                    this.setState({
                        id: id,
                        mission_activities: JSON.parse(item.mission_activities)
                    })
                }

            })
        }
    }

    slideDown = () => {
        Animated.timing(this.slideAnim, {
            toValue: 1,
            /* duration: 400, */ //ถ้าต้องการให้มันเร็วขึ้นเวลาเลื่อนขขึ้น
            duration: 400,
            useNativeDriver: false
        }).start();
    };

    slideUp = () => {
        Animated.timing(this.slideAnim, {
            toValue: 0,
            /*  duration: 200, */ // ถ้าต้องการให้มันเร็วขึ้นเวลาเลื่อนลง
            duration: 200,
            useNativeDriver: false
        }).start();
    };



    toggleModal(e) {
        const { isModalVisible } = this.state;
        this.setState({
            isModalVisible: !isModalVisible
        })
        if (e === 'Report') {
            this.props.navigation.navigate("Report")
        } else {
            this.props.navigation.navigate("Quiz")
        }

    }

    renderCheckArticle() { //เช็คว่าจะแสดงบทความไหน โดยใช้ mission_id
        const { mission_id } = this.props.route.params;
        const languages = i18next.languages[0];


        return (
            <View style={{ flex: 1, marginHorizontal: 16, }}>

                {(mission_id === '1ab') && (languages == "th" ? <Ab1 /> : <Ab1_eng />)}
                {(mission_id === '2ab') && (languages == "th" ? <Ab2 /> : <Ab2_eng />)}
                {(mission_id === '1cd') && (languages == "th" ? <Cd1 /> : <Cd1_eng />)}
                {((mission_id === '2c_1') || (mission_id === '2c_2')) && (languages == "th" ? <C2 /> : <C2_eng />)}
                {((mission_id === '3c_1') || (mission_id === '3c_2')) && (languages == "th" ? <C3 /> : <C3_eng />)}
                {((mission_id === '4c_1') || (mission_id === '4c_2')) && (languages == "th" ? <C4 /> : <C4_eng />)}
                {((mission_id === '5c_1') || (mission_id === '5c_2')) && (languages == "th" ? <C5 /> : <C5_eng />)}
                {((mission_id === '6c_1') || (mission_id === '6c_2')) && (languages == "th" ? <C6 /> : <C6_eng />)}
                {((mission_id === 'continuous')) && (languages == "th" ? <Continuous /> : <Continuous />)}
            </View>
        )
    }

    handlePress = () => {
        const { expanded } = this.state;
        this.setState({
            expanded: !expanded
        })
    };

    actionPress(id, name) {

        //  Core+Balance+Plyometric  Core+Balance
        if ((name == "Core+Balance+Plyometric") || (name == "Core+Balance") || (name == "Resistance") || (name == "Flexibility")) {
            this.props.navigation.navigate("Exercise", { name: name })
        } else {
            this.props.setIntensityFromExArticleTemplate(id)
            this.props.navigation.navigate("ExAdd", { activity_id: id })


        }


    }

    calPercent(summaxScoreCompleted, sumMaxNumber) {
        const maxPercent = 100;
        let currPercent = summaxScoreCompleted * (100 / sumMaxNumber)
        if (currPercent > maxPercent) {
            currPercent = 100
        }
        return currPercent;
    }

    calMaxScore(data) {
        let maxScore = 0;
        data && data.map((item, i) => {
            maxScore += item.number * item.score;
        })

        return maxScore;
    }

    calScoreSum(data) {
        let sumScore = 0;

        data && data.map((item, i) => {
            const maxScore = item.number * item.score;

            if ((item.number_completed * item.score) > maxScore) {
                sumScore += maxScore;
            } else {
                sumScore += item.number_completed * item.score;
            }
            //sumScore += item.number_completed * item.score;
        })

        return sumScore;
    }

    missionDataView(data) {


        const { expanded, start, mission_activities, week_in_program, id } = this.state
        const scoreProgress = 50;
        const deviceWidth = Math.round(Dimensions.get('window').width - 30);
        const deviceHeight = Math.round(Dimensions.get('window').height + 100);
        const sumMaxNumber = this.calMaxScore(data);
        const summaxScoreCompleted = this.calScoreSum(data);

        const { t } = this.props;

        return (
            <View style={{ flex: 1, marginTop: 24, marginHorizontal: 16, height: deviceHeight, marginBottom: 80 }} key={"vre"}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.target}>{t('goals_this_week')}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.score}>{(summaxScoreCompleted)}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.maxScore}>/{sumMaxNumber}</Text>
                            <Image source={require('../../assets/images/icon/Firepoint.png')}
                                style={{ width: 12, height: 12, marginLeft: 4, marginTop: 8 }}
                            />
                        </View>

                    </View>
                </View>
                <View style={{ backgroundColor: colors.grey6, borderRadius: 4, marginTop: 8, zIndex: 1 }}>
                    <ProgressBarAnimated
                        width={deviceWidth}
                        value={this.calPercent(summaxScoreCompleted, sumMaxNumber)}
                        height={24}
                        marginRight={150}
                        backgroundColor={colors.orange}
                        borderColor={colors.white}
                    />
                </View>
                <List.Section style={{ marginLeft: -16, marginTop: -8, zIndex: 0 }}>
                    <List.Accordion style={{ backgroundColor: colors.white }}
                        title={<Text style={styles.titleAccordion}>{t('scoring_criteria')}</Text>}
                        right={props =>
                            <List.Icon {...props} icon={({ size, color, direction }) => (
                                expanded ?
                                    <Image
                                        source={require('../../assets/images/icon/ChevronUp.png')}
                                        style={{ width: 16, height: 16, marginRight: -15 }}
                                    />
                                    :
                                    <Image
                                        source={require('../../assets/images/icon/ChevronDown.png')}
                                        style={{ width: 16, height: 16, marginRight: -15 }}
                                    />
                            )}

                            />}
                        expanded={expanded}
                        onPress={this.handlePress}>
                        {
                            data && data.map((item, i) => {
                                var datalength = data.length;
                                var index = i + 1;
                                var score = item.score;

                                return (
                                    <View style={{
                                        marginLeft: 16, backgroundColor: (i % 2) == 0 ? colors.grey7 : colors.grey6,
                                        paddingHorizontal: 16, borderTopLeftRadius: index == 1 ? 8 : 0, borderTopRightRadius: index == 1 ? 8 : 0,
                                        borderBottomLeftRadius: index == datalength ? 8 : 0, borderBottomRightRadius: index == datalength ? 8 : 0,
                                        flexDirection: "row", justifyContent: "space-between"
                                    }} key={i + "vi"}>
                                        <Text style={styles.expand_answerText}>
                                            {item.name}  {item.number} {t('episode')}
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                            {
                                                score == "1" ?
                                                    <Image source={require('../../assets/images/icon/Firepoint.png')}
                                                        style={{ width: 12, height: 12, marginTop: 7 }}
                                                    />
                                                    : score == 2 ?
                                                        <>
                                                            <Image source={require('../../assets/images/icon/Firepoint.png')}
                                                                style={{ width: 12, height: 12, marginTop: 7 }}
                                                            />
                                                            <Image source={require('../../assets/images/icon/Firepoint.png')}
                                                                style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                                            />
                                                        </>
                                                        :
                                                        score == 3 ?
                                                            <>
                                                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                                                    style={{ width: 12, height: 12, marginTop: 7 }}
                                                                />
                                                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                                                />
                                                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                                                />
                                                            </>
                                                            : null
                                            }

                                        </View>
                                    </View>
                                )
                            })
                        }
                    </List.Accordion>
                </List.Section >
                <Text style={styles.challenge}>{t('challenge')}</Text>
                {
                    data && data.map((item, i) => {
                        var dataLength = data.length;
                        const multiple = (100 / item.number) * item.number_completed;
                        var maxScore = item.number * item.score;
                        var score_completed = item.number_completed * item.score;
                        return (
                            <View key={i + "vid"}>
                                <Pressable


                                    onPress={() =>

                                        week_in_program == id &&
                                        /*   ((item.id === "light_intensity") || (item.id === "moderate_intensity") || (item.id === "vigorous_intensity") || (item.id === "cardio")) && */
                                        this.actionPress(item.id, item.name)} key={i + "tfb"}
                                >
                                    <View key={i} style={styles.row}>
                                        <View style={styles.numberView}>
                                            <AnimatedCircularProgress
                                                size={64}
                                                width={6}
                                                fill={multiple}
                                                tintTransparency={true}
                                                rotation={360}
                                                tintColor={colors.positive1}
                                                backgroundColor={colors.grey6} >
                                                {

                                                    (fill) => (
                                                        <>
                                                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                                <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: item.number_completed == 0 ? "IBMPlexSansThai-Regular" : "IBMPlexSansThai-Bold", marginTop: -10 }}>{item.number_completed}</Text>
                                                                <Text style={{ color: colors.grey1, fontSize: 12, fontFamily: "IBMPlexSansThai-Regular", marginTop: -5 }}> /{item.number}</Text>
                                                            </View>
                                                            <Text style={{ color: colors.grey2, fontSize: 12, fontFamily: "IBMPlexSansThai-Regular", marginTop: -5 }}>{t('episode')}</Text>
                                                        </>
                                                    )

                                                }
                                            </AnimatedCircularProgress>
                                        </View>
                                        <View style={styles.missionData}>
                                            <Text style={styles.missionHead}>
                                                {
                                                    (item.id === 'light_intensity') ?
                                                        t('do_low_intensity')
                                                        :
                                                        (item.id === 'moderate_intensity') ?
                                                            t('do_moderate_intensity')
                                                            :
                                                            (item.id === 'vigorous_intensity') ?
                                                                t('do_hight_intensity')
                                                                :
                                                                item.name
                                                }
                                            </Text>
                                            <View style={{ flexDirection: "row" }}>
                                                {
                                                    Array.from({ length: maxScore }) && Array.from({ length: maxScore }).map((item, i) => {
                                                        return (
                                                            <Image style={[i > 0 ? { marginLeft: 4 } : null, { width: 16, height: 16, marginTop: 8 }]} source={
                                                                score_completed >= ++i ?
                                                                    require('../../assets/images/icon/Firepoint.png')
                                                                    :
                                                                    require('../../assets/images/icon/Firepoint2.png')
                                                            } />
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                        <View style={styles.viewIconRight}>
                                            {
                                                week_in_program == id &&
                                                /*   ((item.id === "light_intensity") || (item.id === "moderate_intensity") || (item.id === "vigorous_intensity") || (item.id === "cardio")) && */
                                                <Image
                                                    style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                    source={require('../../assets/images/icon/right.png')}
                                                />
                                            }

                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })
                }
            </View >
        )
    }
    handleTextLayout = (event) => {
        const { lines } = event.nativeEvent;

        lines1 = lines.length
    };

    render() {
        const { study, statusBarColor, id, heading, mission_activities, stipTeach } = this.state;
        const isHeight = Dimensions.get('window').height;
        const height568 = isHeight < 569 ? 20 : 0;


        const headingMarginTop = lines1 && lines1 == 1 ? 120 - height568 : lines1 && lines1 == 2 ? 160 - height568 : lines1 && lines1 == 3 ? 190 - height568 : 220 - 20;
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [lines1 && lines1 == 1 ? 120 : lines1 && lines1 == 2 ? 160 : lines1 && lines1 == 3 ? 190 : 220, 16],
            extrapolate: 'clamp',
        });

        const { teachUserExArticleTemplate, user } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ height: 44, zIndex: 10, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                    {
                        statusBarColor === "light" ?
                            <StatusBar barStyle="light-content" />
                            :
                            <StatusBar barStyle="dark-content" />
                    }
                </View>
                <View style={{ height: 44, zIndex: 3, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                    <View style={{ marginLeft: 16 }}>
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <Image style={{ width: 24, height: 24 }}
                                source={statusBarColor === "light" ? require('../../assets/images/icon/chevron.png') : require('../../assets/images/icon/caret.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <View style={ComponentsStyle.headBox}>
                        <View style={ComponentsStyle.areaNumber}>
                            <Text style={ComponentsStyle.areaNumberText}>
                                {id}
                            </Text>
                        </View>
                        <View style={[ComponentsStyle.nutritionMission, { paddingRight: 16 }]}>
                            <Text style={ComponentsStyle.missionHead}>{t('exercise_mission')}</Text>
                            <Text style={[ComponentsStyle.missionHeading, { marginRight: 16 }]} onTextLayout={this.handleTextLayout} /* numberOfLines={2} */>{heading}</Text>
                        </View>
                    </View>

                </Animated.View>
                <View style={styles.heading}>
                    <View style={{ paddingLeft: 16, width: "50%" }}>
                        <View style={[study === true ? styles.boxHeadingActive : styles.boxHeading]}>
                            <Pressable onPress={() => this.setState({
                                study: true
                            })}>
                                <Text style={study === true ? styles.sectionActive : styles.section}> {t('knowledge')}</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ paddingRight: 16, width: "50%" }}>

                        <View style={study !== true ? styles.boxHeadingActive : styles.boxHeading}>
                            <Pressable onPress={() => this.setState({
                                study: false
                            })}>
                                <Text style={study !== true ? styles.sectionActive : styles.section}> {t('mission')}</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        {
                            useNativeDriver: false,
                            listener: event => {
                                const scrolling = event.nativeEvent.contentOffset.y;
                                if (scrolling > 200) {
                                    this.setState({
                                        statusBarColor: "dark"
                                    });
                                    this.slideDown();
                                } else {
                                    this.setState({
                                        statusBarColor: "light"
                                    });
                                    this.slideUp();
                                }
                            }
                        }
                    )}
                    scrollEventThrottle={16}
                >
                    <View style={{ marginTop: 0,/*  height: "100%", */ }}>

                        {
                            study ?
                                this.renderCheckArticle()
                                :
                                this.missionDataView(mission_activities)
                        }
                        {
                            study &&
                            <View style={[styles.areaViewText, { marginTop: 30, marginBottom: 100, paddingBottom: 50 }]}>
                                <Text style={{
                                    color: colors.grey1,
                                    fontSize: ComponentsStyle.fontSize16,
                                    fontFamily: "IBMPlexSansThai-Regular",
                                    textAlign: "center"
                                }}>{'Ref. (อ้างอิง)'}</Text>
                                <Text style={{
                                    color: colors.grey1,
                                    fontSize: ComponentsStyle.fontSize16,
                                    fontFamily: "IBMPlexSansThai-Regular",
                                    textAlign: "center"
                                }}>{`Campbell , B. (2021). NSCA's guide to sport and exercise nutrition, 2nd edition.`}</Text>
                            </View>
                        }
                    </View>
                </ScrollView>

                <View style={{ zIndex: 10, }}>
                    <Animated.View
                        style={{
                            transform: [{
                                translateY: this.slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 100]
                                })
                            }],
                            marginBottom: 0,
                            bottom: 0,
                            height: study == true ? 0 : 0,
                            paddingHorizontal: 16,
                            backgroundColor: colors.white,
                            // statusBarColor: "light"
                        }}
                    >

                        {/* {
                            study ?
                                <Pressable onPress={() => this.props.navigation.navigate("Quiz")} >
                                    <View style={ComponentsStyle.button} >
                                        <Text style={ComponentsStyle.textButton}>
                                            ดูวีดีโอ
                                        </Text>
                                    </View>
                                </Pressable>
                                :
                                null
                        } */}
                    </Animated.View>
                </View>

                <Modal isVisible={true/* teachUserExArticleTemplate */} style={{ zIndex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.setTeachUserExArticleTemplate(user && user.user_id, "false");
                        this.props.setTeachUserExerciseProgram(user && user.user_id, "true");
                        this.props.setTeachUserExercise(user && user.user_id, "false");
                        this.props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    { name: 'HomeTab' }
                                ],
                            })
                        );
                    }
                    }>
                        <Text style={{
                            fontSize: ComponentsStyle.fontSize16,
                            fontFamily: "IBMPlexSansThai-Bold",
                            color: colors.white,
                            marginTop: Platform.OS === 'android' ? -10 : 20,
                            textAlign: "right",
                            marginRight: 20,

                        }}>{t('cross')}</Text>
                    </TouchableWithoutFeedback>

                    <View style={{ flex: 1, alignItems: stipTeach == 1 ? "flex-start" : "flex-end", justifyContent: "flex-start", marginTop: isHeight < 569 ? headingMarginTop + 19 : headingMarginTop - 6 /* marginTop: Platform.OS === 'android' ? "36%" : isNotchDevice ? "33.1%" : "35%" */ }}>
                        <View style={{

                            marginLeft: -10,
                            backgroundColor: 'white',
                            width: 200,
                            /* height: "atuo", */
                            borderRadius: 16,
                            paddingBottom: 10,
                            paddingTop: 10,
                            /* padding: stipTeach === 1 ? 10 : 0, */
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

                            <View style={{
                                width: "100%",
                                marginTop: -16,
                                paddingTop: 16,
                                flexDirection: "row",
                                zIndex: 10,
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                                justifyContent: "flex-end",
                            }}>
                                {
                                    stipTeach === 1 ?
                                        <View style={{ paddingLeft: 16, width: "100%" }}>
                                            <View style={[{ marginLeft: -16 }, study === true ? styles.boxHeadingActive : styles.boxHeading]}>
                                                <Pressable onPress={() => this.setState({
                                                    study: true
                                                })}>
                                                    <Text style={study === true ? styles.sectionActive : styles.section}> {t('knowledge')}</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ paddingRight: 16, width: "100%" }}>
                                            <View style={study !== true ? styles.boxHeadingActive : styles.boxHeading}>
                                                <Pressable onPress={() => this.setState({
                                                    study: false
                                                })}>
                                                    <Text style={study !== true ? styles.sectionActive : styles.section}> {t('mission')}</Text>
                                                </Pressable>
                                            </View>

                                        </View>
                                }





                            </View>
                            {/*  */}


                        </View>
                        <Image
                            style={{ height: 16, width: 32, zIndex: 1, marginTop: 13, marginLeft: stipTeach === 1 ? "10%" : 0, marginRight: stipTeach === 2 ? "10%" : 0 }}
                            source={require('../../assets/images/icon/Rectangle11.png')}
                        />
                        <View style={{
                            width: 288,
                            height: 117,
                            backgroundColor: "white",
                            marginBottom: 30,
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
                                    stipTeach == 1 ? `${t('about_exercises')}` : `${t('about_view_exercise+')}`
                                }
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({ stipTeach: stipTeach === 1 ? 1 : stipTeach - 1 })
                                    if (stipTeach == 1) {
                                        this.props.setTeachUserExercise(user && user.user_id, "true");
                                        /*    this.props.setTeachUserArticleTemplate(true); */
                                        /*  this.props.navigation.navigate("ExerciseTab") */
                                        this.props.navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [
                                                    { name: 'ExerciseTab' }
                                                ],
                                            })
                                        );
                                    }
                                }}>
                                    <View style={{
                                        backgroundColor: colors.white, width: 52, height: 27, alignItems: "center",
                                        borderRadius: 16, justifyContent: "center", marginTop: 16,
                                    }}>
                                        <Text style={{
                                            fontSize: ComponentsStyle.fontSize16,
                                            fontFamily: "IBMPlexSansThai-Bold",
                                            color: colors.persianBlue,
                                        }}>{t('go_back')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({
                                        stipTeach: stipTeach === 2 ? 2 : stipTeach + 1
                                    })

                                    if (stipTeach == 2) {
                                        this.props.setTeachUserExArticleTemplate(user && user.user_id, "false");
                                        this.props.setTeachUserExerciseProgram(user && user.user_id, "false");
                                        this.props.setTeachUserExercise(user && user.user_id, "true");
                                        this.props.navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [
                                                    { name: 'ExerciseTab' }
                                                ],
                                            })
                                        );
                                    }

                                }
                                }>

                                    <View style={{
                                        backgroundColor: colors.persianBlue, width: 52, height: 27, alignItems: "center",
                                        borderRadius: 16, justifyContent: "center", marginTop: 16,
                                    }}>
                                        <Text style={{
                                            fontSize: ComponentsStyle.fontSize16,
                                            fontFamily: "IBMPlexSansThai-Bold",
                                            color: colors.white,
                                        }}>{t('next')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>
                    </View>
                </Modal >
            </View >
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    /*  heading: {
         marginTop: 16,
         flexDirection: "row",
         marginHorizontal: 16,
 
     },
  */
    heading: {
        width: "100%",
        marginTop: -16,
        paddingTop: 16,
        flexDirection: "row",
        /*         marginHorizontal: 16, */
        backgroundColor: colors.white,
        zIndex: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: "flex-end",
        /*      marginBottom: 24 */
    },
    boxHeadingActive: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        /*   width: "50%", */
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        /*   width: "50%", */
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.grey4
    },
    sectionActive: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        width: "100%",
        textAlign: "center",
    },
    section: {
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center",
    },
    studyContent: {
        marginHorizontal: 16,
        flex: 1,
        position: "relative",
    },
    boxButtonWhite: {
        height: "auto",
        width: "100%",
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: -15,
        },
        shadowOpacity: 0.58,
        /*   shadowRadius: 10.00, */
        elevation: 0,
        marginBottom: (deviceHeight != 844) ? 40 : 40,
        paddingHorizontal: 16
    },
    textHead: {
        marginTop: 24,
        fontSize: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textContent: {
        fontSize: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    centeredView: {
        margin: 0,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",


    },
    modalView: {
        position: "relative",
        zIndex: 10,
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 16,
        height: "auto",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        /*      marginTop: 0, */
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: 0,
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24
    },
    imageGeneric: {
        marginTop: 22,
        position: "relative",
        width: 120,
        height: 120
    },
    modalText: {
        marginTop: 24,
        textAlign: "center",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    modalText2: {
        width: "90%",
        marginTop: 8,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
    },
    buttonView: {
        marginTop: 32,
        width: "100%",

    },
    buttonCross: {
        marginTop: 21,
        width: "100%",
        marginBottom: 40
    },
    textCross: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",
    },
    target: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.grey1,
    },
    score: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
        color: colors.grey1,
    },
    maxScore: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 12,
        color: colors.grey1,
        marginTop: 4
    },
    container2: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 50,
        padding: 15,
    },
    buttonContainer: {
        marginTop: 15,
    },
    separator: {
        marginVertical: 30,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
    },
    label: {
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    },
    expand_answerText: {
        fontSize: 14,
        color: colors.grey2,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    titleAccordion: {
        marginLeft: -30,
        fontSize: 16,
        color: colors.grey2,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    challenge: {
        marginTop: 0,
        zIndex: 3,
        fontSize: 16,
        color: colors.grey1,
        marginBottom: 8,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    row: {
        position: "relative",
        maxHeight: 170,
        height: "auto",
        marginBottom: 16,
        backgroundColor: colors.white,
        borderRadius: 8,
        flexDirection: "row",
        borderColor: colors.grey4,
        borderWidth: 1
    },
    numberView: {
        /*  marginRight: 8, */
        paddingVertical: 14,
        paddingLeft: 16
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.mayaBlue,

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
        marginRight: 16
    },
    missionContent: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    iconRight: {
        fontSize: ComponentsStyle.fontSize24,
        color: colors.positive1,
        marginRight: 8,
    },
    viewIconRight: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",

    },
    header: {
        marginTop: -16,
        backgroundColor: colors.persianBlue,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,

    },
    content: {
        backgroundColor: colors.white,
        zIndex: 12
    },
});

const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { coreBalanceRoute } = personalDataUser;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission, exerciserActivity, statusExerciserActivity, teachUserExArticleTemplate } = getData;
    return { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, user, coreBalanceRoute, exerciserActivity, statusExerciserActivity, teachUserExArticleTemplate };
};

const mapActionsToProps = {
    logoutUser, getNutritionMission, getNutritionActivityIdMission, coreBalance, getExerciserActivity, setIntensityFromExArticleTemplate, setTeachUserExercise,
    setTeachUserExArticleTemplate, setTeachUserExerciseProgram, getTeachUserExercise, getTeachUserExArtTemp, getTeachUserExerciseProgram
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ArticleTemplate));