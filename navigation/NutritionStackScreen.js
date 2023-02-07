import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar, HeaderBackButton } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { useRoute } from '@react-navigation/native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import Nutrition from '../screens/Nutrition/Nutrition';
import Successful from '../screens/Nutrition/Successful';
import History from '../screens/Nutrition/History';
import QuizAnswer from '../screens/Nutrition/QuizAnswer';

const StackNutrition = createStackNavigator();

function NutritionStackScreen() {
    const navigation = useNavigation();
    return (
        <StackNutrition.Navigator >
            <StackNutrition.Screen name="Nutrition" component={Nutrition} options={{
                headerShown: false
            }} />

            <StackNutrition.Screen name="History" component={History}
                options={({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.grey7,
                    },
                    showLabel: false,
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.popToTop()}>
                                <Image
                                    source={require('../assets/images/icon/caret.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />

            <StackNutrition.Screen name="Successful" component={Successful}
                options={{
                    title: "",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: colors.persianBlue,
                    },

                    headerLeft: ({ props }) => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity {...props} onPress={() => navigation.pop()}>

                                <Image
                                    source={require('../assets/images/icon/chevron.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),



                }} />
            <StackNutrition.Screen name="QuizAnswer" component={History}
                options={({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.grey7,
                    },
                    showLabel: false,
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image
                                    source={require('../assets/images/icon/caret.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                })}
            />


        </StackNutrition.Navigator>
    );
}




export default function NutritionStack() {
    return (
        <NutritionStackScreen />
    );
}

