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
                    this.renderImg('Exercise_w_3', 'md')
                }
                <Text style={[styles.content, { marginTop: 32 }]}>
                    การออกกำลังกายในระดับที่สามารถลดความเสี่ยงของโรคต่าง ๆ ได้อย่างมีประสิทธิภาพนั้น นับเป็นสิ่งที่สำคัญสำหรับการดูแลรักษาสุขภาพอย่างยั่งยืน
                </Text>
                <Text style={[styles.content, { marginTop: 32 }]}>
                    โดยคำแนะนำของ ACSM - AHA ได้กำหนดปริมาณและความหนักของการออกกำลังกายให้ได้ผลไว้ ดังนี้
                </Text>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        ให้ออกกำลังกายระดับความเข้มข้นปานกลาง (Moderate Intensity) 5 ครั้ง/สัปดาห์
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        หรือออกกำลังกายระดับความเข้มข้นสูง (Vigorous Intensity) 3 ครั้ง/สัปดาห์
                    </Text>
                </View>

                <Text style={styles.tableEx}>ตารางแสดงกิจกรรมทางกาย ระยะเวลา และ การจัดระดับความหนักของกิจกรรม</Text>
                {
                    this.renderImg('Exercise_Mission_w_3', "lg")
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
        paddingLeft: 16,
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