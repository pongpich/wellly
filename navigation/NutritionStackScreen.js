import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { useRoute } from '@react-navigation/native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import Nutrition from '../screens/Nutrition/Nutrition';
import Successful from '../screens/Nutrition/Successful';
import History from '../screens/Nutrition/History';

const Stack = createStackNavigator();

function NutritionStackScreen() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator >
            <Stack.Screen name="Nutrition" component={Nutrition} options={{
                headerShown: false
            }} />

            <Stack.Screen name="History" component={History}
                options={({
                    title: "",
                    tabBarOptions: {
                        visible: false
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

            <Stack.Screen name="Successful" component={Successful}
                options={{
                    title: "",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: colors.persianBlue,
                    },

                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('History')}>
                                <Image
                                    source={require('../assets/images/icon/chevron.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }} />


        </Stack.Navigator>
    );
}




export default function NutritionStack() {
    return (
        <NutritionStackScreen />
    );
}

