import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as GoogleSignIn from "expo-auth-session/providers/google";
import IconRun from "../../../assets/images/icon/run.png";
import colors from "../../../constants/colors";

const iosKey =
  "860210111844-7f56c79ti04is1ld9juuhhb2mhlf4olq.apps.googleusercontent.com";
const androidkey =
  "860210111844-mkvdh1hlg762mm3fms4vnbgiahje7pd2.apps.googleusercontent.com";
const webClientExpoKey =
  "860210111844-b9qc0fi6hm6s82vs1n8ksf07u00b4k7p.apps.googleusercontent.com";

const StartTime = () => {
  const [stepCount, setStepCount] = useState(0);
  const [distance, setDistance] = useState(0);
  const [req, res, promptAsync] = GoogleSignIn.useAuthRequest({
    androidClientId: androidkey,
    iosClientId: iosKey,
    webClientId: webClientExpoKey,
    clientId: webClientExpoKey,
    expoClientId: webClientExpoKey,
    scopes: [
      "https://www.googleapis.com/auth/fitness.activity.read",
      "https://www.googleapis.com/auth/fitness.location.read",
    ],
  });

  const getMyGoogleFit = async (token, startTimeMillis, endTimeMillis) => {
    if (!token) return;
    try {
      console.log("fitnessApi.js 49 | getting steps data with token", token);
      const dataTypeName = "com.google.step_count.delta";
      const dataTypeName2 = "com.google.distance.delta";

      const dataSourceId =
        "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas";
      const dataSourceId2 =
        "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta";

      const query = {
        aggregateBy: [
          { dataTypeName: dataTypeName, dataSourceId: dataSourceId },
          { dataTypeName: dataTypeName2, dataSourceId: dataSourceId2 },
        ],
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

      console.log("test", data.bucket[0].dataset[1].point[0].value[0]);

      setStepCount(data.bucket[0].dataset[0].point[0].value[0].intVal);
      setDistance(
        (data.bucket[0].dataset[1].point[0].value[0].fpVal / 1000).toFixed(2)
      );

      return data;
    } catch (error) {
      console.log("fitnessApi.js 35 | error getting steps data", error);
      return error.message;
    }
  };

  const handleSignGoogle = async () => {
    if (res?.type == "success") {
      const startDate = new Date("2024-05-02");
      const endDate = new Date("2024-05-03");
      /* const startDate = new Date("2024-05-02T13:00:00");
      const endDate = new Date("2024-05-02T14:00:00"); */
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
    <View style={styles.container}>
      <View style={styles.boxTime}>
        <Text style={styles.textTime}>เวลา</Text>
        <Text style={styles.times}>00:12:45</Text>
      </View>
      <View style={styles.boxStep}>
        <View style={styles.boxStepText}>
          <Text style={styles.textTime}>ก้าวเดิน (ก้าว)</Text>
          <Text style={styles.stepData}>200</Text>
        </View>
        <View style={styles.boxStepText}>
          <Text style={styles.textTime}>ระยะทาง (กม.)</Text>
          <Text style={styles.stepData}>1.40</Text>
        </View>

      </View>
      <View style={styles.boxImage}>
        <Image style={styles.image} source={IconRun} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxTime: {
    zIndex: 1,
    marginTop: 92,
    alignItems: "center",
  },
  textTime: {
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Regular",
    color: colors.grey2,
  },
  times: {
    fontSize: 64,
    fontFamily: "IBMPlexSansThai-Bold",
    color: colors.black,
  },
  boxStep: {
    zIndex: 1,
    marginTop: 48,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  stepData: {
    fontSize: 48,
    fontFamily: "IBMPlexSansThai-Bold",
    color: colors.black,
  },
  boxStepText: {
    zIndex: 1,
    alignItems: "center"
  },
  boxImage: {
    zIndex: 0,
    flex: 1,
    alignItems: "center", // จัดการให้ content อยู่กึ่งกลางตามแนวแกน X
    justifyContent: "flex-end",
  },
  image: {
    zIndex: 0,
    width: "100%",
    maxWidth: 438,
    maxHeight: 559,
    resizeMode: "contain",
  },
});
export default StartTime;
