import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';

const TestGPS = () => {
    const navigation = useNavigation();
    const [locationPermission, setLocationPermission] = useState(null);

    useEffect(() => {
        getLocationPermission();
    }, []);

    const getLocationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        setLocationPermission(status);
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
                <Button title="Get Location" onPress={getLocationPermission} />
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

export default TestGPS;
