import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snc1 extends Component {
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
                    this.renderImg('SNC1', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    แร่ธาตุบางชนิดส่งผลดีต่อภาวะความดันสูง ซึ่งแร่ธาตุที่สำคัญเหล่านั้นได้แก่{'\n'}
                    <Text style={styles.title}>โพแทสเซียม (K)</Text> เป็นแร่ธาตุสำคัญ ซึ่งระดับโพแทสเซียมที่ปกติจะส่งผลต่อการทำงานของกล้ามเนื้อที่ปกติ เช่น คลายเนื้อเยื่อเส้นเลือด ซึ่งจะช่วยลดความดันโลหิตได้ ป้องกันการเต้นของหัวใจที่ผิดปกติ โดยรักษาการนำไฟฟ้าในหัวใจและระบบประสาทส่วนกลางให้เป็นปกติ
                </Text>
                {
                    this.renderImg('SNC1', 4)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>แมกนีเซียม (Mg)</Text> ช่วยควบคุมความดันโลหิตได้ แมกนีเซียมจะช่วยให้หลอดเลือดคลายตัว เป็นการลดความดันเลือด ลดความเสี่ยงของโรคหลอดเลือดสมองได้
                </Text>
                {
                    this.renderImg('SNC1', 3)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>แคลเซียม (Ca)</Text> {'\n'}
                    ช่วยให้ผนังหลอดเลือดรักษาความตึงและคลายได้อย่างมีประสิทธิภาพ ช่วยควบคุมความดันโลหิตได้
                </Text>
                {
                    this.renderImg('SNC1', 2)
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


export default Snc1;