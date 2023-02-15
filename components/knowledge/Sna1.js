import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Sna1 extends Component {

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
                    this.renderImg('SNA1', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    ฉลากโภชนาการ เป็นฉลากแสดงข้อมูลทาง
                    โภชนาการที่ติดอยู่บนบรรจุภัณฑ์อาหารและเครื่องดื่มภายใต้การกํากับดูแลของกระทรวง
                    สาธารณสุข โดยจะระบุชนิดและปริมาณสารอาหาร
                    ที่มีอยู่ในอาหารหรือเครื่องดื่มนั้น ๆ ลงในกรอบ
                    สี่เหลี่ยมหรือกรอบข้อมูลโภชนาการ แบ่งออกเป็น 2 รูปแบบ {'\n'}
                    {'\n'}
                    <Text style={styles.title}>1. ฉลากโภชนาการเต็มรูปแบบ</Text> {'\n'}
                    เป็นฉลากแสดงชนิดและปริมาณสารอาหารสําคัญที่คนทั่วไปควรรู้ 15 รายการ ได้แก่ พลังงานทั้งหมด พลังงานจากไขมัน ไขมันทั้งหมด ไขมันอิ่มตัว คอเลสเตอรอล โปรตีน คาร์โบไฮเดรตทั้งหมด ใยอาหาร น้ำตาล โซเดียม วิตามินเอ วิตามินบี 1 วิตามินบี 2 แคลเซียม และธาตุเหล็ก
                </Text>
                <Text style={[styles.title, { textAlign: "center" }]}>
                    วิธีการอ่านฉลาก
                </Text>
                {
                    this.renderImg('SNA1', 2, 'lg')
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>2. ฉลากโภชนาการแบบจีดีเอ (Guide Daily Amounts: GDA) หรือฉลากหวานมันเค็ม</Text> {'\n'}
                    ในการเลือกบริโภคอาหารสําเร็จรูปพร้อมรับประทานแต่ละครั้ง ควรดูองค์ประกอบ ดังนี้
                    1. ดูจํานวนหน่วยบริโภคว่าอาหารถุง ซอง หรือกล่องนั้นควรแบ่งกินกี่ครั้ง
                    2. ดูปริมาณพลังงานน้ำตาลไขมันและโซเดียม หากรับประทานหมดถุง ซอง หรือกล่อง
                    3. ดูปริมาณพลังงานน้ำตาลไขมันและโซเดียมสูงสุด ที่บริโภคได้ในแต่ละวัน โดยปริมาณสูงสุดที่แนะนําคือ ในหนึ่งวันไม่ควรได้รับพลังงานเกิน 2,000 กิโลแคลอร่ี น้ำตาล 65 กรัม ไขมัน 65 กรัม และโซเดียม 2,000 มิลลิกรัม
                </Text>
                {
                    this.renderImg('SNA1', 3)
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


export default Sna1;