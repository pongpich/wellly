import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Exercise from '../screens/Exercise/Exercise';
import ExHistory from '../screens/Exercise/ExHistory';
import ExArticleTemplate from '../screens/Exercise/ExArticleTemplate';
import ExProgram from '../screens/Exercise/ExProgram';
import Add from '../screens/Add/Add';
import AddActivity from '../screens/Add/AddActivity';


const HomeStack = createStackNavigator();

function HomeStackScreen() {
    const navigation = useNavigation();
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Exercise" component={Exercise} options={{
                headerShown: false
            }} />
            <HomeStack.Screen name="ExHistory" component={ExHistory}
                options={({ route, navigation }) => ({
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
                })}
            />
            <HomeStack.Screen name="ExArticleTemplate" component={ExArticleTemplate}
                options={{ headerShown: false }}
            />

            <HomeStack.Screen name="ExProgram" component={ExProgram}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }}
            />
            <HomeStack.Screen name="Add" component={Add} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
            <HomeStack.Screen name="AddActivity" component={AddActivity} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
        </HomeStack.Navigator>
    );
}


export default function ExerciseStack() {
    return (
        <HomeStackScreen />
    );
}