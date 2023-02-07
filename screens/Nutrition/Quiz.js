import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground, Dimensions, Pressable } from 'react-native';
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

        };
    }


    componentDidMount() {
        const { nutrition_mission, statusGetNutritionMission } = this.props;
        const data = JSON.parse(nutrition_mission.quiz)
        console.log("data", data);
        this.setState({
            data: data
        })
        data && data.map((value, i) => {

            console.log('question', value.index);
        })

    }
    //55   66


    render() {

        const { data } = this.state;


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.areaView}>
                    <Text style={styles.exercise}>แบบฝึกหัด</Text>
                    <Text style={styles.week}>สัปดาห์ที่ 1</Text>
                    {
                        data && data.map((value, i) => {
                            const choice = value.choice;
                            return (
                                <>
                                    <Text style={styles.question}>
                                        {value.index}. {value.question}
                                    </Text>
                                    <View style={styles.quiz}>
                                        <Image
                                            source={require('../../assets/images/icon/radio.png')}
                                        />
                                        <Text style={styles.response}>{choice.a}</Text>
                                    </View>
                                    <View style={styles.quiz}>
                                        <Image
                                            source={require('../../assets/images/icon/radioActive.png')}
                                        />
                                        <Text style={styles.response}>{choice.b}</Text>
                                    </View>
                                    <View style={styles.quiz}>
                                        <Image
                                            source={require('../../assets/images/icon/radioActive.png')}
                                        />
                                        <Text style={styles.response}>{choice.c}</Text>
                                    </View>
                                    <View style={styles.quiz}>
                                        <Image
                                            source={require('../../assets/images/icon/radioActive.png')}
                                        />
                                        <Text style={styles.response}>{choice.d}</Text>
                                    </View>
                                </>
                            )
                        })
                    }
                    {/*
                    <View style={styles.quiz}>
                        <Image
                            source={require('../../assets/images/icon/radioActive.png')}
                        />
                        <Text style={styles.response}>ทำได้อย่างสม่ำเสมอ</Text>
                    </View>
                    <View style={styles.quiz}>
                        <Image
                            source={require('../../assets/images/icon/radio.png')}
                        />
                        <Text style={styles.response}>ทำได้อย่างสม่ำเสมอ</Text>
                    </View>
                    <View style={styles.quiz}>
                        <Image
                            source={require('../../assets/images/icon/radio.png')}
                        />
                        <Text style={styles.response}>ทำได้อย่างสม่ำเสมอ</Text>
                    </View>
                    <View style={styles.quiz}>
                        <Image
                            source={require('../../assets/images/icon/radio.png')}
                        />
                        <Text style={styles.response}>ทำได้อย่างสม่ำเสมอ</Text>
                    </View> */}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",

    },
    areaView: {
        marginHorizontal: 16
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
    response: {
        marginLeft: 8,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    quiz: {
        marginTop: 16,
        flexDirection: "row"
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



