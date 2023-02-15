import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn1 extends Component {

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
                    this.renderImg('GN1', 1)
                }
                <Text style={styles.title}>
                    คาร์โบไฮเดรต
                </Text>
                <Text style={styles.content} >
                    เป็นสารอาหารที่ให้พลังงานที่สำคัญสำหรับผู้ที่ออกกำลังกาย ร่างกายจะเก็บสะสม
                    คาร์โบไฮเดรตไว้ใช้ในรูปของไกลโคเจน ซึ่งจะถูกเก็บสะสมไว้ที่ตับและกล้ามเนื้อ
                    ดังนั้นเพื่อให้ออกกำลังกายได้นานยิ่งขึ้น ควรเลือกรับประทานคาร์โบไฮเดรตเชิงซ้อน
                    เช่น ข้าวซ้อมมือ ขนมปังโฮลวีต ถั่วเมล็ดแห้งชนิดต่าง ๆ ซึ่งให้ผลดีกว่าคาร์โบไฮเดรตเชิงเดี่ยว
                    เช่น น้ำตาล หรือเครื่องดื่มที่มีรสหวาน เพราะคาร์โบไฮเดรตเชิงซ้อนมีผลในการกระตุ้นอินซูลินน้อยกว่า
                    และยังให้สารอาหารชนิดอื่น ๆ เช่น วิตามิน เกลือแร่และใยอาหาร
                    และสามารถสร้างไกลโคเจนเก็บสะสมไว้ใน กล้ามเนื้อได้มากกว่าอีกด้วย
                </Text>
                <Text style={styles.content} >
                    หลังจากการออกกำลังกายที่มีความเข้มข้นสูงให้
                    รับประทานอาหารที่มีคาร์โบไฮเดรตหลัง ออกกำลังกายทันทีหรือรับประทานหลังการ
                    ออกกำลังกายภายใน 2 ชั่วโมงโดยปริมาณ
                    คาร์โบไฮเดรตที่เหมาะสมสำหรับคนที่
                    ออกกำลังกายจะอยู่ที่ 5 - 10 กรัมคาร์โบไฮเดรต
                    ต่อน้ำหนักตัว 1 กิโลกรัม เช่น คนน้ำหนักตัว 70 กิโลกรัม จะต้องการคาร์โบไฮเดรตวันละประมาณ 350 - 700 กรัมต่อวันทั้งนี้อาจขึ้นอยู่กับรูปแบบ
                    ความหนักและความนานของการออกกำลังกายด้วย
                </Text>
                {
                    this.renderImg('GN1', 2)
                }
                {
                    this.renderImg('GN1', 3)
                }
                {
                    this.renderImg('GN1', 4, 'lg')
                }
            </View>
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


export default Gn1;