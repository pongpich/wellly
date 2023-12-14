import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Chevron from "../../assets/images/home/Chevron.png";

import { WebView } from "react-native-webview";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";

const MyWebView = () => {
  const [forceRender, setForceRender] = useState(false);
  const webViewRef = useRef(null);
  const navigation = useNavigation();

  const [backApp, setBackApp] = useState(null);
  const randomKey = Math.random().toString(36).substring(7);
  const uriWithRandomKey = `https://wellly.planforfit.com`;
  const uriWithRandomKey1 = `http://localhost:3000/#/`;
  const params = "tha-0012";
  // ...

  const goBack = () => {
    navigation.goBack();
  };

  const handleMessage = (event) => {
    console.log("event", event);
    const data = event.nativeEvent.data; /* .nativeEvent.data */
    setBackApp(data);
    // ทำตามต้องการกับข้อมูลที่ได้รับจาก WebView
  };

  return (
    <View style={styles.container}>
      {(backApp === "/" || backApp === "") && (
        <TouchableOpacity onPress={goBack} style={styles.goBack}>
          <Image
            style={{
              marginTop: -8,
              width: 24,
              height: 24,
            }}
            source={Chevron}
          />
        </TouchableOpacity>
      )}
      <WebView
        key={forceRender}
        ref={webViewRef}
        source={{ uri: `${uriWithRandomKey}?params=${params}` }}
        style={backApp === "/" || backApp === "" ? styles.webview : {}}
        onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: "#ffff",
  },
  goBack: {
    width: "100%",
    height: 48,
    paddingLeft: 16,
    paddingTop: 16,
  },
  webview: {
    marginTop: -48,
  },
});

export default MyWebView;
