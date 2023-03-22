import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Activity from '../screens/Activity/Activity';



const ActivityStack = createStackNavigator();

function ActivityStackScreen() {
    const navigation = useNavigation();
    return (
        <ActivityStack.Navigator>
            <ActivityStack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
        </ActivityStack.Navigator>
    );
}


export default function AddStack() {
    return (
        <ActivityStackScreen />
    );
}