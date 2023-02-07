import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Animated, Image, StatusBar, Pressable, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { getNutritionMission } from "../../redux/get";
import Carbohydrate from '../../components/knowledge/Carbohydrate';


class Successful extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberMission: null,
            study: true,
            quiz: null

        };
    }

    componentDidMount() {
        // รับ   params จาก  route
        const { id } = this.props.route.params;
        this.setState({
            numberMission: id,
        })

        const { statusGetNutritionMission, nutrition_mission } = this.props;
        /*   console.log("statusGetNutritionMission", nutrition_mission); */

        /*  if ((prevProps.statusGetNutritionMission !== statusGetNutritionMission) && (statusGetNutritionMission === "success")) {
  
             console.log("id :", nutrition_mission.id);
             console.log("knowledge :", nutrition_mission.knowledge);
             console.log("mission :", nutrition_mission.mission);
             console.log("quiz :", JSON.parse(nutrition_mission.quiz));
 
         }  */
    }



    studyContentSection = () => {
        const { quiz } = this.state;
        return (
            <View style={styles.studyContent}>
                <ScrollView style={{ flex: 1, }}>
                    <Carbohydrate />
                </ScrollView>
                <View style={styles.boxButtonWhite}>
                    {
                        quiz !== null ?
                            <Pressable onPress={() => this.props.navigation.navigate("QuizAnswer")}>
                                <View style={ComponentsStyle.buttonWhite}>
                                    <Text style={ComponentsStyle.textButtonWhite}>
                                        ดูผลตรวจแบบฝึกหัด
                                    </Text>
                                </View>
                            </Pressable>
                            :
                            <Pressable onPress={() => this.props.navigation.navigate("Quiz")}>
                                <View style={ComponentsStyle.button}>
                                    <Text style={ComponentsStyle.textButton}>
                                        ส่งคำตอบ
                                    </Text>
                                </View>
                            </Pressable>
                    }


                </View>
            </View>
        )
    }


    render() {
        const { numberMission, study } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={ComponentsStyle.headBox}>
                    <View style={ComponentsStyle.areaNumber}>
                        <Text style={ComponentsStyle.areaNumberText}>
                            {numberMission}
                        </Text>
                    </View>
                    <View style={ComponentsStyle.nutritionMission}>
                        <Text style={ComponentsStyle.missionHead}>ภารกิจโภชนาการ</Text>
                        <Text style={ComponentsStyle.missionHeading}>Energy พร้อม!!!</Text>
                    </View>
                </View>
                <View style={ComponentsStyle.contentBox}>
                    <View style={styles.heading}>
                        <View style={styles.boxHeadingActive}>
                            <Text style={styles.sectionActive}> ความรู้</Text>
                        </View>
                        <View style={styles.boxHeading}>
                            <Text style={styles.section}> ภารกิจ</Text>
                        </View>
                    </View>
                    {
                        study ? <>{this.studyContentSection()}</> : null
                    }
                </View >
            </SafeAreaView>
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);
console.log("deviceHeight", deviceHeight);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
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
        borderColor: colors.grey3
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
        justifyContent: "space-between",
        marginHorizontal: 16,
        flex: 1,
        marginTop: 16,
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
        shadowRadius: 10.00,
        elevation: 0,
        // marginBottom: (deviceHeight <= 667) ? 40 : 0
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
    }

});

const mapStateToProps = ({ personalDataUser, getData }) => {
    const { number } = personalDataUser;
    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { number, nutrition_mission, statusGetNutritionMission };
};

const mapActionsToProps = { missionNumber, getNutritionMission };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Successful);




/* const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { user, nutrition_mission, statusGetNutritionMission };
};

const mapActionsToProps = { logoutUser, getNutritionMission };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home)); */
