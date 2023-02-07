import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { logoutUser } from "../redux/auth";
import { getNutritionMission } from "../redux/get";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


class Home extends Component {
    componentDidMount() {
        const { user } = this.props;

        if (!user) {
            this.props.navigation.navigate("Login");
        } else if (user) {
            this.props.getNutritionMission()
        }

    }

    componentDidUpdate(prevProps) {
        const { user, statusGetNutritionMission, nutrition_mission } = this.props;
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
        return (
            <View>
                <StatusBar
                /*   animated={false}
                  backgroundColor="blue"
                  /*  barStyle="default" */
                /*  showHideTransition={statusBarTransition} */
                /*   hidden={hidden} */
                />

                <Pressable onPress={() => this.props.logoutUser()} >
                    <Text >Logout </Text>
                </Pressable>

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
});

const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { user, nutrition_mission, statusGetNutritionMission };
};

const mapActionsToProps = { logoutUser, getNutritionMission };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


