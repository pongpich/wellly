import React, { Component } from 'react'
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Walkthrough from '../screens/Walkthrough';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
     <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{
        title: "",
        }}/>
     <Stack.Screen name="Walkthrough" component={Walkthrough}   options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        headerShown: false,
      }}/>
    </Stack.Navigator>
  );
}


export default class index extends Component {
  render() {
    return (
        <NavigationContainer >
        <MyStack />
      </NavigationContainer>
    )
  }
}
