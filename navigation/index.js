import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Walkthrough from '../screens/Walkthrough';


const Stack = createStackNavigator();

function MyStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
     <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{
        title: "",
        headerLeft: () => (
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
            source={require('../assets/images/icon/caret.png')}
          />
            </TouchableOpacity>
            </View>
        ),
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
