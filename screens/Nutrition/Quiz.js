import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, Modal, Pressable, TouchableOpacity } from 'react-native';
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import { logoutUser } from "../../redux/auth";
import { update_quiz_activities } from "../../redux/update";
import { routeName } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
/* import Modal from "react-native-modal"; */


class QuizAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            allSelectChoice: null, // คำตอบที่ตอบ
            numberArray: null,
            modalVisibleQuiz: false,
            quiz: null,  // ตอบถูกทุกข้อหรือไม่
            numbeQuzi: null,  //จำนวนคำตอบที่ตอบถูก
            week_in_program: null,
            user_id: null,
            missionId: null,
            nutrition_activity_Mission: true

        };
    }


    componentDidMount() {
        const { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, user, route } = this.props;
        const data = JSON.parse(nutrition_mission && nutrition_mission.quiz)
        this.props.getNutritionActivityIdMission(user.user_id, nutrition_mission.id)

        this.setState({
            data: data,
            user_id: user.user_id,
            week_in_program: nutrition_mission.week_in_program
        })
        //console.log("route.name", route.name);
        this.props.routeName(route.name);

    }

    componentDidUpdate(prevProps, prevState) {
        const { modalVisibleQuiz, allSelectChoice, nutrition_activity_Mission } = this.state;
        const { status_quiz_activities, nutrition_activity_id_Mission, nutrition_mission, statusGetNutritionActivityIdMission } = this.props;
        const data_mission = JSON.parse(nutrition_mission.quiz);

        if ((prevState.modalVisibleQuiz !== modalVisibleQuiz) && (modalVisibleQuiz === true)) {
            this.getNext()
        }

        if (nutrition_activity_id_Mission) {

            if ((prevProps.nutrition_activity_id_Mission !== nutrition_activity_id_Mission) || (nutrition_activity_id_Mission) && (nutrition_activity_Mission)) {
                let data = JSON.parse(nutrition_activity_id_Mission.quiz_activities);
                let result = data && data.filter((member) => {
                    return member.select_choice == null
                })
                if (data) {
                    this.setState({
                        allSelectChoice: data,
                        nutrition_activity_Mission: false
                    })

                    let result = data && data.filter((member) => {
                        return member.select_choice == null
                    })
                    this.setState({
                        numberArray: result.length
                    })
                }
            }

            if (prevState.modalVisibleQuiz !== modalVisibleQuiz) {

            }
        }

        if ((allSelectChoice === null)) {
            let value = data_mission && data_mission.map((value, i) => {
                return {
                    "select_choice": null,
                    "index": value.index,
                }
            })
            this.setState({
                allSelectChoice: value,
                missionId: nutrition_mission.id,
                nutrition_activity_Mission: false
            })
        }


    }

    getNext() {
        setTimeout(() => {
            this.setState({
                modalVisibleQuiz: false
            })

            this.props.navigation.navigate("QuizAnswer")
        }, 2000);

    }

    allSelectChoice(index, choice) {
        const { user_id, week_in_program, missionId, allSelectChoice } = this.state;
        allSelectChoice.forEach((animal) => {
            if (animal.index == index) {
                animal.select_choice = choice
            }
        })
        this.setState({
            allSelectChoice: allSelectChoice
        })


        let result = allSelectChoice && allSelectChoice.filter((member) => {
            return member.select_choice == null
        })
        this.setState({
            numberArray: result.length
        })

        this.props.update_quiz_activities(user_id, week_in_program, allSelectChoice, 'null');

    }

    allSelectChoiceSubmit() {


        const { user_id, week_in_program, allSelectChoice, data } = this.state;
        let arr = [];
        data && data.map((value, i,) => {
            const choice = value.choice;

            let result = allSelectChoice && allSelectChoice.filter((member) => {
                if (value.index == member.index) {
                    return choice.correct_choice == member.select_choice;
                }
            })
            if (result[0]) {
                arr.push(result[0]);
            }
        })
        if (arr.length === data.length) {
            var data2 = "ถูกทุกข้อ"
        } else {
            var data2 = "ถูกบางข้อ"
        }

        this.setState({
            modalVisibleQuiz: true,
            quiz: data2,
            numbeQuzi: arr.length
        })

        this.props.update_quiz_activities(user_id, week_in_program, allSelectChoice, arr.length);

    }


    render() {
        const { data, allSelectChoice, numberArray, quiz, numbeQuzi, modalVisibleQuiz, week_in_program } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View>
                    <Text style={styles.exercise}>แบบฝึกหัด</Text>
                    <Text style={styles.week}>สัปดาห์ที่ {week_in_program}</Text>
                    <ScrollView>
                        <View style={styles.areaView}>
                            {
                                data && data.map((value, i,) => {
                                    const choice = value.choice;
                                    /*                       console.log("value", value.image); */

                                    var result = allSelectChoice && allSelectChoice.filter((member) => {
                                        return member.index === value.index
                                    })

                                    return (
                                        <View key={i + "v1"}>
                                            {value && value.image != "" ?
                                                <Image source={{ uri: value.image }} style={{ width: "100%", height: value.index == 3 ? 350 : 200, marginTop: 16 }} resizeMode="stretch" />
                                                : null}
                                            <Text style={styles.question} key={i + "t1"}>
                                                {value.index}. {value.question}
                                            </Text>
                                            <View style={styles.quiz} key={i + "q1a"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "a" ?
                                                        <>
                                                            <Pressable key={i + "i1a"} >
                                                                <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                            </Pressable>
                                                        </>
                                                        :
                                                        <Pressable onPress={() => this.allSelectChoice(value.index, 'a')} key={i + "i2a"} >
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </Pressable>
                                                }

                                                <Text style={styles.responseView} key={i + "1a"}>{choice.a}</Text>
                                            </View>
                                            <View style={styles.quiz} key={i + "q2b"}>
                                                {
                                                    (result && result[0].index == value.index) && result && result[0].select_choice == "b" ?
                                                        <Pressable key={i + "i1b"}>
                                                            <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                        </Pressable>
                                                        :
                                                        <Pressable onPress={() => this.allSelectChoice(value.index, 'b')} key={i + "i2b"}>
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </Pressable>
                                                }
                                                <Text style={styles.responseView} key={i + "b"}>{choice.b}</Text>
                                            </View>
                                            <View style={styles.quiz} key={i + "q2c"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "c" ?
                                                        <Pressable key={i + "i1c"}>
                                                            <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                        </Pressable>
                                                        :
                                                        <Pressable onPress={() => this.allSelectChoice(value.index, 'c')} key={i + "i2c"}>
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </Pressable>
                                                }
                                                <Text style={styles.responseView} key={i + "c"}>{choice.c}</Text>
                                            </View>
                                            <View style={styles.quiz} key={i + "q3d"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "d" ?
                                                        <Pressable key={i + "i1d"}>
                                                            <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                        </Pressable>
                                                        :
                                                        <Pressable onPress={() => this.allSelectChoice(value.index, 'd')} key={i + "i2d"}>
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </Pressable>

                                                }
                                                <Text style={styles.responseView} key={i + "d"}>{choice.d}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>

                        <View style={styles.areaView}>
                            {numberArray == 0 ?
                                <Pressable onPress={() => this.allSelectChoiceSubmit()}>
                                    <View style={styles.pressableView}>
                                        <View style={ComponentsStyle.button}>
                                            <Text style={ComponentsStyle.textButton}>
                                                ส่งคำตอบ
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                                :
                                <Pressable>
                                    <View style={styles.pressableView}>
                                        <View style={ComponentsStyle.buttonGrey}>
                                            <Text style={ComponentsStyle.textButtonGrey}>
                                                ส่งคำตอบ
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            }
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibleQuiz}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            this.setState({ modalVisibleQuiz: !modalVisibleQuiz });
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.centeredView2}>
                                <Image
                                    style={{ width: 120, height: 120, }}
                                    source={require('../../assets/images/icon/Generic_Q.png')}
                                />
                                {
                                    quiz && quiz == "ถูกทุกข้อ" ?
                                        <Text style={styles.quizText}>เยี่ยมมาก! ถูกทุกข้อ</Text>
                                        :
                                        <Text style={styles.quizText}>ตอบถูก {numbeQuzi} ข้อ</Text>
                                }
                            </View>
                            <View style={styles.centeredView1}>

                            </View>

                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    areaView: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 20
    },
    exercise: {
        marginHorizontal: 16,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    week: {
        marginHorizontal: 16,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    question: {
        marginTop: 24,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",

    },
    responseView: {
        marginLeft: 8,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginRight: 32
    },
    quiz: {
        marginTop: 16,
        flexDirection: "row"
    },
    pressableView: {
        marginTop: 32,
        marginBottom: 80,
    },
    centeredView: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",

    },
    centeredView1: {
        backgroundColor: colors.grey1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.9,
        zIndex: 0,
    },
    centeredView2: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        zIndex: 1
    },
    quizText: {
        marginTop: 16,
        color: colors.white,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    }
});
const mapStateToProps = ({ authUser, getData, updateData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { status_quiz_activities } = updateData;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = getData;
    return { user, nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, status_quiz_activities, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, getNutritionActivityIdMission, update_quiz_activities, routeName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(QuizAnswer));



