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
    Image,
    Pressable
} from 'react-native';
import ComponentsStyle from '../constants/components';
import { getProfanity } from "../redux/get";
import { updateDisplayName } from "../redux/auth";
import colors from '../constants/colors';
import Swiper from 'react-native-swiper';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const images = [
    require('../assets/images/icon/walkthrough_1.png'),
    require('../assets/images/icon/walkthrough_2.png'),
    require('../assets/images/icon/walkthrough_3.png'),

];

const windowDimensions = Dimensions.get('window');

class Walkthrough extends Component {
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
        const { t } = this.props;
        return (
            <View style={styles.container}>
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
                                    key={imageIndex} >
                                    <ImageBackground source={image} style={styles.card} >
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
                    <View style={{ alignItems: "center", }}>
                        <Text style={styles.textWellly}>{t('welcome_to_Wellly')}</Text>
                        <View style={styles.areaText}>
                            <Text style={styles.textWellly_2}>{t('health_app')}</Text>
                        </View>
                    </View>
                    <View style={styles.indicatorContainer}>
                        {images.map((image, imageIndex) => {

                            const width = this.scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [8, 8, 8],
                                extrapolate: 'clamp',

                            });
                            const backgroundColor = this.scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [colors.grey4, colors.persianBlue, colors.grey4],
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
                <View style={styles.buttonView}>
                    <Pressable style={ComponentsStyle.button} onPress={() => this.handleChange("swiperIndex", null)} >
                        <Text style={ComponentsStyle.textButton} >{t('next')}</Text>
                    </Pressable>

                    <Pressable style={styles.buttonCross} onPress={() => this.handleChange("swiperIndex", 2)} >
                        <Text style={styles.textCross}>{t('cross')}</Text>
                    </Pressable>
                </View>
            </View >
        );
    }
}


const devicehHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    container: {
        /*         backgroundColor: "red", */
        flex: 1,
        marginTop: "28%"
        /*       alignItems: 'center', */
        /*  justifyContent: 'center', */
    },
    scrollContainer: {
        /*     backgroundColor: "blue", */
        /*         paddingTop: 100, */
        /*  flex: 0.9, */
        zIndex: 0,
        height: 410,
        alignItems: 'center',
        justifyContent: 'center',

    },
    card: {
        height: 280,
        width: 280,

        /*     textAlign: "center", */
        /*         flex: 1, */
        left: "50%",
        marginLeft: -140,
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
    },

    normalDot2: {
        backgroundColor: "blue"
    },
    indicatorContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWellly: {

        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 20,
        color: colors.grey1,

    },
    areaText: {
        width: "70%",
    },
    textWellly_2: {
        textAlign: "center",

        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
        fontSize: 16,
    },
    buttonView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 40
    },
    buttonCross: {
        marginTop: 21,
        width: "100%",
    },
    textCross: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",
    },
});


const mapStateToProps = ({ getData, authUser }) => {
    const { profanity } = getData;
    const { user, statusUpdateDisplayName } = authUser;
    return { profanity, user, statusUpdateDisplayName };
};

const mapActionsToProps = { getProfanity, updateDisplayName };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Walkthrough));

