import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Sna1 extends Component {
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
                    this.renderImg('SNA1', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    A Nutrition Facts label on packaged foods or drinks displays the nutritional content. The label, under the supervision of the Ministry of Public Health, informs what and how much nutrients contained in such foods or beverages are on a box or Nutrition Facts box.
                    The Nutrition Facts labels are divided into two major types.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>1. Recommended Dietary Intake (RDI)</Text> {'\n'}
                    This labels shows the amount and level of core nutrients that people should know. All 15 nutrients are shown: calories, calories from fat, total fat, saturated fat, protein, carbohydrates, dietary fiber, sugars, sodium, vitamin A, vitamin B1, vitamin B2, calcium, and iron.
                </Text>
                <Text style={[styles.title, { textAlign: "center" }]}>
                    How to read the Nutrition Facts label?
                </Text>
                {
                    this.renderImg('SNA1', 2, 'lg')
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>2. Guideline Daily Amounts (GDAs), also known as sugar-fat-sodium labels.</Text> {'\n'}
                    Before making an informed choice of ready-to-eat foods, the following factors should be considered
                    {'\n'}
                    1. Recommended number of servings on packages or boxes.{'\n'}
                    2. Energy content per package, including energy (kcal), total sugar, total fat, and sodium{'\n'}
                    3. Compare the number of calories from energy, total sugar, total fat, and sodium with the maximum recommended GDA, which is no more than 2000 kcal, 65 grams of sugar and fat, and 2000 milligrams of sodium.
                </Text>
                {
                    this.renderImg('SNA1', 3)
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


export default Sna1;