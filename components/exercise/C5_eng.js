import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class C5 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        };
    }

    handleLoad = () => {
        this.setState({ loading: false });
    };

    handleError = () => {
        this.setState({ loading: false, error: true });
    };

    renderImg(img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/exercise/${img_index}.png`
        const { loading, error } = this.state;
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={(size === 'md') ? styles.boxImage : styles.boxImage2}>
                    {
                        loading &&
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={require('../../assets/images/icon/ImageArticle.png')}
                            resizeMode='stretch'
                        />}
                    {error && <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        source={require('../../assets/images/icon/ImageArticle.png')}
                        resizeMode='stretch'
                    />}
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        onLoad={this.handleLoad}
                        onError={this.handleError}
                        source={{ uri: imgUrl }}
                        resizeMode='stretch'
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.scrollViewbox} >
                {
                    this.renderImg('Exercise_w_7', 'md')
                }
                <Text style={styles.title}>
                    Cardio exercise
                </Text>
                <Text style={styles.content}>
                    includes activities with continuous movements that raise the heart rate to boost blood flow, strengthen the heart muscle, and improve heart health.
                </Text>
                <Text style={[styles.content, { marginTop: 24 }]}>
                    To be considered cardio exercise, the activities need to raise your breathing rate;
                    <Text style={styles.title2}> you may have to breathe in within a count of 3 seconds after an exhale.</Text>
                    It also includes the activities that trigger
                    <Text style={styles.title2}>  an increase in breathing rate and to which you continuously do more than 15 minutes.</Text>
                </Text>
                <Text style={styles.title}>
                    Examples of Cardio Exercises
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Running
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Cycling / Bicycling
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Swimming
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Elliptical workout
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Brisk walking
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Incline walking
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Stairmaster / Stair stepper workout
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Stairmaster / Stair stepper workout
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Circuit training
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Aerobic / Zumba dance
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Fast-paced activities: Body pump/ Body Combat
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Other exercise clips
                    </Text>
                </View>
                <Text style={styles.title}>
                    Benefits of Cardiovascular Training
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Improve blood circulation system
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Keep excess pounds at bay
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Ease pain for various symptoms such as
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Arthritis (joint pain)
                    </Text>
                </View>
                <View style={[styles.viewLi2, { marginBottom: 40 }]}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Fibromyalgia (widespread pain)
                    </Text>
                </View>
            </View>
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center",
        width: "100%"

    },
    li: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 5
    },
    titleLi: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 6
    },
    viewLi: {
        paddingLeft: 16,
        flexDirection: "row"
    },
    viewLi1: {
        marginLeft: 8,
        flexDirection: "row"
    },
    viewLi2: {
        marginLeft: 32,
        flexDirection: "row",
    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    title2: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },

    tableEx: {
        marginLeft: 16,
        marginTop: 32,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    content: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    content1: {
        fontFamily: "IBMPlexSansThai-SemiBold",
        fontSize: 15,
        color: colors.grey1
    },
    content2: {
        marginLeft: 8,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    boxImage: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 400 : 208
    },
    boxImage2: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 327,
        height: (deviceHeight > 1023) ? 1100 : 276,
        marginBottom: 40
    },
})


export default C5;