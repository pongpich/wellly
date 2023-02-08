import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
    fill: {

        flex: 1,

    },
    fill2: {
        marginTop: 100,
        flex: 1,
        zIndex: 1
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        width: "100%",
        height: 100,
        backgroundColor: "blue"
    },
    imageView: {
        width: "100%",
        height: 500
    },

    scrollViewContent: {
        marginTop: "50%",
        opacity: 1
    },
});

const data = Array.from({ length: 30 });

const ScrollableHeader = () => {
    const animatedScrollYValue = useRef(new Animated.Value(0)).current;

    const headerHeight = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 1],
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
                    {data.map((_, i) => (
                        <View key={i} style={styles.row}>
                            <Text>{i}</Text>
                        </View>
                    ))}
                </View>
            </Animated.ScrollView>
            <Animated.View opacity={headerHeight} style={[styles.header]}>
                <View style={styles.bar}>
                    <Text style={styles.title}>Title</Text>
                </View>
                {/*     <View style={styles.imageView}>
                    <Image
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                        source={require('../../assets/images/logo/Sample.png')}
                    />
                </View> */}
            </Animated.View>


        </View>
    );
};

ScrollableHeader.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default ScrollableHeader;