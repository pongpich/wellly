import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn6 extends Component {
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
                    this.renderImg('GN6', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>โซเดียม</Text>  {'\n'}
                    เป็นเกลือแร่ชนิดหนึ่งที่มีความสําคัญต่อร่างกาย ช่วยควบคุมสมดุลน้ำและของเหลวในร่างกาย ซึ่งสามารถควบคุมระบบความดันโลหิต โดยทั่วไปปริมาณโซเดียมสูงสุดที่บริโภคแล้วไม่ อันตรายคือ ไม่ควรเกิน 2,000 มิลลิกรัมต่อวัน หรือเกลือประมาณ 1 ช้อนชา ซึ่งหากได้รับปริมาณโซเดียมเกินความจําเป็นจะก่อ ให้เกิดโรคต่าง ๆ ตามมาได้ เช่น โรคความดันโลหิตสูง โรคไต โรคหัวใจและหลอดเลือด เป็นต้น
                </Text>
                {
                    this.renderImg('GN6', 2)
                }
                <Text style={styles.content} >
                    โซเดียมมักแฝงอยู่ในอาหารต่าง ๆ ทําให้เรามักจะบริโภคเข้าไปโดยไม่รู้ตัว โซเดียมมักพบในอาหารประเภทเนื้อสัตว์ อาหารจากธรรมชาติ อาหารสําเร็จรูป (ไส้กรอก หมูยอ ลูกชิ้น ปลาเค็ม อาหารกระป๋อง บะหมี่กึ่ง สําเร็จรูป) เครื่องปรุงรส และแฝงอยู่ในขนมปัง ขนมกรุบกรอบที่ใส่ผงฟูทุกชนิด และสารกันบูดต่าง ๆ
                </Text>
                {
                    this.renderImg('GN6', 3)
                }
                {
                    this.renderImg('GN6', 4)
                }
                {
                    this.renderImg('GN6', 5)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>เทคนิคง่าย ๆ</Text>{'\n'}
                    <Text style={styles.title}>หลีกเลี่ยงการได้รับปริมาณโซเดียมเกินความ จําเป็น</Text>{'\n'}
                    <Text style={styles.title}>- เลี่ยงผงชูรสและผงปรุงรส</Text>{'\n'}
                    แม้ว่าจะมีปริมาณโซเดียมน้อยกว่าเกลือ แต่ผงชูรสไม่มีรสชาติเค็ม เหมือนเกลือ จึงทําให้เวลานํามาปรุงอาหาร จะกระหน่ำใส่ลงไปโดยไม่ยั้งมือ เนื่องจากเชื่อว่าจะช่วยชูรสอาหารให้ดีขึ้น ซึ่งเป็นสาเหตุให้ได้รับปริมาณโซเดียมที่เพิ่มขึ้น{'\n'}
                    <Text style={styles.title}>- ลดความจัดจ้านของรสชาติอาหาร</Text>{'\n'}
                    อาหารรสจัด เช่น เปรี้ยวจัด เผ็ดจัด หวานจัด ยิ่งต้องใส่เครื่องปรุงรสเค็มและผงชูรสมากขึ้น เพื่อให้อาหารครบรส แต่ถ้าหากเป็นคนชอบรับประทานอาหารรสจัด ควรค่อย ๆ ลดความจัดจ้านในการรับประทานลง หรือรับประทานอาหารรสจัดสลับกับอาหารรสชาติกลางได้ในช่วงแรก{'\n'}
                    <Text style={styles.title}>- รับประทานอาหารสด</Text>{'\n'}
                    เลี่ยงอาหารที่เก็บไว้นาน เพราะมีโอกาสได้รับโซเดียมเพิ่มโดยไม่จําเป็น จากสารกันบูด{'\n'}
                </Text>
                {
                    this.renderImg('GN6', 6)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>- เลี่ยงการซดน้ำซุป หรือซดน้ำซุปให้น้อยลง</Text>{'\n'}
                    เนื่องจากน้ำซุปมีปริมาณโซเดียมค่อนข้างสูง ที่ได้มาจากเครื่องปรุงรสหรือซุปก้อนปรุงรส จำให้ขึ้นใจ ใช้หลักการ “ตักเนื้อเลี่ยงน้ำ”{'\n'}
                    <Text style={styles.title}>- อ่านฉลากโภชนาการ</Text>{'\n'}
                    โดยการสังเกตปริมาณโซเดียม และแบ่งรับประทานให้พอเหมาะ อาหารมื้อหลักไม่ควรให้โซเดียมเกิน 600 มิลลิกรัมต่อวัน ส่วนอาหารว่างไม่ควรให้โซเดียมเกิน 200 มิลลิกรัมต่อวัน{'\n'}
                    <Text style={styles.title}>- ระวังการเติมเกลือทดแทน</Text>{'\n'}
                    เพราะเกลือทดแทนยังมีโซเดียมอยู่ประมาณ ครึ่งหนึ่ง ดังนั้นให้ใส่แต่พอประมาณ{'\n'}
                    {'\n'}
                    จะเห็นว่าการลดโซเดียมไม่ใช่เรื่องยากอย่างที่คิด เพียงแต่ดัดแปลงเล็ก ๆ น้อย ๆ ก็สามารถดูแล สุขภาพตัวเองด้วยการรู้จักเลือกกินอาหารอย่าง ฉลาดก็สามารถลดโซเดียมได้
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


export default Gn6;