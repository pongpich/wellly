import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { healt } from "../redux/personalUser";
import { connect } from 'react-redux';
import ComponentsStyle from '../constants/components';
import colors from '../constants/colors';

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
        const { dataUser } = this.props;
        const exer = dataUser && dataUser.exercise;
        //  ออกกำลังกาย

        if (exer === "ประจำ") {
            this.setState({
                exercise: "Y"
            })
        } else {
            this.setState({
                exercise: "N"
            })
        }

    }
    componentDidUpdate(prevProps, prevState) {
        const { healtDataUser, dataUser } = this.props;
        const { mgDL, mg, bpm, mmHGS, mmHGD } = this.state;

        if (prevProps.healtDataUser !== healtDataUser) {
            this.props.navigation.navigate("OnboardingResults");
        }

        //เช็ค Variation
        if (prevState.mgDL != mgDL) {
            if ((mgDL < 4) || (mgDL > 1000)) {
                this.setState({
                    statusMdDl: false,
                    statusTextmg_dL: false
                })
            } else {
                this.setState({
                    statusMdDl: true,
                    statusTextmg_dL: true
                })
            }
        }

        if (prevState.mg != mg) {
            if ((mg < 3.5) || (mg > 19)) {
                this.setState({
                    statusMg: false,
                    statusTextMg: false,
                })
            } else {
                this.setState({
                    statusMg: true,
                    statusTextMg: true,
                })
            }
        }
        if (prevState.bpm != bpm) {
            if ((bpm < 40) || (bpm > 160)) {
                this.setState({
                    statusBpm: false,
                    statusTextBpm: false,
                })
            } else {
                this.setState({
                    statusBpm: true,
                    statusTextBpm: true,
                })
            }
        }
        if (prevState.mmHGS != mmHGS) {
            if ((mmHGS < 40) || (mmHGS > 190)) {
                this.setState({
                    statusTextMmHG1: false,
                    statusMmGH1: false,
                })
            } else {
                this.setState({
                    statusTextMmHG1: true,
                    statusMmGH1: true,
                })
            }
        }

        if (prevState.mmHGD != mmHGD) {
            if ((mmHGD < 40) || (mmHGD > 170)) {
                this.setState({
                    statusTextMmHG2: false,
                    statusMmGH2: false,
                })
            } else {
                this.setState({
                    statusTextMmHG2: true,
                    statusMmGH2: true,
                })
            }
        }





        //  เบาหวาน fpg
        if (prevState.mgDL !== mgDL) {
            if (mgDL <= 100) {
                this.setState({
                    fpg: "N"
                })
            } else if ((mgDL >= 101) && (mgDL <= 125)) {
                this.setState({
                    fpg: "Pre"
                })
            } else {
                this.setState({
                    fpg: "Y"
                })
            }
        }
        //  เบาหวาน hba1c
        if (prevState.mg !== mg) {
            if (mg <= 5.7) {
                this.setState({
                    hba1c: "N"
                })
            } else if ((mg >= 5.8) && (mg <= 6.4)) {
                this.setState({
                    hba1c: "Pre"
                })
            } else {
                this.setState({
                    hba1c: "Y"
                })
            }
        }

        //  คาวมดัน sbp
        if (prevState.mmHGS !== mmHGS) {
            if (mmHGS < 129) {
                this.setState({
                    sbp: "N"
                })
            } else {
                this.setState({
                    sbp: "Y"
                })
            }
        }
        //  คาวมดัน dbp

        if (prevState.mmHGD !== mmHGD) {
            if (mmHGD <= 84) {
                this.setState({
                    dbp: "N"
                })
            } else if (mmHGD >= 85) {
                this.setState({
                    dbp: "Y"
                })
            }
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
        const { isFocusedMgDL, isFocusedMg, isFocusedBpm, isFocusedMmHGS, isFocusedMmHGD } = this.state; //เรียงจาก input1 ไป input5
        //เช็คว่าปัจจุบันอยู่ input เท่าไหร่ และ สั่ง focus ตัวก่อนหน้า
        if (isFocusedMgDL) { }; //ไม่ต้องทำอะไรเพราะอยู่ inputตัวแรกสุด
        if (isFocusedMg) { this.textInput1.focus(); };
        if (isFocusedBpm) { this.textInput2.focus(); };
        if (isFocusedMmHGS) { this.textInput3.focus(); };
        if (isFocusedMmHGD) { this.textInput4.focus(); };
    }

    submit() {
        const { mgDL, mg, bpm, mmHGS, mmHGD, fpg, hba1c, sbp, dbp, exercise } = this.state;
        if ((mgDL < 4) || (mgDL > 1000)) {
            this.setState({
                statusMdDl: false,
                statusTextmg_dL: false
            })
        } else if ((mg < 3.5) || (mg > 19)) {
            this.setState({
                statusMg: false,
                statusTextMg: false,
            })
        } else if ((bpm < 40) || (bpm > 160)) {
            this.setState({
                statusBpm: false,
                statusTextBpm: false,
            })
        } else if ((mmHGS < 40) || (mmHGS > 190)) {
            this.setState({
                statusTextMmHG1: false,
                statusMmGH1: false,
            })
        } else if ((mmHGD < 40) || (mmHGD > 170)) {
            this.setState({
                statusTextMmHG2: false,
                statusMmGH2: false,
            })
        } else {
            this.props.healt(fpg, hba1c, sbp, dbp, exercise);
        }
    }

    render() {
        const { mgDL, mg, bpm, mmHGS, fpg, hba1c, sbp, dbp, exercise, mmHGD, statusMdDl, statusTextmg_dL, statusMg, statusTextMg, statusBpm,
            statusTextBpm, statusMmGH1, statusTextMmHG1, statusMmGH2, statusTextMmHG2,
            isFocusedMgDL, isFocusedMg, isFocusedBpm, isFocusedMmHGS, isFocusedMmHGD } = this.state;


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.areaView}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                        <ScrollView keyboardShouldPersistTaps="always">
                            <View style={styles.areaViewPag}>
                                <Text style={styles.textHead}>ข้อมูลสุขภาพ</Text>
                                <Text style={styles.textInputHead}>น้ำตาลในเลือด</Text>
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
                                                        <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextmg_dL === false ?
                                            <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 4 - 1000 mg/dlL.</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textInputHead}>ค่าน้ำตาลเฉลี่ยสะสมในเลือด (HbA1c)</Text>
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
                                                        <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }

                                    {
                                        statusTextMg === false ?
                                            <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 3.5 - 19 mg%</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textInputHead}>อัตราการเต้นของหัวใจขณะพัก</Text>
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
                                                        <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextBpm === false ?
                                            <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 40-160 bpm</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textHeadMmHG}>ความดันโลหิต</Text>
                                <Text style={styles.textInputHead}>Systolic (ค่าสูงสุด)</Text>
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
                                                        <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextMmHG1 === false ?
                                            <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 40 - 190 mmHG</Text>
                                            : null
                                    }

                                </View>
                                <Text style={styles.textInputHead}>Diastolic (ค่าต่ำสุด)</Text>
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
                                                        <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </InputAccessoryView>
                                    }
                                    {
                                        statusTextMmHG2 === false ?
                                            <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 40 - 170 mmHG</Text>
                                            : null
                                    }

                                </View>
                            </View>
                            <View style={styles.areaViewButton}>
                                {
                                    (mgDL !== null) && (mg !== null) && (bpm !== null) && (mmHGS !== null) && (mmHGD !== null) ?
                                        <Pressable style={ComponentsStyle.button} onPress={() => this.submit()} >
                                            <Text style={ComponentsStyle.textButton}>ถัดไป</Text>
                                        </Pressable>
                                        :
                                        <Pressable s style={ComponentsStyle.buttonGrey} /* onPress={() =>  this.props.navigation.navigate("OnboardingResults")} */ >
                                            <Text style={ComponentsStyle.textButtonGrey}>ถัดไป</Text>
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

const mapStateToProps = ({ personalDataUser }) => {
    const { healtDataUser, dataUser } = personalDataUser;
    return { healtDataUser, dataUser };
};

const mapActionsToProps = { healt };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(HealthData);