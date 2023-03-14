import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class C4 extends Component {

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
                    this.renderImg('Exercise_w_6', 'md')
                }
                <Text style={styles.title}>
                    การฝึกด้วยแรงต้าน หรือ Resistance Training
                </Text>
                <Text style={styles.content}>
                    โดยทั่วไปมักเข้าใจว่าต้องเป็นการฝึกด้วยน้ำหนัก หรืออุปกรณ์น้ำหนัก เช่น บาร์เบลล์ ดัมเบลล์ หรือ เครื่องฝึกกล้ามเนื้อ ทั้งที่จริง ๆ แล้วการฝึกด้วยแรงต้านนั้น หมายรวมถึงแรงต้านทุกประเภท ไม่ว่าจะเป็นแรงโน้มถ่วง, น้ำหนักตัว, แรงต้านจากวัสดุ/ยางยืดต่าง ๆ ดังนั้น การฝึกด้วยแรงต้าน Resistance Training หรือเรียกรวม ๆ ว่า การฝึกด้วยน้ำหนัก ซึ่งสามารถฝึกได้หลายรูปแบบ ทั้งที่มีอุปกรณ์ หรือใช้เพียงน้ำหนักตัวผู้ฝึกเป็นแรงต้านเองก็สามารถทำได้
                </Text>
                <Text style={styles.title}>
                    ข้อดีของการฝึกด้วยแรงต้าน Resistance Training
                </Text>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        เพิ่มมวลกระดูก
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        เพิ่มความแข็งแรงของกล้ามเนื้อ
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        เพิ่มมวลกล้ามเนื้อเพื่อป้องกันภาวะสูญเสียมวลกล้ามเนื้อในกลุ่มผู้สูงอายุ
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        เพิ่มความยืดหยุ่น (Flexibility)
                    </Text>
                </View>
                <Text style={styles.title}>
                    ความเข้าใจผิด ในความกังวลของการฝึกด้วยแรงต้าน (Resistance Training)
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={styles.titleLi}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.title3]} >
                        ผู้หญิงฝึกกล้ามแล้วจะกล้ามใหญ่เหมือนผู้ชาย:
                    </Text>
                </View>
                <Text style={styles.content1} >
                    การฝึกด้วยแรงต้านในกลุ่มเพศหญิงนั้น ไม่สามารถทำให้กล้ามเนื้อเติบโตมากเกินไปได้ เนื่องจากปริมาณฮอร์โมนที่สนับสนุนการสร้างกล้ามเนื้อ เช่น เทสโทสเทอโรน ในเพศหญิงมีน้อยกว่าเพศชายประมาณ 10เท่า
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={styles.titleLi}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.title3]} >
                        กลัวกล้ามใหญ่เกินไปแล้วจะดูไม่ดี:
                    </Text>
                </View>
                <Text style={styles.content1} >
                    กระบวนการสร้างกล้ามเนื้อนั้นใช้เวลา ผู้ฝึกสามารถเห็นการเปลี่ยนแปลง และมีเวลาในการลดปริมาณการฝึกลงได้เมื่อถึงจุดที่พอใจได้ทันก่อนที่จะพัฒนาไปจนใหญ่เกินความต้องการ
                </Text>
                <Text style={[styles.content, { marginBottom: 40, marginTop: 24 }]} >
                    แม้จะสร้างกล้ามเนื้อได้ไม่เท่าเพศชาย แต่เพศหญิงก็ยังได้รับข้อดีของการฝึกด้านอื่น ๆ เทียบเท่ากับเพศชาย เช่น การป้องกันภาวะสูญเสียมวลกล้ามเนื้อ และการรักษามวลกระดูก
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
    viewLi1: {
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
    title3: {
        marginLeft: 8,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 15,
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
    content1: {
        fontFamily: "IBMPlexSansThai-SemiBold",
        fontSize: 15,
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


export default C4;