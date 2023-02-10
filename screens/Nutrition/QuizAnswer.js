import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



class QuizAnswer extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            numberMission: 10,
            fillNumber: 0,
            maxNumberMission: 10,
            numberQ: 0
        };
    }

    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission } = this.props;
        this.props.getNutritionActivityIdMission(user.user_id, nutrition_mission.id)
        if (nutrition_activity_id_Mission.quiz_activities_number !== null) {
            this.setState({
                fillNumber: nutrition_activity_id_Mission.quiz_activities_number * 10,
                numberQ: nutrition_activity_id_Mission.quiz_activities_number,
            })
        }
    }
    render() {
        const { fillNumber, maxNumberMission, numberQ } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.boxScore}>
                    <AnimatedCircularProgress
                        size={120}
                        width={8}

                        fill={fillNumber}
                        tintTransparency={true}
                        rotation={360}
                        tintColor={colors.positive1}
                        backgroundColor={colors.neutralGrey6} >
                        {

                            (numberQ) => (
                                <>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: colors.grey1, fontSize: 32, fontFamily: "IBMPlexSansThai-Bold", }}>{Math.ceil(numberQ)}</Text>
                                        <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Bold", marginTop: 17 }}> /{Math.ceil(maxNumberMission)}</Text>
                                    </View>
                                    <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Regular", marginTop: -10 }}>คะแนน</Text>
                                </>
                            )

                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.boxSelection}>

                </View>
            </View>
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
    scoreView: {
        width: 120,
        height: 120,
        borderColor: colors.neutralGrey6,
        borderWidth: 8,
        borderRadius: 100,
        borderTopColor: colors.positive1,
        borderBottomColor: colors.positive1,
        borderRightColor: colors.positive1,
        justifyContent: "center",
        alignItems: "center"
    },
    boxSelection: {
        height: "100%",
        width: "100%",
        backgroundColor: colors.white
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