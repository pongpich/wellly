import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const TestGPS = () => {
    const navigation = useNavigation();
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
            <WebView source={{ uri: 'https://platform.bebefitroutine.com/#/test_gps' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default TestGPS;
