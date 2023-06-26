import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Continuous extends Component {
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

    renderImg(img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/exercise/${img_index}.png`
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
                    this.renderImg('Exercise_w_9', 'md')
                }
                <Text style={styles.title}>
                    Stay active, Stay healthy
                </Text>
                <Text style={styles.content}>
                    การออกกำลังกายในระดับที่สามารถลดความเสี่ยงของโรคต่าง ๆ ได้อย่างมีประสิทธิภาพนั้น นับเป็นสิ่งที่สำคัญสำหรับการดูแลรักษาสุขภาพอย่างยั่งยืน และความสม่ำเสมอเป็นอีกหนึ่งองค์ประกอบที่สำคัญในการดูแลสุขภาพ ดังนั้นการออกกำลังกายในรูปแบบต่างๆนี้ ควรทำต่อเนื่อง และ ครบถ้วนทุกประเภท จนเป็นกิจวัตร
                </Text>

                <Text style={styles.title}>
                    ซึ่งประกอบด้วย
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        1. การขยับตัวสม่ำเสมอ เพิ่มกิจกรรมตลอดวัน
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        2. ฝึกกล้ามเนื้อลำตัว Core Balance และ Plyometric
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        3. เสริมความแข็งแรงด้วยการฝึกด้วยแรงต้าน
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        4. สร้างความยืดหยุ่นด้วยการฝึกความอ่อนตัว
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        5. พัฒนาระบบไหลเวียนด้วยการฝึกแบบ คาร์ดิโอ
                    </Text>
                </View>

                <Text style={styles.title}>
                    หมายเหตุ
                </Text>
                <Text style={styles.content}>
                    คาร์ดิโอ คือกิจกรรมหรือการออกกำลังกายที่มีการเคลื่อนไหวอย่างต่อเนื่อง โดยมุ่งเน้นให้อัตราการเต้นของหัวใจเร็วขึ้น เพื่อกระตุ้นการไหลเวียนของเลือดและกล้ามเนื้อหัวใจให้แข็งแรงและทำงานได้ดีขึ้น
                </Text>
                <Text style={styles.content}>
                    กิจกรรมหรือการออกกำลังกายที่สามารถนับว่าเป็น “คาร์ดิโอ” นั้น สังเกตได้จากการที่เมื่อทำกิจกรรมหรือออกกำลังกายนั้น ๆ ทำให้ตอนหายใจออก นับในใจได้ต่ำกว่า 3 แล้วต้องหายใจเข้า หรือ กิจกรรมที่ทำให้ต้องหายใจถี่กว่าปกติ นั่นเอง และควรทำกิจกรรมที่มีช่วงที่อยู่ในสภาวะดังกล่าวต่อเนื่อง 15 นาทีขึ้นไป
                </Text>

                <Text style={styles.title}>
                    ตัวอย่างคาร์ดิโอ
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - วิ่ง
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - ว่ายน้ำ
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เครื่องเดินวงรี (อุปกรณ์ในฟิตเนส : Elliptical)
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เดินเร็ว
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เดินชัน
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เดินขึ้นบันได
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เดินบันได (อุปกรณ์ในฟิตเนส : StairMaster / Stepper)
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เซอร์กิตเทรนนิ่ง
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - เต้น : แอโรบิก ซุมบ้า
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - คลาสออกกำลังกายต่าง ๆ ที่เคลื่อนไหวเร็ว : Body Pump / Body Combat
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={[styles.content2]} >
                        - คลิปออกกำลังกาย ๆ
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


export default Continuous;