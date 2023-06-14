import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';

class Gn2 extends Component {
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
                    this.renderImg('GN2', 1)
                }
                <Text style={styles.title}>
                    Protein
                </Text>
                <Text style={styles.content} >
                    is a nutrient that helps repair and build muscle mass, directly impacting muscle response and exercise performance. Consuming protein before resistance training can help reduce muscle soreness and increase muscle strength. Including protein in your post-workout meal or beverage immediately after or during prolonged exercise can help maintain or increase muscle mass. Additionally, it can improve performance capacity during exercise.
                </Text>
                {
                    this.renderImg('GN2', 2)
                }
                <Text style={styles.content}>
                    <Text style={styles.title}>What protein should I start with?</Text>{'\n'}
                    {'\n'}
                    <Text style={styles.title}>Plant-based protein </Text>is a good source of protein, but it may lack some essential amino acids. Sources of plant-based protein include green beans, red beans, Job’s tears, oats, quinoa, soybeans, and soy products such
                    <Text style={styles.title}> as textured vegetable protein.</Text>{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- Soybeans</Text>{'\n'}
                    including yellow beans, tofu, soy milk, soybean paste, or other alternative protein made from soybeans, are high in protein. One cup of cooked soybeans provides up to 29 grams of protein, while one glass of soy milk has a comparable amount of protein as cow's milk. In addition, consuming 25 grams
                    <Text style={styles.title}> of soy protein daily helps lower cholesterol levels.</Text>{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- Beans and seeds</Text>{'\n'}
                    are also excellent sources of high-quality protein. Various types of beans, such as red beans and black beans, provide up to 15 grams of protein per cup, and green peas, provide 9 grams of protein per cup. Meanwhile, a medium-sized potato only contains 9 grams of protein. For seeds, 8 grams of protein can be found in 1 tablespoon of pumpkin and sunflower seeds, 12 almonds, 24 pistachios, 7 walnuts, or 2 tablespoons of peanut butter.{'\n'}
                    {'\n'}

                    <Text style={styles.title}>โปรตีนจากสัตว์</Text> จัดเป็นโปรตีนคุณภาพดีเพราะมี
                    กรดอะมิโนจำเป็นครบถ้วน ร่างกายสามารถนำไปใช้ประโยชน์ ได้เต็มที่ ได้แก่ เนื้อหมู เนื้อปลา เนื้อไก่ ไข่ อาหารทะเล และนม เป็นต้น {'\n'}
                    {'\n'}
                    <Text style={styles.title}>- Red meat</Text>{'\n'}
                    including beef, pork, or lamb, is high in protein. However, it is also high in saturated fats and cholesterol, which can contribute to clogged arteries and heart disease. Thus, lean cuts, such as sirloin and loin, are better options thanks to their low saturated fat levels, similar to skinless chicken breasts, which are high in protein, but low in fat.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>-  Duck meat and chicken</Text>{'\n'}
                    Eating skinless duck and chicken breast is better for your health to avoid saturated fat.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- Fish</Text>{'\n'}
                    is a low-fat high, quality protein. Even fatty fish, like salmon and tuna, are still considered healthy as they contain omega-3 fatty acids. Tuna and sardines are also an excellent source of omega-3. Based on the recommended levels of omega-3, most people do not get enough of it. Thus, fish should be included in your diet; twice a week (approximately 110 grams or 8 tablespoons per serving) is recommended.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- Eggs</Text>{'\n'}
                    are a source of high-quality protein. An average-sized egg contains 7 grams of protein. Although egg yolks are high in
                    <Text style={styles.title}>cholesterol, several studies have found that the cholesterol in eggs does not raise cholesterol levels </Text>{'\n'}
                    instead, foods containing saturated and trans fats do. Therefore, one egg a day does not increase the risk of heart disease for most people.{'\n'}
                    {'\n'}
                    <Text style={styles.title}>- Milk and dairy products </Text>{'\n'}
                    like cheese and yogurt are rich in protein and calcium. However, skim, low-fat, or nonfat milk is a better choice to avoid extra fat and calories. One glass of nonfat milk contains 7 grams of protein. However, if you want more protein, you can choose Greek yogurt, which has as much as 18-20 grams of protein per 1 cup (285 grams) and packs twice as much protein as regular yogurt.{'\n'}
                    {'\n'}
                </Text>
                {
                    this.renderImg('GN2', 4)
                }
                <Text style={styles.content}>
                    For people wanting to build muscle, the recommended daily protein intake is between 1.2-1.7 grams of protein per kilogram of body weight. Meanwhile, people who do strength training should consume between 1.2-1.4 grams of protein per kilogram of body weight daily. Lastly, 0.8 - 1 gram of protein per kilogram of body weight is needed daily for people in general. That said, low-fat and low-sodium foods are preferred, as fats and sodium cause bloating and puffiness that can cover your abs. Therefore, when eating protein-rich foods, choose the ones that are low in fat and low in sodium.
                </Text>
                {
                    this.renderImg('GN2', 3)
                }
                {
                    this.renderImg('GN2', 5, 'lg')
                }
                {
                    this.renderImg('GN2', 6, 'lg')
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
        height: (deviceHeight > 1023) ? 390 : 208
    },
    boxImage2: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 390 : 390,
    },
})


export default Gn2;