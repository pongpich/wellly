import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, Button, ScrollView } from 'react-native';
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
            exercise: null,  //ออกกำลังกาย
            popupShow: false,
            selectedRef: ''
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

    onboarding_A1() { //A1, A2 ปกติ
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
                        <Image style={{ width: 120, height: 120 }} source={require('../assets/images/icon/generic_A.png')} />
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
    onboarding_B1() { //B1, B3 ก่อนเบาหวาน
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
                        <Image style={{ width: 120, height: 120 }} source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusB1}>
                            <Text style={styles.textStatus}>{t('pre_diabetes')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('pre_diabetes_exercise_program')}</Text>
                        </View>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{'Ref. (อ้างอิง)'}</Text>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'diabetes' })}>
                                <Text style={styles.text_3}>{'- ภาวะเบาหวาน (type 2 diabetes)'}</Text>
                            </Pressable>
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

    onboarding_B2() { //B2, B4 ก่อนเบาหวาน และความดันสูง
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
                        <Image style={{ width: 120, height: 120 }} source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusB2}>
                            <Text style={styles.textStatus}>{t('pre_diabetes_high_blood_pressure')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('pre_diabetes_high_blood_pressure_exercise_program')}</Text>
                        </View>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{'Ref. (อ้างอิง)'}</Text>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'diabetes' })}>
                                <Text style={styles.text_3}>{'- ภาวะเบาหวาน (type 2 diabetes)'}</Text>
                            </Pressable>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'hypertension' })}>
                                <Text style={styles.text_3}>{'- ภาวะความดันสูง (Hypertension)'}</Text>
                            </Pressable>
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

    onboarding_C1() { //C1, C3 เบาหวาน
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
                        <Image style={{ width: 120, height: 120 }} source={require('../assets/images/icon/generic_C.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusC1}>
                            <Text style={styles.textStatus}>{t('diabetes_mellitus')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('diabetes_mellitus_exercise_program')}</Text>
                        </View>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{'Ref. (อ้างอิง)'}</Text>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'diabetes' })}>
                                <Text style={styles.text_3}>{'- ภาวะเบาหวาน (type 2 diabetes)'}</Text>
                            </Pressable>
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
    onboarding_C2() { //C2, C4 เบาหวาน และความดันสูง
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
                        <Image style={{ width: 120, height: 120 }} source={require('../assets/images/icon/generic_C.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusC2}>
                            <Text style={styles.textStatus}>{t('diabetes_high_blood_pressure')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('diabetes_high_blood_pressure_exercise_program')}</Text>
                        </View>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{'Ref. (อ้างอิง)'}</Text>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'diabetes' })}>
                                <Text style={styles.text_3}>{'- ภาวะเบาหวาน (type 2 diabetes)'}</Text>
                            </Pressable>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'hypertension' })}>
                                <Text style={styles.text_3}>{'- ภาวะความดันสูง (Hypertension)'}</Text>
                            </Pressable>
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

    onboarding_D1() { //D1, D2 ความดันสูง
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
                        <Image style={{ width: 120, height: 120 }} source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>{t('you_tend')}</Text>
                        <Pressable style={styles.buttonStatusB1}>
                            <Text style={styles.textStatus}>{t('hypertension')}</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{t('hypertension_exercise_program')}</Text>
                        </View>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>{'Ref. (อ้างอิง)'}</Text>
                            <Pressable onPress={() => this.setState({ popupShow: true, selectedRef: 'hypertension' })}>
                                <Text style={styles.text_3}>{'- ภาวะความดันสูง (Hypertension)'}</Text>
                            </Pressable>
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
        const { resultsUser, popupShow, selectedRef } = this.state;
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
                <Modal
                    transparent={true}
                    visible={popupShow}
                >
                    <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                        <ScrollView style={{ backgroundColor: "#ffffff", margin: 30, padding: 20, borderRadius: 10, flex: 1 }} showsVerticalScrollIndicator={false}>
                            {
                                (selectedRef === 'diabetes') &&
                                <Text style={{
                                    fontSize: ComponentsStyle.fontSize16,
                                    fontFamily: "IBMPlexSansThai-Regular",
                                }}>
                                    Description:{'\n'}
                                    To diagnose type 2 Diabetes and prediabetes ; in the ADA’s Standards of Care in Diabetes—2023, Type 2 diabetes is usually diagnosed using the glycated hemoglobin (A1C) test. This blood test indicates your average blood sugar level for the past two to three months. Results are interpreted as follows:{'\n'}
                                    * Below 5.7% is normal.{'\n'}
                                    * 5.7% to 6.4% is diagnosed as prediabetes.{'\n'}
                                    * 6.5% or higher on two separate tests indicates diabetes.{'\n'}
                                    If the A1C test isn't available, or if you have certain conditions that interfere with an A1C test, your doctor may use the following tests to diagnose diabetes:{'\n'}
                                    - Random blood sugar test. Blood sugar values are expressed in milligrams of sugar per deciliter (mg/dL) or millimoles of sugar per liter (mmol/L) of blood. Regardless of when you last ate, a level of 200 mg/dL (11.1 mmol/L) or higher suggests diabetes.{'\n'}
                                    - Fasting blood sugar test. A blood sample is taken after an overnight fast. Results are interpreted as follows:{'\n'}
                                    * Less than 100 mg/dL (5.6 mmol/L) is normal.{'\n'}
                                    * 100 to 125 mg/dL (5.6 to 6.9 mmol/L) is diagnosed as prediabetes.{'\n'}
                                    * 126 mg/dL (7 mmol/L) or higher on two separate tests is diagnosed as diabetes. {'\n'}
                                    {'\n'}
                                    Ref. (อ้างอิง){'\n'}
                                    ElSayed, N. A., Aleppo, G., Aroda, V. R., Bannuru, R. R., Brown, F. M., Bruemmer, D., Collins, B. S., Hilliard, M. E., Isaacs, D., Johnson, E. L., Kahan, S., Khunti, K., Leon, J., Lyons, S. K., Perry, M. L., Prahalad, P., Pratley, R. E., Seley, J. J., Stanton, R. C., Gabbay, R. A., … on behalf of the American Diabetes Association (2023). 2. Classification and Diagnosis of Diabetes: Standards of Care in Diabetes-2023. Diabetes care, 46(Suppl 1), S19–S40.{'\n'}
                                    {'\n'}
                                </Text>
                            }
                            {
                                (selectedRef === 'hypertension') &&
                                <Text style={{
                                    fontSize: ComponentsStyle.fontSize16,
                                    fontFamily: "IBMPlexSansThai-Regular",
                                }}>
                                    Description:{'\n'}
                                    Blood pressure should be measured at every routine clinical care visit; patients found to have an elevated blood pressure (≥140/90 mm Hg) should have blood pressure confirmed using multiple readings, including measurements on a separate day, to diagnose hypertension; in the ADA’s Standards of Care in Diabetes—2023, hypertension was redefined as a blood pressure ≥130/80 mm Hg{'\n'}
                                    {'\n'}
                                    Ref. (อ้างอิง){'\n'}
                                    ElSayed, N. A., Aleppo, G., Aroda, V. R., Bannuru, R. R., Brown, F. M., Bruemmer, D., Collins, B. S., Das, S. R., Hilliard, M. E., Isaacs, D., Johnson, E. L., Kahan, S., Khunti, K., Kosiborod, M., Leon, J., Lyons, S. K., Perry, M. L., Prahalad, P., Pratley, R. E., Seley, J. J., … American Diabetes Association (2023). Erratum. 10. Cardiovascular disease and risk management: Standards of Care in Diabetes-2023. Diabetes Care 2023;46(Suppl. 1):S158-S190. Diabetes care, dc23er04. Advance online publication.{'\n'}
                                    {'\n'}
                                </Text>
                            }
                        </ScrollView>
                        <View style={styles.areaViewButton}>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.setState({ popupShow: false })}  >
                                <Text style={ComponentsStyle.textButton}>{'ปิด'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
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
    text_3: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        textAlign: "center",
        textDecorationLine: 'underline'
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
