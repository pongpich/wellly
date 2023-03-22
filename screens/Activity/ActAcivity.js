import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';

class ActAcivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stsusColor: "เข้มข้นต่ำ"
        };
    }

    render() {
        const { stsusColor } = this.state;
        return (
            <View style={styles.fill}>
                <View style={{ height: 58, zIndex: 10, width: "100%", backgroundColor: colors.white }}>
                    <StatusBar barStyle="dark-content" />
                </View>
                <View style={{ height: 48, width: "100%", backgroundColor: colors.white }}>
                    <View style={{ marginLeft: 16 }}>
                        {/*           //  this.props.navigation.dispatch(StackActions.replace('Home')) */}
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <Image
                                source={require('../../assets/images/icon/caret.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.boxConter, { justifyContent: "space-between" }]}>
                    <View style={styles.missionView}>
                        <Image style={styles.activityImage} source={require('../../assets/images/activity/Activitylow.png')} />
                        <View style={styles.groupText}>
                            <Text style={styles.headText}>เดินเร็ว</Text>
                            <Text style={[styles.groupStatus, { color: stsusColor == "เข้มข้นต่ำ" ? colors.secondary_MayaBlue : stsusColor == "เข้มข้นปานกลาง" ? colors.tertiaryYellow : colors.tertiaryMagenta }]}>เข้มข้นต่ำ</Text>
                        </View>
                    </View>
                    <Image
                        style={styles.chevronImage}
                        source={require('../../assets/images/activity/Chevron.png')}
                    />
                </View>
            </View >
        )
    }
}
const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.grey7,
    },
    boxConter: {
        backgroundColor: colors.white,
        marginBottom: 24,
        paddingHorizontal: 16
    },
    missionView: {
        flexDirection: "row"
    },
    activityImage: {
        width: 32,
        height: 32,
        marginTop: 16,
        marginLeft: 16
    },
    headText: {
        marginTop: 15,
        marginLeft: 13,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
    },
    groupText: {
        flexDirection: "column"
    },
    groupStatus: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize14,
        marginLeft: 16
    },
    chevronImage: {
        width: 24,
        height: 24,
        justifyContent: "flex-end",
        position: "absolute"
    }

})
export default ActAcivity;