import React, { Component } from 'react'
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, TouchableOpacity, Image, Text, Pressable, Animated } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Carbohydrate from '../../components/knowledge/Carbohydrate';

class ArticleTemplate extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);
        this.state = {
            numberMission: null,
            study: true,
            quiz: null,
            statusBarColor: "light",

        };
    }

    componentDidMount() {
        // รับ   params จาก  route
        const { id } = this.props.route.params;
        this.setState({
            numberMission: id,
        })

    }

    slideDown = () => {
        Animated.timing(this.slideAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    slideUp = () => {
        Animated.timing(this.slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    };



    render() {
        const { statusBarColor, numberMission, study } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 44, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                        {
                            statusBarColor === "light" ?
                                <StatusBar barStyle="light-content" />
                                :
                                <StatusBar barStyle="dark-content" />
                        }
                    </View>
                    <View style={{ height: 48, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                        <View style={{ marginLeft: 16 }}>
                            <Pressable onPress={() => this.props.navigation.goBack()}>
                                <Image
                                    source={statusBarColor === "light" ? require('../../assets/images/icon/chevron.png') : require('../../assets/images/icon/caret.png')}
                                />
                            </Pressable>
                        </View>
                    </View>
                    {
                        statusBarColor === "light" ?
                            <View style={ComponentsStyle.headBox}>
                                <View style={ComponentsStyle.areaNumber}>
                                    <Text style={ComponentsStyle.areaNumberText}>
                                        {numberMission}
                                    </Text>
                                </View>
                                <View style={ComponentsStyle.nutritionMission}>
                                    <Text style={ComponentsStyle.missionHead}>ภารกิจโภชนาการ</Text>
                                    <Text style={ComponentsStyle.missionHeading}>Energy พร้อม!!!</Text>
                                </View>
                            </View>
                            :
                            null
                    }

                    <View style={ComponentsStyle.contentBox}>
                        <View style={styles.heading}>
                            <View style={styles.boxHeadingActive}>
                                <Text style={styles.sectionActive}> ความรู้</Text>
                            </View>
                            <View style={styles.boxHeading}>
                                <Text style={styles.section}> ภารกิจ</Text>
                            </View>
                        </View>
                        <ScrollView onScroll={(event) => {
                            const scrolling = event.nativeEvent.contentOffset.y;
                            console.log("scrolling", scrolling);
                            if (scrolling > 100) {
                                this.setState({
                                    statusBarColor: "dark"
                                })

                                this.slideDown()
                            } else {
                                this.setState({
                                    statusBarColor: "light"
                                })
                                this.slideUp()
                            }
                        }}
                        >
                            {
                                study ? <Carbohydrate /> : null
                            }
                        </ScrollView>
                    </View >


                </View>
                <View style={{
                    marginBottom: -100,
                    shadowColor: colors.white,
                    shadowOffset: {
                        width: 0,
                        height: -15,
                    },
                    shadowOpacity: 0.58,
                    /*   shadowRadius: 10.00, */
                    elevation: 0,
                }}>
                    <Animated.View
                        style={{
                            transform: [{
                                translateY: this.slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-100, 0]
                                })
                            }],
                            marginBottom: 0,
                            height: 80,
                            paddingHorizontal: 16,
                            backgroundColor: colors.white,

                        }}
                    >
                        <Pressable onPress={() => this.props.navigation.navigate("QuizAnswer")} >
                            <View style={ComponentsStyle.buttonWhite} >
                                <Text style={ComponentsStyle.textButtonWhite}>
                                    ดูผลตรวจแบบฝึกหัด
                                </Text>
                            </View>
                        </Pressable>


                    </Animated.View>

                </View>

                {/*      <Animated.View
                    style={{
                        transform: [{
                            translateY: this.slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [52, 0]
                            })
                        }]
                    }}
                >
                    <Pressable onPress={() => this.props.navigation.navigate("QuizAnswer")}>
                        <View style={ComponentsStyle.buttonWhite} st>
                            <Text style={ComponentsStyle.textButtonWhite}>
                                ดูผลตรวจแบบฝึกหัด
                            </Text>
                        </View>
                    </Pressable>
                </Animated.View> */}
            </View>
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",


    },
    heading: {
        marginTop: 16,
        flexDirection: "row",
        marginHorizontal: 16,

    },
    boxHeadingActive: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.grey3
    },
    sectionActive: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        width: "100%",
        textAlign: "center",
    },
    section: {
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center",
    },
    studyContent: {
        marginHorizontal: 16,
        flex: 1,
        position: "relative",
    },
    boxButtonWhite: {
        height: "auto",
        width: "100%",
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: -15,
        },
        shadowOpacity: 0.58,
        /*   shadowRadius: 10.00, */
        elevation: 0,
        marginBottom: (deviceHeight != 844) ? 40 : 40,
        paddingHorizontal: 16
    },
    textHead: {
        marginTop: 24,
        fontSize: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textContent: {
        fontSize: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
    },

});

export default ArticleTemplate;