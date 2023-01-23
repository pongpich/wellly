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






    step_1() {
        return (
            <>
                <View style={styles.welllyView}>
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_1.png')}
                    />
                    <Text style={styles.textWellly}>ยินดีต้อนรับสู่ Wellly</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>แอพพัฒนาสุขภาพ ส่วนบุคคลที่จะช่วยแนะนำคุณทีละขั้นตอน</Text>
                    </View>
                    <View style={styles.circle}>
                        <View style={styles.circle_1} />
                        <View style={styles.circle_2} />
                        <View style={styles.circle_2} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.buttonNext} onPress={() => this.handleChange("stepNext", 2)}>
                        <Text style={styles.textNext}>ถัดไป</Text>
                    </Pressable>
                    <Pressable style={styles.buttonCross} onPress={() => this.handleChange("stepNext", 3)} >
                        <Text style={styles.textCross}>ข้าม</Text>
                    </Pressable>
                </View>
            </>
        )
    }
    step_2() {
        return (
            <>
                <View style={styles.welllyView}>
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_2.png')}
                    />
                    <Text style={styles.textWellly}>พาสุขภาพไปในทางที่ดีขึ้น</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>ปรับเปลี่ยนวิธีคิด, โภชนาการ และ เริ่มต้นออกกำลังกาย</Text>
                    </View>
                    <View style={styles.circle}>
                        <View style={styles.circle_2} />
                        <View style={styles.circle_1} />
                        <View style={styles.circle_2} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.buttonNext} onPress={() => this.handleChange("stepNext", 3)} >
                        <Text style={styles.textNext} >ถัดไป</Text>
                    </Pressable>
                    <Pressable style={styles.buttonCross} onPress={() => this.handleChange("stepNext", 3)} >
                        <Text style={styles.textCross}>ข้าม</Text>
                    </Pressable>
                </View>
            </>
        )
    }
    step_3() {
        return (
            <>
                <View style={styles.welllyView}>

                    <Text style={styles.textWellly}>ในแบบที่เหมาะสม</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>กับสถานะสุขภาพของคุณเอง ได้อย่างสนุก และท้าทาย เริ่มกันเลย!</Text>
                    </View>
                    <View style={styles.circle}>
                        <View style={styles.circle_2} />
                        <View style={styles.circle_2} />
                        <View style={styles.circle_1} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.buttonCross} />

                    <Pressable style={styles.buttonNext} onPress={() => this.props.navigation.navigate("OnboardingName")} >
                        <Text style={styles.textNext}>เริ่มกันเลย!</Text>
                    </Pressable>
                </View>
            </>
        )
    }




    swiper() {
        const { swiperIndex } = this.state;
        return (
            <Swiper style={styles.wrapper} showsButtons={true}
                index={3}
                onIndexChanged={(index) => {
                    /*   this.handleChange("swiperIndex", index) */
                    console.log("Index", index);
                }/*  this.handleChange("swiperIndex", index) */}
            >

                <View style={styles.slide1} >
                    <Text style={styles.text}>Hello Swiper 1</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Beautiful 2</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>And simple 3</Text>
                </View>
            </Swiper >

        )
    }

    _onMomentumScrollEnd = (e) => {
        this.setState({
            swiperIndex: e
        })

    }

    render() {

        const { swiperIndex } = this.state;
        console.log("swiperIndex", swiperIndex);

        return (
            <SafeAreaView style={styles.container} >
                <View></View>
                <Swiper style={styles.wrapper} showsButtons={true}
                    /*   index={swiperIndex} */
                    onIndexChanged={(index) => {
                        this._onMomentumScrollEnd(index)
                    }}
                >

                    <View style={styles.slide1} index={0}>
                        <Text style={styles.text}>Hello Swiper 1</Text>
                    </View>
                    <View style={styles.slide2} index={1}>
                        <Text style={styles.text}>Beautiful 2</Text>
                    </View>
                    <View style={styles.slide3} index={2}>
                        <Text style={styles.text}>And simple 3</Text>
                    </View>
                </Swiper >

            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    swiperBox: {
        height: "100%",
        width: "100%",
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
        textAlign: "center"
    },

    textWellly: {
        marginTop: 40,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#2A323C"
    },
    areaText: {
        width: "70%",
    },
    textWellly_2: {
        marginTop: 20,
        fontFamily: "IBMPlexSansThai-Regular",
        color: "#2A323C",
        fontSize: 16,
        textAlign: "center",
    },
    circle: {
        marginTop: "80%",
        flexDirection: "row",
        while: "100%",
        alignItems: "center",
        marginLeft: -8,
        position: "absolute",

    },
    circle2: {
        height: 50,
        while: "100%",
        position: "absolute",
        flexDirection: "row",
        marginTop: 16,
        backgroundColor: "red"
    },
    circleActive: {
        textAlign: "center",
        width: 8,
        height: 8,
        backgroundColor: colors.persianBlue60,
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
        /* marginBottom: 40, */
    },
    buttonCross: {
        marginTop: 16,
        width: "100%",
        height: 50,
    },
    textCross: {
        fontWeight: "bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",

    },


});

AppRegistry.registerComponent('myproject', () => Walkthrough)