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
        /*  this.refs.swiper.scrollBy(text); */
        /* this.setState({
            [fieldName]: text
        }) */
        if (text == null) {
            this.refs.swiper.scrollBy(1);
        } else {
            /*  this.setState({
                 [fieldName]: text
             }) */
            this.refs.swiper.scrollBy(2);
        }

    }

    onSwipe = (index) => {

        this.setState({
            swiperIndex: index
        })
        /*  this.refs.swiper.scrollBy(1); */
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
                ref={'swiper'}

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
    /* 
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
    
            <View style={styles.buttonView}>
                {swiperIndex < 2 ?
                    <>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.handleChange("swiperIndex", null)} >
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
        </View >
    
    </SafeAreaView > */



    render() {
        const { swiperIndex } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.swiperBox}>
                    {
                        this.swiper()
                    }
                </View>
                <View style={styles.boxView}>
                    <View style={styles.circle}>
                        <View style={swiperIndex == "0" ? styles.circleActive : styles.circleDot} />
                        <View style={swiperIndex == "1" ? styles.circleActive : styles.circleDot} />
                        <View style={swiperIndex == "2" ? styles.circleActive : styles.circleDot} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    {swiperIndex < 2 ?
                        <>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.handleChange("swiperIndex", null)} >
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


const devicehHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    wrapper: {
        marginTop: (devicehHeight > 668) ? "30%" : "10%",
    },
    slide1: {
        width: "100%",
        maxHeight: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    entryImage: {
        width: 280,
        height: 280
    },
    boxView: {
        alignItems: 'center',

    },
    swiperBox: {
        flex: 1


    },
    welllyView: {
        position: "relative",
        height: "100%",

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

        marginTop: (devicehHeight > 668) ? -84 : -49,
        flexDirection: "row",
        while: "100%",
        justifyContent: "center",
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
        paddingHorizontal: 16,
        marginBottom: 40
    },
    buttonCross: {
        marginTop: 16,
        width: "100%",
    },
    textCross: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",
    },


});

AppRegistry.registerComponent('myproject', () => Walkthrough)