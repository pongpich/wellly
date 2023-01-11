import React, { Component } from 'react'
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
     {/*  <Stack.Screen name="Login" component={Home} options={{ headerShown: false }} /> */}
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
