import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Walkthrough from '../screens/Walkthrough';
import OnboardingResults from '../screens/OnboardingResults';
import PersonalData from '../screens/PersonalData';
import HealthData from '../screens/HealthData';


const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function MyStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#3762FC", // ใส่ icon สี ปุ่ม BackTitle
      }}>

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
        title: "",
        //headerBackTitle: true, //ซ่อนข้อความในของ ios
        headerShadowVisible: false, // applied here
        headerLeft: () => (
          <View style={{ paddingLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />
      <Stack.Screen name="Walkthrough" component={Walkthrough} options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        headerShown: false,
      }} />
      <Stack.Screen name="OnboardingResults" component={OnboardingResults} options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        headerShown: false,
      }} />
      <Stack.Screen name="PersonalData" component={PersonalData} options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        headerShadowVisible: false,
        title: "",
        headerLeft: () => (
          <View style={{ paddingLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />
      <Stack.Screen name="HealthData" component={HealthData} options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        headerShadowVisible: false,
        title: "",
        headerLeft: () => (
          <View style={{ paddingLeft: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />
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
