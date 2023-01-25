import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Button, Keyboard } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { personal } from "../redux/personalUser";
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux'
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';
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

    componentDidUpdate(prevProps, prevState) {
        const { sex, age, weight, height, exercise, statusAge } = this.state;
        const { dataUser } = this.props;


        // เช็ค ค่าที่กรอก age, weight, height,
        // อายุ
        if (prevState.age !== age) {
            if ((age == 1)) {
                this.setState({
                    statusAge: false,
                    statusTextAge: 0
                })
            } else if ((age < 18) || (age > 65)) {
                this.setState({
                    statusAge: false,
                    statusTextAge: 1
                })
            } else {
                this.setState({
                    statusAge: true,
                    statusTextAge: null
                })
            }
        }

        // น้ำหนัก
        if (prevState.weight !== weight) {
            if (weight == 0) {
                this.setState({
                    statusWeight: false,
                    statusTextWeight: 0
                })
            } else if ((weight < 30) || (weight > 250)) {
                this.setState({
                    statusWeight: false,
                    statusTextWeight: 1
                })
            } else {
                this.setState({
                    statusWeight: true,
                    statusTextWeight: null
                })
            }
        }

        // ส่วนสุง
        if (prevState.height !== height) {
            console.log("height", height);
            if (height == 1) {
                this.setState({
                    statusHeight: false,
                    statusTextHeight: 0
                })
            } else if ((height < 99) || (height > 281)) {
                this.setState({
                    statusHeight: false,
                    statusTextHeight: 1
                })
            } else {
                this.setState({
                    statusHeight: true,
                    statusTextHeight: null
                })
            }
        }




        if (prevProps.dataUser !== dataUser) {
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

    submit() {
        const { sex, age, weight, height, exercise } = this.state;
        if ((age === null) || (age === "null")) {
            this.setState({
                statusAge: false,
                statusTextAge: 0
            })
        } else if ((age < 18) || (age > 65)) {
            this.setState({
                statusAge: false,
                statusTextAge: 1
            })
        } else if ((weight === null) || (weight === "")) {
            this.setState({
                statusWeight: false,
                statusTextWeight: 0
            })
        } else if ((weight < 30) || (weight > 250)) {
            this.setState({
                statusWeight: false,
                statusTextWeight: 1
            })
        } else if ((height === null) || (height === "")) {
            this.setState({
                statusHeight: false,
                statusTextHeight: 0
            })
        } else if ((height < 100) || (height > 280)) {
            this.setState({
                statusHeight: false,
                statusTextHeight: 1
            })

        } else {
            this.setState({
                statusAge: true,
                statusTextAge: null,
                statusWeight: true,
                statusTextWeight: null,
                statusHeight: true,
                statusTextHeight: null,
                info: ""
            });
            this.props.personal(sex, age, weight, height, exercise);
        }
    }

    render() {
        const { sexIndex, sex, age, weight, height, exercise, statusAge, statusTextAge, statusWeight, statusTextWeight, statusHeight, statusTextHeight,
            isFocusedAge, isFocusedWeight, isFocusedHeight } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                    <ScrollView style={styles.areaView} keyboardShouldPersistTaps="always">
                        <View>
                            <Text style={styles.textHead}>กรอกข้อมูลส่วนตัวเพื่อการคำนวณโปรแกรมที่แม่นยำ</Text>
                            <Text style={styles.textInputHead}>เพศ</Text>
                            <View style={styles.radioFormView}>
                                <View style={styles.radioFormIcon}>
                                    <TouchableOpacity onPress={() => this.handleFocus("sex", "ชาย")}>
                                        <Image
                                            style={styles.iconRadio}
                                            source={sex == "ชาย" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                        />
                                    </TouchableOpacity>

                                    <Text style={styles.radioFormText}>ชาย</Text>
                                </View>
                                <View style={styles.radioFormIcon2}>
                                    <TouchableOpacity onPress={() => this.handleFocus("sex", "หญิง")}>
                                        <Image
                                            style={styles.iconRadio}
                                            source={sex == "หญิง" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.radioFormText}>หญิง</Text>
                                </View>
                            </View>

                            <Text style={styles.textInputHead}>อายุ</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>ปี</Text>
                                <TextInput
                                    onFocus={(text) => this.handleFocus("isFocusedAge", true)}
                                    onBlur={(text) => this.handleBlur("isFocusedAge", false)}
                                    style={statusAge === true ? isFocusedAge === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input : ComponentsStyle.inputError}

                                    onChangeText={(text) => this.handleChange("age", text)}
                                    placeholder="ระบุอายุ"
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
                                                    <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </InputAccessoryView>
                                }
                                {
                                    statusTextAge === 0 ?
                                        <Text style={ComponentsStyle.textError}>กรุณากรอกตามความเป็นจริง</Text> :
                                        statusTextAge === 1 ?
                                            <Text style={ComponentsStyle.textError}>โปรแกรมรองรับผู้ใช้ที่มีอายุระหว่าง 18-65 ปี เท่านั้น</Text>
                                            : null
                                }
                            </View>
                            <Text style={styles.textInputHead}>น้ำหนัก</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>กิโลกรัม</Text>
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
                                                    <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </InputAccessoryView>
                                }
                                {
                                    statusTextWeight === 0 ?
                                        <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 1 ขึ้นไป</Text>
                                        :
                                        statusTextWeight === 1 ?
                                            <Text style={ComponentsStyle.textError}>โปรแกรมรองรับผู้ใช้ที่มีน้ำหนักระหว่าง 30-250  กิโลกรัม เท่านั้น</Text>
                                            : null
                                }


                            </View>
                            <Text style={styles.textInputHead}>ส่วนสูง</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>เซนติเมตร</Text>
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
                                                    <Text style={styles.textDoneButton}>เสร็จ</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </InputAccessoryView>
                                }
                                {
                                    statusTextHeight === 0 ?
                                        <Text style={ComponentsStyle.textError}>กรุณากรอกค่าตั้งแต่ 100 ขึ้นไป</Text>
                                        :
                                        statusTextHeight === 1 ?
                                            <Text style={ComponentsStyle.textError}>โปรแกรมรองรับผู้ใช้ที่มีส่วนสูงระหว่าง 100-280 {"\n"}เซนติเมตร เท่านั้น</Text>
                                            : null
                                }


                            </View>
                            <Text style={styles.textInputHead}>ออกกำลังกายบ่อยแค่ไหน</Text>
                            <View style={styles.radioFormView}>
                                <View style={styles.radioFormIcon}>
                                    <TouchableOpacity onPress={() => this.handleFocus("exercise", "ประจำ")}>
                                        <Image
                                            style={styles.iconRadio}
                                            source={exercise == "ประจำ" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                        />
                                    </TouchableOpacity>

                                    <Text style={styles.radioFormText}>ประจำ</Text>
                                </View>
                                <View style={styles.radioFormIcon2}>
                                    <TouchableOpacity onPress={() => this.handleFocus("exercise", "บางครั้ง")}>
                                        <Image
                                            style={styles.iconRadio}
                                            source={exercise == "บางครั้ง" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.radioFormText}>บางครั้ง</Text>
                                </View>
                                <View style={styles.radioFormIcon2}>
                                    <TouchableOpacity onPress={() => this.handleFocus("exercise", "ไม่เลย")}>
                                        <Image
                                            style={styles.iconRadio}
                                            source={exercise == "ไม่เลย" ? require('../assets/images/icon/radioActive.png') : require('../assets/images/icon/radio.png')}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.radioFormText}>ไม่เลย</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.areaViewButton}>
                            {
                                (sex !== null) && (age !== null) && (weight !== null) && (height !== null) && (exercise !== null) ?
                                    <Pressable style={ComponentsStyle.button} onPress={() => this.submit()} >
                                        <Text style={ComponentsStyle.textButton}>ถัดไป</Text>
                                    </Pressable>
                                    :
                                    <Pressable s style={ComponentsStyle.buttonGrey} /* onPress={() =>  this.props.navigation.navigate("HealthData")} */ >
                                        <Text style={ComponentsStyle.textButtonGrey}>ถัดไป</Text>
                                    </Pressable>
                            }
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);
console.log("deviceHeight", deviceHeight);
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
        fontWeight: "bold",
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
        marginRight: 8
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



const mapStateToProps = ({ personalDataUser }) => {
    const { dataUser, username } = personalDataUser;
    return { dataUser, username };
};

const mapActionsToProps = { personal };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(PersonalData);