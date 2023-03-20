import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { logoutUser, loginUser } from "../redux/auth";
import { getNutritionMission } from "../redux/get";
import { insertNutritionActivity, insertExerciseActivity, } from "../redux/update";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName } from "../redux/personalUser";
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';


class Home extends Component {
    componentDidMount() {
        const { user } = this.props;

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            //  console.log("user.user_id", user.user_id);
            this.props.insertNutritionActivity(user && user.user_id);

            if (!user) { // $student_two["Chemistry"] = 92
                this.props.navigation.navigate("Login");
            }

            this.props.insertNutritionActivity(user.user_id)
            this.props.insertExerciseActivity(user.user_id)
        });




        // this.props.routeName(null); // ถ้าเข้าให้ home ให้ทำคำสั่งนี้ 1 ครั้ง

    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate(prevProps) {
        const { user, statusGetNutritionMission, nutrition_mission, route_name } = this.props;
        if ((prevProps.user !== user) && (!user)) {
            this.props.navigation.navigate("Login");
        }



        if ((prevProps.statusGetNutritionMission !== statusGetNutritionMission) && (statusGetNutritionMission === "success")) {
            //ถ้าตรงตามเงื่อนไขด้านบนแสดงว่าได้ค่า  nutrition_mission แล้ว

            /*       console.log("nutrition_mission :", nutrition_mission); */
            /*      console.log("id :", nutrition_mission.id);
                 console.log("knowledge :", nutrition_mission.knowledge);
                 console.log("mission :", nutrition_mission.mission);
                 console.log("quiz :", JSON.parse(nutrition_mission.quiz)); */

        }
    }

    render() {
        const { user } = this.props;
        return (
            <View style={ComponentsStyle.container}>
                <StatusBar
                /*   animated={false}
                  backgroundColor="blue"
                  /*  barStyle="default" */
                /*  showHideTransition={statusBarTransition} */
                /*   hidden={hidden} */
                />
                <Text style={styles.contentHead}>สวัสดี</Text>
                <Text style={styles.contentHead}>คุณ <Text style={{ color: colors.persianBlue }}>{user && user.display_name}</Text></Text>
                <Text style={styles.content}>{user && user.email}</Text>
                <Text></Text>
                <View style={styles.buttonTop}>
                    {
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.logoutUser()}  >
                            <Text style={ComponentsStyle.textButton}>{'Logout'}</Text>
                        </Pressable>
                    }
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        /*         backgroundColor: 'red', */
    },
    buttonsContainer: {
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
    contentHead: {
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    content: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
});

const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { user, nutrition_mission, statusGetNutritionMission, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, routeName, insertNutritionActivity, insertExerciseActivity, loginUser };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


