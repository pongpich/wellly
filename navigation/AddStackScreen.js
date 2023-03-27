import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Add from '../screens/Add/Add';


const Stack = createStackNavigator();

function AddStackScreen() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Add" component={Add} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


export default function AddStack() {
    return (
        <AddStackScreen />
    );
}