import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snb1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        };
    }

    handleLoad = () => {
        this.setState({ loading: false });
    };

    handleError = () => {
        this.setState({ loading: false, error: true });
    };


    renderImg(mission_id, img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/${mission_id}/${mission_id}_${img_index}.jpg`
        const { loading, error } = this.state;
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={(size === 'md') ? styles.boxImage : styles.boxImage2}>
                    {
                        loading &&
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={require('../../assets/images/icon/ImageArticle.png')}
                            resizeMode='stretch'
                        />}
                    {error && <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        source={require('../../assets/images/icon/ImageArticle.png')}
                        resizeMode='stretch'
                    />}
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        onLoad={this.handleLoad}
                        onError={this.handleError}
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
                    this.renderImg('SNB1', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>ส.แรก ไม่สูบบุหรี่</Text>{'\n'}
                    มาดูกันว่า ผลเสียของบุหรี่ต่อสุขภาพมีอะไรบ้าง... นิโคตินในบุหรี่ทำให้ความดันโลหิตและอัตราการ
                    เต้นของหัวใจเพิ่มขึ้น ทั้งยังเพิ่มความเสี่ยงในการ
                    เกิดภาวะหัวใจขาดเลือดเฉียบพลันและโรคหลอด
                    เลือดสมอง มีผลต่อ<Text style={styles.title}>ระบบหัวใจและหลอดเลือด</Text> ได้แก่ หัวใจขาดเลือด หลอดเลือดหัวใจตีบ
                    <Text style={styles.title}>ระบบทางเดินหายใจ</Text> ได้แก่ มะเร็งปอด มะเร็งกล่องเสียง ปอดอุดตันเรื้อรัง <Text style={styles.title}>ระบบทางเดินอาหาร</Text> ได้แก่ มะเร็งหลอดอาหาร แผลในกระเพาะอาหาร และลำไส้เล็ก มีผลต่อ<Text style={styles.title}>โรคในช่องปาก</Text> ได้แก่ มีคราบหินปูนฝังแน่นที่ฟัน มีความสัมพันธ์กับการ
                    เสื่อมสมรรถภาพทางเพศและมีผลต่อทารกใน
                    ครรภ์{'\n'}
                    {'\n'}
                    การสูบบุหรี่ ทำให้ระบบประสาทส่วนกลางได้รับสารนิโคติน อย่างรวดเร็ว ใช้เวลาเพียง 6 วินาที มีฤทธิ์ทำให้เกิดความพึงพอใจ และจะเกิดความอยากบุหรี่เมื่อระดับนิโคตินใน เลือดลดต่ำลง การติดสูบบุหรี่ ส่วนหนึ่งเกิดจากความเคยชิน จึงทำให้ยากต่อการลดละเลิก แต่มีการศึกษาพบว่า อาหารบางชนิดสามารถช่วยให้เลิกบุหรี่ได้ ได้แก่
                </Text>
                {
                    this.renderImg('SNB1', 2)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>ส.สอง เลี่ยงการดื่มสุรา หรือแอลกอฮอล์</Text>{'\n'}
                    ผลเสียของการดื่มสุราต่อสุขภาพมีอะไรบ้าง... มีผลต่อ<Text style={styles.title}>การทำงานของหัวใจและหลอดเลือด</Text> ได้แก่ ทำให้ความดันโลหิตสูงและเกิดโรคหัวใจ มีผลต่อ<Text style={styles.title}>การทำงานของสมอง</Text> ได้แก่ ทำให้เกิดการเสียการควบคุมการเคลื่อนไหว รู้สึกสับสน เซลล์สมองเสื่อม และสุรา หรือแอลกอฮอล์ให้พลังงานสูง อาจ<Text style={styles.title}>ส่งผลให้น้ำหนักเกิน</Text> อ้วน และ
                    เพิ่มความเสี่ยงต่อการเกิดโรคเบาหวานได้
                </Text>
                {
                    this.renderImg('SNB1', 3)
                }
                <Text style={styles.content}>
                    {'\n'}
                    ในแต่ละวันปริมาณการดื่มสุราไม่ควรเกิน...
                    ผู้ชาย ไม่เกิน 2 แก้วมาตรฐานต่อวัน และผู้หญิงไม่เกิน 1 แก้วมาตรฐานต่อวัน
                    ปริมาณ 1 ดื่มมาตรฐาน (10 กรัมแอลกอฮอล์) ในแอลกอฮอล์แต่ละชนิดมันประมาณไหนกันนะ ?
                </Text>
                {
                    this.renderImg('SNB1', 4)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>เคล็ดลับการเลิกสุรา</Text> {'\n'}
                    1. ต้องมีความตั้งใจจริงที่จะเลิกสุรา {'\n'}
                    2. ตั้งเป้าว่าจะเลิกเพื่อใคร เพราะอะไร{'\n'}
                    3. ลดปริมาณการดื่มทีละน้อย เช่น ใช้แก้วใบเล็กลง{'\n'}
                    4. ใช้แอลกอฮอล์ผสมน้อยลงโดยตั้งเป้าลดการดื่ม เช่น เคยดื่มวันละ 4 แก้วให้ลดลงเหลือวันละ 1 - 2 แก้ว{'\n'}
                    5. เลือกวันที่จะลด / เลิกสุรา{'\n'}
                    6. หลีกเลี่ยงจากสถานที่ที่เคยดื่มและเพื่อน ๆ ที่ร่วมดื่ม{'\n'}
                    7. ทำกิจกรรมเพื่อสุขภาพ เช่น การออกกำลังกายเล่นกีฬา ดนตรี{'\n'}
                    8. หยุดความคิดที่จะดื่มเพื่อต้องการเข้าสังคม{'\n'}
                    9. ฝึกพูดปฏิเสธ เช่น หมอห้ามดื่ม ลูกขอร้องให้หยุดดื่ม ไม่ว่างติดธุระด่วน{'\n'}
                    10. หาที่พึ่งทางใจ กำลังใจ จากคนรอบข้าง และไม่ลืมที่จะให้รางวัลตัวเองเมื่อสามารถทำได้{'\n'}
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


export default Snb1;