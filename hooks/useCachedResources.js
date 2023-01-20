import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';


export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...FontAwesome.font,
          'IBMPlexSansThai-Bold': require('../assets/fonts/IBMPlexSansThai-Bold.ttf'),
          'IBMPlexSansThai-ExtraLight': require('../assets/fonts/IBMPlexSansThai-ExtraLight.ttf'),
          'IBMPlexSansThai-Light': require('../assets/fonts/IBMPlexSansThai-Light.ttf'),
          'IBMPlexSansThai-Medium': require('../assets/fonts/IBMPlexSansThai-Medium.ttf'),
          'IBMPlexSansThai-Regular': require('../assets/fonts/IBMPlexSansThai-Regular.ttf'),
          'IBMPlexSansThai-SemiBold': require('../assets/fonts/IBMPlexSansThai-SemiBold.ttf'),
          'IBMPlexSansThai-Text': require('../assets/fonts/IBMPlexSansThai-Text.ttf'),
          'IBMPlexSansThai-Thin': require('../assets/fonts/IBMPlexSansThai-Thin.ttf'),

        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
