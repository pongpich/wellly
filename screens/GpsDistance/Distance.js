import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
  InputAccessoryView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as Location from "expo-location";

import { getDistance } from "geolib";

const Distance = () => {
  const [location, setLocation] = useState(null);
  const [locationOld, setLocationOld] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let getLocation = await Location.getCurrentPositionAsync({});
      if (getLocation) {
        setLocationOld(getLocation);
      }

      // Watch for location updates
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      // Clean up the subscription when the component unmounts
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  let text = "Waiting..";
  let Old = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text =
      "location      " +
      " " +
      location.coords.latitude +
      " " +
      location.coords.longitude;

    if (locationOld) {
      Old =
        "locationOld" +
        " " +
        locationOld.coords.latitude +
        " " +
        locationOld.coords.longitude;

      console.log("locationOld:", locationOld.coords.latitude);
      console.log("locationOld:", locationOld.coords.longitude);
    }

    console.log("locationOld", locationOld);
    /*     console.log("latitude:", location.coords.latitude);
    console.log("longitude:", location.coords.longitude); */
  }
  // ตัวอย่างการใช้งานเรียกใช้งานพิกัดตำแหน่งอย่างต่อเนื่อง
  // Example coordinates
  /*   const coordinates1 = {
    latitude: locationOld.coords.latitude,
    longitude: locationOld.coords.longitude,
  }; // London
  const coordinates2 = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  }; // Paris
    const distance = getDistance(coordinates1, coordinates2);
  */

  const userLocation = {
    latitude: locationOld ? locationOld.coords.latitude : 0,
    longitude: locationOld ? locationOld.coords.longitude : 0,
  };
  const destination = {
    latitude: location ? location.coords.latitude : 0,
    longitude: location ? location.coords.longitude : 0,
  };

  const distanceInMeters = getDistance(userLocation, destination);
  const distanceInKilometers = distanceInMeters / 1000;
  console.log("Distance in kilometers:", distanceInKilometers);
  console.log("Distance in meters:", distanceInMeters);

  // Calculate distance in meters

  return (
    <View>
      <Text>ระยะทาง gps</Text>

      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>{Old}</Text>
      <Text style={styles.paragraph}>ระยะทาง {distanceInKilometers} KG</Text>
    </View>
  );
};

export default Distance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
