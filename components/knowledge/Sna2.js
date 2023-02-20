import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Sna2 extends Component {

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
                    this.renderImg('SNA2', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    น้ำหนักตัวของคนเราประกอบไปด้วยน้ำถึงร้อยละ 60 ร่างกายอาจสูญเสียน้ำได้จากการทํากิจกรรม
                    ต่าง ๆ เช่น การออกกําลังกาย การดื่มน้ำจึงเป็นสิ่งที่
                    สําคัญเป็นอย่างมาก แต่คนส่วนใหญ่มักละเลยการดื่มน้ำ หรือไม่คำถึงนึงปริมาณที่เหมาะสม อาจดื่มน้ำน้อยเกินไปหรือมากเกินไป จนทําให้
                    เกิดอันตรายต่อสุขภาพตามมา อีกทั้งอาจไม่ทราบ
                    ว่าหากร่างกายขาดน้ำเพียง 5 วัน หรือ 1 สัปดาห์
                    ก็อาจทําให้เสียชีวิตได้เลยทีเดียว{'\n'}
                    {'\n'}
                    <Text style={styles.title}>ควรดื่มน้ำวันละเท่าไร?</Text>{'\n'}
                    ในแต่ละวัน ร่างกายจะสูญเสียน้ำผ่านการปัสสาวะ เหงื่อ การหายใจ หรืออื่น ๆ การดื่มน้ำเพื่อทดแทนใน
                    ส่วนที่สูญเสียไปจึงเป็นสิ่งสําคัญ แต่การดื่มน้ำใน
                    ปริมาณที่เหมาะสมเป็นเรื่องที่สําคัญยิ่งกว่า เพราะหากดื่มน้ำมากเกินไปหรือน้อยเกินไปอาจก่อ
                    ให้เกิดอันตรายต่อร่างกายได้ และอย่างที่ทราบกัน
                    โดยทั่วไปว่า การดื่มน้ำวันละ 8 แก้วนั้นเพียงพอต่อการทํางานของร่างกาย แต่แท้จริงแล้วปริมาณที่เหมาะสมอาจขึ้นอยู่กับ ปัจจัยอื่น ๆ ของแต่ละบุคคล เช่น กิจกรรมที่ทํา เพศ และอายุ
                </Text>
                {
                    this.renderImg('SNA2', 2)
                }
                <Text style={styles.content}>
                    {'\n'}
                    เช่น น้ำหนักตัว 55 x 2.2 x 30/2 = 1,815 มิลลิลิตร คือปริมาณที่ควรดื่มต่อวัน ถ้าหากดื่มน้ำได้น้อยกว่า
                    ปริมาณที่ร่างกายต้องการก็จะส่งผลให้การไหล
                    เวียนของเลือดทํางานได้ไม่ดี ทําให้ร่างกายขับของ
                    เสียได้ยาก และเมื่อเลือดไหลเวียนไม่สะดวกก็ส่ง
                    ผลให้เกิดลิ่มเลือด เลือดข้นอันเป็นสาเหตุของการ
                    เกิดโรคต่าง ๆ ได้
                </Text>
                {
                    this.renderImg('SNA2', 3)
                }
                {
                    this.renderImg('SNA2', 4)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>ประโยชน์ของการดื่มน้ำ</Text> {'\n'}
                    น้ำเป็นปัจจัยสําคัญต่อกระบวนการทํางานภายในร่างกาย เช่น การล้างสารพิษออกจากอวัยวะ หรือการ
                    นําสารอาหารและออกซิเจนไปสู่เซลล์ต่าง ๆ รวมถึง
                    ประโยชน์อื่น ๆ ได้แก่ ลดน้ำหนัก การดื่มน้ำอาจมี
                    ส่วนช่วยให้อัตราการเผาผลาญพลังงานแคลอรี่เพิ่มสูงขึ้น บํารุงสุขภาพผิว เป็นส่วนประกอบของน้ำ
                    หล่อลื่นข้อต่อ เสริมการทํางานของระบบย่อย
                    อาหาร ช่วยขับแบคทีเรียจากกระเพาะปัสสาวะ
                    ควบคุมอุณหภูมิในร่างกาย ควบคุมความดันโลหิต ป้องกันอาการท้องผูก ป้องกันความเสียหายของ
                    เนื้อเยื่อและอวัยวะต่าง ๆ และ รักษาสมดุลของ
                    อิเล็กโตรไลท์ (โซเดียม)
                </Text>
            </View >
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


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


export default Sna2;