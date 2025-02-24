import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    Dimensions,
} from 'react-native';

const images = new Array(6).fill(
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const windowDimensions = Dimensions.get('window');

export default class App extends Component {
    scrollX = new Animated.Value(0);

    state = {
        dimensions: {
            window: windowDimensions,
        },
    };

    onDimensionsChange = ({ window }) => {
        this.setState({ dimensions: { window } });
    };

    componentDidMount() {
        this.dimensionsSubscription = Dimensions.addEventListener(
            'change',
            this.onDimensionsChange,
        );
    }

    componentWillUnmount() {
        this.dimensionsSubscription.remove();
    }

    render() {
        const windowWidth = this.state.dimensions.window.width;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.scrollX,
                                    },
                                },
                            },
                        ])}
                        scrollEventThrottle={1}>
                        {images.map((image, imageIndex) => {
                            return (
                                <View
                                    style={{
                                        width: windowWidth,
                                        height: 250,
                                    }}
                                    key={imageIndex}>
                                    <ImageBackground source={image} style={styles.card}>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.infoText}>
                                                {'Image - ' + imageIndex}
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <Text>asdasdasd</Text>
                    <View style={styles.indicatorContainer}>
                        {images.map((image, imageIndex) => {

                            const width = this.scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [8, 16, 8],
                                // outputRange: ['gray', 'blue', 'gray'],
                                extrapolate: 'clamp',

                            });
                            const backgroundColor = this.scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: ['gray', 'blue', 'gray'],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={imageIndex}
                                    style={[styles.normalDot, { width, backgroundColor }]}
                                />
                            );
                        })}

                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: "red"
    },

    normalDot2: {
        backgroundColor: "blue"
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});