import React, { Component } from 'react'
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, TouchableOpacity, Image, Text, Pressable, Animated } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName } from "../../redux/personalUser";
import Mission from '../Nutrition/Mission';
import Modal from "react-native-modal";
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
            numberMission: null,
            study: true,
            quiz: null,
            statusQuiz: true,
            statusMission: true,
            statusBarColor: "light",
            isModalVisible: false,
            week_in_program: null,
            mission_id: "null"

        };
    }

    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission, route } = this.props;

        // รับ   params จาก  route
        const { id, mission_id } = this.props.route.params;
        //  console.log("nutrition_mission", nutrition_activity_id_Mission.week_in_program);

        this.props.getNutritionActivityIdMission(user.user_id, mission_id);
        this.props.getNutritionMission(mission_id);

        this.setState({
            numberMission: id,
        });
        if (nutrition_activity_id_Mission) {
            if (nutrition_activity_id_Mission.quiz_activities_number) {
                this.setState({
                    statusQuiz: false,
                    statusMission: nutrition_activity_id_Mission.assessment_kit_number
                })
            }

        }
        this.setState({
            mission_id: nutrition_activity_id_Mission.id,
            week_in_program: nutrition_activity_id_Mission.week_in_program
        })

        this.props.routeName('null');


    }

    componentDidUpdate(prevProps, prevState) {
        const { nutrition_mission, user, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission } = this.props;


        console.log("nutrition_activity_id_Mission", nutrition_activity_id_Mission.week_in_program);
        if ((prevProps.statusGetNutritionActivityIdMission !== statusGetNutritionActivityIdMission) && (statusGetNutritionActivityIdMission === "success")) {

            if (nutrition_activity_id_Mission.quiz_activities_number) {
                this.setState({
                    statusQuiz: false,
                })
            } else {
                this.setState({
                    statusQuiz: true,
                    statusMission: nutrition_activity_id_Mission.assessment_kit_number
                })
            }
            this.setState({
                mission_id: nutrition_activity_id_Mission.id,
                week_in_program: nutrition_activity_id_Mission.week_in_program
            })
        }
    }

    slideDown = () => {
        Animated.timing(this.slideAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    slideUp = () => {
        Animated.timing(this.slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    evaluatePress() {
        const { nutrition_activity_id_Mission } = this.props;
        // console.log("nutrition_activity_id_Mission.quiz_activities_number :", nutrition_activity_id_Mission.quiz_activities_number);
        if (nutrition_activity_id_Mission) {
            if (nutrition_activity_id_Mission.quiz_activities_number) {
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
        if (e === 'Report') {
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

    render() {
        const { statusBarColor, numberMission, study, statusQuiz, statusMission, isModalVisible, week_in_program, mission_id } = this.state;
        const { nutrition_activity_id_Mission } = this.props;
        const { heading } = this.props.route.params;
        /*         const { width, height } = Dimensions.get('window');
                const HeaderHeight = height * 0.200 */
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
                <View style={{ height: 48, zIndex: 3, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                    <View style={{ marginLeft: 16 }}>
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <Image
                                source={statusBarColor === "light" ? require('../../assets/images/icon/chevron.png') : require('../../assets/images/icon/caret.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={ComponentsStyle.headBox}>
                    <View style={ComponentsStyle.areaNumber}>
                        <Text style={ComponentsStyle.areaNumberText}>
                            {numberMission}
                        </Text>
                    </View>
                    <View style={ComponentsStyle.nutritionMission}>
                        <Text style={ComponentsStyle.missionHead}>ภารกิจโภชนาการ</Text>
                        <Text style={[ComponentsStyle.missionHeading, { marginRight: 32 }]}>{heading}</Text>
                    </View>
                </View>

                <Animated.View style={{
                    transform: [{
                        translateY: this.slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: (week_in_program == "3") || (week_in_program == "4") ? [0, -180] : [0, -140]
                        })
                    }],
                    flex: 1,
                    zIndex: 2,
                    marginTop: -10,
                    marginBottom: -200,
                }}>
                    <View style={ComponentsStyle.contentBox}>
                        <View style={styles.heading}>
                            <View style={study === true ? styles.boxHeadingActive : styles.boxHeading}>
                                <TouchableOpacity onPress={() => this.setState({
                                    study: true
                                })}>
                                    <Text style={study === true ? styles.sectionActive : styles.section}> ความรู้</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={study !== true ? styles.boxHeadingActive : styles.boxHeading}>
                                <TouchableOpacity onPress={() => this.setState({
                                    study: false
                                })}>
                                    <Text style={study !== true ? styles.sectionActive : styles.section}> ภารกิจ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView onScroll={(event) => {
                            const scrolling = event.nativeEvent.contentOffset.y;
                            if (scrolling > 100) {
                                this.setState({
                                    statusBarColor: "dark"
                                })

                                this.slideDown()
                            } else {
                                this.setState({
                                    statusBarColor: "light"
                                })
                                this.slideUp()
                            }
                        }}
                            style={{ flex: 1, marginBottom: -40 }}
                        >
                            <View style={{ marginHorizontal: 16, marginTop: -30, height: "100%", }}>
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
                    </View >
                </Animated.View >


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
                            height: ((week_in_program == "4") || (mission_id == "snc1") && study == true) ? 0 : 80,
                            paddingHorizontal: 16,
                            backgroundColor: colors.white,

                        }}
                    >

                        {
                            study ?
                                week_in_program != "4" ?
                                    statusQuiz && statusQuiz === true ?
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
                                    statusMission != "1" ?
                                        <Pressable onPress={() => this.evaluatePress()} >
                                            <View style={ComponentsStyle.button} >
                                                <Text style={ComponentsStyle.textButton}>
                                                    ประเมินผล
                                                </Text>
                                            </View>
                                        </Pressable>
                                        :
                                        <Pressable onPress={() => this.props.navigation.navigate("ReportFeedback")} >
                                            <View style={ComponentsStyle.buttonWhite} >
                                                <Text style={ComponentsStyle.textButtonWhite}>
                                                    ดูผลการประเมิน
                                                </Text>
                                            </View>
                                        </Pressable>
                                    :
                                    null
                        }
                    </Animated.View>
                </View>



                <View>
                    <Pressable title="Show modal" onPress={() => this.toggleModal(isModalVisible)} />

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
    heading: {
        marginTop: 16,
        flexDirection: "row",
        marginHorizontal: 16,

    },
    boxHeadingActive: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
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

});

const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = getData;
    return { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, user };
};

const mapActionsToProps = { logoutUser, getNutritionMission, getNutritionActivityIdMission, routeName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ArticleTemplate));