import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation/index';
import { useFonts } from 'expo-font';
/* import * as SplashScreen from 'expo-splash-screen'; */



export default function App() {
  const [fontsLoaded] = useFonts({
    'Prompt-Light': require('./assets/fonts/Prompt-Light.ttf'),
    'Prompt-Bold': require('./assets/fonts/Prompt-Bold.ttf'),
    'Prompt-Medium': require('./assets/fonts/Prompt-Medium.ttf'),
    'Prompt-Thin': require('./assets/fonts/Prompt-Thin.ttf'),
  });
  return (
    <SafeAreaProvider>
{/*     <Provider store={store}> */}
      {/* <PersistGate persistor={persister}> */}
        <Navigation  />
     {/*  </PersistGate> */}
      <StatusBar />
  {/*   </Provider> */}
  </SafeAreaProvider>
  );
}

