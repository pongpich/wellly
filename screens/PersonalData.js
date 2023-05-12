import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Dimensions, Modal, InputAccessoryView, Button, Keyboard } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { personal } from "../redux/personalUser";
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';
import { validatePersonalAge, validatePersonalWeight, validatePersonalHeight } from '../constants/functionComponents';
import { updatePersonalData } from "../redux/auth";
import { withTranslation } from 'react-i18next';

/* import { Button } from 'react-native-paper'; */

class PersonalData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: null, // เปิด-ปิด passWord
            age: null,
            weight: null,
            height: null,
            exercise: null,
            statusAge: true,
            statusTextAge: null,
            statusWeight: true,
            statusTextWeight: null,
            statusHeight: true,
            statusTextHeight: null,
            isFocusedAge: false,
            isFocusedWeight: false,
            isFocusedHeight: false,
        };
    }

    componentDidMount() {
        const { user } = this.props;
        const personal_data = user && user.personal_data;

        /*   if (personal_data) {
              this.props.navigation.navigate("HealthData");
          } */
    }

    componentDidUpdate(prevProps, prevState) {
        const { sex, age, weight, height, exercise, statusAge } = this.state;
        const { dataUser, statusUpdatePersonalData } = this.props;


        // เช็ค ค่าที่กรอก age, weight, height,
        // อายุ
        if (prevState.age !== age) {
            let vaData = validatePersonalAge(age);
            this.setState({
                statusAge: vaData.statusAge,
                statusTextAge: vaData.statusTextAge
            })
        }

        // น้ำหนัก
        if (prevState.weight !== weight) {
            let vaData = validatePersonalWeight(weight);
            this.setState({
                statusWeight: vaData.statusWeight,
                statusTextWeight: vaData.statusTextWeight
            })
        }

        // ส่วนสุง
        if (prevState.height !== height) {
            validatePersonalHeight
            let vaData = validatePersonalHeight(height);
            this.setState({
                statusHeight: vaData.statusHeight,
                statusTextHeight: vaData.statusTextHeight
            })

        }

        if ((prevProps.statusUpdatePersonalData !== statusUpdatePersonalData) && (statusUpdatePersonalData === "success")) {
            this.props.navigation.navigate("HealthData");
        }


    }

    handleChange(fieldName, text) {

        if (fieldName === "age") {
            let reg = /^([a-z0-9])+$/i;
            if (reg.test(text)) {
                this.setState({
                    [fieldName]: text
                })

            } else {
                this.setState({
                    [fieldName]: null
                })
            }
        } else {
            this.setState({
                [fieldName]: text
            })
        }
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
        const { isFocusedAge, isFocusedWeight, isFocusedHeight } = this.state; //เรียงจาก input1 ไป input3
        //เช็คว่าปัจจุบันอยู่ input เท่าไหร่ และ สั่ง focus ไปตัวถัดไป
        if (isFocusedAge) { this.textInput2.focus(); };
        if (isFocusedWeight) { this.textInput3.focus(); };
        if (isFocusedHeight) { }; //ไม่ต้องทำอะไรเพราะอยู่ inputตัวสุดท้ายแล้ว
    }

    onPreviousInput() {
        const { isFocusedAge, isFocusedWeight, isFocusedHeight } = this.state; //เรียงจาก input1 ไป input3
        //เช็คว่าปัจจุบันอยู่ input เท่าไหร่ และ สั่ง focus ตัวก่อนหน้า
        if (isFocusedAge) { }; //ไม่ต้องทำอะไรเพราะอยู่ inputตัวแรกสุด
        if (isFocusedWeight) { this.textInput1.focus(); };
        if (isFocusedHeight) { this.textInput2.focus(); };
    }

    submit() {
        const { sex, age, weight, height, exercise, statusAge, statusWeight, statusHeight } = this.state;
        const { user } = this.props;

        if ((age !== "") && (age !== null) && (weight !== "") && (weight !== null) && (height !== "") && (height !== null) && (statusAge == true) && statusWeight == true && statusHeight == true) {
            const personal_data = {
                sex: sex,
                age: age,
                weight: weight,
                height: height,
                frequency_of_exercise: exercise,
            }
            this.props.personal(sex, age, weight, height, exercise);
            this.props.updatePersonalData((user && user.user_id), personal_data)
        }

    }

    render() {
        const { sexIndex, sex, age, weight, height, exercise, statusAge, statusTextAge, statusWeight, statusTextWeight, statusHeight, statusTextHeight,
            isFocusedAge, isFocusedWeight, isFocusedHeight } = this.state;
        const { t } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, width: "100%" }}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
                        <ScrollView style={styles.areaView} showsVerticalScrollIndicator={false}>
                            <View>
                                <Text style={styles.textHead}>{t('personal_information')}</Text>
                                <Text style={styles.textInputHead}>{t('sex')}</Text>
                                <View style={styles.radioFormView}>
                                    <View style={styles.radioFormIcon}>
                                        <TouchableWithoutFeedback onPress={() => this.handleFocus("sex", "male")}>
                                            <Image
                                                style={styles.iconRadio}
                                                source={(sex == "ชาย") || (sex == "male") ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                            />
                                        </TouchableWithoutFeedback>

                                        <Text style={styles.radioFormText}>{t('man')}</Text>
                                    </View>
                                    <View style={styles.radioFormIcon2}>
                                        <TouchableWithoutFeedback onPress={() => this.handleFocus("sex", "female")}>
                                            <Image
                                                style={styles.iconRadio}
                                                source={(sex == "หญิง") || (sex == "female") ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                            />
                                        </TouchableWithoutFeedback>
                                        <Text style={styles.radioFormText}>{t('female')}</Text>
                                    </View>
                                </View>

                                <Text style={styles.textInputHead}>{t('age')}</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>{t('year')}</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedAge", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedAge", false)}
                                        style={statusAge === true ? isFocusedAge === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}

                                        onChangeText={(text) => this.handleChange("age", text)}
                                        placeholder={t('specify_age')}
                                        value={age}
                                        keyboardType="number-pad"
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
                                        statusTextAge === 0 ?
                                            <Text style={ComponentsStyle.textError}>{t('please_fill_truth')}</Text> :
                                            statusTextAge === 1 ?
                                                <Text style={ComponentsStyle.textError}>{t('age_between_18_65')}</Text>
                                                : null
                                    }
                                </View>
                                <Text style={styles.textInputHead}>{t('weight')}</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>{t('kg')}</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedWeight", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedWeight", false)}
                                        style={statusWeight === true ? isFocusedWeight === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("weight", text)}
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
                                        statusTextWeight === 0 ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_1')}</Text>
                                            :
                                            statusTextWeight === 1 ?
                                                <Text style={ComponentsStyle.textError}>{t('weight_between_30_250')}</Text>
                                                : null
                                    }


                                </View>
                                <Text style={styles.textInputHead}>{t('height')}</Text>
                                <View style={styles.viewRightTnput}>
                                    <Text style={styles.textRightTnput}>{t('cm')}</Text>
                                    <TextInput
                                        onFocus={(text) => this.handleFocus("isFocusedHeight", true)}
                                        onBlur={(text) => this.handleBlur("isFocusedHeight", false)}
                                        style={statusHeight === true ? isFocusedHeight === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}
                                        onChangeText={(text) => this.handleChange("height", text)}
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
                                        statusTextHeight === 0 ?
                                            <Text style={ComponentsStyle.textError}>{t('please_enter_value_100')}</Text>
                                            :
                                            statusTextHeight === 1 ?
                                                <Text style={ComponentsStyle.textError}>{t('height_between_100_280')}</Text>
                                                : null
                                    }


                                </View>
                                <Text style={styles.textInputHead}>{t('often_exercise')}</Text>
                                <View style={styles.radioFormView}>
                                    <View style={styles.radioFormIcon}>
                                        <TouchableWithoutFeedback onPress={() => this.handleFocus("exercise", "always")}>
                                            <Image
                                                style={styles.iconRadio}
                                                source={exercise == "always" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                            />
                                        </TouchableWithoutFeedback>

                                        <Text style={styles.radioFormText}>{t('regular')}</Text>
                                    </View>
                                    <View style={styles.radioFormIcon2}>
                                        <TouchableWithoutFeedback onPress={() => this.handleFocus("exercise", "sometimes")}>
                                            <Image
                                                style={styles.iconRadio}
                                                source={exercise == "sometimes" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                            />
                                        </TouchableWithoutFeedback>
                                        <Text style={styles.radioFormText}>{t('sometimes')}</Text>
                                    </View>
                                    <View style={styles.radioFormIcon2}>
                                        <TouchableWithoutFeedback onPress={() => this.handleFocus("exercise", "not at all")}>
                                            <Image
                                                style={styles.iconRadio}
                                                source={exercise == "not at all" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                            />
                                        </TouchableWithoutFeedback>
                                        <Text style={styles.radioFormText}>{t('not_all')}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.areaViewButton}>
                                {
                                    (sex !== null) && (age !== null) && (weight !== null) && (height !== null) && (exercise !== null) ?
                                        <Pressable style={ComponentsStyle.button} onPress={() => this.submit()} >
                                            <Text style={ComponentsStyle.textButton}>{t('next')}</Text>
                                        </Pressable>
                                        :
                                        <Pressable s style={ComponentsStyle.buttonGrey} /* onPress={() =>  this.props.navigation.navigate("HealthData")} */ >
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
                            nextDisabled={isFocusedHeight}
                            previousDisabled={isFocusedAge}
                        />
                    }
                </View>
            </SafeAreaView >
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    inputAccessory: {
        width: Dimensions.get('window').width,
        height: 42,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F3F7FB',
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
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },

    areaView: {

        flex: 1,
        paddingHorizontal: 16,
        width: "100%",
        /*    height: "100%" */
    },
    scrollView: {
        flex: 1,
        justifyContent: "space-between"
    },

    textHead: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey1,
        marginBottom: 24
    },
    textInputHead: {
        marginTop: 24,
        marginBottom: 8,
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold"
    },
    viewRightTnput: {
        position: "relative",

    },
    radioFormView: {
        flexDirection: 'row',
    },
    radioForm: {
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    radioFormIcon: {
        flexDirection: 'row',
    },
    radioFormIcon2: {
        flexDirection: 'row',
        marginLeft: 24
    },
    iconRadio: {
        marginRight: 8,
        width: 24,
        height: 24
    },
    radioFormText: {
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
    },

    textRightTnput: {
        position: "absolute",
        fontSize: ComponentsStyle.fontSize16,
        textAlign: "right",
        paddingRight: 20,
        color: colors.grey1,
        marginTop: 16,
        zIndex: 1,
        right: 0,
        fontFamily: "IBMPlexSansThai-Regular"
    },
    areaViewButton: {
        justifyContent: 'flex-end',
        marginTop: 49,
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 40,
    },
});



const mapStateToProps = ({ personalDataUser, authUser }) => {
    const { dataUser, username } = personalDataUser;
    const { user, statusUpdatePersonalData } = authUser;
    return { dataUser, username, user, statusUpdatePersonalData };
};

const mapActionsToProps = { personal, updatePersonalData };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(PersonalData));