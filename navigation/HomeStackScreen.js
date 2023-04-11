import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Home from '../screens/Home';
import ArticleTemplate from '../screens/Nutrition/ArticleTemplate';
import ExArticleTemplate from '../screens/Exercise/ExArticleTemplate';
import Add from '../screens/Add/Add';
import AddActivity from '../screens/Add/AddActivity';
import Report from '../screens/Nutrition/Report';
import ConfirmSubmit from '../screens/Nutrition/ConfirmSubmit';
import ReportFeedback from '../screens/Nutrition/ReportFeedback';
import Quiz from '../screens/Nutrition/Quiz';
import QuizAnswer from '../screens/Nutrition/QuizAnswer';
import { useSelector, useDispatch } from "react-redux";


const HomeStack = createStackNavigator();

function HomeStackScreen() {
    const navigation = useNavigation();
    const routename = useSelector((state) => state.personalDataUser.route_name);
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <HomeStack.Screen name="ArticleTemplate" component={ArticleTemplate} options={{ headerShown: false }} />
            <HomeStack.Screen name="ExArticleTemplate" component={ExArticleTemplate} options={{ headerShown: false }} />
            <HomeStack.Screen name="Add" component={Add} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
            <HomeStack.Screen name="AddActivity" component={AddActivity} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
            <HomeStack.Screen name="QuizAnswer" component={QuizAnswer}
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
            < HomeStack.Screen name="Quiz" component={Quiz}
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
            <HomeStack.Screen name="Report" component={Report}
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
            <HomeStack.Screen name="ConfirmSubmit" component={ConfirmSubmit}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen name="ReportFeedback" component={ReportFeedback}
                options={{ headerShown: false }}
            />

        </HomeStack.Navigator>
    );
}


export default function HomeStack1() {
    return (
        <HomeStackScreen />
    );
}