import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Activity from '../screens/Activity/Activity';
import ActHistoty from '../screens/Activity/ActHistoty';
import ActAcivity from '../screens/Activity/ActAcivity';



const ActivityStack = createStackNavigator();

function ActivityStackScreen() {
    const navigation = useNavigation();
    return (
        <ActivityStack.Navigator>
            <ActivityStack.Screen name="Activity" component={Activity} options={{ headerShown: false }} />
            <ActivityStack.Screen name="ActHistoty" component={ActHistoty} options={({ route, navigation }) => ({
                title: "",
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.grey7,
                },
                showLabel: false,
                headerLeft: () => (
                    <View style={{ marginLeft: 16 }}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Image style={{ width: 24, height: 24 }}
                                source={require('../assets/images/icon/caret.png')}
                            />
                        </TouchableOpacity>
                    </View>
                ),
            })} />
            <ActivityStack.Screen name="ActAcivity" component={ActAcivity} options={{ headerShown: false }} />
        </ActivityStack.Navigator>
    );
}


export default function AddStack() {
    return (
        <ActivityStackScreen />
    );
}