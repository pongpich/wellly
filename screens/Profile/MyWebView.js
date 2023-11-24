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
  const [currentUrl, setCurrentUrl] = useState("");
  const randomKey = Math.random().toString(36).substring(7);
  const uriWithRandomKey = `https://wellly.planforfit.com/`;

  // ...

  const goBack = () => {
    navigation.goBack();
  };

  const reloadWebView = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleNavigationStateChange = (navState) => {
    setCurrentUrl(navState.url);
  };

  console.log("currentUrl", uriWithRandomKey);
  return (
    <View style={styles.container}>
      {currentUrl == uriWithRandomKey && (
        <TouchableOpacity onPress={goBack} style={styles.goBack}>
          <Image
            style={{
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
        source={{ uri: uriWithRandomKey }}
        onNavigationStateChange={handleNavigationStateChange}
        style={currentUrl == uriWithRandomKey && styles.webview}
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
