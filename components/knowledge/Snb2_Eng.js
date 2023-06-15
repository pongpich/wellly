import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snb2 extends Component {
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
                    this.renderImg('SNB2', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    Nowadays, sugar substitutes {'\n'}
                    are increasingly popular.
                    <Text style={styles.title}>What are sugar substitutes?</Text> They are substances that give a sweet taste and can be used as an alternative to refined sugar. Sugar substitutes are divided into two major categories
                </Text>
                {
                    this.renderImg('SNB2', 2)
                }
                {
                    this.renderImg('SNB2', 3)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>How to tell if products contain sugar substitutes?</Text>
                    To find out, you can check the Nutrition Facts label on the packages where the specific name of sweeteners is listed, such as Saccharins, Acesulfame-K, Aspartame, Sucralose, Sorbitol Xylitol, and Erythritol.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>Consuming too many sugar substitutes is harmful to your health.</Text> Excessive consumption of sugar alcohols, including sorbitol, xylitol, and erythritol, can cause unpleasant symptoms, such as diarrhea, gas, and bloating.
                </Text>
                {
                    this.renderImg('SNB2', 41)
                }
                <Text style={styles.content}>
                    {'\n'}
                    We need to consider side effects, conditions, and quantity when using sweeteners. Some of the sugar substitutes are non-nutritive. Thus, they should not be used to substitute for a healthy diet. If you crave something sweet, just eat fresh fruits. The most important thing is to eat a well-balanced diet with the recommended amounts.
                </Text>
                {
                    this.renderImg('SNB2', 5)
                }
                {
                    this.renderImg('SNB2', 6)
                }
                {
                    this.renderImg('SNB2', 7)
                }
                {
                    this.renderImg('SNB2', 8)
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


export default Snb2;