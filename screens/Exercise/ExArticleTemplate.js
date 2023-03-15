import React, { Component } from 'react'
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, AntDesign, Image, Text, Pressable, Animated } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { routeName } from "../../redux/personalUser";
import Mission from '../Nutrition/Mission';
import Modal from "react-native-modal";
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { List } from 'react-native-paper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { convertFormatDate, calculateWeekInProgram } from "../../helpers/utils";

//บทความ
import Ab1 from '../../components/exercise/Ab1';
import Ab2 from '../../components/exercise/Ab2';
import Cd1 from '../../components/exercise/Cd1';
import C2 from '../../components/exercise/C2';
import C3 from '../../components/exercise/C3';
import C4 from '../../components/exercise/C4';
import C5 from '../../components/exercise/C5';
import C6 from '../../components/exercise/C6';


const data = Array.from({ length: 3 });
const startData = Array.from({ length: 3 })

class ArticleTemplate extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {

            study: true,
            statusBarColor: "light",
            id: null,
            expanded: false,
            start: 1
        };
    }

    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission, route } = this.props;

        const { statusPags, id } = this.props.route.params;


        if (statusPags == "ExHistory") {
            this.setState({
                study: false
            })
        }
        this.setState({
            id: id
        })
        // this.props.routeName('null');
        const { mission_id } = this.props.route.params;
        console.log("mission_id", mission_id);

    }



    componentDidUpdate(prevProps, prevState) {
        const { nutrition_mission, user, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission } = this.props;
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



    toggleModal(e) {
        const { isModalVisible } = this.state;
        this.setState({
            isModalVisible: !isModalVisible
        })
        if (e === 'Report') {
            this.props.navigation.navigate("Report")
        } else {
            this.props.navigation.navigate("Quiz")
        }

    }

    renderCheckArticle() { //เช็คว่าจะแสดงบทความไหน โดยใช้ mission_id
        const { mission_id } = this.props.route.params;
        console.log("mission_id", mission_id);
        return (
            <View style={{ flex: 1, marginHorizontal: 16, }}>
                {(mission_id === '1ab') && <Ab1 />}
                {(mission_id === '1cd') && <Ab2 />}
                {(mission_id === '2ab') && <Cd1 />}
                {(mission_id === '2c') && <C2 />}
                {(mission_id === '3c') && <C3 />}
                {(mission_id === '4c') && <C4 />}
                {(mission_id === '5c') && <C5 />}
                {(mission_id === '6c') && <C6 />}
            </View>
        )
    }

    handlePress = () => {
        const { expanded } = this.state;
        this.setState({
            expanded: !expanded
        })
    };

    missionDataView() {
        const { expanded, start } = this.state
        const scoreProgress = 50;
        const deviceWidth = Math.round(Dimensions.get('window').width - 30);
        const multiple = 100 / 4;
        return (
            <View style={{ flex: 1, marginTop: 24, marginHorizontal: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.target}>เป้าหมายสัปดาห์นี้</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.score}>12</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.maxScore}>/15</Text>
                            <Image source={require('../../assets/images/icon/Firepoint.png')}
                                style={{ width: 12, height: 12, marginLeft: 4, marginTop: 8 }}
                            />
                        </View>

                    </View>
                </View>
                <View style={{ backgroundColor: colors.grey6, borderRadius: 4, marginTop: 8, zIndex: 1 }}>
                    <ProgressBarAnimated
                        width={deviceWidth}
                        value={scoreProgress}
                        height={24}
                        marginRight={150}
                        backgroundColor={colors.orange}
                        borderColor={colors.white}
                    />
                </View>
                <List.Section style={{ marginLeft: -16, marginTop: -8, zIndex: 0 }}>
                    <List.Accordion style={{ backgroundColor: colors.white }}
                        title={<Text style={styles.titleAccordion}>เกณฑ์การให้คะแนน</Text>}
                        right={props =>
                            <List.Icon {...props} icon={({ size, color, direction }) => (
                                expanded ?
                                    <Image
                                        source={require('../../assets/images/icon/ChevronUp.png')}
                                        style={{ width: 16, height: 16 }}
                                    />
                                    :
                                    <Image
                                        source={require('../../assets/images/icon/ChevronDown.png')}
                                        style={{ width: 16, height: 16 }}
                                    />
                            )}

                            />}
                        expanded={expanded}
                        onPress={this.handlePress}>
                        <View style={{ marginLeft: 16, backgroundColor: colors.grey7, paddingHorizontal: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.expand_answerText}>
                                กิจกรรมความเข้มข้นปานกลาง 1 ครั้ง
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginTop: 7 }}
                                />
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginLeft: 16, backgroundColor: colors.grey6, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.expand_answerText}>
                                Cardio 1 ครั้ง
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginTop: 7 }}
                                />
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginLeft: 16, backgroundColor: colors.grey7, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.expand_answerText}>
                                Core+Balance+plyo 1 ครั้ง
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginTop: 7 }}
                                />
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                />
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginLeft: 16, backgroundColor: colors.grey6, paddingHorizontal: 16, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, flexDirection: "row", justifyContent: "space-between", marginBottom: 24 }}>
                            <Text style={styles.expand_answerText}>
                                Resistance 1 ครั้ง
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginTop: 7 }}
                                />
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                />
                                <Image source={require('../../assets/images/icon/Firepoint.png')}
                                    style={{ width: 12, height: 12, marginLeft: 4, marginTop: 7 }}
                                />
                            </View>
                        </View>
                    </List.Accordion>
                </List.Section >
                <Text style={styles.challenge}>ชาเลนจ์</Text>
                {
                    data && data.map((item, i) => {
                        return (
                            <Pressable onPress={() => this.props.navigation.popToTop()} key={i + "tfb"}>
                                <View key={i} style={styles.row}>
                                    <View style={styles.numberView}>
                                        <AnimatedCircularProgress
                                            size={64}
                                            width={8}
                                            fill={multiple}
                                            tintTransparency={true}
                                            rotation={360}
                                            tintColor={colors.positive1}
                                            backgroundColor={colors.grey6} >
                                            {

                                                (fill) => (
                                                    <>
                                                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                            <Text style={{ color: colors.grey1, fontSize: 16, fontFamily: "IBMPlexSansThai-Bold", marginTop: 0 }}>2</Text>
                                                            <Text style={{ color: colors.grey1, fontSize: 14, fontFamily: "IBMPlexSansThai-Regular", marginTop: 4 }}> /4</Text>
                                                        </View>
                                                        <Text style={{ color: colors.grey2, fontSize: 16, fontFamily: "IBMPlexSansThai-Regular", marginTop: -10 }}>ครั้ง</Text>
                                                    </>
                                                )

                                            }
                                        </AnimatedCircularProgress>
                                    </View>
                                    <View style={styles.missionData}>
                                        <Text style={styles.missionHead}>กิจกรรมความเข้มข้นปานกลาง</Text>

                                        <View style={{ flexDirection: "row" }}>
                                            {
                                                startData && startData.map((item, i) => {
                                                    return (
                                                        <Image style={[i > 0 ? { marginLeft: 4 } : null, { width: 16, height: 16, marginTop: 8 }]} source={
                                                            start >= ++i ?
                                                                require('../../assets/images/icon/Firepoint.png')
                                                                :
                                                                require('../../assets/images/icon/Firepoint2.png')
                                                        } />
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.viewIconRight}>
                                        <Image
                                            style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                            source={require('../../assets/images/icon/right.png')}
                                        />
                                    </View>
                                </View>
                            </Pressable>
                        )
                    })
                }
            </View >
        )
    }


    render() {
        const { study, statusBarColor, id } = this.state;

        const { heading } = this.props.route.params;

        return (
            <View style={styles.container}>
                <View style={{ height: 44, zIndex: 10, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                    {
                        statusBarColor === "light" ?
                            <StatusBar barStyle="light-content" />
                            :
                            <StatusBar barStyle="dark-content" />
                    }
                </View>
                <View style={{ height: 48, zIndex: 3, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                    <View style={{ marginLeft: 16 }}>
                        <Pressable onPress={() => this.props.navigation.goBack()}>
                            <Image
                                source={statusBarColor === "light" ? require('../../assets/images/icon/chevron.png') : require('../../assets/images/icon/caret.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={ComponentsStyle.headBox}>
                    <View style={ComponentsStyle.areaNumber}>
                        <Text style={ComponentsStyle.areaNumberText}>
                            {id}
                        </Text>
                    </View>
                    <View style={ComponentsStyle.nutritionMission}>
                        <Text style={ComponentsStyle.missionHead}>ภารกิจออกกำลังกาย</Text>
                        <Text style={[ComponentsStyle.missionHeading, { marginRight: 32 }]}>{heading}</Text>
                    </View>
                </View>

                <Animated.View style={{
                    transform: [{
                        translateY: this.slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -180]
                        })
                    }],
                    flex: 1,
                    zIndex: 2,
                    marginTop: -10,
                    marginBottom: -300,

                }}>
                    <View style={[ComponentsStyle.contentBox]}>
                        <View style={styles.heading}>
                            <View style={study === true ? styles.boxHeadingActive : styles.boxHeading}>
                                <Pressable onPress={() => this.setState({
                                    study: true
                                })}>
                                    <Text style={study === true ? styles.sectionActive : styles.section}> ความรู้</Text>
                                </Pressable>
                            </View>
                            <View style={study !== true ? styles.boxHeadingActive : styles.boxHeading}>
                                <Pressable onPress={() => this.setState({
                                    study: false
                                })}>
                                    <Text style={study !== true ? styles.sectionActive : styles.section}> ภารกิจ</Text>
                                </Pressable>
                            </View>
                        </View>

                        <ScrollView onScroll={(event) => {
                            const scrolling = event.nativeEvent.contentOffset.y;
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
                                study ?
                                    this.renderCheckArticle()
                                    :
                                    this.missionDataView()

                            }

                        </ScrollView>
                    </View >
                </Animated.View >


                <View style={{ zIndex: 10, }}>
                    <Animated.View
                        style={{
                            transform: [{
                                translateY: this.slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 100]
                                })
                            }],
                            marginBottom: 0,
                            bottom: 0,
                            height: study == true ? 80 : 0,
                            paddingHorizontal: 16,
                            backgroundColor: colors.white,
                            // statusBarColor: "light"
                        }}
                    >

                        {
                            study ?
                                <Pressable onPress={() => this.props.navigation.navigate("Quiz")} >
                                    <View style={ComponentsStyle.button} >
                                        <Text style={ComponentsStyle.textButton}>
                                            ดูวีดีโอ
                                        </Text>
                                    </View>
                                </Pressable>
                                :
                                null
                        }
                    </Animated.View>
                </View>
            </View >
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

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
        borderColor: colors.grey4
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
    centeredView: {
        margin: 0,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",


    },
    modalView: {
        position: "relative",
        zIndex: 10,
        backgroundColor: "white",
        width: "100%",
        paddingHorizontal: 16,
        height: "auto",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        /*      marginTop: 0, */
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12
        },
        marginBottom: 0,
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24
    },
    imageGeneric: {
        marginTop: 22,
        position: "relative",
        width: 120,
        height: 120
    },
    modalText: {
        marginTop: 24,
        textAlign: "center",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    modalText2: {
        width: "90%",
        marginTop: 8,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
    },
    buttonView: {
        marginTop: 32,
        width: "100%",

    },
    buttonCross: {
        marginTop: 21,
        width: "100%",
        marginBottom: 40
    },
    textCross: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",
    },
    target: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.grey1,
    },
    score: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
        color: colors.grey1,
    },
    maxScore: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 12,
        color: colors.grey1,
        marginTop: 4
    },
    container2: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 50,
        padding: 15,
    },
    buttonContainer: {
        marginTop: 15,
    },
    separator: {
        marginVertical: 30,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
    },
    label: {
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    },
    expand_answerText: {
        fontSize: 14,
        color: colors.grey2,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    titleAccordion: {
        marginLeft: -30,
        fontSize: 16,
        color: colors.grey2,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    challenge: {
        marginTop: 0,
        zIndex: 3,
        fontSize: 16,
        color: colors.grey1,
        marginBottom: 8,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    row: {
        position: "relative",
        maxHeight: 170,
        height: "auto",
        marginBottom: 16,
        backgroundColor: colors.white,
        borderRadius: 16,
        flexDirection: "row",
        borderColor: colors.grey4,
        borderWidth: 1
    },
    numberView: {
        /*  marginRight: 8, */
        paddingVertical: 14,
        paddingLeft: 16
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.mayaBlue,

    },
    missionData: {
        /* marginHorizontal: 16, */
        flexWrap: "nowrap",
        width: "75%",
        margin: 16

    },
    missionHead: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    missionContent: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    iconRight: {
        fontSize: ComponentsStyle.fontSize24,
        color: colors.positive1,
        marginRight: 8,
    },
    viewIconRight: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",

    },
});

const mapStateToProps = ({ authUser, getData }) => {
    const { user } = authUser;
    const { nutrition_mission, statusGetNutritionMission, statusGetNutritionActivityIdMission, nutrition_activity_id_Mission } = getData;
    return { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, user };
};

const mapActionsToProps = { logoutUser, getNutritionMission, getNutritionActivityIdMission, routeName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ArticleTemplate));