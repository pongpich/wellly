import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { personal, healt } from "../redux/personalUser";
import { connect } from 'react-redux';
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';
import { statusDiabetes, statusHypertension, statusResultsUser } from '../constants/functionComponents';

class OnboardingResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultsUser: null,
            diabetes: null, //โรคเบาหวาน
            hypertension: null, //ความดันสุง
            exercise: null  //ออกกำลังกาย
        };
    }
    componentDidMount() {
        const { fpg, hba1c, sbp, dbp, exercise } = this.props.healtDataUser; // การเรียงค่า  (fpg = mg/dL) ,(hba1c = mg) ,(sbp = mmHG), (dbp = mmHG)

        // เบาหวาน fpg, hba1c
        let stDi = statusDiabetes(fpg, hba1c)
        this.setState({
            diabetes: stDi.diabetes
        })



        // ความดัน sbp, dbp
        let stHy = statusHypertension(sbp, dbp)
        this.setState({
            hypertension: stHy.hypertension
        })

        this.setState({
            exercise: exercise
        })

    }

    componentDidUpdate(prevProps, prevState) {
        const { diabetes, hypertension, exercise } = this.state;
        if ((prevState.diabetes !== diabetes) && (prevState.hypertension !== hypertension) && (prevState.exercise !== exercise)) {
            let stRe = statusResultsUser(diabetes, hypertension, exercise)
            this.setState({
                resultsUser: stRe.resultsUser
            })
        }
    }

    onboarding_A1() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#22B967', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_A.png')} />
                        <Text style={styles.text_1}>{t('physical_health')}</Text>
                        <Pressable style={styles.buttonStatusA}>
                            <Text style={styles.textStatus}>{t('fine')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('diet_exercise_program')}</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Home")} >
                            <Text style={ComponentsStyle.textButton}>{t('get_advice')}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        )
    }
    onboarding_B1() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#D89E08', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusB1}>
                            <Text style={styles.textStatus}>{t('pre_diabetes')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('pre_diabetes_exercise_program')}</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={ComponentsStyle.textButton}>{t('get_advice')}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        )
    }

    onboarding_B2() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#D89E08', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusB2}>
                            <Text style={styles.textStatus}>{t('pre_diabetes_high_blood_pressure')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('pre_diabetes_high_blood_pressure_exercise_program')}</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Home")} >
                            <Text style={ComponentsStyle.textButton}>{t('get_advice')}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        )
    }

    onboarding_C1() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#F06A12', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_C.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusC1}>
                            <Text style={styles.textStatus}>{t('diabetes_mellitus')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('diabetes_mellitus_exercise_program')}</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Home")}>
                            <Text style={ComponentsStyle.textButton}>{t('get_advice')}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        )
    }
    onboarding_C2() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#F06A12', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_C.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusC2}>
                            <Text style={styles.textStatus}>{t('diabetes_high_blood_pressure')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('diabetes_high_blood_pressure_exercise_program')}</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Home")} >
                            <Text style={ComponentsStyle.textButton}>{t('get_advice')}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        )
    }

    onboarding_D1() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={styles.container}
                colors={['#D89E08', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusB1}>
                            <Text style={styles.textStatus}>{t('hypertension')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('hypertension_exercise_program')}</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.navigate("Home")} >
                            <Text style={ComponentsStyle.textButton}>{t('get_advice')}</Text>
                        </Pressable>
                    </View>
                </View>
            </LinearGradient>
        )
    }

    render() {
        const { resultsUser } = this.state;


        return (
            <>
                {
                    resultsUser && (resultsUser === "A1" || resultsUser === "A2") ?
                        this.onboarding_A1()
                        :
                        resultsUser && (resultsUser === "B1" || resultsUser === "B3") ?
                            this.onboarding_B1()
                            :
                            resultsUser && (resultsUser === "B2" || resultsUser === "B4") ?
                                this.onboarding_B2()
                                :
                                resultsUser && (resultsUser === "C1" || resultsUser === "C3") ?
                                    this.onboarding_C1()
                                    :
                                    resultsUser && (resultsUser === "C2" || resultsUser === "C4") ?
                                        this.onboarding_C2()
                                        :
                                        resultsUser && (resultsUser === "D1" || resultsUser === "D2") ?
                                            this.onboarding_D1()
                                            :
                                            null
                }
            </>
        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
    },
    areaView: {
        flex: 1,
        width: "100%",
    },
    areaViewIcon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -60,
    },
    text_1: {
        marginTop: 30,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    buttonStatusA: {
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 16,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.positive1,
        borderRadius: 24,
        height: 50
    },
    buttonStatusB1: {
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.warning1,
        borderRadius: 24,
        height: 50
    },
    buttonStatusB2: {
        width: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.warning1,
        borderRadius: 100,
        height: "auto",
        paddingTop: 10,


    },
    buttonStatusC1: {
        width: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.orange,
        borderRadius: 100,
        height: "auto",
        paddingTop: 10,


    },
    buttonStatusC2: {
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.orange,
        borderRadius: 24,
        height: 50
    },
    textStatus: {
        color: colors.white,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center"
    },
    areaViewText: {
        marginTop: 16,
        paddingHorizontal: 24,
        alignItems: "center",
    },
    text_2: {

        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        textAlign: "center"
    },
    areaViewButton: {
        /*  backgroundColor: "red", */
        paddingHorizontal: 16,
        justifyContent: "flex-end",
        marginBottom: 40,
        alignItems: "center"

    },



});


const mapStateToProps = ({ personalDataUser }) => {
    const { dataUser, healtDataUser } = personalDataUser;
    return { dataUser, healtDataUser };
};

const mapActionsToProps = { personal, healt };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(OnboardingResults));
