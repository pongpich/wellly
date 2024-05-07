import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Modal, Alert, Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as GoogleSignIn from "expo-auth-session/providers/google";
import IconRun from "../../../assets/images/icon/run.png";
import IconStop from "../../../assets/images/icon/stop.png";
import Contextual from "../../../assets/images/icon/Contextual2.png";
import colors from "../../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  authenticationToken,
  authenticationIdToken
} from "../../../redux/auth";



const StartTime = ({ navigation }) => {
  const [stepCount, setStepCount] = useState(0);
  const [distance, setDistance] = useState(0);
  const [statusStop, setStatusStop] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(0);
  const [statusToken, setStatusToken] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const dispatch = useDispatch();

  const { authentication, idToken } = useSelector(({ authUser }) => (authUser ? authUser : ""));

  let timer;

  const iosKey =
    "860210111844-7f56c79ti04is1ld9juuhhb2mhlf4olq.apps.googleusercontent.com";
  const androidkey =
    "860210111844-mkvdh1hlg762mm3fms4vnbgiahje7pd2.apps.googleusercontent.com";
  const webClientExpoKey =
    "860210111844-b9qc0fi6hm6s82vs1n8ksf07u00b4k7p.apps.googleusercontent.com";

  const [req, res, promptAsync] = GoogleSignIn.useAuthRequest({
    androidClientId: androidkey,
    iosClientId: iosKey,
    webClientId: webClientExpoKey,
    clientId: webClientExpoKey,
    expoClientId: webClientExpoKey,
    scopes: [
      "https://www.googleapis.com/auth/fitness.activity.read",
      "https://www.googleapis.com/auth/fitness.location.read"
    ]
  });

  const getMyGoogleFit = async (token, startTimeMillis, endTimeMillis) => {

    try {
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

  const handleSignGoogle = async (event) => {



    const startDate = new Date("2024-04-25");
    const endDate = new Date("2024-04-26");

    const token = event != null ? event.authentication.accessToken : res.authentication.accessToken;
    if (event == null) {
      dispatch(authenticationToken(res))
    }

    await getMyGoogleFit(
      token,
      startDate.getTime(),
      endDate.getTime()
    );


  };

  useEffect(() => {

    if (res && res.type == "cancel") {
      navigation.goBack();
    } else {

      handleSignGoogle(null);
    }

  }, [res]);

  useEffect(() => {

    if (authentication == null) {

      if (req) {
        promptAsync({});
      }
    } else {

      handleSignGoogle(authentication);
    }



  }, [req]);

  useEffect(() => {
    if (authentication != null) {
      requestRefreshToken(authentication.authentication.accessToken);

    }



  }, [])




  const requestRefreshToken = async (refreshToken) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: new URLSearchParams({
          'grant_type': 'refresh_token',
          'client_id': webClientExpoKey,
          'client_secret': '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',
          'refresh_token': refreshToken,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to request refresh token');
      }

      const data = await response.json();

      console.log("data", data);
      /*  dispatch(authenticationIdToken(data.id_token)) */

    } catch (error) {
      console.error('Error requesting refresh token:', error);
      throw error;
    }
  };

  // ใช้โค้ดด้านบนเพื่อขอ refresh token โดยมี accessToken เป็นอาร์กิวเมนต์
  // เรียกใช้ requestRefreshToken(accessToken).then(refreshToken => { // ดำเนินการต่อไป });



  const onStop = (e) => {
    setStatusStop(e)
    stopTimer()
  }
  const onFinish = () => {
    navigation.goBack();
  }

  /* useEffect(() => {
   
      startTimer();
      return () => clearInterval(timer);
    

  }, []); */




  const startTimer = () => {
    setIsRunning(true);
    timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timer);
  };

  const resetTimer = () => {
    setTime(0);
  };
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };


  return (
    <View style={styles.container} source={IconRun} >
      <View style={styles.boxTime}>
        <Text style={styles.textTime}>เวลา</Text>
        <Text style={styles.times}>{formatTime(time)}</Text>
      </View>
      <View style={styles.boxStep}>
        <View style={styles.boxStepText}>
          <Text style={styles.textTime}>ก้าวเดิน (ก้าว)</Text>
          <Text style={styles.stepData}>{stepCount}</Text>
        </View>
        <View style={styles.boxStepText}>
          <Text style={styles.textTime}>ระยะทาง (กม.)</Text>
          <Text style={styles.stepData}>{distance}</Text>
        </View>

      </View>
      <View style={styles.boxImage}>
        <Image style={styles.image} source={IconRun} />
      </View>

      <View style={styles.boxSop}>
        {statusStop == true ?
          <Pressable onPress={() => onStop(false)}>
            <Image style={styles.stop} source={IconStop} />
          </Pressable>

          :
          <View >
            <View style={styles.circle}>
              <Pressable style={styles.circlePlay} onPress={() => onStop(true)}>
                <Text style={styles.textPlay}>กลับ</Text>
              </Pressable>
              <Pressable style={styles.circleFinish} onPress={() => onFinish()}>
                <Text style={styles.textFinish}>เสร็จ</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={styles.abandon}>ละทิ้ง</Text>
            </Pressable>

          </View>
        }

      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.contextual} source={Contextual} />
            <Text style={styles.modalText}>ยืนยันการละทิ้งกิจกรรม</Text>
            <View style={styles.modalBoxButton}>
              <Pressable style={styles.buttonBack} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextBack}>กลับ</Text>
              </Pressable>
              <Pressable style={styles.buttonAbandon}>
                <Text style={styles.buttonTextAbandon}>ละทิ้ง</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View >

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
    bottom: 64,


  },
  image: {
    zIndex: 0,
    width: "100%",
    maxWidth: 438,
    maxHeight: 559,
    resizeMode: "contain",

  },
  boxSop: {
    zIndex: 10,
    flex: 1,
    marginBottom: 35,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  circle: {
    zIndex: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  circlePlay: {
    zIndex: 2,
    width: 80,
    height: 80,
    borderRadius: 50, // ค่านี้จะทำให้มันเป็นวงกลม 50% ของความกว้างหรือความสูง
    backgroundColor: colors.white, // เปลี่ยนสีตามที่ต้องการ
    borderColor: colors.secondary_MayaBlue, // เปลี่ยนสีขอบตามที่ต้องการ
    borderWidth: 2, // เปลี่ยนขนาดของเส้นขอบตามต้องการ
    justifyContent: "center",
    alignItems: "center"
  },
  textPlay: {
    color: colors.secondary_MayaBlue,
    fontSize: 20,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  circleFinish: {
    zIndex: 2,
    marginLeft: 16,
    width: 80,
    height: 80,
    borderRadius: 50, // ค่านี้จะทำให้มันเป็นวงกลม 50% ของความกว้างหรือความสูง
    backgroundColor: colors.secondary_MayaBlue, // เปลี่ยนสีตามที่ต้องการ
    justifyContent: "center",
    alignItems: "center"
  },
  textFinish: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  stop: {
    width: 80,
    height: 80
  },
  abandon: {
    marginTop: 8,
    color: colors.grey2,
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end", // ให้อยู่ชิดด้านล่าง

  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,

    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 40,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  contextual: {
    width: 120,
    height: 120
  },
  modalText: {
    marginTop: 24,
    color: colors.black,
    fontSize: 20,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  modalBoxButton: {
    marginTop: 32,
    flexDirection: "row",
  },
  buttonBack: {
    width: 156,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: 50,
    borderColor: colors.primary, // เปลี่ยนสีขอบตามที่ต้องการ
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"

  },
  buttonAbandon: {
    marginLeft: 16,
    width: 155,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 50,
    borderColor: colors.primary, // เปลี่ยนสีขอบตามที่ต้องการ
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTextAbandon: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  buttonTextBack: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: "IBMPlexSansThai-Bold",
  }
});
export default StartTime;
