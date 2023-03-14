import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Ab1 extends Component {

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
                    this.renderImg('Exercise_w_1', 'md')
                }
                <Text style={styles.title}>
                    ข้อดีของการเพิ่มกิจกรรมทางกาย
                </Text>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดปัจจัยเสี่ยงที่ทำให้เกิดโรคหัวใจและหลอดเลือด
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดความดันเลือด
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดระดับไตรกลีเซอไรด์
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดการใช้อินซูลิน (ในกรณีที่มีการใช้อินซูลินจากภายนอก)
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดอัตราการป่วยและอัตราการเสียชีวิตจากโรคต่าง ๆ
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        โรคหัวใจและหลอดเลือด
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        โรคหลอดเลือดสมอง (Stroke)
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        เบาหวานชนิดที่ 2
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        มะเร็งต่าง ๆ
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ข้อดีอื่น ๆ
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดอาการวิตกกังวล และซึมเศร้า (Anxiety and Depression)
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        เพิ่มความสามารถของกระบวนการรับข้อมูลและตัดสินใจ (Cognitive Function)
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ขยับร่างกายได้ดีขึ้น
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        ลดความเสี่ยงต่อการพลัดตกหกล้ม
                    </Text>
                </View>
                <Text style={styles.tableEx}>ตารางแสดงกิจกรรมทางกาย ระยะเวลา และ การจัดระดับความหนักของกิจกรรม</Text>
                {
                    this.renderImg('Exercise_Mission_w_1', "lg")
                }
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
    viewLi: {
        flexDirection: "row"
    },
    viewLi2: {
        marginLeft: 16,
        flexDirection: "row",
    },
    title: {
        marginTop: 24,
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


export default Ab1;