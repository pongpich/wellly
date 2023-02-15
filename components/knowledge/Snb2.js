import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snb2 extends Component {

    renderImg(mission_id, img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/${mission_id}/${mission_id}_${img_index}.jpg`
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={(size === 'md') ? styles.boxImage : styles.boxImage2}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
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
                    this.renderImg('SNB2', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    ปัจจุบันสารให้ความหวานแทนน้ำตาล{'\n'}
                    ได้รับความนิยมและผู้คนให้ความสนใจกันมาก
                    <Text style={styles.title}>สารให้ความหวานคืออะไร...?</Text> คือสารที่ให้รสหวาน ซึ่งสามารถใช้แทนน้ำตาลแท้ได้ โดยจะแบ่งออกได้เป็น 2 ประเภท ได้แก่
                </Text>
                {
                    this.renderImg('SNB2', 2)
                }
                {
                    this.renderImg('SNB2', 3)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>จะรู้ได้อย่างไร?...ว่ามีสารให้ความหวานเป็นส่วนประกอบ</Text>
                    โดยทั่วไปในฉลากโภชนาการของแต่ละผลิตภัณฑ์ ให้สังเกตที่ส่วนประกอบสำคัญ ซึ่งจะระบุชื่อของสารให้ความหวานแทนน้ำตาลไว้ เช่น Saccharins, Acesulfame-K, Aspartame, Sucralose, Sorbital, Xylitol หรือ Erythritol เป็นต้น{'\n'}
                    {'\n'}
                    <Text style={styles.title}>รับประทานมากเกินไปย่อมไม่เกิดผลดี...</Text>น้ำตาลแอลกอฮอล์ เช่น Sorbital, Xylitol และ Erythritol หากรับประทานในปริมาณที่มากเกินไป ส่งผลทำให้เกิดอาการไม่พึงประสงค์ได้ เช่น ท้องเสีย ท้องอืด ท้องเฟ้อ
                </Text>
                {
                    this.renderImg('SNB2', 4)
                }
                <Text style={styles.content}>
                    {'\n'}
                    ทั้งนี้ในการใช้สารให้ความหวานแทนน้ำตาลต้องคำนึงถึงผลข้างเคียงหรือข้อห้ามในการใช้ และใช้ในปริมาณที่เหมาะสม สารให้ความหวานแทนน้ำตาล บางชนิดไม่มีคุณค่าทางโภชนาการเลย ดังนั้น การใช้สารให้ความหวานแทนน้ำตาล จึงไม่ใช่ความจำเป็น แต่เป็นเพียงทางเลือกเท่านั้น หากอยากรับประทานอะไรหวาน ๆ อาจลองเลือกรับประทานผลไม้สดแทน อย่างไรก็ตามการจำกัดปริมาณในการรับประทาน และเลือกทานอาหารให้ครบหมู่สำคัญที่สุด
                </Text>
                {
                    this.renderImg('SNB2', 5)
                }
                {
                    this.renderImg('SNB2', 6)
                }
                {
                    this.renderImg('SNB2', 7)
                }
                {
                    this.renderImg('SNB2', 8)
                }
            </View >
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);

console.log("deviceHeight", deviceHeight);

const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center"

    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,

    },
    content: {
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
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 1100 : 525,
    },
})


export default Snb2;