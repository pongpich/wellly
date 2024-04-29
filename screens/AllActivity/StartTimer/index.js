import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as GoogleSignIn from "expo-auth-session/providers/google";

const iosKey =
  "437818993892-ksult5nfvdn8b8vqblohputt1dht471m.apps.googleusercontent.com";
const androidkey =
  "437818993892-u4680sg7o8mhs4qi8gsi3551ul5b1gt0.apps.googleusercontent.com";
const webClientExpoKey =
  "437818993892-3688vh0k2j8teefn9j8n9m99qhv132p2.apps.googleusercontent.com";

export default function App() {
  const [stepCount, setStepCount] = useState(0);
  const [req, res, promptAsync] = GoogleSignIn.useAuthRequest({
    androidClientId: androidkey,
    iosClientId: iosKey,
    webClientId: webClientExpoKey,
    clientId: webClientExpoKey,
    expoClientId: webClientExpoKey,
    scopes: [
      "https://www.googleapis.com/auth/fitness.activity.read",
      "https://www.googleapis.com/auth/fitness.activity.write",
    ],
  });

  const getMyGoogleFit = async (token, startTimeMillis, endTimeMillis) => {
    if (!token) return;
    try {
      console.log("fitnessApi.js 49 | getting steps data with token", token);
      const dataTypeName = "com.google.step_count.delta";
      const dataSourceId =
        "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";
      const query = {
        aggregateBy: [{ dataTypeName, dataSourceId }],
        bucketByTime: { durationMillis: 35 * 24 * 60 * 60 * 1000 }, //35 * 24 * 60 * 60 * 1000 คือ 35วัน กำหนดกว้างๆเผื่อไว้ก่อน
        startTimeMillis: startTimeMillis,
        endTimeMillis: endTimeMillis,
      };
      const endpoint =
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      const data = await response.json();
      console.log("fitnessApi.js 24 | got steps data", data);
      console.log("test", data.bucket[0].dataset[0].point[0].value[0].intVal);
      setStepCount(data.bucket[0].dataset[0].point[0].value[0].intVal);

      return data;
    } catch (error) {
      console.log("fitnessApi.js 35 | error getting steps data", error);
      return error.message;
    }
  };

  const handleSignGoogle = async () => {
    if (res?.type == "success") {
      const startDate = new Date("2024-04-25");
      const endDate = new Date("2024-04-26");
      await getMyGoogleFit(
        res.authentication.accessToken,
        startDate.getTime(),
        endDate.getTime()
      );
    }
  };

  useEffect(() => {
    handleSignGoogle();
  }, [res]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{`stepCount: ${stepCount}`}</Text>
      <Button title="Sign with google" onPress={() => promptAsync({})} />
    </View>
  );
}
