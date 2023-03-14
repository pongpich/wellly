import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class C3 extends Component {

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
                    this.renderImg('Exercise_w_5', 'md')
                }
                <Text style={styles.title}>
                    การฝึกแบบพลัยโอเมตริก (Plyometric)
                </Text>
                <Text style={styles.content}>
                    หรือการฝึกพลังระเบิดของกล้ามเนื้อ
                    คือการฝึกด้วยแรงต้านรูปแบบหนึ่ง ที่มีลักษณะในการที่รวดเร็ว และต้องใช้แรงมาก ควบคู่กับการทรงตัว และ ยืด-หดของกล้ามเนื้อเพื่อออกแรง และรองรับแรงกระแทก
                </Text>
                <Text style={[styles.content, { marginTop: 24 }]}>
                    ผู้ฝึกสามารถฝึกพลัยโอเมตริก (Plyometric) ได้ด้วยการฝึกท่าฝึกที่ออกแบบมาให้ร่างกาย ได้ออกแรงและรองรับแรงอย่างรวดเร็ว เช่น การกระโดดขึ้นและลง ระหว่างพื้นและกล่องที่ต่างระดับ เช่น ท่า  Box Jump
                </Text>

                <Text style={[styles.title, { textAlign: "center" }]}>
                    ภาพการฝึก Box jump
                </Text>
                <View style={[styles.boxImage, { backgroundColor: "#BDBDBD" }]}></View>
                <Text style={[styles.title]}>
                    ข้อดีของการฝึก  พลัยโอเมตริก (Plyometric)
                </Text>

                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        เพิ่มความแข็งแรงของการหดตัวและคลายตัวของกล้ามเนื้อ
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        ช่วยป้องกันอาการบาดเจ็บ
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        เพิ่มศักยภาพของระบบประสาทสั่งการกล้ามเนื้อ
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        สร้างความมั่นคงให้กับร่างกาย
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        ช่วยกระตุ้นการสร้างคอลลาเจนบริเวณข้อต่อที่ถูกฝึกให้รับแรง
                    </Text>
                </View>
                <View style={[styles.viewLi, { marginBottom: 40 }]}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content2} >
                        ลดความเสี่ยงการบาดเจ็บจากการพลัดตกหกล้ม
                    </Text>
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


export default C3;