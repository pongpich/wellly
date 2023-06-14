import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Gn6 extends Component {
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
                    this.renderImg('GN6', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>Sodium</Text>  {'\n'}
                    is an essential mineral for the body as it helps to keep water, body fluids, and blood pressure in a normal balance. The maximum number of milligrams of sodium consumption is at most 2,000 per day or about one teaspoon of salt—overconsumption of sodium results in illnesses including high blood pressure, kidney disease, and coronary artery disease.
                </Text>
                {
                    this.renderImg('GN6', 2)
                }
                <Text style={styles.content} >
                    Sodium can hide in many surprising foods. Unsurprisingly, we sometimes eat sodium without even knowing it. Common sources of sodium include meats, natural foods, processed foods (sausages, Vietnamese ham, fish/meatballs, salted fish, canned foods, instant noodles), seasonings sauce, bread, and snacks that contain baking powder and preservatives of various kinds.
                </Text>
                {
                    this.renderImg('GN6', 3)
                }
                {
                    this.renderImg('GN6', 4)
                }
                {
                    this.renderImg('GN6', 5)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>Easy tips to avoid excessive sodium intake</Text>{'\n'}
                    <Text style={styles.title}>- Avoid MSG and seasoning powder.</Text>{'\n'}
                    Avoid MSG and seasoning powder. While they may contain less sodium than table salt, they often lack the same level of flavor intensity, leading you to use excessive amounts to make your food taste good. This overuse can result in higher sodium consumption, negatively affecting {'\n'}
                    <Text style={styles.title}>- Avoid food with extreme flavors.</Text>{'\n'}
                    Spicy, sour, and sweet foods are very intense in taste. Sometimes, MSG and salt are needed to make the food more flavorful. If you enjoy eating intensely flavored food, gradually reduce flavor intensity until you can't stop eating them.{'\n'}
                    <Text style={styles.title}>- Eat freshly cooked food </Text>{'\n'}
                    and avoid food that has been stored for a long time, as there is a chance of consuming unnecessary sodium from preservatives.{'\n'}
                </Text>
                {
                    this.renderImg('GN6', 6)
                }
                <Text style={styles.content} >
                    {'\n'}
                    <Text style={styles.title}>- Limit your consumption of soups or broths.</Text>{'\n'}
                    They often contain high sodium levels due to using multiple seasonings and stock cubes. A helpful reminder: "scoop the meat, avoid the soup."{'\n'}
                    <Text style={styles.title}>- Read Nutrition Facts labels</Text>{'\n'}
                    and the amount of sodium. Keep your daily sodium intake to not exceed 600 milligrams for meals and 200 milligrams for snacks.{'\n'}
                    <Text style={styles.title}>- Be careful when using salt substitutes</Text>{'\n'}
                    or low-sodium salt, as they typically contain approximately half the sodium found in regular salt. To ensure adequate seasoning. It's recommended to use an appropriate amount of the substitute to avoid overconsumption of sodium.{'\n'}
                    {'\n'}
                    Reducing sodium intake is not as difficult as it seems but requires small adjustments and wise food choices to take care of one's own health.
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


export default Gn6;