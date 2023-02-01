import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';


const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const data = Array.from({ length: 30 });

const Nutrition = () => {
    const animatedScrollYValue = useRef(new Animated.Value(0)).current;

    const headerHeight = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.20],
        extrapolate: 'clamp',
    });


    return (
        <View style={styles.fill}>

            <Animated.ScrollView
                style={styles.fill2}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }])}
            >

                <View style={styles.scrollViewContent}>
                    <View style={styles.missionText}>
                        <Text style={styles.mission}>ภารกิจล่าสุด</Text>
                        <Image
                            style={{ height: 24, width: 24, zIndex: 1 }}
                            source={require('../../assets/images/icon/History.png')}
                        />
                    </View>
                    {data.map((_, i) => (
                        <View key={i} style={styles.row}>
                            <View style={styles.numberView}>
                                <Text style={styles.number}>{i + 1}</Text>
                            </View>

                        </View>
                    ))}
                </View>
            </Animated.ScrollView>
            <Animated.View opacit y={headerHeight} style={[styles.header]}>

                <View style={styles.imageView}>
                    <Image
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                        source={require('../../assets/images/logo/Sample.png')}
                    />
                </View>
            </Animated.View>



        </View>
    );
};

Nutrition.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.neutralGrey6
    },
    fill2: {
        marginTop: 100,
        flex: 1,
        zIndex: 1,


    },
    row: {
        height: 118,
        marginBottom: 16,
        marginHorizontal: 16,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16
    },
    missionText: {
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        marginBottom: 20,
    },
    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    header: {
        position: 'absolute',
        width: "100%",
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.mayaBlue,

    },
    numberView: {

        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.mayaBlue20
    },
    imageView: {
        width: "100%",
        height: 500

    },
    scrollViewContent: {
        marginTop: "50%",
        opacity: 1

    }
});


export default Nutrition;
