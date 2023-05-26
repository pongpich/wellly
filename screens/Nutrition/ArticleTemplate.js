import React, { Component } from 'react'
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, TouchableOpacity, Image, Text, Pressable, Platform, Animated, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { setTeachUserArticleTemplate, setTeachUserNutrtion, routeName } from "../../redux/personalUser";
import Mission from '../Nutrition/Mission';
import Modal from "react-native-modal";
import { CommonActions } from '@react-navigation/native';

//บทความ
import Gn1 from '../../components/knowledge/Gn1';
import Gn2 from '../../components/knowledge/Gn2';
import Gn3 from '../../components/knowledge/Gn3';
import Gn4 from '../../components/knowledge/Gn4';
import Gn5 from '../../components/knowledge/Gn5';
import Gn6 from '../../components/knowledge/Gn6';
import Sna1 from '../../components/knowledge/Sna1';
import Sna2 from '../../components/knowledge/Sna2';
import Snb1 from '../../components/knowledge/Snb1';
import Snb2 from '../../components/knowledge/Snb2';
import Snc1 from '../../components/knowledge/Snc1';
import Snc2 from '../../components/knowledge/Snc2';

class ArticleTemplate extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);
        this.state = {
            scrollY: new Animated.Value(0),
            numberMission: null,
            study: true,
            quiz: null,
            statusQuiz: null,
            statusMission: null,
            statusBarColor: "light",
            isModalVisible: false,
            week_in_program: null,
            mission_id: "null",
            stipTeach: 1
        };
    }

    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission, route, teachUserArticleTemplate } = this.props;

        /*   if (teachUserArticleTemplate === 'undefined') {
              this.props.setTeachUserArticleTemplate(true);
          } */
        /*   this.props.setTeachUserArticleTemplate(true); */
        // รับ   params จาก  route
        const { id, mission_id } = this.props.route.params;

        this.props.getNutritionActivityIdMission(user.user_id, mission_id);
        this.props.getNutritionMission(mission_id);

        this.setState({
            numberMission: id,
        });
        if (nutrition_activity_id_Mission) {
            if (nutrition_activity_id_Mission.quiz_activities_number != "null") {
                this.setState({
                    statusQuiz: nutrition_activity_id_Mission.quiz_activities_number,
                })
            }
            this.setState({

                statusMission: nutrition_activity_id_Mission.assessment_kit_number
            })
            this.setState({
                mission_id: nutrition_activity_id_Mission.id,
                week_in_program: nutrition_activity_id_Mission.week_in_program
            })
        }


        this.props.routeName('null');


    }

    componentDidUpdate(prevProps, prevState) {
        const { nutrition_mission, user, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission } = this.props;


        if ((prevProps.statusGetNutritionActivityIdMission !== statusGetNutritionActivityIdMission) && (statusGetNutritionActivityIdMission === "success")) {

            if (nutrition_activity_id_Mission != null) {
                if (nutrition_activity_id_Mission.quiz_activities_number != "null") {
                    this.setState({
                        statusQuiz: nutrition_activity_id_Mission.quiz_activities_number,
                    })
                } else {
                    this.setState({
                        statusQuiz: null
                    })
                }

                this.setState({
                    statusMission: nutrition_activity_id_Mission.assessment_kit_number
                })
                this.setState({
                    mission_id: nutrition_activity_id_Mission.id,
                    week_in_program: nutrition_activity_id_Mission.week_in_program
                })
            }


        }
    }

    slideDown = () => {
        Animated.timing(this.slideAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false
        }).start();
    };

    slideUp = () => {
        Animated.timing(this.slideAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
        }).start();
    };

    evaluatePress() {
        const { nutrition_activity_id_Mission } = this.props;
        const { mission_id } = this.state;

        if (nutrition_activity_id_Mission) {
            if (nutrition_activity_id_Mission.quiz_activities_number) {
                this.props.navigation.navigate("Report")
            } else if (mission_id === "snc1") {
                this.props.navigation.navigate("Report")
            } else {
                this.setState({
                    isModalVisible: true
                })
            }
        }
    }

    toggleModal(e) {
        const { isModalVisible } = this.state;
        this.setState({
            isModalVisible: !isModalVisible
        })
        if (e == 'Report') {
            this.props.navigation.navigate("Report")
        } else {
            this.props.navigation.navigate("Quiz")
        }

    }

    renderCheckArticle() { //เช็คว่าจะแสดงบทความไหน โดยใช้ mission_id
        const { mission_id } = this.props.route.params;
        return (
            <View style={{ marginTop: 24, }}>
                {(mission_id === 'gn1') && <Gn1 />}
                {(mission_id === 'gn2') && <Gn2 />}
                {(mission_id === 'gn3') && <Gn3 />}
                {(mission_id === 'gn4') && <Gn4 />}
                {(mission_id === 'gn5') && <Gn5 />}
                {(mission_id === 'gn6') && <Gn6 />}
                {(mission_id === 'sna1') && <Sna1 />}
                {(mission_id === 'sna2') && <Sna2 />}
                {(mission_id === 'snb1') && <Snb1 />}
                {(mission_id === 'snb2') && <Snb2 />}
                {(mission_id === 'snc1') && <Snc1 />}
                {(mission_id === 'snc2') && <Snc2 />}
            </View>
        )
    }

    onScrollToEnd = event => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // ค่าพื้นที่ว่างด้านล่างสุดที่ใช้เพื่อตรวจสอบ
        if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        ) {
            console.log("ScrollView has reached the end!");
            this.slideUp();
        }
    };


    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [140, 16],
            extrapolate: 'clamp',
        });

        const { statusBarColor, numberMission, study, statusQuiz, statusMission, isModalVisible, week_in_program, mission_id, scrollY, slideAnimation, stipTeach } = this.state;
        const { nutrition_activity_id_Mission, teachUserArticleTemplate } = this.props;
        const { heading } = this.props.route.params;
        const isNotchDevice = Dimensions.get('window').height >= 812;

        const isHeight = Dimensions.get('window').height;



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
                <View style={{ height: 33, zIndex: 20, /* justifyContent: "center", */ width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
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
                        <View style={[ComponentsStyle.areaNumber]}>
                            <Text style={ComponentsStyle.areaNumberText}>
                                {numberMission}
                            </Text>
                        </View>
                        <View style={ComponentsStyle.nutritionMission}>
                            <Text style={[ComponentsStyle.missionHead]}>ภารกิจโภชนาการ</Text>
                            <Text style={[ComponentsStyle.missionHeading, { marginRight: 32 }]}>{heading}</Text>
                        </View>
                    </View>

                </Animated.View>
                <View style={styles.heading}>
                    <View style={{ paddingLeft: 16, width: "50%" }}>
                        <View style={[study === true ? styles.boxHeadingActive : styles.boxHeading]}>
                            <Pressable onPress={() => this.setState({
                                study: true
                            })}>
                                <Text style={study === true ? styles.sectionActive : styles.section}> ความรู้</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ paddingRight: 16, width: "50%" }}>

                        <View style={study !== true ? styles.boxHeadingActive : styles.boxHeading}>
                            <Pressable onPress={() => this.setState({
                                study: false
                            })}>
                                <Text style={study !== true ? styles.sectionActive : styles.section}> ภารกิจ</Text>
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
                                this.onScrollToEnd(event);
                            }
                        }
                    )}
                    scrollEventThrottle={16}
                >
                    <View style={{ marginHorizontal: 16, marginTop: -30, paddingBottom: 40/*  height: "100%", */ }}>
                        {
                            study ?
                                this.renderCheckArticle()
                                :
                                <View style={{ marginTop: 2 }}>
                                    <Mission />
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
                                    outputRange: [0, 200]
                                })
                            }],

                            bottom: 0,
                            height: ((week_in_program == "4") || (mission_id == "snc1") && study == true) ? 0 : 80,
                            paddingHorizontal: 16,
                            backgroundColor: colors.white,
                            position: "absolute",
                            width: "100%"
                        }}
                    >

                        {
                            study ?
                                week_in_program != "4" ?
                                    statusQuiz == null ?


                                        <Pressable onPress={() => this.props.navigation.navigate("Quiz")} >
                                            <View style={ComponentsStyle.button} >
                                                <Text style={ComponentsStyle.textButton}>
                                                    ทำแบบฝึกหัด
                                                </Text>
                                            </View>
                                        </Pressable>
                                        :
                                        <Pressable onPress={() => this.props.navigation.navigate("QuizAnswer")} >
                                            <View style={ComponentsStyle.buttonWhite} >
                                                <Text style={ComponentsStyle.textButtonWhite}>
                                                    ดูผลตรวจแบบฝึกหัด
                                                </Text>
                                            </View>
                                        </Pressable>
                                    : null
                                :

                                week_in_program != "4" ?
                                    statusMission == "1" ?

                                        <Pressable onPress={() => this.props.navigation.navigate("ReportFeedback")} >
                                            <View style={ComponentsStyle.buttonWhite} >
                                                <Text style={ComponentsStyle.textButtonWhite}>
                                                    ดูผลการประเมิน
                                                </Text>
                                            </View>
                                        </Pressable>
                                        :
                                        <Pressable onPress={() => this.evaluatePress()} >
                                            <View style={ComponentsStyle.button} >
                                                <Text style={ComponentsStyle.textButton}>
                                                    ประเมินผล
                                                </Text>
                                            </View>
                                        </Pressable>
                                    :
                                    null
                        }
                    </Animated.View>
                </View>
                <View>
                    <Modal isVisible={isModalVisible}

                        style={styles.centeredView}
                    >
                        <View style={styles.modalView}>
                            <Image
                                style={styles.imageGeneric}
                                source={require('../../assets/images/icon/Contextual1.png')}
                            />
                            <Text style={styles.modalText}>เอ๊ะ! คุณยังทำแบบฝึกหัดไม่เสร็จ</Text>
                            <Text style={styles.modalText2}>คุณอาจดูแลสุขภาพตัวเองได้ดียิ่งขึ้น จากการทดสอบผ่านแบบฝึกหัด</Text>
                            <View style={styles.buttonView}>
                                <Pressable style={ComponentsStyle.button} onPress={() => this.toggleModal('Quiz')} >
                                    <Text style={ComponentsStyle.textButton}>ทำแบบฝึกหัด</Text>
                                </Pressable>
                            </View>
                            <Pressable style={styles.buttonCross} onPress={() => this.toggleModal('Report')} >
                                <Text style={styles.textCross}>ภายหลัง</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>

                <Modal isVisible={teachUserArticleTemplate} style={{ zIndex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => {
                        /* dispatch(setTeachUserNutrtion(false)); */
                        this.props.setTeachUserArticleTemplate(false);
                        this.props.navigation.navigate("ExerciseTab")
                    }
                    }>
                        <Text style={{
                            fontSize: ComponentsStyle.fontSize16,
                            fontFamily: "IBMPlexSansThai-Bold",
                            color: colors.white,
                            marginTop: Platform.OS === 'android' ? -10 : 20,
                            textAlign: "right",
                            marginRight: 20,

                        }}>ข้าม</Text>
                    </TouchableWithoutFeedback>

                    <View style={{ flex: 1, alignItems: stipTeach == 1 ? "flex-start" : "flex-end", justifyContent: "flex-start", marginTop: 118 /* marginTop: Platform.OS === 'android' ? "36%" : isNotchDevice ? "33.1%" : "35%" */ }}>
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
                                                    <Text style={study === true ? styles.sectionActive : styles.section}> ความรู้</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        :
                                        <View style={{ paddingRight: 16, width: "100%" }}>
                                            <View style={study !== true ? styles.boxHeadingActive : styles.boxHeading}>
                                                <Pressable onPress={() => this.setState({
                                                    study: false
                                                })}>
                                                    <Text style={study !== true ? styles.sectionActive : styles.section}> ภารกิจ</Text>
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
                                    stipTeach == 1 ? "แท็บสำหรับอ่านเรียนรู้เกี่ยวกับโภชนาการเพื่อทำภารกิจสัปดาห์นั้น" : "แท็บสำหรับดูภารกิจด้านโภชนาการ ที่จะช่วยให้เข้าใจวิธีกินที่ถูกต้องเหมาะสม"
                                }
                            </Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({ stipTeach: stipTeach === 1 ? 1 : stipTeach - 1 })
                                    if (stipTeach == 1) {
                                        this.props.setTeachUserNutrtion(true);
                                        this.props.setTeachUserArticleTemplate(true);
                                        /*  this.props.navigation.navigate("ExerciseTab") */
                                        this.props.navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [
                                                    { name: 'NutritionTab' }
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
                                        }}>กลับ</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => {
                                    this.setState({
                                        stipTeach: stipTeach === 2 ? 2 : stipTeach + 1
                                    })

                                    if (stipTeach == 2) {
                                        this.props.setTeachUserArticleTemplate(false);
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
                                        }}>ถัดไป</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                        </View>
                    </View>
                </Modal >
            </View >
        );
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
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
        /* Í */
        /*   paddingTop: 8, */
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        /*  width: "50%", */
        /*  paddingTop: 8, */
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
    header: {
        marginTop: -16,
        backgroundColor: colors.persianBlue,
        alignItems: 'center',
        justifyContent: 'center',
        /*   height: 200, */

    },
    content: {
        backgroundColor: colors.white,
        zIndex: 12
    },


});


const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { teachUserArticleTemplate } = personalDataUser;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = getData;
    return { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, user, teachUserArticleTemplate };
};

const mapActionsToProps = { logoutUser, getNutritionMission, getNutritionActivityIdMission, routeName, setTeachUserArticleTemplate, setTeachUserNutrtion };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ArticleTemplate));

/* export default ScrollableHeader; */

