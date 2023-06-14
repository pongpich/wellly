import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';
import { Table, Row, Rows } from 'react-native-table-component';



class Ab1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            tableHead: ['Low Intensity (20-30 minutes)', 'Moderate Intensity (20-30 minutes)', 'High Intensity (20-30 minutes)'],
            tableData: [
                ['walking leisurely', 'walking briskly', 'jogging'],
                ['playing a musical instrument', 'cleaning heavy (sweeping, mopping)', 'playing football'],
                ['playing darts', 'washing cars', 'swimming'],
                ['playing snooker, billiards', 'playing badminton, table tennis, and golf (recreational)', 'Playing tennis (singles)'],
                ['cooking', 'playing basketball (shooting, dribbling)', ''],
                ['working in a standing position', 'Cycling gently', ''],
            ],
        };
    }

    handleLoad = () => {
        this.setState({ loading: false });
    };

    handleError = () => {
        this.setState({ loading: false, error: true });
    };

    renderImg(img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/exercise/${img_index}.png`
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
        const { tableHead, tableData } = this.state;

        return (
            <View style={styles.scrollViewbox} >
                {
                    this.renderImg('Exercise_w_1', 'md')
                }
                <Text style={styles.title}>
                    Benefits of Added Intensity in Exercise
                </Text>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Reduces the risk of cardiovascular disease
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Normalizes elevated blood pressure
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Lowers triglyceride levels
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Reduces in total insulin dose (in case of insulin intake)
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Lowers the risk of morbidity and mortality
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Cardiovascular disease
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Stroke
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Type 2 diabetes
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Cancers
                    </Text>
                </View>
                <View style={styles.viewLi}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Other Benefits
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Eases symptoms of anxiety and depression

                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Improves cognitive function
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Improves body movement
                    </Text>
                </View>
                <View style={styles.viewLi2}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={styles.content} >
                        Reduces the risk of falling
                    </Text>
                </View>
                <Text style={styles.tableEx}>Table:  Physical Activity, Duration, and Intensity of Activity</Text>
                {
                    this.renderImg('Exercise_Mission_w_1_eng', "lg")
                }
                {/*  <Table borderStyle={styles.border}>
                    <Row

                        data={tableHead}
                        style={styles.head}
                        textStyle={styles.headText}
                    />
                    <Rows data={tableData} textStyle={styles.text} />
                </Table> */}
            </View>
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center",
        width: "100%"

    },
    li: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 5
    },
    viewLi: {
        flexDirection: "row"
    },
    viewLi2: {
        marginLeft: 16,
        flexDirection: "row",
    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    tableEx: {
        marginLeft: 16,
        marginTop: 32,
        /* marginBottom: 32, */
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    content: {
        marginLeft: 8,
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
        width: (deviceHeight > 1023) ? "100%" : 327,
        height: (deviceHeight > 1023) ? 1100 : 276,
        marginBottom: 40
    },
    head: {
        height: "auto",
        backgroundColor: colors.persianBlue,

    },
    headText: {
        margin: 6, color: colors.white, textAlign: "center",
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
    }, // เพิ่มสไตล์สีข้อความที่นี่

    text: {
        margin: 6,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    border: { borderWidth: 1, borderColor: '#c8e1ff', borderWidth: 5 },
})


export default Ab1;