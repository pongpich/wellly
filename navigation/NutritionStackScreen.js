import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar, HeaderBackButton } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import Nutrition from '../screens/Nutrition/Nutrition';
import Successful from '../screens/Nutrition/Successful';
import History from '../screens/Nutrition/History';
import QuizAnswer from '../screens/Nutrition/QuizAnswer';
import { useSelector, useDispatch } from "react-redux";
import Quiz from '../screens/Nutrition/Quiz';
import Home from '../screens/Home';
import { StackActions } from '@react-navigation/native';
import ArticleTemplate from '../screens/Nutrition/ArticleTemplate';
import Report from '../screens/Nutrition/Report';
import ConfirmSubmit from '../screens/Nutrition/ConfirmSubmit';
import ReportFeedback from '../screens/Nutrition/ReportFeedback';




const StackNutrition = createStackNavigator();
function NutritionStackScreen() {
    const navigation = useNavigation();
    const routename = useSelector((state) => state.personalDataUser.route_name);

    return (
        <StackNutrition.Navigator >
            <StackNutrition.Screen name="Nutrition" component={Nutrition} options={{
                headerShown: false
            }} />

            <StackNutrition.Screen name="History" component={History}
                options={({ route, navigation }) => ({
                    title: "",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: colors.grey7,
                    },
                    showLabel: false,
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Image
                                    source={require('../assets/images/icon/caret.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}

            />
            <StackNutrition.Screen name="Successful" component={Successful}
                options={({ route, navigation }) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.persianBlue,
                    },
                    headerShadowVisible: false,
                    showLabel: false,
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Image
                                    source={require('../assets/images/icon/chevron.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />
            <StackNutrition.Screen name="ArticleTemplate" component={ArticleTemplate}
                options={{ headerShown: false }}
            />

            <StackNutrition.Screen name="QuizAnswer" component={QuizAnswer}
                options={({ route, navigation }) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.white,
                    },
                    showLabel: false,
                    showLabel: false,
                    headerShadowVisible: false,
                    headerLeft: () => {
                        return (
                            routename != null ?
                                routename.route_name === "Quiz" ?
                                    <View style={{ marginLeft: 16 }}>
                                        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.replace('Home'))}>
                                            < Image
                                                source={require('../assets/images/icon/caret.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ marginLeft: 16 }}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Image
                                                source={require('../assets/images/icon/caret.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                :
                                <View style={{ marginLeft: 16 }}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Image
                                            source={require('../assets/images/icon/caret.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                        )
                    }
                })}
            />

            < StackNutrition.Screen name="Quiz" component={Quiz}
                options={({ route, navigation }) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.white,
                    },
                    showLabel: false,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Image
                                    source={require('../assets/images/icon/caret.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),

                })}
            />

            <StackNutrition.Screen name="Report" component={Report}
                options={({ route, navigation }) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.white,
                    },
                    showLabel: false,
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.pop()}>
                                <Image
                                    source={require('../assets/images/icon/caret.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),

                })}
            />

            <StackNutrition.Screen name="ConfirmSubmit" component={ConfirmSubmit}
                options={{ headerShown: false }}
            />
            <StackNutrition.Screen name="ReportFeedback" component={ReportFeedback}
                options={{ headerShown: false }}
            />

        </StackNutrition.Navigator >
    );
}

export default function NutritionStack() {


    return (
        <NutritionStackScreen />
    );
}


/* const mapStateToProps = ({ authUser, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    return { user, route_name };
};
const mapActionsToProps = {};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(NutritionStack);
 */