import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn5 extends Component {

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
                    this.renderImg('GN5', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>6-6-1</Text> คือ ปริมาณกลุ่มน้ำตาล เครื่องปรุงรส เกลือ (โซเดียม) และน้ำมันที่ควรได้รับในแต่ละวัน ซึ่งปริมาณที่ควรบริโภคโดยการเติมในเมนูอาหารที่กําหนดไว้นั้น เพื่อสุขภาพที่ดีและจะช่วยลดความ
                    เสี่ยงในการเกิดโรคได้ โดยเฉพาะกลุ่มโรคไม่ติดต่อ
                    เรื้อรัง (NCDs)
                </Text>
                {
                    this.renderImg('GN5', 2)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>6 ตัวแรก</Text> จะบ่งบอกถึงปริมาณ “น้ำตาล” ที่ควรได้รับต่อวัน โดย <Text style={styles.title}>ไม่ควรเกินวันละ 6 ช้อนชา หรือ 24 กรัม</Text>{'\n'} และเป็นสารอาหารในกลุ่มของคาร์โบไฮเดรตที่ให้ พลังงานแก่ร่างกาย ซึ่งน้ำตาล 1 กรัม ให้พลังงาน 4 กิโลแคลอรี่ มักพบมากในเครื่องดื่ม ขนมขบเคี้ยว หรือแม้แต่การเติมปรุงรสในอาหารจานด่วน เช่น ก๋วยเตี๋ยว เป็นต้น แต่อย่างไรก็ตาม จะมีข้อกําหนดในการได้รับน้ำตาล เราสามารถมีทางเลือกโดยการเลือกใช้สารให้ความหวานแทนน้ํำตาลในรูปแบบต่าง ๆ ที่มีจําหน่ายในท้องตลาดได้ แต่ข้อควรคํานึงคือ การใช้สารให้ความหวานแทนน้ำตาลที่ให้รสชาติที่ หวานกว่าน้ํำตาลปกติหลายเท่า อาจจะส่งผลให้ติดรสชาติความหวานนั้นได้ ...จําให้ขึ้นใจ <Text style={styles.title}>“หวานน้อย เราเลือกได้”</Text> … {'\n'}
                    {'\n'}
                    <Text style={styles.title}>6 ตัวถัดมา</Text> จะบ่งบอกถึงปริมาณ “น้ำมัน/ไขมัน” ที่ควรได้รับต่อวัน โดย<Text style={styles.title}>ไม่ควรเกินวันละ 6 ช้อนชา</Text> ซึ่งน้ำมัน 1 กรัม ให้พลังงาน 9 กิโลแคลอรี่ ซึ่งถือว่าให้พลังงานสูงแก่ร่างกาย และทำหน้าที่ช่วยดูดซึมวิตามิน A D E K
                    การบริโภคไขมันอิ่มตัว น้ำมันปาล์ม น้ำมันมะพร้าว น้ำมันจากสัตว์ รวมถึงไขมันทรานส์ที่มากเกินไป จะทําให้เสี่ยงต่อภาวะโรคหัวใจและหลอดเลือด ทั้งนี้ในการเลือกชนิดของน้ำมันมีผลต่อสุขภาพ ดังนั้นอาหารแต่ละชนิด ควรเลือกใช้ชนิดน้ำมันให้เหมาะสมกับประเภท อาหาร เช่น น้ำมันปาล์ม น้ำมันหมู มีกรดไขมันอิ่มตัวค่อนข้างสูงจะ<Text style={styles.title}>เหมาะกับการทอด</Text> น้ำมันรําข้าว น้ำมันถั่วเหลือง น้ำมันคาโนลา น้ำมันดอกคําฝอย น้ำมันข้าวโพด น้ำมันมะกอก เป็นกรดไขมันไม่อิ่มตัว<Text style={styles.title}>เหมาะกับการผัด หรือทําเป็นน้ำสลัด</Text> เป็นต้น {'\n'}
                    {'\n'}
                    <Text style={styles.title}>1 ตัวถัดมา</Text> จะบ่งบอกถึงปริมาณ “เกลือ” ที่ควรได้รับต่อวัน โดย<Text style={styles.title}>ไม่ควรเกินวันละ 1 ช้อนชา หรือประมาณ 5 กรัม หรือปริมาณโซเดียม 2,000 มิลลิกรัม</Text> หากได้รับมากเกินจะส่งผลเสียทําให้ ความดันโลหิตสูง เพิ่มการรั่วของโปรตีนในปัสสาวะ ซึ่งมีผลต่อการทำงานของไตและหัวใจ ปริมาณของโซเดียมมีแฝงในอาหารเกือบทุก ประเภท โดยเฉพาะอาหารแปรรูป อาหารหมักดอง อาหารแช่แข็ง ผลิตภัณฑ์เบเกอรี่ อาหารกึ่งสําเร็จรูป ขนมขบเคี้ยว เป็นต้น {'\n'}
                </Text>
                {
                    this.renderImg('GN5', 3)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>ดังนั้น เทคนิคลดหวาน มัน เค็ม ให้ได้ผลและยั่งยืน</Text> {'\n'}
                    ควรชิมก่อนปรุงทุกครั้ง เลี่ยงขนมหวาน เครื่องดื่มรสหวาน เลี่ยงอาหารทอด เบเกอรี่ ลดอาหารที่มีกะทิ เลือกใช้น้ำมันให้เหมาะสม งดการทอดซ้ำ ลดจิ้ม เลี่ยงอาหารสําเร็จรูป ขนมขบเคี้ยว เริ่มอ่านฉลากโภชนาการ
                </Text>
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
            </View>
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


export default Gn5;