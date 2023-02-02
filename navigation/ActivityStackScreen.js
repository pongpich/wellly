import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Activity from '../screens/Nutrition/Activity';



const HomeStack = createStackNavigator();

function ActivityStackScreen() {
    const navigation = useNavigation();
    return (
        <HomeStack.Navigator>
            <Stack.Screen name="Activity" component={Activity} />
        </HomeStack.Navigator>
    );
}


export default function AddStack() {
    return (
        <ActivityStackScreen />
    );
}