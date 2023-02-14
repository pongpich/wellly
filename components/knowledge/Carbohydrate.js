import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Carbohydrate extends Component {
    render() {
        return (
            <View style={styles.scrollViewbox}>
                <View style={styles.boxImage}>
                    <Image
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        source={require('../../assets/images/knowledge/GN1_1.png')}
                        resizeMode='contain'
                    />
                </View>

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
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.boxImage}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",

                            }}
                            source={require('../../assets/images/knowledge/GN1_2.png')}
                        /*  resizeMode='stretch' */
                        />
                    </View>
                    <View style={styles.boxImage}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",

                            }}
                            source={require('../../assets/images/knowledge/GN1_3.png')}
                        /*  resizeMode='stretch' */
                        />
                    </View>
                    <View style={styles.boxImage2}>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                            source={require('../../assets/images/knowledge/GN1_4.png')}
                        /* resizeMode='stretch' */
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);
console.log("deviceHeight", deviceHeight);

const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50
    },
    title: {
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
        width: 343,
        height: 208
    },
    boxImage2: {
        marginTop: 32,
        width: 343,
        height: 525
    },
})


export default Carbohydrate;