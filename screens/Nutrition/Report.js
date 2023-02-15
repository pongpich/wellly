import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Animated, Image, ScrollView, Dimensions, Pressable, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';

export default class Report extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.areaView}>
                    <Text style={styles.exercise}>แบบฝึกหัด</Text>
                    <Text style={styles.week}>สัปดาห์ที่ 1</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    areaView: {
        marginLeft: 16,
        marginRight: 16
    },
});