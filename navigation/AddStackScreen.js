import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Add from '../screens/Nutrition/Add';


const HomeStack = createStackNavigator();

function AddStackScreen() {
    const navigation = useNavigation();
    return (
        <HomeStack.Navigator>
            <Stack.Screen name="Add" component={Add} />
        </HomeStack.Navigator>
    );
}


export default function AddStack() {
    return (
        <AddStackScreen />
    );
}