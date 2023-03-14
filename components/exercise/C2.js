import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Cd1 extends Component {

    renderImg(img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/exercise/${img_index}.png`
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
                    this.renderImg('Exercise_w_4', 'md')
                }
                <Text style={styles.title}>
                    กลุ่มกล้ามเนื้อแกนกลางลำตัว
                </Text>
                <Text style={styles.content}>
                    ประกอบด้วยกล้ามเนื้อที่แผ่เป็นผืนหลาย ๆ มัด รวมแล้วมีลักษณะคล้ายผ้าที่ห่อรัดลำตัวไว้ มีหน้าที่ประคอง และควบคุมการเคลื่อนไหวของกระดูกสันหลังในกิจกรรมต่าง ๆ  หากกล้ามเนื้อกลุ่มนี้ไม่แข็งแรง อาจส่งผลให้เกิดการบาดเจ็บต่อกระดูกสันหลังได้
                </Text>
                <View style={styles.viewLi}>
                    <Text style={styles.titleLi}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.title2]} >
                        ข้อดีของการเริ่มต้นด้วยการฝึก Core + Balance Training
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        การออกกำลังกายให้ปลอดภัยและได้ผลลัพธ์สูงสุด จำเป็นต้องมีการทำงานของ "กล้ามเนื้อแกนกลางลำตัว" ที่ด
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        กล้ามเนื้อแกนกลางลำตัวไม่แข็งแรงทำให้เกิดอาการปวดหลังได้ โดยเฉพาะคนที่นั่งนาน ๆ (Sedentary Jobs)
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        การฝึกกล้ามเนื้อแกนกลางลำตัวแก้ปัญหาปวดหลังล่างได้มากกว่าการนวด
                    </Text>
                </View>
                <Text style={styles.title}>
                    แบบทดสอดความแข็งแรงของกล้ามเนื้อแกนกลางลำตัว
                </Text>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        คุณปวดหลังเป็นประจำใช่หรือไม่
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        ต้องสูดลมหายใจแล้วกลั้นเมื่อต้องก้ม, ลุก, ยกของหรือไม่
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        ขณะยืน หรือลุกขึ้น ต้องอาศัยมือช่วยพยุงเป็นประจำหรือไม่
                        ถ้าตอบว่า "ใช่" อย่างน้อย 2 ข้อ แสดงว่ามีความเสี่ยงที่กล้ามเนื้อแกนกลางลำตัวอ่อนแอ
                    </Text>
                </View>
                <Text style={styles.title}>
                    การฝึกกล้ามเนื้อแกนกลางลำตัว
                </Text>
                <Text style={styles.content} >
                    สามารถทำได้ด้วยการฝึกออกแรงควบคุมกล้ามเนื้อ และการฝึกด้วยแรงต้านด้วยท่าฝึกที่ออกแบบมาให้กระตุ้นการทำงานของกล้ามเนื้อในกลุ่มนี้ ตัวอย่างเช่น การฝึกท่าที่มีชื่อว่า Dead Bug, Prone Arm and Opposite Leg Raise เป็นต้น
                </Text>

            </View>
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center",
        width: "100%"

    },
    li: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 5
    },
    titleLi: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 6
    },
    viewLi: {
        paddingLeft: 16,
        flexDirection: "row"
    },
    viewLi2: {
        marginLeft: 32,
        flexDirection: "row",
    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    title2: {
        marginLeft: 8,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    tableEx: {
        marginLeft: 16,
        marginTop: 32,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    content: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    content2: {
        marginLeft: 8,
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
        width: (deviceHeight > 1023) ? "100%" : 327,
        height: (deviceHeight > 1023) ? 1100 : 276,
        marginBottom: 40
    },
})


export default Cd1;