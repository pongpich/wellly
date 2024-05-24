import {
    View,
    Text,
    Button,
    StyleSheet,
    ImageBackground,
    Modal, Platform, PermissionsAndroid, Alert, Linking, Pressable,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as GoogleSignIn from "expo-auth-session/providers/google";
import * as Google from "expo-auth-session/providers/google";
import IconRun from "../../../assets/images/icon/run.png";
import IconStop from "../../../assets/images/icon/stop.png";
import Contextual from "../../../assets/images/icon/Contextual2.png";
import colors from "../../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from '@react-navigation/native';
import {
    authenticationToken,
    authenticationIdToken
} from "../../../redux/auth";
import {
    updateEventStepCount_Distance,
    statusEventStepCount_Distance
} from "../../../redux/update";
import {
    getEventUser,
    clearStatusEventUser
} from "../../../redux/get";
import { useRef } from "react";

import { Pedometer } from 'expo-sensors';
import * as Permissions from 'expo-permissions';


async function requestPermission() {
    if (Platform.OS === 'android') {
        console.log('Requesting Android permission');
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
                {
                    title: "Activity Recognition Permission",
                    message: "This app needs access to your activity recognition",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            console.log('Permission granted result:', granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission granted successfully");
            } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                console.log("Permission denied");
                Alert.alert(
                    "Permission Denied",
                    "Permission to access activity recognition is required!",
                    [
                        { text: "OK" }
                    ]
                );
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                console.log("Permission never ask again selected");
                Alert.alert(
                    "Permission Required",
                    "Permission to access activity recognition is required! Please enable it in the system settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Open Settings", onPress: () => Linking.openSettings() }
                    ]
                );
            }
        } catch (err) {
            console.warn("Permission error:", err);
        }
    } else if (Platform.OS === 'ios') {
        console.log("Requesting iOS permission");
        const { status } = await Permissions.askAsync(Permissions.MOTION);
        if (status !== 'granted') {
            alert('Permission to access motion data is required!');
        }
    }
}



const StartTime = ({ navigation }) => {

    const [steps, setSteps] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

    const [distance, setDistance] = useState(0);
    const [statusStop, setStatusStop] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [date, setDate] = useState(new Date());
    const [statusFinish, setStatusFinish] = useState(false);
    const dispatch = useDispatch();
    const route = useRoute();
    const { eventId, distance_goal, stepCount_goal } = route.params;


    const { authentication, idToken, user, } = useSelector(({ authUser }) => (authUser ? authUser : ""));
    const { statusStepCountDistace } = useSelector(({ updateData }) => (updateData ? updateData : ""));
    const { status_event_user, event_user } = useSelector(({ getData }) => (getData ? getData : ""));


    const onFinish = () => {
        navigation.goBack();

    }


    const forsake = () => {
        setModalVisible(!modalVisible);
        navigation.goBack();

    }






    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const onStop = () => {
        setStatusStop(!statusStop)
        setIsActive(!isActive);
    };

    const resetTimer = (event) => {
        setSeconds(event);
        setIsActive(false);
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

    useEffect(() => {
        if (statusStop == 'false') {
            let subscription;
            console.log("Calling requestPermission");
            requestPermission().then(() => {
                console.log("Checking Pedometer availability");
                Pedometer.isAvailableAsync().then(
                    (result) => {
                        console.log("Pedometer available:", result);
                        setIsPedometerAvailable(String(result));
                        if (result) {
                            subscription = Pedometer.watchStepCount(result => {
                                setSteps(result.steps);
                            });
                        }
                    }
                ).catch((error) => {
                    console.error('Could not get isPedometerAvailable:', error);
                    setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
                });
            }).catch((error) => {
                console.error("Error in requestPermission:", error);
            });

            return () => {
                if (subscription) {
                    subscription.remove();
                }
            };
        }
    }, [statusStop]);


    return (
        <View style={styles.container} source={IconRun} >
            <View style={styles.boxTime}>
                <Text style={styles.textTime}>เวลา</Text>
                <Text style={styles.times}>{formatTime(seconds)}</Text>
            </View>
            <View style={styles.boxStep}>
                <View style={styles.boxStepText}>
                    <Text style={styles.textTime}>ก้าวเดิน (ก้าว)</Text>
                    <Text style={styles.stepData}>{steps}</Text>
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
                    <View>
                        <Pressable onPress={() => onStop()}>
                            <Image style={styles.stop} source={IconStop} />
                        </Pressable>
                    </View>
                    :
                    <View >
                        <View style={styles.circle}>
                            <Pressable style={styles.circlePlay} onPress={() => onStop()}>
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
                            <Pressable style={styles.buttonAbandon} onPress={() => forsake()}>
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
    },
    startTime: {
        color: colors.grey2,
        fontSize: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center"
    }
});
export default StartTime;
