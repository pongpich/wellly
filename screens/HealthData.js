import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { healt } from "../redux/personalUser";
import { connect } from 'react-redux';
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';
import { updateHealthData } from "../redux/auth";
import { withTranslation } from 'react-i18next';
import { validateMgDL, validateMg, validateBpm, validateMmHGS, validateMmHGD, statusFpg, statusHba1c, statusSbp, statusDbp, statusExercise } from '../constants/functionComponents';

class HealthData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mgDL: null,
            mg: null,
            bpm: null,
            mmHGS: null,
            mmHGD: null,
            statusMdDl: true,
            statusTextmg_dL: true,
            statusMg: true,
            statusTextMg: true,
            statusBpm: true,
            statusTextBpm: true,
            statusMmGH1: true,
            statusTextMmHG1: true,
            statusMmGH2: true,
            statusTextMmHG2: true,
            fpg: null,
            hba1c: null,
            sbp: null,
            dbp: null,
            exercise: null,
            isFocusedMgDL: false,
            isFocusedMg: false,
            isFocusedBpm: false,
            isFocusedMmHGS: false,
            isFocusedMmHGD: false,

        };
    }
    componentDidMount() {
        const { dataUser, user } = this.props;
        const exer = dataUser && dataUser.exercise;
        //  ออกกำลังกาย

        let st = statusExercise(exer);
        this.setState({
            exercise: st.exercise
        })

        const health_data = user && user.personal_data;
        if (health_data) {
            this.props.navigation.navigate("Home");
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { healtDataUser, dataUser, statusUpdateHealthData } = this.props;
        const { mgDL, mg, bpm, mmHGS, mmHGD } = this.state;

        if ((prevProps.statusUpdateHealthData !== statusUpdateHealthData) && (statusUpdateHealthData === "success")) {
            this.props.navigation.navigate("OnboardingResults");
        }

        //เช็ค Variation
        if (prevState.mgDL != mgDL) {
            let va = validateMgDL(mgDL)
            this.setState({
                statusMdDl: va.statusMdDl,
                statusTextmg_dL: va.statusTextmg_dL
            })
        }

        if (prevState.mg != mg) {
            let va = validateMg(mg)
            this.setState({
                statusMg: va.statusMg,
                statusTextMg: va.statusTextMg
            })
        }

        if (prevState.bpm != bpm) {
            let va = validateBpm(bpm);
            this.setState({
                statusBpm: va.statusBpm,
                statusTextBpm: va.statusTextBpm,
            })
        }

        if (prevState.mmHGS != mmHGS) {
            let va = validateMmHGS(mmHGS)
            this.setState({
                statusMmGH1: va.statusMmGH1,
                statusTextMmHG1: va.statusTextMmHG1,
            })
        }

        if (prevState.mmHGD != mmHGD) {
            let va = validateMmHGD(mmHGD)
            this.setState({
                statusMmGH2: va.statusMmGH2,
                statusTextMmHG2: va.statusTextMmHG2
            })
        }





        //  เบาหวาน fpg
        if (prevState.mgDL !== mgDL) {
            let st = statusFpg(mgDL);
            this.setState({
                fpg: st.fpg
            })
        }
        //  เบาหวาน hba1c
        if (prevState.mg !== mg) {
            let st = statusHba1c(mg)
            this.setState({
                hba1c: st.hba1c
            })

        }

        //  คาวมดัน sbp
        if (prevState.mmHGS !== mmHGS) {
            let st = statusSbp(mmHGS)
            this.setState({
                sbp: st.sbp
            })
        }
        //  คาวมดัน dbp

        if (prevState.mmHGD !== mmHGD) {
            let st = statusDbp(mmHGD)
            this.setState({
                dbp: st.dbp
            })
        }

    }

    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    handleFocus = (fieldName, text) => {
        this.setState({
            [fieldName]: text
        })
    }
    handleBlur = (fieldName, text) => {
        this.setState({
            [fieldName]: text
        })
    }

    onNextInput() {
        const { isFocusedMgDL, isFocusedMg, isFocusedBpm, isFocusedMmHGS, isFocusedMmHGD } = this.state; //เรียงจาก input1 ไป input5
        //เช็คว่าปัจจุบันอยู่ input เท่าไหร่ และ สั่ง focus ไปตัวถัดไป
        if (isFocusedMgDL) { this.textInput2.focus(); };
        if (isFocusedMg) { this.textInput3.focus(); };
        if (isFocusedBpm) { this.textInput4.focus(); };
        if (isFocusedMmHGS) { this.textInput5.focus(); };
        if (isFocusedMmHGD) { }; //ไม่ต้องทำอะไรเพราะอยู่ inputตัวสุดท้ายแล้ว
    }

    onPreviousInput() {
        const { isFocusedMgDL, isFocusedMg, isFocusedBpm, isFocusedMmHGS, isFocusedMmHGD, statusMmGH1, statusMmGH2 } = this.state; //เรียงจาก input1 ไป input5
        //เช็คว่าปัจจุบันอยู่ input เท่าไหร่ และ สั่ง focus ตัวก่อนหน้า
        if (isFocusedMgDL) { }; //ไม่ต้องทำอะไรเพราะอยู่ inputตัวแรกสุด
        if (isFocusedMg) { this.textInput1.focus(); };
        if (isFocusedBpm) { this.textInput2.focus(); };
        if (isFocusedMmHGS) { this.textInput3.focus(); };
        if (isFocusedMmHGD) { this.textInput4.focus(); };
    }

    submit() {
        const { user } = this.props;
        const { mgDL, mg, bpm, mmHGS, mmHGD, fpg, hba1c, sbp, dbp, exercise, statusMdDl, statusMg, statusBpm, statusMmGH1, statusMmGH2 } = this.state;

        if ((mgDL !== null) && (mgDL !== "") && (mg !== null) && (mg !== "") && (bpm !== null) && (bpm !== "") && (mmHGS !== null) && (mmHGS !== "") && (mmHGD !== null) && (mmHGD !== "") &&
            (statusMdDl === true) && (statusMg === true) && (statusBpm === true) && (statusMmGH1 === true) && (statusMmGH2)) {
            this.props.healt(fpg, hba1c, sbp, dbp, exercise);

            const health_data = {
                blood_glucose: `${mgDL} mg/dL`, //น้ำตาลในเลือด
                hbA1C: `${mg} mg%`, //ค่าน้ำตาลเฉลี่ยสะสมในเลือด
                rhr: `${bpm} bpm`, //อัตราการเต้นของหัวใจขณะพัก
                blood_pressure_systolic: `${mmHGS} mmHG`, //ความดันเลือด - ค่าสูงสุด
                blood_pressure_diastolic: `${mmHGD} mmHG`, //ความดันเลือด - ค่าต่ำสุด
            }
            console.log("health_data :", health_data);
            this.props.updateHealthData((user && user.user_id), health_data)
        }
    }

    render() {
        const { mgDL, mg, bpm, mmHGS, fpg, hba1c, sbp, dbp, exercise, mmHGD, statusMdDl, statusTextmg_dL, statusMg, statusTextMg, statusBpm,
            statusTextBpm, statusMmGH1, statusTextMmHG1, statusMmGH2, statusTextMmHG2,
            isFocusedMgDL, isFocusedMg, isFocusedBpm, isFocusedMmHGS, isFocusedMmHGD } = this.state;
        const { t } = this.props;


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.areaView}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                        <ScrollView keyboardShouldPersistTaps="always">
                            <View style={styles.areaViewPag}>
                                <Text style={styles.textHead}>{t('health_information')}</Text>
                                <Text style={styles.textInputHead}>{t('blood_sugar')}</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>mg/dL</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedMgDL", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedMgDL", false)}
                                        style={statusMdDl === true ? isFocusedMgDL === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("mgDL", text)}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        inputAccessoryViewID="textInput1"
                                        ref={(input) => { this.textInput1 = input; }}
                                    />
                                    {
                                        (Platform.OS === 'ios') &&
                                        <InputAccessoryView nativeID="textInput1" >
                                            <View style={styles.inputAccessory}>
                                                <View style={styles.chevronIcon}>
                                                    <Feather name="chevron-up" size={24} color={colors.grey4} style={{ marginRight: 16 }} />
                                                    <Feather name="chevron-down" size={24} color={colors.persianBlue} onPress={() => { this.textInput2.focus(); }} />
                                                </View>
                                                <View>
                                                    <Pressable onPress={Keyboard.dismiss} >
                                                        <Text style={styles.textDoneButton}>{t('finish')}</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextmg_dL === false ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_4_1000')}</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textInputHead}>{t('mean_cumulative_blood_sugar')} (HbA1c)</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>mg%</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedMg", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedMg", false)}
                                        style={statusMg === true ? isFocusedMg === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("mg", text)}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        inputAccessoryViewID="textInput2"
                                        ref={(input) => { this.textInput2 = input; }}
                                    />
                                    {
                                        (Platform.OS === 'ios') &&
                                        <InputAccessoryView nativeID="textInput2" >
                                            <View style={styles.inputAccessory}>
                                                <View style={styles.chevronIcon}>
                                                    <Feather name="chevron-up" size={24} color={colors.persianBlue} style={{ marginRight: 16 }} onPress={() => { this.textInput1.focus(); }} />
                                                    <Feather name="chevron-down" size={24} color={colors.persianBlue} onPress={() => { this.textInput3.focus(); }} />
                                                </View>
                                                <View>
                                                    <Pressable onPress={Keyboard.dismiss} >
                                                        <Text style={styles.textDoneButton}>{t('finish')}</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }

                                    {
                                        statusTextMg === false ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_3_5_19')}</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textInputHead}>{t('heart_rate')}</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>bpm</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedBpm", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedBpm", false)}
                                        style={statusBpm === true ? isFocusedBpm === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("bpm", text)}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        inputAccessoryViewID="textInput3"
                                        ref={(input) => { this.textInput3 = input; }}
                                    />
                                    {
                                        (Platform.OS === 'ios') &&
                                        <InputAccessoryView nativeID="textInput3" >
                                            <View style={styles.inputAccessory}>
                                                <View style={styles.chevronIcon}>
                                                    <Feather name="chevron-up" size={24} color={colors.persianBlue} style={{ marginRight: 16 }} onPress={() => { this.textInput2.focus(); }} />
                                                    <Feather name="chevron-down" size={24} color={colors.persianBlue} onPress={() => { this.textInput4.focus(); }} />
                                                </View>
                                                <View>
                                                    <Pressable onPress={Keyboard.dismiss} >
                                                        <Text style={styles.textDoneButton}>{t('finish')}</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextBpm === false ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_40_160')}</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textHeadMmHG}>{t('blood_pressure')}</Text>
                                <Text style={styles.textInputHead}>Systolic ({t('maximum_value')})</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>mmHG</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedMmHGS", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedMmHGS", false)}
                                        style={statusMmGH1 === true ? isFocusedMmHGS === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("mmHGS", text)}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        inputAccessoryViewID="textInput4"
                                        ref={(input) => { this.textInput4 = input; }}
                                    />

                                    {
                                        (Platform.OS === 'ios') &&
                                        <InputAccessoryView nativeID="textInput4" >
                                            <View style={styles.inputAccessory}>
                                                <View style={styles.chevronIcon}>
                                                    <Feather name="chevron-up" size={24} color={colors.persianBlue} style={{ marginRight: 16 }} onPress={() => { this.textInput3.focus(); }} />
                                                    <Feather name="chevron-down" size={24} color={colors.persianBlue} onPress={() => { this.textInput5.focus(); }} />
                                                </View>
                                                <View>
                                                    <Pressable onPress={Keyboard.dismiss} >
                                                        <Text style={styles.textDoneButton}>{t('finish')}</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextMmHG1 === false ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_40_190')}</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textInputHead}>Diastolic ({t('lowest_value')})</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>mmHG</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedMmHGD", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedMmHGD", false)}
                                        style={statusMmGH2 === true ? isFocusedMmHGD === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("mmHGD", text)}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        inputAccessoryViewID="textInput5"
                                        ref={(input) => { this.textInput5 = input; }}
                                    />

                                    {
                                        (Platform.OS === 'ios') &&
                                        <InputAccessoryView nativeID="textInput5" >
                                            <View style={styles.inputAccessory}>
                                                <View style={styles.chevronIcon}>
                                                    <Feather name="chevron-up" size={24} color={colors.persianBlue} style={{ marginRight: 16 }} onPress={() => { this.textInput4.focus(); }} />
                                                    <Feather name="chevron-down" size={24} color={colors.grey4} />
                                                </View>
                                                <View>
                                                    <Pressable onPress={Keyboard.dismiss} >
                                                        <Text style={styles.textDoneButton}>{t('finish')}</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextMmHG2 === false ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_40_170')}</Text>
                                            : null
                                    }

                                </View>
                            </View>
                            <View style={styles.areaViewButton}>
                                {
                                    (mgDL !== null) && (mg !== null) && (bpm !== null) && (mmHGS !== null) && (mmHGD !== null) ?
                                        <Pressable style={ComponentsStyle.button} onPress={() => this.submit()} >
                                            <Text style={ComponentsStyle.textButton}>{t('next')}</Text>
                                        </Pressable>
                                        :
                                        <Pressable s style={ComponentsStyle.buttonGrey}  >
                                            <Text style={ComponentsStyle.textButtonGrey}>{t('next')}</Text>
                                        </Pressable>
                                }
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                    {
                        (Platform.OS === "android") &&
                        <KeyboardAccessoryNavigation
                            androidAdjustResize
                            doneButtonTitle="เสร็จ"
                            onNext={() => this.onNextInput()}
                            onPrevious={() => this.onPreviousInput()}
                            nextDisabled={isFocusedMmHGD}
                            previousDisabled={isFocusedMgDL}
                        />
                    }
                </View>
            </SafeAreaView >
        )
    }
}


const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
    },
    inputAccessory: {
        width: Dimensions.get('window').width,
        height: 42,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.grey7,
        paddingHorizontal: 16
    },
    chevronIcon: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start'
    },
    textDoneButton: {
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16
    },
    areaView: {
        flex: 1,
        width: "100%",
    },
    areaViewPag: {
        paddingHorizontal: 16
    },
    textHead: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey1
    },
    textHeadMmHG: {
        marginTop: 24,
        marginBottom: -16,
        fontSize: ComponentsStyle.fontSize20,
        color: colors.persianBlue,
        fontFamily: "IBMPlexSansThai-Bold"
    },
    textInputHead: {
        marginTop: 24,
        marginBottom: 8,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
    },
    viewRightTnput: {
        position: "relative",

    },

    textRightTnput: {
        position: "absolute",
        fontSize: ComponentsStyle.fontSize16,
        textAlign: "right",
        paddingRight: 20,
        color: colors.grey1,
        marginTop: 16,
        zIndex: 1,
        right: 0
    },
    areaViewButton: {
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
        marginTop: 49,
        marginBottom: 40,
        width: "100%",
        alignItems: "center",
    },
});

const mapStateToProps = ({ personalDataUser, authUser }) => {
    const { healtDataUser, dataUser } = personalDataUser;
    const { user, statusUpdateHealthData } = authUser;
    return { healtDataUser, dataUser, user, statusUpdateHealthData };
};

const mapActionsToProps = { healt, updateHealthData };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(HealthData));