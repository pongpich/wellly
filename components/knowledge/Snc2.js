import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snc2 extends Component {

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
                    this.renderImg('SNC2', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>แอลกอฮอล์</Text>  {'\n'}
                    เป็นสารเสพติดชนิดหนึ่ง เกิดจากการหมักผัก ผลไม้หรือเมล็ดพืชชนิดต่าง ๆ แอลกอฮอล์จะไม่มีรส ไม่มีกลิ่น รสหรือกลิ่นใน เครื่องดื่มแอลกอฮอล์จะมาจากส่วนประกอบในการหมักและการแต่งกลิ่นเครื่องดื่ม แอลกอฮอล์ แต่ละชนิดจะมีความเข้มข้นของแอลกอฮอล์ต่างกัน
                    สุรายี่ห้อต่าง ๆ เช่น แม่โขง แสงโสม รีเจนซี่ ชีวาส จะมีแอลกอฮอล์ประมาณ 40% ไวน์ทั่วไปมีแอลกอฮอล์ประมาณ 12% และเบียร์ มีแอลกอฮอล์ประมาณ 5%
                    การบริโภคแอลกอฮอล์ในปริมาณที่มากกว่านั้น จะก่อให้เกิดอันตรายต่อผู้ที่มีระดับความดันโลหิต สูงได้ เนื่องจากการดื่มแอลกอฮอล์ จะไปกระตุ้นหัวใจให้สูบฉีดโลหิตได้เร็ว และแรงขึ้น ทำให้เกิดภาวะความดันโลหิตสูง
                </Text>
                {
                    this.renderImg('SNC2', 2)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>ผลระยะสั้นของการดื่มแอลกอฮอล์ต่อระดับความดันโลหิต</Text>   {'\n'}
                    พบว่าในระยะ 1-3 ชั่วโมงแรกหลังจากดื่ม มีการลดลงของระดับความดัน Diastolic <Text style={styles.title}>สำหรับผลระยะยาวของการดื่มแอลกอฮอล์ต่อระดับความดันโลหิตสูง</Text> {'\n'}
                    โดยมีการศึกษาผลของการดื่มแอลกอฮอล์ชนิดต่าง ๆ ไม่ว่าจะเป็น เบียร์ ไวน์ หรือสาเก นั้นทำให้เกิดภาวะความดันโลหิตสูง ซึ่งบางผลการศึกษาพบว่า ชนิดของแอลกอฮอล์ที่ต่างกัน อาจมีผลต่อระดับความดันโลหิตมากน้อยต่างกัน ซึ่งผลอาจมาจากปัจจัยอื่น ๆ เช่น อาหารที่บริโภค รวมไปถึงการดำเนินชีวิต การออกกำลังกาย ควาามเครียดมากกว่าจะเป็นผลจากชนิดของแอลกอฮอล์เพียงอย่างเดียว
                    ในกลุ่มคนที่ดื่มแอลกอฮอล์ 3 ดื่มมาตรฐานต่อวัน พบว่ามีระดับความดัน Systolic เพิ่มขึ้น 3-4มิลลิเมตรปรอท และ ระดับ Diastolic เพิ่มขึ้น 1-2 มิลลิเมตรปรอท
                </Text>
                {
                    this.renderImg('SNC2', 3)
                }
                <View style={[styles.areaViewText, { marginTop: 30, marginBottom: 40 }]}>
                    <Text style={{
                        color: colors.grey1,
                        fontSize: ComponentsStyle.fontSize16,
                        fontFamily: "IBMPlexSansThai-Regular",
                        textAlign: "center"
                    }}>{'Ref. (อ้างอิง)'}</Text>
                    <Text style={{
                        color: colors.grey1,
                        fontSize: ComponentsStyle.fontSize16,
                        fontFamily: "IBMPlexSansThai-Regular",
                        textAlign: "center"
                    }}>{`Campbell , B. (2021). NSCA's guide to sport and exercise nutrition, 2nd edition.`}</Text>
                </View>
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


export default Snc2;