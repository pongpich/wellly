import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AnimatedCircularProgress } from 'react-native-circular-progress';



class QuizAnswer extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            numberMission: null,
            fillNumber: 51,
            maxNumber: 10,


        };
    }
    render() {
        const { fillNumber, maxNumber } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.boxScore}>
                    <AnimatedCircularProgress
                        size={120}
                        width={8}

                        fill={fillNumber}
                        tintTransparency={true}
                        rotation={360}
                        tintColor={colors.positive1}
                        backgroundColor={colors.neutralGrey6} >
                        {

                            (fillNumber) => (
                                <>
                                    <View style={{ flexDirection: "row", }}>
                                        <Text style={{ color: colors.grey1, fontSize: 32, fontFamily: "IBMPlexSansThai-Bold", }}>{Math.ceil(fillNumber)}</Text>
                                        <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Bold", marginTop: 17 }}> /{Math.ceil(maxNumber)}</Text>
                                    </View>
                                    <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Regular", marginTop: -10 }}>คะแนน</Text>
                                </>
                            )

                        }
                    </AnimatedCircularProgress>
                </View>
            </View>
        )
    }
}


const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    boxScore: {
        width: "100%",
        alignItems: "center"
    },
    scoreView: {
        width: 120,
        height: 120,
        borderColor: colors.neutralGrey6,
        borderWidth: 8,
        borderRadius: 100,
        borderTopColor: colors.positive1,
        borderBottomColor: colors.positive1,
        borderRightColor: colors.positive1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default QuizAnswer;