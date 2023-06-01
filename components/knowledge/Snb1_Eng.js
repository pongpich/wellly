import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class Snb1 extends Component {
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
                    this.renderImg('SNB1', 1)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>Stop smoking!</Text>{'\n'}
                    Let’s see the health risks of smoking…
                    Nicotine increases blood pressure, speeds up the heart rate, and raises the risk of CAD(Coronary Artery Disease) and stroke. It negatively affects the heart and circulatory system, causing blood to form clots or blood vessels to narrow down. Nicotine also adversely affects the respiratory system, leading to lung cancer, laryngeal cancer, and chronic obstructive pulmonary disease. For the digestive system, nicotine contributes to esophageal cancer and peptic ulcers. Other adverse effects include increasing plaque and tartar buildup in your mouth, causing sexual dysfunction and negatively affecting fetal development.{'\n'}
                    {'\n'}
                    Within 6 seconds after it enters your body, nicotine travels rapidly and reaches the central nervous system triggering positive feelings related to pleasure sensations. When nicotine levels in the blood drop, cravings for nicotine kick in. Thus, nicotine dependence causes addiction, making it hard to withdraw. Fortunately, studies have found certain foods and drinks that help quit smoking.
                </Text>
                {
                    this.renderImg('SNB1', 2)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>Cut down on drinking.</Text>{'\n'}
                    <Text style={styles.title}>The health risks of alcohol drinking.</Text>{'\n'}
                    Let’s see the health risks of alcohol drinking...{'\n'}
                    Alcohol drinks affect heart rate and blood vessels resulting in high blood pressure and heart disease. It also causes damage to the brain resulting in difficulty controlling balance, impaired memory, and brain cell damage. Because alcohols or liquors are high in calories, they can increase the risk of being overweight, obese, and having diabetes.
                </Text>
                {
                    this.renderImg('SNB1', 3)
                }
                <Text style={styles.content}>
                    {'\n'}
                    The recommended number of drinks in a day is:
                    Two standard drinks or less in a day for men and one standard drink or less in a day for women.
                    How much is one standard drink (10 grams of alcohol) in each alcohol drink ?
                </Text>
                {
                    this.renderImg('SNB1', 4)
                }
                <Text style={styles.content}>
                    {'\n'}
                    <Text style={styles.title}>Tips to stop drinking</Text> {'\n'}
                    1. Be persistent about your intention. {'\n'}
                    2. Set your goals: Who do you do this for? And why?{'\n'}
                    3. Taper off alcohol, such as drinking with a smaller glass.{'\n'}
                    4. Mix weaker drinks using less alcohol and gradually reduce the number of drinks from 4 to 1-2 a day.{'\n'}
                    5. Set your own D-Day to taper off or stop drinking alcohol.{'\n'}
                    6. Stay away from the places or people you used to enjoy your drinks{'\n'}
                    7. Do healthy activities such as exercising, playing sports or music.{'\n'}
                    8. Put an end to the thought that you must drink to socialize.{'\n'}
                    9.  Learn to say “No” with excuses like “My doctor doesn’t allow me to drink,” “My baby wants me to stop drinking,” or “I have work to do.”{'\n'}
                    10.  Find support from your loved ones, and remember to reward yourself when you have achieved the goal!{'\n'}
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


export default Snb1;