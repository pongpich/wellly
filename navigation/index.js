import React, { Component } from 'react'
import { Button, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ForgotPassword from '../screens/ForgotPassword';
import { connect } from 'react-redux';
import Walkthrough from '../screens/Walkthrough';
import OnboardingResults from '../screens/OnboardingResults';
import PersonalData from '../screens/PersonalData';
import HealthData from '../screens/HealthData';
import OnboardingName from '../screens/OnboardingName';
import '../languages/i18n'; //ใช้สำหรับ 2ภาษา
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import colors from '../constants/colors';
import HomeStackScreen from '../navigation/HomeStackScreen';
import NutritionStackScreen from '../navigation/NutritionStackScreen';
import AddStackScreen from '../navigation/AddStackScreen';
import ExerciseStackScreen from '../navigation/ExerciseStackScreen';
import ActivityStackScreen from '../navigation/ActivityStackScreen';
import { useSelector, useDispatch } from "react-redux";
import { routeName, setSelectedTab } from "../redux/personalUser";



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

function MyHome() {
  const { set_Selected_Tab } = useSelector(({ personalDataUser }) => personalDataUser ? personalDataUser : null);
  /*   const dispatch = useDispatch(); */
  /* const { t } = this.props.withTranslation; */

  /*   console.log("set_Selected_Tab", set_Selected_Tab); */
  const languages = i18next.languages[0];

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (set_Selected_Tab) {
        navigation.navigate('ExerciseTab');


      }
    }, [set_Selected_Tab])
  );
  const devicehHeight = Math.round(Dimensions.get('window').height);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ?
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuHomeActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuHome.png')}
              />;
          } else if (route.name === 'NutritionTab') {
            iconName = focused ?
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuNutritionActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuNutrition.png')}
              />;
          } else if (route.name === 'ExerciseTab') {
            iconName = focused ?

              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuExerciseActive.png')}
              /> :
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/images/icon/menuExercise.png')}
              />;
          } else if (route.name === 'ActivityTab') {
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
          display: "flex",
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
      <Tab.Screen name="HomeTab"
        component={HomeStackScreen}

        /*   options={{
            title: languages === "th" ? "หน้าแรก" : "Home",
          }} */
        options={({ route }) => ({
          tabBarStyle: {
            display: getBottomTabse(route),
            paddingTop: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            height: (devicehHeight < 668) ? 70 : (devicehHeight < 801) ? 70 : 100,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: colors.white,
          },
          title: languages === "th" ? "หน้าแรก" : "Home",
        })}
      />
      <Tab.Screen name="NutritionTab" component={NutritionStackScreen}
        options={({ route }) => ({
          tabBarStyle: {
            display: getBottomTabse(route),
            paddingTop: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            height: (devicehHeight < 668) ? 70 : (devicehHeight < 801) ? 70 : 100,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: colors.white,
          },
          title: languages === "th" ? "โภชนาการ" : "Nutrition",
        })} />
      <Tab.Screen name="AddHome" component={AddStackScreen}
        options={({ route }) => ({
          tabBarIcon: ({ size, color }) => (
            <Image
              style={{ width: 80, height: 80 }}
              source={require('../assets/images/icon/Add.png')}
            />
          ),
          ...TransitionPresets.ModalSlideFromBottomIOS,
          tabBarStyle: {
            display: getBottomTabse(route),
            paddingTop: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            height: (devicehHeight < 668) ? 70 : (devicehHeight < 801) ? 70 : 100,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: colors.white,
          },
          title: '',
        })}
      />
      <Tab.Screen name="ExerciseTab" component={ExerciseStackScreen}

        options={({ route, getState }) => ({
          tabBarStyle: {
            display: getBottomTabse(route),
            paddingTop: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            height: (devicehHeight < 668) ? 70 : (devicehHeight < 801) ? 70 : 100,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: colors.white,
          },
          title: languages === "th" ? "ออกกำลังกาย" : "Exercise",
        })} />
      <Tab.Screen name="ActivityTab" component={ActivityStackScreen}
        options={({ route }) => ({
          tabBarStyle: {
            display: getBottomTabse(route),
            paddingTop: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
            height: (devicehHeight < 668) ? 70 : (devicehHeight < 801) ? 70 : 100,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: colors.white,
          },
          title: languages === "th" ? "กิจกรรม" : "Activity",
        })}
      />
    </Tab.Navigator >
  );
}








function MyStack(props) {
  const navigation = useNavigation();

  return (

    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#3762FC", // ใส่ icon สี ปุ่ม BackTitle
      }}>

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} initialRouteName="Login" />
      <Stack.Screen name="Register" component={Register} initialRouteName="Register" options={{ headerShown: false }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
        title: "",
        headerShadowVisible: false, // applied here
        headerLeft: () => (
          <View style={{ paddingLeft: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={{ width: 24, height: 24 }}
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
              <Image style={{ width: 24, height: 24 }}
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
              <Image style={{ width: 24, height: 24 }}
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
              <Image style={{ width: 24, height: 24 }}
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
      <Stack.Screen name="Home" component={MyHome} options={{
        headerShown: false,
      }} />


    </Stack.Navigator>
  );
}


function getBottomTabse(route) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  if (routeName == "History") {
    return 'none';
  }
  if (routeName == "Successful") {
    return 'none';
  }
  if (routeName == "Quiz") {
    return 'none';
  }
  if (routeName == "ArticleTemplate") {
    return 'none';
  }
  if (routeName == "QuizAnswer") {
    return 'none';
  }
  if (routeName == "Report") {
    return 'none';
  }
  if (routeName == "ConfirmSubmit") {
    return 'none';
  }
  if (routeName == "ReportFeedback") {
    return 'none';
  }
  if (routeName == "ExHistory") {
    return 'none';
  }
  if (routeName == "ExArticleTemplate") {
    return 'none';
  }
  if (routeName == "ExProgram") {
    return 'none';
  }
  if (routeName == "ActAcivity") {
    return 'none';
  }
  if (routeName == "ActHistoty") {
    return 'none';
  }
  if (routeName == "AddActivity") {
    return 'none';
  }
  if (routeName == "Add") {
    return 'none';
  }
  if (routeName == "AddHom") {
    return 'none';
  }
  if (routeName == "Profile") {
    return 'none';
  }
  if (routeName == "MyHealth") {
    return 'none';
  }
  if (routeName == "Badge") {
    return 'none';
  }
  if (routeName == "About") {
    return 'none';
  }
  if (routeName == "ChangePassword") {
    return 'none';
  }
  if (routeName == "SetPassword") {
    return 'none';
  }
  if (routeName == "Register") {
    return 'none';
  }
  if (routeName == "Pdpa") {
    return 'none';
  }


  return 'flex';
}

class Index extends Component {
  render() {

    return (
      <NavigationContainer >

        <MyStack />

      </NavigationContainer>
    )
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user } = authUser;
  return { user, };
};

const mapActionsToProps = {};

/* 
export default Index; */

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withTranslation()(Index));

