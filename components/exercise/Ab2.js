import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class C2 extends Component {
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
                    this.renderImg('Exercise_w_2', 'md')
                }
                <Text style={styles.title}>
                    การออกกำลังกายเพิ่มขึ้นแม้เพียงเล็กน้อย
                </Text>
                <Text style={styles.content} >
                    ก็ส่งผลในการลดความเสี่ยงของการเกิดโรคได้ แต่การที่จะดูแลสุขภาพ และลดความเสี่ยงของโรคได้อย่างยั่งยืนนั้น คือการออกกำลังกายอย่างสม่ำเสมอ และ “มากพอ”
                </Text>
                <Text style={[styles.content, { marginTop: 24 }]} >
                    ภารกิจสัปดาห์นี้ คือการค่อย ๆ เพิ่มปริมาณการออกกำลังกายให้เข้าใกล้กับระดับที่ สถาบันโรคหัวใจสหรัฐอเมริกา แนะนำมากขึ้น โดยที่ไม่เป็นการเปลี่ยนแปลงอย่างหักโหมจนเกินไป
                </Text>

                <Text style={styles.tableEx}>ตารางแสดงกิจกรรมทางกาย ระยะเวลา และ การจัดระดับความหนักของกิจกรรม</Text>
                {
                    this.renderImg('Exercise_Mission_w_2', "lg")
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


export default C2;