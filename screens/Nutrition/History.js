import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Animated, ScrollView, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { getNutritionActivity } from "../../redux/get";
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';



const data = Array.from({ length: 3 });

class History extends Component {





    render() {
        const { nutrition_activity } = this.props;
        const { t } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.marginBox}>
                    <Text style={styles.missionHistory}>{t('mission_history')}</Text>
                    <ScrollView  showsVerticalScrollIndicator={false}>
                        {
                            nutrition_activity && nutrition_activity.map((item, i) => (
                                //ส่ง params ผ่าน route
                                <Pressable onPress={() => this.props.navigation.navigate("ArticleTemplate", { id: item.week_in_program, mission_id: item.mission_id, heading: item.heading })} key={i + "fee"}>
                                    <View key={i} style={styles.row}>
                                        <View style={styles.numberView}>
                                            <Text style={styles.number}>{item.week_in_program}</Text>
                                        </View>
                                        <View style={styles.missionData}>
                                            <Text style={styles.missionHead}>{(i18next.language === 'th') ? item.heading : item.heading_eng}</Text>
                                            <Text style={styles.missionContent}>
                                                {item.short_content}
                                            </Text>
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
            </SafeAreaView >
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
        color: colors.secondary_MayaBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.neutralGrey,
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
)(withTranslation()(History));