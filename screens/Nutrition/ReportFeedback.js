import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, TouchableOpacity, Image, Text, Pressable, Animated } from 'react-native';
import colors from '../../constants/colors';
import { logoutUser } from "../../redux/auth";
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import Carbohydrate from '../../components/knowledge/Carbohydrate';
import { connect } from 'react-redux';
import { routeName } from "../../redux/personalUser";
import { StackActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import ComponentsStyle from '../../constants/components';
class ReportFeedback extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);
        this.state = {
            statusBarColor: "light",
            scrollY: new Animated.Value(0),
            typeChoice: "multiple_choice",
            typeCheckList: "check_list",
            routName: null,
            mission: null,
            assessment_kit: null,
            week_in_program: null

        };
    }

    componentDidMount() {

        const { nutrition_mission, route_name, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, user } = this.props;
        this.props.getNutritionActivityIdMission(user.user_id, nutrition_mission.id)

        this.setState({
            week_in_program: nutrition_mission.week_in_program
        })
        if (route_name.route_name == "ConfirmSubmit") {
            this.setState({
                routName: route_name.route_name,

            })
        }
        if (nutrition_mission.assessment_results != null) {
            this.setState({
                mission: JSON.parse(nutrition_mission.assessment_results)
            })

        }


    }

    componentDidUpdate(prevProps, prevState) {
        const { statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = this.props;
        if ((prevProps.nutrition_activity_id_Mission !== nutrition_activity_id_Mission) && (statusGetNutritionActivityIdMission == "success")) {
            if (nutrition_activity_id_Mission.assessment_kit_activties != null) {
                this.setState({
                    assessment_kit: JSON.parse(nutrition_activity_id_Mission.assessment_kit_activties)
                })
            }
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


    render() {
        const { statusBarColor, routName, mission, assessment_kit, typeChoice, typeCheckList, week_in_program } = this.state;
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 200],
            outputRange: [140, 16],
            extrapolate: 'clamp',
        });
        const { t } = this.props;

        return (
            <View style={styles.container}>
                <View style={{ height: 44, width: "100%", backgroundColor: statusBarColor === "light" ? colors.secondary_MayaBlue : colors.white }}>
                    {
                        statusBarColor === "light" ?
                            <StatusBar barStyle="light-content" />
                            :
                            <StatusBar barStyle="dark-content" />
                    }
                </View>
                <View style={{ height: 48, width: "100%", backgroundColor: statusBarColor === "light" ? colors.secondary_MayaBlue : colors.white }}>
                    <View style={{ marginLeft: 16 }}>
                        {/*           //  this.props.navigation.dispatch(StackActions.replace('Home')) */}
                        <Pressable onPress={() => routName == "ConfirmSubmit" ? this.props.navigation.dispatch(StackActions.replace('Home')) : this.props.navigation.goBack()}>
                            <Image style={{ width: 24, height: 24 }}
                                source={statusBarColor === "light" ? require('../../assets/images/icon/chevron.png') : require('../../assets/images/icon/caret.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <Animated.View style={{ height: headerHeight, }}>
                    <View style={[styles.headBox, statusBarColor === "dark" ? { backgroundColor: colors.white } : null]}>
                        <View style={{ marginRight: -50 }}>
                            <View style={[styles.circle1, statusBarColor === "dark" ? { borderColor: colors.white } : null]} />
                        </View>
                        <View style={{ marginRight: -10, marginTop: 10, zIndex: 0 }}>
                            <View style={styles.circle2} />
                        </View>
                        <View style={{ marginHorizontal: 16 }}>
                            <Text style={styles.textHeand}>{t('assessment')}</Text>
                            <Text style={styles.textWeek}>{t('week_')} {week_in_program}</Text>
                        </View>
                    </View>
                </Animated.View>


                <ScrollView style={{ marginTop: -35 }}

                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        {
                            useNativeDriver: false,
                            listener: event => {
                                const scrolling = event.nativeEvent.contentOffset.y;
                                if (scrolling > 200) {
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
                            }
                        }
                    )}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[ComponentsStyle.contentBox]}>
                        <View style={styles.conterScrollView}>

                            {
                                assessment_kit && assessment_kit.map((value, i) => {
                                    if (value.type == typeChoice) {
                                        return mission && mission.map((member, l) => {
                                            if (value.index == member.index) {
                                                return (
                                                    <View key={l + "da"}>
                                                        <Text style={styles.clause}>{member.question}</Text>
                                                        <View style={styles.clauseView}>
                                                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/icon/💬.png')} />
                                                            <Text style={styles.clause1}>{member.choice[value.select_choice].answer}</Text>
                                                        </View>
                                                        <View style={styles.clauseBox}>
                                                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/icon/😎.png')} />
                                                            <Text style={styles.clauseConter}>{member.choice[value.select_choice].assessment}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        })
                                    } else {





                                        return mission && mission.map((member, l) => {

                                            if (value.index == member.index) {

                                                if (value.type == typeCheckList) {
                                                    let keyName = Object.keys(value);
                                                    keyName && keyName.map((ke, kl) => {
                                                        if (ke != "type") {
                                                            if (ke != "index") {
                                                                if (ke != "clause_question") {
                                                                    if (value[ke] == true) {
                                                                        let resflie = mission.find((member) => {
                                                                            return member.index == value.index
                                                                        })
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    })
                                                }
                                                let keyName = Object.keys(value);
                                                return (
                                                    <View key={l + "el"}>
                                                        <Text style={styles.clause}>{member.question}</Text>
                                                        {
                                                            keyName && keyName.map((ke, kl) => {
                                                                if (ke != "type") {
                                                                    if (ke != "index") {
                                                                        if (ke != "clause_question") {
                                                                            if (value[ke] == true) {
                                                                                let resflie = mission.find((member) => {
                                                                                    return member.index == value.index
                                                                                })
                                                                                return (
                                                                                    <>
                                                                                        <View style={styles.clauseView}>
                                                                                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/icon/💬.png')} />
                                                                                            <Text style={styles.clause1}>{resflie.choice[ke].answer}</Text>
                                                                                        </View>
                                                                                        <View style={styles.clauseBox}>
                                                                                            <Image style={{ width: 30, height: 30 }} source={require('../../assets/images/icon/😎.png')} />
                                                                                            <Text style={styles.clauseConter}>{resflie.choice[ke].assessment}</Text>
                                                                                        </View>
                                                                                    </>
                                                                                )
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                })
                            }
                        </View>
                    </View>
                </ScrollView >
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    headBox: {
        backgroundColor: colors.secondary_MayaBlue,
        height: 118,
        zIndex: 0
    },
    circle1: {
        marginTop: -260,
        alignSelf: 'flex-end',
        position: "absolute",
        height: 318,
        width: 318,
        borderColor: colors.mayaBlue60,
        borderWidth: 4,
        borderRadius: 500,
        zIndex: 0,
    },
    circle2: {
        alignSelf: 'flex-end',
        position: "absolute",
        height: 139,
        width: 139,
        borderColor: colors.grey1,
        backgroundColor: colors.grey1,
        borderWidth: 4,
        borderRadius: 100,
        zIndex: 1,
    },
    textHeand: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textWeek: {
        marginTop: -4,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    conterBox: {
        marginTop: -20,
        width: "100%",
        height: "100%",
        borderRadius: 16,
        zIndex: 1,
        backgroundColor: colors.white,

    },
    clauseBoxView: {
        marginBottom: 24,
    },
    conterScrollView: {
        // width: "100%",
        marginTop: 16,
        marginHorizontal: 16,
        paddingBottom: 40
    },
    clause: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",

    },
    clauseView: {
        marginTop: 8,
        flexDirection: "row",
        marginRight: 16
    },
    clause1: {
        marginLeft: 8,
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        marginRight: 16
    },

    clauseBox: {
        marginTop: 16,
        backgroundColor: colors.grey7,
        padding: 16,
        borderRadius: 8,
        flexDirection: "row",
        width: "100%",
        marginBottom: 24,
        paddingRight: 16

    },
    clauseConter: {
        marginLeft: 8,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginRight: 32
    }


});

const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = getData;
    return { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, route_name, user };
};

const mapActionsToProps = { logoutUser, getNutritionMission, routeName, getNutritionActivityIdMission };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ReportFeedback));

