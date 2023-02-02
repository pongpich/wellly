import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import { connect } from 'react-redux';
import Walkthrough from '../screens/Walkthrough';
import OnboardingResults from '../screens/OnboardingResults';
import PersonalData from '../screens/PersonalData';
import HealthData from '../screens/HealthData';
import OnboardingName from '../screens/OnboardingName';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import i18next from 'i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import Home from '../screens/Home';
import Nutrition from '../screens/Nutrition/Nutrition';
import Exercise from '../screens/Nutrition/Exercise';
import Activity from '../screens/Nutrition/Activity';
import Add from '../screens/Nutrition/Add';
import History from '../screens/Nutrition/History';
import Successful from '../screens/Nutrition/Successful';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


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



function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}
        options={{

          /*           title: "Ho",
                    headerShown: false,
                    headerShadowVisible: false,
                    gestureEnabled: false,
                    cardOverlayEnabled: false, */
        }} />
    </Stack.Navigator>
  );
}



function NutritionStackScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Nutrition" component={Nutrition} options={{
        headerShown: false
      }} />
      <Stack.Screen name="History" component={History}

        options={{
          title: "",
          tabBarLabel: false,
          tabBarVisible: false,
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <View style={{ marginLeft: 0 }}>
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Image
                  source={require('../assets/images/icon/caret.png')}
                />
              </TouchableOpacity>
            </View>
          ),
        }} />

      <Stack.Screen name="Successful" component={Successful}
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.persianBlue,
          },

          headerLeft: () => (
            <View style={{ marginLeft: 0 }}>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Image
                  source={require('../assets/images/icon/chevron.png')}
                />
              </TouchableOpacity>
            </View>
          ),
        }} />
    </Stack.Navigator>
  );
}


function ExerciseStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Exercise" component={Exercise} />
    </Stack.Navigator>
  );
}


function ActivityStackScreen() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Activity" component={Activity} />
    </Stack.Navigator>
  );
}



function AddStackScreen() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Add" component={Activity} />
    </Stack.Navigator>
  );
}



///


function MyHome() {

  /* const { t } = this.props.withTranslation; */

  const languages = i18next.languages[0];

  const devicehHeight = Math.round(Dimensions.get('window').height);
  /*   const devicehHeight = Math.round(Dimensions.get('window').ไ); */
  console.log("devicehHeight", devicehHeight);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ?
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuHomeActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuHome.png')}
              />;
          } else if (route.name === 'Nutrition') {
            iconName = focused ?
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuNutritionActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuNutrition.png')}
              />;
          } else if (route.name === 'Exercise') {
            iconName = focused ?

              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuExerciseActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuExercise.png')}
              />;
          } else if (route.name === 'Activity') {
            iconName = focused ?
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuActivityActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuActivity.png')}
              />;
          }
          // You can return any component that you like here!
          return iconName;
        },
        tabBarStyle: {
          paddingTop: 16,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
          /* height: 70, */
          height: (devicehHeight < 668) ? 70 : (devicehHeight < 801) ? 70 : 100,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: colors.white,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          /*       marginTop: 16, */
          paddingBottom: 10,
          fontFamily: "IBMPlexSansThai-Regular",
        },
        tabBarActiveTintColor: colors.persianBlue,
        tabBarInactiveTintColor: colors.grey3,
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen}
        options={{
          title: languages === "th" ? "หน้าแรก" : "Home",
        }}
      />
      <Tab.Screen name="Nutrition" component={NutritionStackScreen}
        options={{
          title: languages === "th" ? "โภชนาการ" : "Nutrition",
        }} />
      <Tab.Screen name="Add" component={AddStackScreen}
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Image
              style={{ width: 80, height: 80 }}
              source={require('../assets/images/icon/Add.png')}
            />
          )
        }} />
      <Tab.Screen name="Exercise" component={ExerciseStackScreen}
        options={{
          title: languages === "th" ? "ออกกำลังกาย" : "Exercise",
        }} />
      <Tab.Screen name="Activity" component={ActivityStackScreen}
        options={{
          title: languages === "th" ? "กิจกรรม" : "Activity",
        }} />
    </Tab.Navigator >
  );
}






function MyStack() {
  const navigation = useNavigation();
  return (

    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#3762FC", // ใส่ icon สี ปุ่ม BackTitle
      }}>
      {/*     <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
        title: "",
        //headerBackTitle: true, //ซ่อนข้อความในของ ios

        headerShadowVisible: false, // applied here
        headerLeft: () => (
          <View style={{ paddingLeft: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />
       
      <Stack.Screen name="Walkthrough" component={Walkthrough} options={{
        headerShown: false,
      }} />

      <Stack.Screen name="OnboardingName" component={OnboardingName} options={{
        title: "",
        //headerBackTitle: true, //ซ่อนข้อความในของ ios
        headerShadowVisible: false, // applied here
        headerLeft: () => (
          <View style={{ paddingLeft: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />

      <Stack.Screen name="PersonalData" component={PersonalData} options={{
        headerShadowVisible: false,
        title: "",
        headerLeft: () => (
          <View style={{ paddingLeft: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />

      <Stack.Screen name="HealthData" component={HealthData} options={{
        headerShadowVisible: false,
        title: "",
        headerLeft: () => (
          <View style={{ paddingLeft: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/images/icon/caret.png')}
              />
            </TouchableOpacity>
          </View>
        ),
      }} />

      <Stack.Screen name="OnboardingResults" component={OnboardingResults} options={{
        title: "",
        headerShown: false,
        headerShadowVisible: false,
        gestureEnabled: false,
        cardOverlayEnabled: false,
      }} />
   */}

      <Stack.Screen name="Home" component={MyHome} options={{
        headerShown: false,
      }} />
    </Stack.Navigator>
  );
}




class Index extends Component {
  render() {

    return (
      <NavigationContainer  >

        <MyStack />

      </NavigationContainer>
    )
  }
}

export default Index;

/* export default connect(
  null,
  null
)(withTranslation()(Index)); */
