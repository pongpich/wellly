import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';

class Gn2 extends Component {

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
                    this.renderImg('GN2', 1)
                }
                <Text style={styles.title}>
                    โปรตีน
                </Text>
                <Text style={styles.content} >
                    เป็นสารอาหารที่ช่วยซ่อมแซมร่างกาย และเพิ่มมวลกล้ามเนื้อมีผลโดยตรงกับการตอบสนอง การฝึก และการออกกำลังกายของกล้ามเนื้อ
                    การรับประทานโปรตีนก่อนออกกำลังกายแบบมี แรงต้านจะสามารถช่วยลดอาการบาดเจ็บที่จะเกิด ขึ้นกับกล้ามเนื้อได้ และทำให้กล้ามเนื้อแข็งแรงขึ้น สำหรับการรับประทานอาหารหรือเครื่องดื่มที่มี โปรตีนเป็นส่วนประกอบทันทีหลังออกกำลังกาย หรือรับประทานในช่วงที่มีการออกกำลังกายที่ ยาวนาน สามารถช่วยคงสภาพหรือเพิ่มมวลกล้าม เนื้อได้ นอกจากนี้ยังช่วยทำให้การใช้พลังงานขณะ ออกกำลังกายมีประสิทธิภาพ
                </Text>
                {
                    this.renderImg('GN2', 2)
                }
                <Text style={styles.content}>
                    <Text style={styles.title}>เลือกโปรตีนอย่างไรดี??</Text>{'\n'}
                    {'\n'}
                    <Text style={styles.title}>โปรตีนจากพืช </Text>ถือว่าเป็นแหล่งโปรตีนที่ดี แต่มีกรดอะมิโนจำเป็นไม่ครบถ้วน แหล่งโปรตีนจากพืช เช่น ถั่วเขียว ถั่วแดง ลูกเดือย ข้าวโอ๊ต ควินัว ถั่วเหลือง และผลิตภัณฑ์ถั่วเหลือง เช่น
                    <Text style={styles.title}> เต้าหู้โปรตีนเกษตร</Text>{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- ถั่วเหลือง</Text>{'\n'}
                    จะมีโปรตีนในปริมาณมาก ไม่ว่าจะเป็นเมล็ดถั่วเหลือง เต้าหู้ น้ำเต้าหู้ เต้าเจี้ยว หรือโปรตีนทางเลือกที่ทำจากถั่วเหลือง โดยถั่วเหลืองสุก 1 ถ้วย ให้โปรตีนถึง 29 กรัม ส่วนน้ำเต้าหู้ 1 แก้วจะให้โปรตีนมากเกือบเทียบเท่า กับนมทั่วไป นอกจากนี้การรับประทานโปรตีนจาก ถั่วเหลืองทุกวัน วันละ 25 กรัม
                    <Text style={styles.title}> ยังอาจช่วยลดระดับคอเลสเตอรอลได้</Text>{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- ถั่วและเมล็ดพืช</Text>{'\n'}
                    นับเป็นอีกแหล่งสารอาหารประเภทโปรตีนชั้นดี โดยเฉพาะถั่วต่าง ๆ เช่น ถั่วแดง ถั่วดำ ซึ่งมีโปรตีนถึง 15 กรัมต่อถ้วย ส่วนถั่วลันเตาจะให้โปรตีน 9 กรัมต่อถ้วย ในขณะที่มันฝรั่งหัวขนาดกลาง ๆ ให้โปรตีนเพียง 4 กรัมเท่านั้น ส่วนเมล็ดพืชต่าง ๆ นับว่าเป็นตัวเลือกที่ดีไม่แพ้กัน โดยโปรตีน 8 กรัม เทียบเท่ากับเมล็ดฟักทองหรือเมล็ดทานตะวันเพียง 1 ช้อนโต๊ะ แอลมอนด์ 12 เมล็ด พิตาชิโอ 24 เมล็ด วอลนัต 7 เมล็ด หรือเนยถั่ว 2 ช้อนโต๊ะ{'\n'}
                    {'\n'}

                    <Text style={styles.title}>โปรตีนจากสัตว์</Text> จัดเป็นโปรตีนคุณภาพดีเพราะมี
                    กรดอะมิโนจำเป็นครบถ้วน ร่างกายสามารถนำไปใช้ประโยชน์ ได้เต็มที่ ได้แก่ เนื้อหมู เนื้อปลา เนื้อไก่ ไข่ อาหารทะเล และนม เป็นต้น {'\n'}
                    {'\n'}
                    <Text style={styles.title}>- เนื้อสัตว์ใหญ่</Text>{'\n'}
                    ทั้งเนื้อวัว เนื้อหมู หรือเนื้อแกะ จะเป็นแหล่งโปรตีนที่ให้พลังงานสูง แต่บางครั้งก็มีไขมันและคอเลสเตอรอลอันเป็น
                    สาเหตุของโรคหลอดเลือดหัวใจอุดตัน การรับประทานเนื้อเหล่านี้ จึงควรเลือกที่ไม่ติดมัน ซึ่งจะเป็นเนื้อส่วนสะโพกและเนื้อส่วนหลังที่มีไขมัน
                    อิ่มตัวน้อยพอ ๆ กับเนื้ออกไก่ไร้หนัง{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- เนื้อเป็ดและไก่</Text>{'\n'}
                    เลือกรับประทานเนื้อบริเวณอกที่ไม่ติดหนังเพื่อ หลีกเลี่ยงไขมันอิ่มตัว{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- เนื้อปลา</Text>{'\n'}
                    เป็นแหล่งโปรตีนชั้นดี ที่มักมีไขมันต่ำ แม้แต่ปลาที่ขึ้นชื่อว่ามีไขมันมากกว่าปลาชนิดอื่น
                    อย่างแซลมอนและทูน่า ก็ยังถือว่าดีต่อสุขภาพ เพราะภายในเนื้อปลาไม่เพียงให้โปรตีน แต่ยังมีกรดโอเมก้า 3 ที่ดีต่อหัวใจ ซึ่งคนส่วนใหญ่มักจะได้รับโอเมก้า 3 ไม่เพียงพอเมื่อเทียบกับปริมาณที่แนะนำ ส่วนปลาทูน่าหรือซาร์ดีนถือเป็นตัวเลือกที่ดีเช่นกัน และควรรับประทานปลาเหล่านี้สัปดาห์ละ 2 ครั้ง ครั้งละประมาณ 110 กรัม หรือเทียบได้กับ 8 ช้อนข้าว{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- ไข่</Text>{'\n'}
                    นับเป็นโปรตีนที่มีคุณภาพ ไข่ 1 ฟอง ให้สารอาหารโปรตีน 7 กรัม และแม้ในไข่แดงจะมี
                    คอเลสเตอรอลสูง แต่จากการศึกษาของงานวิจัยหลายงาน  <Text style={styles.title}>พบว่าคอเลสเตอรอลในไข่ไม่ได้ทำให้ระดับคอเลสเตอรอลในเลือดสูงขึ้น</Text>{'\n'} หากแต่เป็นอาหารที่มีไขมันอิ่มตัวและไขมันทรานส์ที่น่าจะทำให้ระดับคอเลสเตอรอลเพิ่มขึ้นสูงมากกว่า ดังนั้นสำหรับผู้มีสุขภาพดีการรับประทานไข่วันละ 1 ฟองจึงไม่ได้เพิ่มความเสี่ยงต่อโรคหัวใจ{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- นมและผลิตภัณฑ์จากนม</Text>{'\n'}
                    เช่น ชีสและโยเกิร์ต ประกอบด้วยโปรตีนและแคลเซียม เพื่อหลีกเลี่ยงแคลอรี่ที่จะได้รับมากเกินไป แนะนำให้เลือกผลิตภัณฑ์นมไขมันต่ำ นมพร่องมันเนย และนมขาดมันเนย โดยนมขาดมันเนย 1 แก้ว ให้โปรตีน 7 กรัม แต่หากต้องการโปรตีนมากกว่านั้น อาจเลือกกรีก
                    โยเกิร์ต (Greek Yogurt) ซึ่งให้โปรตีนถึง 18 - 20 กรัมต่อ 1 ถ้วย (285 กรัม) ซึ่งมากกว่าโยเกิร์ตธรรมดาถึง 2 เท่า{'\n'}
                    {'\n'}
                </Text>
                {
                    this.renderImg('GN2', 4)
                }
                <Text style={styles.content}>
                    ปริมาณโปรตีนที่แนะนำต่อวันของกลุ่มคนที่ต้อง การสร้างกล้ามเนื้อจะอยู่ที่ 1.2 – 1.7 กรัมโปรตีนต่อน้ำหนักตัว 1 กิโลกรัม ในขณะที่คนที่ออกกำลังกายแบบไม่เน้นเพิ่มกล้าม
                    เนื้อ ควรรับประทานโปรตีนต่อวันอยู่ที่ 1.2 – 1.4 กรัมโปรตีนต่อน้ำหนักตัว 1 กิโลกรัม และ 0.8 – 1 กรัมโปรตีนสำหรับคนทั่วไป ทั้งนี้แนะนำให้เลือกอาหารที่มีไขมันต่ำ และเกลือหรือโซเดียมต่ำด้วย เพราะเกลือจะทำให้ร่างกายบวมน้ำ ซึ่งอาจเป็นสาเหตุให้มองเห็นซิกแพคได้ไม่ชัดเจน ดังนั้นอาหารประเภทโปรตีนที่เลือกจะต้องเป็นโปรตีนไขมันต่ำ และเมื่อปรุงรสจะต้องไม่ปรุงเกลือ หรือใส่ในปริมาณน้อย
                </Text>
                {
                    this.renderImg('GN2', 3)
                }
                {
                    this.renderImg('GN2', 5, 'lg')
                }
                {
                    this.renderImg('GN2', 6, 'lg')
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
        height: (deviceHeight > 1023) ? 1100 : 425,
    },
})


export default Gn2;