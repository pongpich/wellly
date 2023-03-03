import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Animated, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { getNutritionActivity } from "../../redux/get";



const data = Array.from({ length: 3 });
const startData = Array.from({ length: 3 });

class History extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            start: 2,
            trophy: 0
        };
    }




    render() {
        const { nutrition_activit } = this.props;
        const { start, trophy } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.marginBox}>
                    <Text style={styles.missionHistory}>ประวัติภารกิจ</Text>
                    <ScrollView>
                        {
                            data && data.map((item, i) => (
                                //ส่ง params ผ่าน route
                                <Pressable onPress={() => this.props.navigation.navigate("ExArticleTemplate", { id: i, statusPags: "ExHistory" })} key={i + "fee"}>
                                    <View key={i} style={styles.row}>
                                        <View style={styles.numberView}>
                                            <Text style={styles.number}>{++i}</Text>
                                        </View>
                                        <View style={styles.missionData}>
                                            <Text style={styles.missionHead}>Body Pump</Text>
                                            <Text style={styles.missionContent}>
                                                โปรแกรมออกกำลังกายลดความเสี่ยงโรคเบาหวาน
                                            </Text>
                                            <View style={{ flexDirection: "row" }}>
                                                {
                                                    trophy == 1 ?
                                                        <Image style={{ width: 24, height: 24, marginTop: 8 }} source={require('../../assets/images/icon/Trophy.png')} />
                                                        :
                                                        startData && startData.map((item, i) => {
                                                            return (
                                                                <Image style={[i > 0 ? { marginLeft: 4 } : null, { width: 16, height: 16, marginTop: 8 }]} source={
                                                                    start >= ++i ?
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
                                            <AntDesign name="check" style={styles.iconRight} />
                                        </View>
                                    </View>
                                </Pressable>
                            ))
                        }
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

})
const mapStateToProps = ({ personalDataUser, authUser, getData }) => {
    const { number } = personalDataUser;
    const { user } = authUser;
    const { statusGetNutritionActivity, nutrition_activity } = getData;
    return { number, statusGetNutritionActivity, nutrition_activity, user };
};

const mapActionsToProps = { getNutritionActivity };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(History);