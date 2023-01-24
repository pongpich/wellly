import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Pressable, SafeAreaView, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';
import Swiper from 'react-native-swiper'

export default class Walkthrough extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperIndex: 0,

        }
    }

    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    onSwipe = (index) => {

        this.setState({
            swiperIndex: index
        })
    }

    swiper() {
        const { swiperIndex } = this.state;
        return (
            <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}
                index={swiperIndex}
                loop={false}
                bounces={false}
                automaticallyAdjustContentInsets={true}
                onIndexChanged={this.onSwipe}
            >
                <View style={styles.slide1} >
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_1.png')}
                    />
                    <Text style={styles.textWellly}>ยินดีต้อนรับสู่ Wellly</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>แอพพัฒนาสุขภาพ ส่วนบุคคลที่จะช่วยแนะนำคุณทีละขั้นตอน</Text>
                    </View>
                </View>
                <View style={styles.slide1} >
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_2.png')}
                    />
                    <Text style={styles.textWellly}>พาสุขภาพไปในทางที่ดีขึ้น</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>ปรับเปลี่ยนวิธีคิด, โภชนาการ และ เริ่มต้นออกกำลังกาย</Text>
                    </View>
                </View>
                <View style={styles.slide1}>
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_3.png')}
                    />
                    <Text style={styles.textWellly}>ในแบบที่เหมาะสม</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>กับสถานะสุขภาพของคุณเอง ได้อย่างสนุก และท้าทาย เริ่มกันเลย!</Text>
                    </View>
                </View>

            </Swiper >

        )
    }



    render() {
        const { swiperIndex } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.boxView}>
                    <View style={styles.swiperBox}>
                        {
                            this.swiper()
                        }
                    </View>
                    <View style={styles.circle}>
                        <View style={swiperIndex == "0" ? styles.circleActive : styles.circleDot} />
                        <View style={swiperIndex == "1" ? styles.circleActive : styles.circleDot} />
                        <View style={swiperIndex == "2" ? styles.circleActive : styles.circleDot} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    {swiperIndex < 2 ?
                        <>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.handleChange("swiperIndex", swiperIndex + 1)} >
                                <Text style={ComponentsStyle.textButton} >ถัดไป</Text>
                            </Pressable>
                            <Pressable style={styles.buttonCross} onPress={() => this.handleChange("swiperIndex", 2)} >
                                <Text style={styles.textCross}>ข้าม</Text>
                            </Pressable>

                        </> :
                        <>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("OnboardingName")} >
                                <Text style={ComponentsStyle.textButton} >เริ่มกันเลย!</Text>
                            </Pressable>
                        </>}
                </View>
            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    wrapper: {
        marginTop: "20%",
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    swiperBox: {
        height: 490,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    welllyView: {
        position: "relative",
        height: "100%",

    },
    viewImage: {
        alignItems: "center",
        marginTop: "18%"
    },
    entryImage: {
        /*   textAlign: "center" */
    },

    textWellly: {
        marginTop: 40,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 20,
        color: colors.grey1
    },
    areaText: {
        width: "70%",
    },
    textWellly_2: {
        marginTop: 8,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
        fontSize: 16,
        textAlign: "center",
    },
    circle: {
        marginTop: 16,
        flexDirection: "row",
        while: "100%",
        alignItems: "center",
        marginLeft: -8,
    },
    circleActive: {
        textAlign: "center",
        width: 8,
        height: 8,
        backgroundColor: colors.persianBlue,
        border: "solid 5px darkcyan",
        borderRadius: 100,
        marginLeft: 8,
    },
    circleDot: {
        width: 8,
        height: 8,
        backgroundColor: colors.grey4,
        border: "solid 5px darkcyan",
        borderRadius: 100,
        marginLeft: 8,

    },

    buttonView: {
        alignItems: "center",
        paddingHorizontal: 16,
        width: "100%",
        marginBottom: 40,
    },
    buttonCross: {
        marginTop: 16,
        width: "100%",
        height: 50,

    },
    textCross: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",
    },


});

AppRegistry.registerComponent('myproject', () => Walkthrough)