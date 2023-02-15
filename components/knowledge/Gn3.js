import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn3 extends Component {

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
                    this.renderImg('GN3', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>ผัก</Text> ควรบริโภควันละ 150 – 200 กรัม หรือคิดง่าย ๆ มื้อละ 2 – 3 ช้อนข้าว{'\n'}
                    {'\n'}
                    <Text style={styles.title}>ผลไม้</Text> วันละ 2 กําปั้น และเลี่ยงการจิ้ม ไม่ว่าจะเป็นพริกเกลือ กะปิ น้ำปลาหวาน ผลไม้ 1 กําปั้นของตนเอง จะให้พลังงาน 60 กิโลแคลอรี่ คาร์โบไฮเดรต 15 กรัม
                </Text>
                {
                    this.renderImg('GN3', 2)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>ผัก ผลไม้ แต่ละสีมีประโยชน์ดีต่อสุขภาพ</Text>{'\n'}
                    {'\n'}
                    <Text style={{ color: "#FF0000" }}>สีแดง</Text> มีสารไลโคปีน เบต้าไซซีน ต้านอนุมูลอิสระ ยับยั้งเซลล์มะเร็ง โดยเฉพาะมะเร็งต่อมลูกหมาก ลดความดันโลหิต ลดริ้วรอย กินอร่อย เช่น เชอร์รี่ สตรอว์เบอร์รี่ มะละกอ แตงโม มะเขือเทศ{'\n'}
                    {'\n'}
                    <Text style={{ color: "#53C665" }}>สีเขียว</Text> มีสารคลอโรฟิลล์ ลูทีน ช่วยชะลอการเสื่อมจอประสาทตา ไฟเบอร์สูงช่วยขับถ่าย และสร้างภูมิให้ร่างกาย เช่น กะหล่ำปลีเขียว บรอคโคลี อะโวคาโด แตงกวา แอปเปิ้ลเขียว{'\n'}
                    {'\n'}
                    <Text style={{ color: "#FABF29" }}>สีเหลือง</Text> สีส้ม มีสารแคโรทีนอยด์ วิตามินเอ ซี เบต้าแคโรทีน ต้านอนุมูลอิสระ ลดการอักเสบ ลดความเสี่ยงมะเร็ง ลดคอเลสเตอรอลในเลือด ลดการเสื่อมของเซลล์ร่างกาย ช่วยให้ผิวพรรณสวยงาม เช่น แครอท ฟักทอง ข้าวโพด ส้ม สับปะรด แคนตาลูป{'\n'}
                    {'\n'}
                    <Text style={{ color: "#7000FF" }}>สีม่วง</Text> สีน้ำเงิน มีสารแอนโทไซยานิน ต้านอนุมูลอิสระสูงกว่าวิตามินซี ช่วยกระตุ้นโลหิต ไหลเวียนดี ลดความเสี่ยงโรคหัวใจ ต้านไวรัส ป้องกันมะเร็งหลายชนิด เช่น มะเร็งลําไส้ ตับ เม็ดเลือด ขาว มะเร็งระบบสืบพันธุ์ หาได้จาก เผือก บลูเบอร์รี่ แบล็กเบอร์รี่ องุ่นม่วง มะเขือม่วง กะหล่ำปลีม่วง{'\n'}
                    {'\n'}
                    <Text style={{ color: "#DEDEDE" }}>สีขาว</Text> มีสารแซนโทน ช่วยต้านการอักเสบ รักษาระดับน้ำตาล ลดไขมันในเลือด ลดความดันโลหิต โรคหลอดเลือดหัวใจ ลดอาการปวดตามข้อ หาได้จาก กล้วย น้อยหน่า ลิ้นจี่ มังคุด งาขาว ผักกาดขาว กระเทียม เห็ด{'\n'}
                    {'\n'}
                    <Text style={styles.title}>*** ข้อควรระวัง ***</Text>{'\n'}
                    ทุกสีมีประโยชน์ ควรรับประทานให้ครบและหลากหลาย ไม่เลือกรับประทานเฉพาะสี
                </Text>
                {
                    this.renderImg('GN3', 3)
                }
                {
                    this.renderImg('GN3', 4)
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


export default Gn3;