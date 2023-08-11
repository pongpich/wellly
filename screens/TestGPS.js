import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const TestGPS = () => {
    const navigation = useNavigation();

    const CHROME_USER_AGENT =
        'Mozilla/5.0 (Linux; Android 10; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36';
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
            <WebView
                source={{ uri: 'https://platform.bebefitroutine.com/#/test_gps' }}
                userAgent={CHROME_USER_AGENT}
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
