import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Home from '../screens/Home';


const HomeStack = createStackNavigator();

function HomeStackScreen() {
    const navigation = useNavigation();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
    );
}


export default function HomeStack1() {
    return (
        <HomeStackScreen />
    );
}