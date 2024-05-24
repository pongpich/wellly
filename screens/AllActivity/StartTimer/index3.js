import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, SafeAreaView, Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
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

export default function StepCounter() {
    const [steps, setSteps] = useState(0);
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

    useEffect(() => {
        if (isPedometerAvailable === 'false') {
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
    }, [isPedometerAvailable]);
    const resetSteps = () => {
        setSteps(0);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.stepTracker}>Step Tracker</Text>
            <View style={styles.infoContainer}>
                <View style={styles.stepsContainer}>
                    <Text style={styles.stepsText}>{steps}</Text>
                    <Text style={styles.stepsLabel}>Steps</Text>
                </View>
                <Button title="Reset Steps" onPress={requestPermission} />
            </View>
            <Text>Pedometer available: {isPedometerAvailable}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepTracker: {
        fontSize: 24,
    },
    infoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    stepsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 100,
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    stepsText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    stepsLabel: {
        fontSize: 18,
    },
});
