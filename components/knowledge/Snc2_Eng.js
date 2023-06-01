import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snc2 extends Component {
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
                    this.renderImg('SNC2', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>An alcoholic</Text>  {'\n'}
                    drink or liquor is produced by distilling fermented vegetables, fruits, or grains. Alcohol is odorless and flavorless; however, its taste and aroma come from the ingredients added during fermentation. Each type of alcoholic beverage has different levels of alcohol content.
                    For example, Mekong, SangSom, Regency, or Chivas contain 40%ABV, wine generally about 12%ABV, and beers about 5% ABV.
                    Overconsumption of alcohol can raise blood pressure to unhealthy levels as it raises and speeds up heart rate, making it dangerous for people with high blood pressure.
                </Text>
                {
                    this.renderImg('SNC2', 2)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>Short-term effects</Text>   {'\n'}
                    In the first few hours after alcohol kicks in, diastolic pressure is lowered
                    Long-term effects: Alcohol drinks worsen blood pressure. Studies show a high association between alcoholic beverages (beers, wine, and sake)and elevated high blood pressure.
                    Some also suggest the effects vary across different types of liquor and various factors like eating habits, exercise routine, and stress level.
                    {'\n'}<Text style={styles.title}>For people consuming three standard drinks daily,</Text> {'\n'}
                    their systolic blood pressure is increased by 3 - 4 mmHg.
                </Text>
                {
                    this.renderImg('SNC2', 3)
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


export default Snc2;