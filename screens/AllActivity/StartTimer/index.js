import {
    View,
    Text,
    StyleSheet,
    Modal, Platform, PermissionsAndroid, Alert, Linking, Pressable,
    ActivityIndicator,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import IconRun from "../../../assets/images/icon/run.png";
import IconStop from "../../../assets/images/icon/stop.png";
import Contextual from "../../../assets/images/icon/Contextual2.png";
import colors from "../../../constants/colors";
import { useRoute } from '@react-navigation/native';
import { Pedometer, DeviceMotion, Accelerometer } from 'expo-sensors';
import { getDistance } from 'geolib';
import * as Location from 'expo-location';
import {
    updateEventStepCount_Distance,
    statusEventStepCount_Distance
} from "../../../redux/update";
import { useSelector, useDispatch } from "react-redux";
import {
    getEventUser,
    clearStatusEventUser
} from "../../../redux/get";
import { useRef } from "react";

async function requestActivityRecognitionPermission() {
    if (Platform.OS === 'android') {
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
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                if (granted === PermissionsAndroid.RESULTS.DENIED) {
                    Alert.alert("Permission Denied", "Permission to access activity recognition is required!");
                } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    Alert.alert(
                        "Permission Required",
                        "Permission to access activity recognition is required! Please enable it in the system settings.",
                        [
                            { text: "Cancel", style: "cancel" },
                            { text: "Open Settings", onPress: () => Linking.openSettings() }
                        ]
                    );
                }
                throw new Error("Activity recognition permission denied");
            }
        } catch (err) {
            console.warn("Permission error:", err);
            throw err;
        }
    } else if (Platform.OS === 'ios') {
        const { status } = await DeviceMotion.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access motion data is required!');
            throw new Error("Motion data permission denied");
        }
    }
}

async function requestLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        throw new Error("Location permission denied");
    }
}

const StartTime = ({ navigation }) => {
    const [steps, setSteps] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [statusStop, setStatusStop] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [previousLocation, setPreviousLocation] = useState(null);
    const [startLocation, setStartLocation] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [locationSubscription, setLocationSubscription] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [movementDetected, setMovementDetected] = useState(false);
    const [statusFinish, setStatusFinish] = useState(false);
    const [indicator, setIndicator] = useState(false);

    const dispatch = useDispatch();
    const route = useRoute();
    const { eventId, distance_goal, stepCount_goal, criteria_walk_step, criteria_distance } = route.params;

    const { authentication, idToken, user, } = useSelector(({ authUser }) => (authUser ? authUser : ""));
    const { statusStepCountDistace } = useSelector(({ updateData }) => (updateData ? updateData : ""));
    const { status_event_user, event_user } = useSelector(({ getData }) => (getData ? getData : ""));

    const onFinish = () => {
        setIndicator(true);

        console.log("444");
        const distanceKg = criteria_distance == "false" ? 0 : (totalDistance / 1000).toFixed(2);
        const step = criteria_walk_step == "false" ? 0 : steps;
        setStatusFinish(true);
        dispatch(updateEventStepCount_Distance(user && user.user_id, eventId, step, distanceKg, distance_goal, stepCount_goal));

    };


    const forsake = () => {
        setModalVisible(!modalVisible);
        setStartLocation(null);
        setTotalDistance(0);
        locationSubscription?.remove();
        navigation.goBack();
    };

    const onStop = () => {
        setStatusStop(!statusStop);
        setIsActive(!isActive);

    };

    useEffect(() => {

        if (statusStepCountDistace == "success" && statusFinish == true) {

            dispatch(getEventUser(user && user.user_id));
        }



    }, [statusStepCountDistace]);
    useEffect(() => {
        if (status_event_user == "success" && statusFinish == true) {

            navigation.goBack();
        }
    }, [status_event_user]);


    useEffect(() => {
        const interval = !isActive ? setInterval(() => setSeconds(seconds => seconds + 1), 1000) : null;
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };


    useEffect(() => {
        const initializePermissions = async () => {
            try {
                await requestActivityRecognitionPermission();
                await requestLocationPermission();
            } catch (error) {
                console.error("Error requesting permissions", error);
            }
        };

        const initializePedometer = async () => {
            try {
                const isAvailable = await Pedometer.isAvailableAsync();
                setIsPedometerAvailable(String(isAvailable));
                if (isAvailable && !statusStop) {
                    const subscription = Pedometer.watchStepCount(result => setSteps(result.steps));
                    return () => subscription?.remove();
                }
            } catch (error) {
                console.error("Error initializing pedometer", error);
            }
        };

        const initializeLocation = async () => {
            try {
                const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                setStartLocation(location.coords);
                setPreviousLocation(location);
                const subscription = await Location.watchPositionAsync(
                    { accuracy: Location.Accuracy.Highest, timeInterval: 500, distanceInterval: 0.5 },
                    setCurrentLocation
                );
                setLocationSubscription(subscription);

                Accelerometer.addListener(({ x, y, z }) => {
                    setMovementDetected(Math.sqrt(x ** 2 + y ** 2 + z ** 2) > 1.3);
                });
            } catch (error) {
                console.error("Error initializing location", error);
                Alert.alert("Error", "Unable to initialize location services. Please check your permissions and try again.");
            }
        };

        const initialize = async () => {
            try {
                await initializePermissions();
                await Promise.all([initializePedometer(), initializeLocation()]);
            } catch (error) {
                console.error("Error during initialization", error);
            }
        };

        initialize();
    }, []);




    const startStopHandler = async () => {
        if (statusStop) {
            locationSubscription?.remove();
        } else {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            setStartLocation(location.coords);
            setPreviousLocation(location);
            const subscription = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.Highest, timeInterval: 500, distanceInterval: 0.5 },
                setCurrentLocation
            );
            setLocationSubscription(subscription);
        }
    };

    useEffect(() => {
        if (!statusStop && currentLocation && previousLocation && movementDetected) {
            const newDistance = getDistance(previousLocation.coords, currentLocation.coords);
            const timeDifference = (currentLocation.timestamp - previousLocation.timestamp) / 1000;
            if (timeDifference > 0 && newDistance > 0 && newDistance < 100) {
                setSpeed(newDistance / timeDifference);
                setTotalDistance(totalDistance + newDistance);
                setPreviousLocation(currentLocation);
            }
        }
    }, [currentLocation, !statusStop, previousLocation, movementDetected]);

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
                    {/*                    <Text>Pedometer available: {isPedometerAvailable}</Text> */}
                </View>
                <View style={styles.boxStepText}>
                    <Text style={styles.textTime}>ระยะทาง (กม.)</Text>
                    <Text style={styles.stepData}>{(totalDistance / 1000).toFixed(2)}</Text>
                    {/*  <Text style={styles.textTime}>Speed: {speed?.toFixed(2)} m/s</Text>
                    {startLocation && <Text style={styles.textTime}>Start Location: {startLocation.latitude}, {startLocation.longitude}</Text>}
                    <Text style={styles.textTime}>Total Distance: {totalDistance.toFixed(2)} meters </Text>
                    <Text style={styles.textTime}>Total Distance: {(totalDistance / 1000).toFixed(2)} kilometers</Text>
                    <Text style={styles.textTime}>Movement Detected: {movementDetected ? "Yes" : "No"}</Text> */}
                </View>
            </View>
            <View style={styles.boxImage}>
                <Image style={styles.image} source={IconRun} />
            </View>
            <View style={styles.boxSop}>
                {statusStop == false ?
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
                            <Pressable style={styles.circleFinish} onPress={() => !indicator && onFinish()}>
                                {indicator ?
                                    <ActivityIndicator size="large" color="#FFF" />
                                    :
                                    <Text style={styles.textFinish}>เสร็จ</Text>}

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
        alignItems: "center",
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
        borderRadius: 50,
        backgroundColor: colors.white,
        borderColor: colors.secondary_MayaBlue,
        borderWidth: 2,
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
        borderRadius: 50,
        backgroundColor: colors.secondary_MayaBlue,
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
        justifyContent: "flex-end",
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
        borderColor: colors.primary,
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
        borderColor: colors.primary,
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
