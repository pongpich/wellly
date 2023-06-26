import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Animated, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { getNutritionActivity } from "../../redux/get";
import { checkStar, checkTrophy } from "../../helpers/utils";
import { t } from 'i18next';
import i18next from 'i18next';


const data = Array.from({ length: 3 });
const startData = Array.from({ length: 3 });

class History extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            exerciserActivity: null
        };
    }


    componentDidMount() {
        const { exerciserActivity } = this.props;

        this.setState({
            exerciserActivity: exerciserActivity,
        })




    }

    substringText(text) {
        const startIndex = 0;
        let endIndex = 0;
        //วนลูปเพื่อทดลอง Text ว่าแต่ละอันควรกำหนด endIndex เป็นเท่าไหร่ เพื่อให้ได้ความกว้าง 59 ตัวอักษรแบบไม่นับสระที่อยู่ด้านบน กับ ด้านล่าง
        for (let i = 0; i < text.length; i++) {
            const substring1 = text.substring(startIndex, i);
            let consonants = substring1.match(/[ก-ฮ ะาเแโใไำ]/g);
            if (consonants) {
                //ความกว้างที่เหมาะสมคือ 59 โดยไม่นับพวกสระที่อยู่ด้านบน,ล่างของพยัญชนะ เพราะไม่เพิ่มความกว้างข้อความ
                if (consonants.length === 59) {
                    endIndex = i;
                }
                //ถ้าวนลูปรอบสุดท้ายแล้วยังไม่ได้ 59 ก็ให้กำหนดความยาว i เลย
                if ((i >= (text.length - 1)) && (consonants.length < 59)) {
                    endIndex = i;
                }
            }
        }
        const substring2 = text.substring(startIndex, endIndex);
        return substring2 + "...";
    };




    render() {
        const { start, trophy, exerciserActivity } = this.state;
        /* console.log("exerciserActivity", exerciserActivity); */
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.marginBox}>
                    <Text style={styles.missionHistory}>{t('mission_history')}</Text>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ marginBottom: 60 }}>

                            {
                                exerciserActivity && exerciserActivity.map((item, i) => {

                                    const activities_level = JSON.parse(item.activities_level)
                                    const mission_activities = JSON.parse(item.mission_activities)
                                    const week_in_program = item.week_in_program;
                                    mission_activities.forEach((animal) => {
                                        animal.week_in_program = item.week_in_program
                                    })
                                    activities_level.forEach((animal) => {
                                        animal.week_in_program = item.week_in_program
                                    })

                                    return (
                                        //ส่ง params ผ่าน route
                                        <Pressable onPress={() => this.props.navigation.navigate("ExArticleTemplate", { id: item.week_in_program, mission_id: item.mission_id, heading: (i18next.language === 'th') ? item.heading : item.heading_eng, mission_activities: item.mission_activities, statusPags: "ExHistory" })} key={i + "fee"}>
                                            <View key={i} style={[styles.row, item.read == null && { backgroundColor: colors.white }]}>
                                                <View style={styles.numberView}>
                                                    <Text style={styles.number}>{item.week_in_program}</Text>
                                                </View>
                                                <View style={styles.missionData}>
                                                    <Text style={styles.missionHead}>{(i18next.language === 'th') ? item.heading : item.heading_eng}</Text>
                                                    <Text style={styles.missionContent}>
                                                        {this.substringText((i18next.language === 'th') ? item.short_content : item.short_content_eng)}
                                                    </Text>
                                                    <View style={{ flexDirection: "row" }}>
                                                        {

                                                            item.read == null ?
                                                                <View style={styles.notifiedRed}>
                                                                    <Text style={styles.notifiedTextRed}>
                                                                        {t('no_read')}
                                                                    </Text>
                                                                </View>
                                                                :
                                                                checkTrophy(mission_activities, activities_level) == 1 ?
                                                                    <Image style={{ width: 24, height: 24, marginTop: 8 }} source={require('../../assets/images/icon/Trophy.png')} />
                                                                    :
                                                                    startData && startData.map((item, i) => {
                                                                        return (
                                                                            <Image style={[i > 0 ? { marginLeft: 4 } : null, { width: 16, height: 16, marginTop: 8 }]} source={
                                                                                checkStar(mission_activities, activities_level) >= ++i ?
                                                                                    require('../../assets/images/icon/Star_3.png')
                                                                                    :
                                                                                    require('../../assets/images/icon/Star.png')
                                                                            } />
                                                                        )
                                                                    })
                                                        }
                                                    </View>
                                                </View>
                                                <View style={styles.viewIconRight}>
                                                    {item.read == null ? <Image
                                                        style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                        source={require('../../assets/images/icon/right.png')}
                                                    /> : <AntDesign name="check" style={styles.iconRight} />}

                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey7
    },
    marginBox: {
        marginHorizontal: 16
    },
    missionHistory: {
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        marginBottom: 16,
    },
    row: {
        position: "relative",
        maxHeight: 170,
        height: "auto",
        marginBottom: 16,
        backgroundColor: colors.grey6,
        borderRadius: 16,
        flexDirection: "row",


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
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.persianBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.persianBlue20,
        marginTop: 16,
        marginLeft: 16,
        marginBottom: 16,
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
    notifiedRed: {
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: 25,
        borderRadius: 16,
        backgroundColor: colors.negative2,
        paddingHorizontal: 8,
        paddingVertical: 3,

    },
    notifiedTextRed: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.negative1,
    },

})
const mapStateToProps = ({ personalDataUser, authUser, getData }) => {
    const { number } = personalDataUser;
    const { user } = authUser;
    const { statusGetNutritionActivity, nutrition_activity, exerciserActivity } = getData;
    return { number, statusGetNutritionActivity, nutrition_activity, exerciserActivity, user };
};

const mapActionsToProps = { getNutritionActivity };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(History);