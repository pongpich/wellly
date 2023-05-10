import React from 'react';
import { Animated, View, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';

const HEADER_HEIGHT = 500;

const AnimatedHeader = ({ animatedValue }) => {
    const insets = useSafeAreaInsets();

    const headerHeight = animatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top, insets.top + 140],
        extrapolate: 'clamp'
    });
    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                /*  opacity: 0.5, */
                height: headerHeight,
                backgroundColor: "red"
            }}
        >


        </Animated.View>
    );
};

const styles = StyleSheet.create({
    nutritionBox: {
        marginTop: 150,
        opacity: 1,
        zIndex: 10,
        position: 'absolute',
        width: "100%"
    },
    missionText: {
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        marginBottom: 16,
        position: "relative",
        width: "100%",
    },
    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    missionView: {
        flexDirection: "row"
    },
    missionPre: {
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.persianBlue,
        borderRadius: 100,
    },
    programPre: {
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.persianBlue20,
        borderRadius: 100,
    },
})

export default AnimatedHeader;