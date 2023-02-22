import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ScrollView, Dimensions, Pressable, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { List } from 'react-native-paper';



class QuizAnswer extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            fillNumber: 0,
            maxNumberMission: 0,
            numberQ: 0,
            expanded: false,
            nutrition_mission: null,
            nutrition_activity_Mission: null
        };
    }

    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission } = this.props;
        this.props.getNutritionActivityIdMission(user.user_id, nutrition_mission.id)
        const num = JSON.parse(nutrition_mission.quiz);
        const multiple = 100 / num.length;

        if (nutrition_activity_id_Mission.quiz_activities_number !== null) {
            this.setState({
                fillNumber: nutrition_activity_id_Mission.quiz_activities_number * multiple,
                numberQ: nutrition_activity_id_Mission.quiz_activities_number,
                nutrition_activity_Mission: JSON.parse(nutrition_activity_id_Mission.quiz_activities)

            })
        }
        if (nutrition_mission.quiz) {
            const num = JSON.parse(nutrition_mission.quiz);
            this.setState({
                maxNumberMission: num.length,
                nutrition_mission: num,

            })
        }



        if (nutrition_activity_id_Mission) {
            if (nutrition_activity_id_Mission.quiz_activities_number) {
                this.setState({
                    nutrition_activity_Mission: JSON.parse(nutrition_activity_id_Mission.quiz_activities)
                })
            }
        }


    }


    componentDidUpdate(prevProps, prevState) {
        const { nutrition_mission, user, nutrition_activity_id_Mission } = this.props;
        const num = JSON.parse(nutrition_mission.quiz);


        const multiple = 100 / num.length;
        if ((prevProps.nutrition_activity_id_Mission !== nutrition_activity_id_Mission) || (nutrition_activity_id_Mission === "success")) {
            this.setState({
                fillNumber: nutrition_activity_id_Mission.quiz_activities_number * multiple,
                numberQ: nutrition_activity_id_Mission.quiz_activities_number,
                nutrition_activity_Mission: JSON.parse(nutrition_activity_id_Mission.quiz_activities)
            })


        }
        if ((prevProps.nutrition_mission !== nutrition_mission) && (nutrition_mission.quiz)) {
            const num = JSON.parse(nutrition_mission.quiz);
            this.setState({
                maxNumberMission: num.length
            })
        }


    }


    handlePress = () => {
        const { expanded } = this.state;
        this.setState({
            expanded: !expanded
        })
    };


    render() {
        const { fillNumber, maxNumberMission, numberQ, expanded, nutrition_mission, nutrition_activity_Mission } = this.state;

        return (
            <View style={styles.container}>
                {/* <StatusBar barStyle="dark-content" /> */}
                <ScrollView style={styles.boxSelection}>
                    <View style={styles.boxScore}>
                        <AnimatedCircularProgress
                            size={120}
                            width={8}

                            fill={fillNumber}
                            tintTransparency={true}
                            rotation={360}
                            tintColor={colors.positive1}
                            backgroundColor={colors.grey6} >
                            {

                                (fill) => (
                                    <>
                                        <Text style={{ color: colors.grey2, fontSize: 16, fontFamily: "IBMPlexSansThai-Regular", marginTop: 17 }}>คะแนน</Text>
                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                            <Text style={{ color: colors.grey1, fontSize: 32, fontFamily: "IBMPlexSansThai-Bold", marginTop: -17 }}>{Math.ceil(numberQ)}</Text>
                                            <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Bold", marginTop: 0 }}> /{Math.ceil(maxNumberMission)}</Text>
                                        </View>
                                    </>
                                )

                            }
                        </AnimatedCircularProgress>
                    </View>
                    {
                        nutrition_mission && nutrition_mission.map((value, i,) => {
                            let choice = value.choice;
                            var result = nutrition_activity_Mission && nutrition_activity_Mission.filter((member) => {
                                return member.index === value.index
                            })



                            return (
                                <View style={{ marginBottom: 40 }} key={i + "1v0"}>
                                    <View key={i + "1v"}>
                                        <Text style={styles.question} key={i + "1t"}>
                                            {value.index}. {value.question}
                                        </Text>
                                        <View style={styles.quizView} key={i + "1q"}>
                                            <View key={i + "a01"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice === choice.correct_choice ?

                                                        result && result[0].select_choice == "a" ?
                                                            <View style={styles.quiz} key={i + "a1"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonActive.png')} />
                                                                <Text style={styles.responseRadioButtonActive}>{choice.a}</Text>
                                                            </View>
                                                            :
                                                            <View style={styles.quiz} key={i + "a2"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                <Text style={styles.responseRadioButtonSelection}>{choice.a}</Text>
                                                            </View>
                                                        :
                                                        result && result[0].select_choice === "a" ?
                                                            <View style={styles.quiz} key={i + "a3"}>
                                                                <Image source={require('../../assets/images/icon/radioButton.png')} />
                                                                <Text style={styles.responseRadioButton}>{choice.a}</Text>
                                                            </View>
                                                            :
                                                            choice.correct_choice == "a" ?
                                                                <View style={styles.quiz} key={i + "a4"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelectionActive.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.a}</Text>
                                                                </View>
                                                                :
                                                                <View style={styles.quiz} key={i + "a5"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.a}</Text>
                                                                </View>
                                                }
                                            </View>
                                            <View key={i + "b01"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == choice.correct_choice ?
                                                        result && result[0].select_choice == "b" ?
                                                            <View style={styles.quiz} key={i + "b1"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonActive.png')} />
                                                                <Text style={styles.responseRadioButtonActive}>{choice.b}</Text>
                                                            </View>
                                                            :
                                                            <View style={styles.quiz} key={i + "b2"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                <Text style={styles.responseRadioButtonSelection}>{choice.b}</Text>
                                                            </View>
                                                        :
                                                        result && result[0].select_choice === "b" ?
                                                            <View style={styles.quiz} key={i + "b3"}>
                                                                <Image source={require('../../assets/images/icon/radioButton.png')} />
                                                                <Text style={styles.responseRadioButton}>{choice.b}</Text>
                                                            </View>
                                                            :
                                                            result && choice.correct_choice == "b" ?
                                                                <View style={styles.quiz} key={i + "b4"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelectionActive.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.b}</Text>
                                                                </View>
                                                                :
                                                                <View style={styles.quiz} key={i + "b5"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.b}</Text>
                                                                </View>

                                                }
                                            </View>
                                            <View key={i + "c01"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == choice.correct_choice ?
                                                        result && result[0].select_choice == "c" ?
                                                            <View style={styles.quiz} key={i + "c1"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonActive.png')} />
                                                                <Text style={styles.responseRadioButtonActive}>{choice.c}</Text>
                                                            </View>
                                                            :
                                                            <View style={styles.quiz} key={i + "c2"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                <Text style={styles.responseRadioButtonSelection}>{choice.c}</Text>
                                                            </View>
                                                        :
                                                        result && result[0].select_choice === "c" ?
                                                            <View style={styles.quiz} key={i + "c3"}>
                                                                <Image source={require('../../assets/images/icon/radioButton.png')} />
                                                                <Text style={styles.responseRadioButton}>{choice.c}</Text>
                                                            </View>
                                                            :
                                                            choice.correct_choice == "c" ?
                                                                <View style={styles.quiz} key={i + "c4"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelectionActive.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.c}</Text>
                                                                </View>
                                                                :
                                                                <View style={styles.quiz} key={i + "c5"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.c}</Text>
                                                                </View>

                                                }
                                            </View>
                                            <View key={i + "d01"}>
                                                {
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == choice.correct_choice ?
                                                        result && result[0].select_choice == "d" ?
                                                            <View style={styles.quiz} key={i + "d1"} >
                                                                <Image source={require('../../assets/images/icon/radioButtonActive.png')} />
                                                                <Text style={styles.responseRadioButtonActive}>{choice.d}</Text>
                                                            </View>
                                                            :
                                                            <View style={styles.quiz} key={i + "d2"}>
                                                                <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                <Text style={styles.responseRadioButtonSelection}>{choice.d}</Text>
                                                            </View>
                                                        :
                                                        result && result[0].select_choice === "d" ?
                                                            <View style={styles.quiz} key={i + "d3"}>
                                                                <Image source={require('../../assets/images/icon/radioButton.png')} />
                                                                <Text style={styles.responseRadioButton}>{choice.d}</Text>
                                                            </View>
                                                            :
                                                            choice.correct_choice == "d" ?
                                                                <View style={styles.quiz} key={i + "d4"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelectionActive.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.d}</Text>
                                                                </View>
                                                                :
                                                                <View style={styles.quiz} key={i + "d5"}>
                                                                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    <Text style={styles.responseRadioButtonSelection}>{choice.d}</Text>
                                                                </View>

                                                }
                                            </View>
                                        </View>
                                    </View>
                                    <List.Section style={{ backgroundColor: colors.grey7, borderRadius: 8, }}>
                                        <List.Accordion style={{ backgroundColor: colors.grey7, borderRadius: 8, marginTop: 16 }}
                                            title={<Text style={styles.titleAccordion}>เหตุผล</Text>}
                                            right={props =>
                                                <List.Icon {...props} icon={({ size, color, direction }) => (
                                                    expanded ?
                                                        <Image
                                                            source={require('../../assets/images/icon/ChevronUp.png')}
                                                            style={{ width: 16, height: 16 }}
                                                        />
                                                        :
                                                        <Image
                                                            source={require('../../assets/images/icon/ChevronDown.png')}
                                                            style={{ width: 16, height: 16 }}
                                                        />
                                                )}

                                                />}
                                            expanded={expanded}
                                            onPress={this.handlePress}>
                                            <Text style={styles.expand_answerText}>
                                                {value.expand_answer}
                                            </Text>
                                        </List.Accordion>
                                    </List.Section>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View >
        )
    }
}


const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    boxScore: {
        width: "100%",
        alignItems: "center"
    },
    boxSelection: {
        marginTop: 24,
        height: "100%",
        width: "100%",
        paddingHorizontal: 16,
        backgroundColor: colors.white
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

        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",

    },
    responseRadioButton: {
        marginLeft: 8,
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginRight: 16
    },
    responseRadioButtonActive: {
        marginLeft: 8,
        color: colors.positive1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginRight: 16
    },
    responseRadioButtonSelection: {
        marginLeft: 8,
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginRight: 16
    },
    quizView: {
        marginLeft: 24
    },
    quiz: {
        marginTop: 16,
        flexDirection: "row"
    },
    titleAccordion: {
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    expand_answerText: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16
    }

});

const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = getData;
    return { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, user };
};

const mapActionsToProps = { logoutUser, getNutritionMission, getNutritionActivityIdMission, };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(QuizAnswer));