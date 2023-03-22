import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BarChart, StackedBarChart, ContributionGraph } from 'react-native-chart-kit';
import colors from '../../constants/colors';

export default function MyBarChart() {

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey7
    },
});
