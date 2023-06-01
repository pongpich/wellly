import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn3 extends Component {
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
                    this.renderImg('GN3', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>Vegetables</Text> Eating 150 - 200 grams of vegetables or 2 -3 tbsp per meal is recommended.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>Fruits</Text> It is recommended that we eat 2 fist-size portions of fruits without any dipping
                    sauce like Thai chili salt, shrimp paste, or sweet and fishy dipping.
                </Text>
                {
                    this.renderImg('GN3', 2)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>Benefits of Multi-Colored Fruits</Text>{'\n'}
                    {'\n'}
                    <Text style={{ color: "#FF0000" }}>Red</Text> fruits and vegetables, including cherries, strawberries, papaya, watermelon, and tomatoes, contain lycopene, betacycin, and antioxidants that help combat free radical damage, and protect against cancer, especially those that cause prostate cancer. They also help lower blood pressure, reduce wrinkles, and increase appetite.{'\n'}
                    {'\n'}
                    <Text style={{ color: "#53C665" }}>Green</Text> fruits and vegetables, like cabbage, broccoli, avocado, cucumber, and green apples, contain chlorophyll, lutein, and fiber, which help prevent macular degeneration, promote healthy bowel movements, and boost the immune system.{'\n'}
                    {'\n'}
                    <Text style={{ color: "#FABF29" }}>Yellow/orange</Text> fruits and vegetables, including carrots, pumpkin, corn, oranges, pineapples, and cantaloupe, contain carotenoids, vitamins A and C, beta-carotene, and antioxidants that help combat free radical damage, reduce inflammation, protect against cancer, lower cholesterol in the blood, protect cells from damage, and promote glowing skin.{'\n'}
                    {'\n'}
                    <Text style={{ color: "#7000FF" }}>Purple/blue</Text>fruits and vegetables, such as taros, blueberries, blackberries, purple grapes, and purple cabbage, are high in anthocyanins and antioxidants, which can better combat free radical damage than vitamin C, This helps to improve blood flow and circulation, reduce the risk of heart diseases, fight viruses, and prevent certain cancers like colon cancer, liver cancer, leukemia, and hormone-related types of cancer.{'\n'}
                    {'\n'}
                    <Text style={{ color: "#DEDEDE" }}>White</Text>fruits and vegetables like bananas, sugar apples, lychees, mangosteen, white sesame, and cabbage contain xanthones. They help reduce inflammation, regulate blood glucose levels, reduce the lipid in the blood, lowering blood pressure and the risk of heart disease, and ease joint pain.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>*** Caution ***</Text>{'\n'}
                    Try to eat a rainbow of colorful fruits and vegetables!
                </Text>
                {
                    this.renderImg('GN3', 3)
                }
                {
                    this.renderImg('GN3', 4)
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


export default Gn3;