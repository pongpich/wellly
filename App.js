import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation/index";
import useCachedResources from "./hooks/useCachedResources";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Amplify from "@aws-amplify/core";
import { awsConfig } from "./constants/defaultValues";
import myStoreConfig from "./redux/store";
/* import * as SplashScreen from 'expo-splash-screen'; */

Amplify.configure(awsConfig);
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={myStoreConfig.store}>
          <PersistGate persistor={myStoreConfig.persister}>
            <Navigation />
          </PersistGate>
          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
