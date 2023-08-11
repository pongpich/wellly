import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const TestGPS2 = () => {
    const navigation = useNavigation();
    const [locationPermission, setLocationPermission] = useState(null);
    const [Lat, setLat] = useState("");
    const [Long, setLong] = useState("");

    useEffect(() => {
        getLocationPermission();
    }, []);

    const getLocationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        setLocationPermission(status);
    };

    const getLocation = async () => {
        if (locationPermission === 'granted') {
            try {
                const { coords } = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = coords;
                console.log('Latitude:', latitude);
                setLat(latitude);
                console.log('Longitude:', longitude);
                setLong(longitude);
            } catch (error) {
                console.error('Error getting location:', error);
            }
        } else {
            console.log('Location permission denied.');
        }
    };



    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.reportChallenge}>{`Home`}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.reportChallenge}>{`Home`}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.reportChallenge}>{`Home`}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.reportChallenge}>{`Home`}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.reportChallenge}>{`Home`}</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Text style={styles.reportChallenge}>{`WELLLY APP (WEB VIEW PAGE)`}</Text>
            </Pressable>
            <View>
                <Text>Location Permission: {locationPermission}</Text>
                <Button title="Get Location" onPress={getLocation} />
                <Text>**----- TestGPS PAGE 2 -----**</Text>
                <Text>Lat from App: {Lat}</Text>
                <Text>Long from  App: {Long}</Text>
            </View>

            <WebView
                source={{ uri: 'https://platform.bebefitroutine.com/#/test_gps' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default TestGPS2;
