import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation/index';

export default function App() {
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

