import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn5 extends Component {
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
                    this.renderImg('GN5', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>6-6-1</Text> is the daily recommended proportion of sugar, salt (sodium), and oil /fat intake to keep you healthy and lower the risk of illnesses, especially non-communicative diseases (NCDs).
                </Text>
                {
                    this.renderImg('GN5', 2)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>The first 6</Text>  refers to the recommended daily sugar intake,
                    <Text style={styles.title}>which should not exceed 6 teaspoons or 24 grams daily. </Text>{'\n'}
                    Sugar is a carbohydrate that provides energy to the body, 1 gram of which contains 4 kilocalories. It is commonly found in drinks, snacks, and quick meals such as noodles. However, we can use alternative sweeteners to avoid excessive sugar intake. It is important to note that substitute sugars are much sweeter than refined sugar, so you may become addicted to the pleasure of the much sweeter taste.
                    {'\n'}<Text style={styles.title}>…Remember: Choose health, Choose less sweet!...</Text> {'\n'}
                    {'\n'}
                    <Text style={styles.title}>The second 6</Text>refers to the recommended daily oil/fat intake,
                    <Text style={styles.title}>which should not exceed 6 teaspoons or 24 grams daily.</Text>
                    One gram of oil contains 9 kilocalories. It provides high energy and helps the body absorb vitamins A, D, E, and K. Consuming excessive saturated fats like palm oil, coconut oil, animal fats, and trans fats increase the risk of coronary artery disease. Choosing the right cooking oil for each food is essential for our health. For example, high-saturated fats oils like palm oil and lard are suitable for frying. In contrast, rice bran, canola, safflower, corn, and olive oil are unsaturated and thus ideal for stir-frying or making salads.
                    {'\n'}
                    <Text style={styles.title}>Number 1</Text> refers to the recommended daily salt intake,
                    <Text style={styles.title}>which should not exceed 1 teaspoon or 5 grams, equivalent to 2,000 milligrams of sodium. </Text>
                    Excessive sodium intake is associated with blood pressure, proteinuria, and reduced kidney and heart functions. Sodium is found in almost all types of food, especially processed foods, fermented foods, frozen foods, bakery products, semi-cooked foods, and snacks. {'\n'}
                </Text>
                {
                    this.renderImg('GN5', 3)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>Therefore, sustainable and practical tips to reduce sugar, fat, </Text> {'\n'}
                    and salt is to start tasting the food before seasoning it every time. It is also better to avoid desserts, sugar-sweetened beverages, fried foods, bakery items, and foods that contain coconut milk. Choosing the right oil for different types of cooking is also recommended, including avoiding double-frying foods, dipping sauce, processed foods, and snacks. Lastly, start reading Nutrition Facts labels!
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


export default Gn5;