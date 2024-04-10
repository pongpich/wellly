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
import { Pedometer } from "expo-sensors";

const Distance = () => {
  const [location, setLocation] = useState(null);
  const [locationOld, setLocationOld] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  /**
   * ! ระยะทาง
   *  */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // Get current position and set it as the old location
      const initialLocation = await Location.getCurrentPositionAsync();
      setLocationOld(initialLocation);

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
    }
  }

  const userLocation = {
    latitude: locationOld ? locationOld.coords.latitude : 0,
    longitude: locationOld ? locationOld.coords.longitude : 0,
  };
  const destination = {
    latitude: location ? location.coords.latitude : 0,
    longitude: location ? location.coords.longitude : 0,
  };

  const distanceInMeters = getDistance(userLocation, destination);
  const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);

  /**
   * ! นับก้าว
   *  */
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View>
      <Text>ระยะทาง gps</Text>

      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>{Old}</Text>
      <Text style={styles.paragraph}>ระยะทาง {distanceInKilometers} km</Text>
      <Text style={styles.paragraph}>
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Text>
      <Text style={styles.paragraph}>
        Steps taken in the last 24 hours: {pastStepCount}
      </Text>
      <Text style={styles.paragraph}>
        Walk! And watch this go up: {currentStepCount}
      </Text>
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
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
