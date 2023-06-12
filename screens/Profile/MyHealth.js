import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Animated, StatusBar, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback, Button } from 'react-native';
import ComponentsStyle from '../../constants/components';
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate } from "../../redux/get";
import colors from '../../constants/colors';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

class MyHealth extends Component {

    render() {

        const { user } = this.props;
        console.log("user", user);

        const healthData = user && (typeof user.health_data === 'string' ? JSON.parse(user.health_data) : user.health_data)
        const personal_data = user && (typeof user.personal_data === 'string' ? JSON.parse(user.personal_data) : user.personal_data)
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.headText}>{t('personal')}</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('sex')}</Text>
                        <Text style={styles.subject}>{personal_data.sex = "male" ? `${t('man')}` : `${t('female')}`}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('age')}</Text>
                        <Text style={styles.subject}>{personal_data.age}  {t('year')}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('weight')}</Text>
                        <Text style={styles.subject}>{personal_data.weight}  {t('kg')}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('height')}</Text>
                        <Text style={styles.subject}>{personal_data.height}  {t('cm')}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('often_exercise')}</Text>
                        <Text style={styles.subject}>{personal_data.frequency_of_exercise == "always" ? `${t('regular')}` : personal_data.frequency_of_exercise == "sometimes" ? `${'sometimes'}` : `${t('not_all')}`}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={styles.line2} />
                    <Text style={styles.headText}>{t('personal')}</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('blood_sugar')}</Text>
                        <Text style={styles.subject}>{healthData.blood_glucose}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('mean_cumulative_blood_sugar')} (HbA1c)</Text>
                        <Text style={styles.subject}>{healthData.hbA1C}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>{t('heart_rate')}</Text>
                        <Text style={styles.subject}>{healthData.rhr}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <Text style={[styles.topic, { marginLeft: 16, marginBottom: 8 }]}>{t('blood_pressure')}</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>Systolic ({t('upper_value')})</Text>
                        <Text style={styles.subject}>{healthData.blood_pressure_systolic}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16, marginBottom: 40 }}>
                        <Text style={styles.topic}>Diastolic ({t('lower_value')})</Text>
                        <Text style={styles.subject}>{healthData.blood_pressure_diastolic}</Text>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    headText: {
        marginHorizontal: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
        marginBottom: 16
    },
    topic: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16
    },
    subject: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16
    },

    line: {
        paddingHorizontal: 16,
        width: "100%",

    },
    line1: {
        marginTop: 16,
        width: "100%",
        height: 1,
        backgroundColor: colors.grey6,
        marginBottom: 16,
    },
    line2: {
        marginTop: 24,
        width: "100%",
        height: 8,
        backgroundColor: colors.grey6,
        marginBottom: 24,
    },
});


const mapStateToProps = ({ authUser }) => {
    const { user, statusDeleteAcc } = authUser;

    return { user, statusDeleteAcc };
};

const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(MyHealth));

