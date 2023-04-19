import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Animated, StatusBar, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback, Button } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';
class Badge extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            excellent: false,
            awesome: false,
            welldone: false,
            goodJob: false,
            greatWork: false,
            win: false,
        };
    }

    render() {
        const { excellent, awesome, welldone, goodJob, greatWork, win } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={styles.headText}>ตราของฉัน</Text>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={styles.images}
                                source={excellent ? require('../../assets/images/badge/Badge_3x_A2.png') : require('../../assets/images/badge/Badge_3x_A1.png')}
                            />
                            <Image
                                style={[styles.images, { marginLeft: 32 }]}
                                source={awesome ? require('../../assets/images/badge/Badge_3x_B2.png') : require('../../assets/images/badge/Badge_3x_B1.png')}
                            />
                            <Image
                                style={[styles.images, { marginLeft: 32 }]}
                                source={welldone ? require('../../assets/images/badge/Badge_3x_C2.png') : require('../../assets/images/badge/Badge_3x_C1.png')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 24 }}>
                            <Image
                                style={styles.images}
                                source={goodJob ? require('../../assets/images/badge/Badge_3x_D2.png') : require('../../assets/images/badge/Badge_3x_D1.png')}
                            />
                            <Image
                                style={[styles.images, { marginLeft: 32 }]}
                                source={greatWork ? require('../../assets/images/badge/Badge_3x_E2.png') : require('../../assets/images/badge/Badge_3x_E1.png')}
                            />
                            <Image
                                style={[styles.images, { marginLeft: 32 }]}
                                source={win ? require('../../assets/images/badge/Badge_3x_F2.png') : require('../../assets/images/badge/Badge_3x_F1.png')}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <ImageBackground
                        style={[styles.images_bg]}
                        source={require('../../assets/images/badge/Badge_BG.png')}
                    />
                </View>
            </View>

        )
    }
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    headText: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
        marginBottom: 24
    },
    images: {
        width: 80,
        height: 80,
    },
    images_bg: {
        width: "100%",
        height: 260
    }
});
export default Badge;