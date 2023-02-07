import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { getNutritionMission } from "../../redux/get";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';


class QuizAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            allSelectChoice: null
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
    //55   66

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


        /*         console.log("index, choice", index, choice); */
    }


    render() {

        const { data, allSelectChoice } = this.state;
        /*    console.log("allSelectChoice", allSelectChoice); */
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
                                    console.log("result", result);
                                    return (
                                        <>
                                            <Text style={styles.question}>
                                                {value.index}. {value.question}
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

                        <Pressable /* onPress={() => this.props.navigation.navigate("Quiz")} */>
                            <View style={styles.pressableView}>
                                <View style={ComponentsStyle.button}>
                                    <Text style={ComponentsStyle.textButton}>
                                        ส่งคำตอบ
                                    </Text>
                                </View>
                            </View>
                        </Pressable>


                    </ScrollView>

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



