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
                    this.renderImg('Exercise_w_8', 'md')
                }
                <Text style={styles.title}>
                    ความยืดหยุ่นตัวของกล้ามเนื้อและข้อต่อ (Flexibility)
                </Text>
                <Text style={styles.content}>
                    ถือเป็นสมรรถภาพทางกายกายที่สัมพันธ์กับสุขภาพ (Health-Related Physical Fitness) ที่บุคคลทั่วไปควรมี ซึ่งจะส่งผลต่อความสามารถทางกลไกการเคลื่อนไหวของร่างกาย หากร่างกายขาดความยืดหยุ่นจะส่งผลให้ความสัมพันธ์และความสามารถในการเคลื่อนไหวลดลง และมีโอกาสที่จะได้รับบาดเจ็บได้ง่าย
                </Text>
                <Text style={styles.title}>
                    การฝึกความยืดหยุ่นกล้ามเนื้อ (Flexibility Training)
                </Text>
                <Text style={styles.content}>
                    จะช่วยเสริมสร้างเพิ่มประสิทธิภาพในการเคลื่อนไหวให้ดีขึ้น ช่วยลดความเสี่ยงในการบาดเจ็บ และส่งผลดีต่อร่างกายในอีกหลาย ๆ ด้าน
                </Text>
                <Text style={styles.title}>
                    ข้อดีของการฝึก Flexibility Training
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        เพิ่มมุมการทำงานของข้อต่อต่าง ๆ
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        ลดความไม่สมดุลของกล้ามเนื้อน
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        ลดแรงกระทำที่ข้อต่อต่าง ๆ
                    </Text>
                </View>
                <View style={[styles.viewLi1, { marginBottom: 40 }]}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        ช่วยบรรเทาอาการข้อต่อติดในกลุ่มผู้ที่มีอาการของเบาหวาน การฝึกเพิ่มความยืดหยุ่นจึงควรได้รับความสำคัญเป็นลำดับต้น ๆ สำหรับกลุ่มผู้ที่มีอาการของเบาหวาน
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
    viewLi1: {
        marginLeft: 8,
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