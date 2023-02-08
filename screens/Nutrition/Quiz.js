import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Dimensions, Modal, Pressable, TouchableOpacity } from 'react-native';
import { getNutritionMission } from "../../redux/get";
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
            allSelectChoice: null,
            numberArray: null,
            modalVisibleQuiz: false,
            quiz: null,
            numbeQuzi: null

        };
    }


    componentDidMount() {
        const { nutrition_mission, statusGetNutritionMission } = this.props;
        const data = JSON.parse(nutrition_mission.quiz)
        this.setState({
            data: data
        })
        let value = data && data.map((value, i) => {
            return {
                "response": "null",
                "index": value.index,
            }
        })
        this.setState({
            allSelectChoice: value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { modalVisibleQuiz } = this.state;
        if ((prevState.modalVisibleQuiz !== modalVisibleQuiz) && (modalVisibleQuiz === true)) {
            this.getNext()
        }
    }

    getNext() {


        setTimeout(() => {
            this.setState({
                modalVisibleQuiz: false
            })

            this.props.navigation.navigate("QuizAnswer")
        }, 3000);

    }

    allSelectChoice(index, choice) {
        const { allSelectChoice } = this.state;
        allSelectChoice.forEach((animal) => {
            if (animal.index == index) {
                animal.response = choice
            }
        })
        this.setState({
            allSelectChoice: allSelectChoice
        })


        let result = allSelectChoice && allSelectChoice.filter((member) => {
            return member.response == "null"
        })
        this.setState({
            numberArray: result.length
        })

    }

    allSelectChoiceSubmit() {
        const { allSelectChoice, data } = this.state;
        let arr = [];
        data && data.map((value, i,) => {
            const choice = value.choice;

            let result = allSelectChoice && allSelectChoice.filter((member) => {
                if (value.index == member.index) {
                    return choice.correct_choice == member.response;
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
        /*    this.props.navigation.navigate("Submitted", { data: data2, numbeQuzi: arr.length }) */

    }


    render() {
        const { data, allSelectChoice, numberArray, quiz, numbeQuzi, modalVisibleQuiz } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.areaView}>
                    <Text style={styles.exercise}>แบบฝึกหัด</Text>
                    <Text style={styles.week}>สัปดาห์ที่ 1</Text>
                    <ScrollView>
                        <View >
                            {
                                data && data.map((value, i,) => {
                                    const choice = value.choice;

                                    var result = allSelectChoice.filter((member) => {
                                        return member.index === value.index
                                    })
                                    return (
                                        <>
                                            <Text style={styles.question}>
                                                {value.index}. {value.question} {choice.correct_choice}
                                            </Text>
                                            <View style={styles.quiz}>

                                                {
                                                    (result[0].index === value.index) && result[0].response == "a" ?
                                                        <>
                                                            <TouchableOpacity >
                                                                <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                            </TouchableOpacity>
                                                        </>
                                                        :
                                                        <TouchableOpacity onPress={() => this.allSelectChoice(value.index, 'a')} >
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </TouchableOpacity>
                                                }

                                                <Text style={styles.responseView}>{choice.a}</Text>
                                            </View>
                                            <View style={styles.quiz}>
                                                {
                                                    (result[0].index == value.index) && result[0].response == "b" ?
                                                        <TouchableOpacity>
                                                            <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity onPress={() => this.allSelectChoice(value.index, 'b')}>
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </TouchableOpacity>
                                                }
                                                <Text style={styles.responseView}>{choice.b}</Text>
                                            </View>
                                            <View style={styles.quiz}>
                                                {
                                                    (result[0].index === value.index) && result[0].response == "c" ?
                                                        <TouchableOpacity>
                                                            <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity onPress={() => this.allSelectChoice(value.index, 'c')}>
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </TouchableOpacity>
                                                }
                                                <Text style={styles.responseView}>{choice.c}</Text>
                                            </View>
                                            <View style={styles.quiz}>
                                                {
                                                    (result[0].index === value.index) && result[0].response == "d" ?
                                                        <TouchableOpacity>
                                                            <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity onPress={() => this.allSelectChoice(value.index, 'd')}>
                                                            <Image source={require('../../assets/images/icon/radio.png')} />
                                                        </TouchableOpacity>

                                                }
                                                <Text style={styles.responseView}>{choice.d}</Text>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>

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
                        }}>
                        <View style={styles.centeredView}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image
                                    style={{ width: 120, height: 120 }}
                                    source={require('../../assets/images/icon/Generic_Q.png')}
                                />
                                {
                                    quiz && quiz == "ถูกทุกข้อ" ?
                                        <Text style={styles.quizText}>เยี่ยมมาก! ถูกทุกข้อ</Text>
                                        :
                                        <Text style={styles.quizText}>ตอบถูก {numbeQuzi} ข้อ</Text>
                                }
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
        marginRight: 16
    },
    exercise: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    week: {
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
        backgroundColor: colors.grey1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    quizText: {
        marginTop: 16,
        color: colors.white,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    }
});
const mapStateToProps = ({ getData }) => {

    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { nutrition_mission, statusGetNutritionMission };
};

const mapActionsToProps = { getNutritionMission };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(QuizAnswer));



