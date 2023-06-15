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
import ExAdd from '../screens/Exercise/ExAdd';
import ExAddActivity from '../screens/Exercise/ExAddActivity';


const ExeStack = createStackNavigator();

function HomeStackScreen() {
    const navigation = useNavigation();
    return (
        <ExeStack.Navigator>
            <ExeStack.Screen name="Exercise" component={Exercise} options={{
                headerShown: false
            }} />
            <ExeStack.Screen name="ExHistory" component={ExHistory}
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
            <ExeStack.Screen name="ExArticleTemplate" component={ExArticleTemplate}
                options={{ headerShown: false }}
            />

            <ExeStack.Screen name="ExProgram" component={ExProgram}
                options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }}
            />
            <ExeStack.Screen name="ExAdd" component={ExAdd} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
            <ExeStack.Screen name="ExAddActivity" component={ExAddActivity} options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, headerShown: false }} />
        </ExeStack.Navigator>
    );
}


export default function ExerciseStack() {
    return (
        <HomeStackScreen />
    );
}