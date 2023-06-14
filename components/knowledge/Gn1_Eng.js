import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn1 extends Component {

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
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/${mission_id}/eng/${mission_id}_${img_index}.png`/* `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/eng/${mission_id}/${mission_id}_${img_index}.png` */
        /*   https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/GN1/GN1_2eng.png */
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
                    this.renderImg('GN1', 1)



                }
                <Text style={styles.title}>
                    Carbohydrates
                </Text>
                <Text style={styles.content} >
                    are a crucial source of energy for people who exercise. The body stores carbohydrates in the form of glycogen, which is stored in the liver and muscles. Therefore, consuming complex carbohydrates such as brown rice, whole-grain bread, and various beans is recommended to exercise for extended periods as they provide better results than simple carbohydrates like sugar or sweetened beverages. This is because complex carbohydrates have a lower glycemic index, which reduces insulin resistance, and also provides other nutrients such as vitamins, minerals, and dietary fiber. They can also create more glycogen stores in the muscles.
                </Text>
                <Text style={styles.content} >
                    For high-intensity exercise, consuming carbohydrates immediately after exercise or within 2 hours post-exercise is recommended. The appropriate amount of carbohydrates for people who exercise is about 5-10 grams of carbohydrates per kilogram of body weight per day. For example, a person weighing 70 kilograms would need approximately 350-700 grams of carbohydrates per day. However, the amount may vary depending on the exercise's intensity and duration.
                </Text>
                {
                    this.renderImg('GN1', 2)
                }
                {
                    this.renderImg('GN1', 3)
                }
                {
                    this.renderImg('GN1', 4, 'lg')
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


export default Gn1;