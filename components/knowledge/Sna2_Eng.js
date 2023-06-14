import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Sna2 extends Component {
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
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/${mission_id}/eng/${mission_id}_${img_index}.png`
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
                        source={{ uri: imgUrl }}
                        onLoad={this.handleLoad}
                        onError={this.handleError}
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
                    this.renderImg('SNA2', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    The human body comprises around 60% water, which can be lost through activities such as exercise. It is important to stay hydrated by drinking water. However, some people don't care about drinking enough water, while others do too much. This can be detrimental to our health. Additionally, some people do not know that a person cannot survive five days or one week without water.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>How much water should we drink every day ?</Text>{'\n'}
                    As our body loses water through urinating, sweating, or breathing, it’s important to rehydrate by drinking water. It is even more important to consume the right amount of water. Having too much or too little water can cause damage to the body. It is common knowledge that drinking 8 glasses of water a day is enough. In fact, the amount of water your body needs depends on several factors, like gender, age, or physical activity.
                </Text>
                {
                    this.renderImg('SNA2', 2)
                }
                <Text style={styles.content}>
                    {'\n'}
                    For example, 55 x 2.2 x 30/2 = 1,815 ml. (Your recommended water intake per day)
                    Not meeting your daily water intake leads to poor blood circulation and the inability to efficiently remove wastes, resulting in blood clots and thickness, which are the root causes of many diseases.
                </Text>
                {
                    this.renderImg('SNA2', 3)
                }
                {
                    this.renderImg('SNA2', 4)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>Benefits of drinking water</Text> {'\n'}
                    Water is essential to body function. It helps transport waste products, nutrients, and oxygen into and out of the cells. Water also helps with weight loss by speeding up the metabolism. Other benefits of water include boosting skin health, creating synovial fluid, supporting the digestive system, flushing bacteria out of the bladder, controlling overall body temperature, lowering blood pressure, preventing constipation, protecting your organs and tissues, and maintaining the levels of electrolytes (sodium).
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


export default Sna2;