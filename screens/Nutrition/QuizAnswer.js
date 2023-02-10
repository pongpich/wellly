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
import { ListItem, Avatar } from '@rneui/themed';



class QuizAnswer extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            fillNumber: 0,
            maxNumberMission: 0,
            numberQ: 0,
            expanded: false,
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
            })
        }
        if (nutrition_mission.quiz) {
            const num = JSON.parse(nutrition_mission.quiz);
            this.setState({
                maxNumberMission: num.length
            })
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { nutrition_mission, user, nutrition_activity_id_Mission } = this.props;
        const num = JSON.parse(nutrition_mission.quiz);
        const multiple = 100 / num.length;
        if ((prevProps.nutrition_activity_id_Mission !== nutrition_activity_id_Mission) && (nutrition_activity_id_Mission === "success")) {
            this.setState({
                fillNumber: nutrition_activity_id_Mission.quiz_activities_number * multiple,
                numberQ: nutrition_activity_id_Mission.quiz_activities_number,
            })
        }
        if ((prevProps.nutrition_mission !== nutrition_mission) && (nutrition_mission.quiz)) {
            const num = JSON.parse(nutrition_mission.quiz);
            this.setState({
                maxNumberMission: num.length
            })
        }
    }


    handlePress = (expanded) => {
        this.setState({
            expanded: expanded
        })
    };
    render() {
        const { fillNumber, maxNumberMission, numberQ, expanded } = this.state;
        const list2 = 3;
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

                            (fill) => (
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
                <ScrollView style={styles.boxSelection}>
                    <View>
                        <Text style={styles.question}>
                            1. คุณสามารถรับประทานอาหารได้ตามเป้าหมายการจัดจาน 2-1-1 (ผัก2 เนื้อและแป้ง อย่างละ 1)หรือไม่
                        </Text>
                        <View style={styles.quiz} key={"i"}>
                            <Image source={require('../../assets/images/icon/radioButton.png')} />
                            <Text style={styles.responseRadioButton}>คุณสามารถรับประทานอาหาร</Text>
                        </View>
                        <View style={styles.quiz} key={"i"}>
                            <Image source={require('../../assets/images/icon/radioButtonActive.png')} />
                            <Text style={styles.responseRadioButtonActive}>ทำได้อย่างสม่ำเสมอ</Text>
                        </View>
                        <View style={styles.quiz} key={"i"}>
                            <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                            <Text style={styles.responseRadioButtonSelection}>ทำได้อย่างสม่ำเสมอ</Text>
                        </View>
                        <View style={styles.quiz} key={"i"}>
                            <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                            <Text style={styles.responseRadioButtonSelection}>ทำได้อย่างสม่ำเสมอ</Text>
                        </View>
                    </View>
                    <ListItem.Accordion
                        content={
                            <>
                                <ListItem.Content>
                                    <ListItem.Title>List Accordion</ListItem.Title>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded}
                        onPress={() => {
                            this.handlePress(!expanded);
                        }}
                    >
                        <ListItem.Content style={{ marginHorizontal: 16 }}>
                            <Text>asdasdas</Text>
                            <Text>asdasdas</Text>
                            <Text>asdasdas</Text>
                        </ListItem.Content>

                    </ListItem.Accordion>

                </ScrollView>
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
    quiz: {
        marginTop: 16,
        flexDirection: "row"
    },
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