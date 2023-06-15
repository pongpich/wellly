import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Add from '../screens/Add/Add';
import AddActivity from '../screens/Add/AddActivity';
import Text from '../screens/Add/Text';



const AddAcStack = createStackNavigator();
function AddStackScreen() {
    const navigation = useNavigation();
    return (
        <AddAcStack.Navigator screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>

            {/*  <Stack.Screen name="Text" component={Text} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} /> */}
            <AddAcStack.Screen name="Add" component={Add} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
            <AddAcStack.Screen name="AddActivity" component={AddActivity} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />

        </AddAcStack.Navigator>
    );
}


export default function AddStack() {
    return (
        <AddStackScreen />
    );
}