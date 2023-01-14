import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

var radio_sex = [
    { label: 'ชาย   ', value: "ชาย" },
    { label: 'หญิง', value: "หญิง" }
];
var radio_exercise = [
    { label: 'ประจำ   ', value: "ประจำ" },
    { label: 'บางครั้ง   ', value: "บางครั้ง" },
    { label: 'ไม่เลย', value: "ไม่เลย" }
];
class PersonalData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: null, // เปิด-ปิด passWord
            age: null,
            exercise: null
        };
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
                console.log("กรุณาใส่เเค่ตัวเลข");
            }
        } else {
            this.setState({
                [fieldName]: text
            })
        }

    }


    render() {
        const { sex, age, exercise } = this.state;
        console.log('exercise', exercise);
        return (
            <SafeAreaView style={styles.container}>
               <View style={styles.areaView}>
                    <Text style={styles.textHead}>กรอกข้อมูลส่วนตัวเพื่อการคำนวณโปรแกรมที่แม่นยำ</Text>
                    <Text style={styles.textInputHead}>เพศ</Text>
                    <RadioForm
                        radio_props={radio_sex}
                        initial={sex}
                        formHorizontal={true}
                        buttonSize={15}
                        labelStyle={{ fontSize: 16, color: '#2A323C' }}
                        onPress={(value) => { this.handleChange("sex", value) }}
                    />
                    <Text style={styles.textInputHead}>อายุ</Text>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>ปี</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.handleChange("age", text)}
                            placeholder="ระบุอายุ"
                            value={age}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.textInputHead}>น้ำหนัก</Text>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>กิโลกรัม</Text>
                        <TextInput
                            style={styles.input}
                            /*  onChangeText={(text) => this.handleChange("password", text)} */
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.textInputHead}>ส่วนสูง</Text>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>เซนติเมตร</Text>
                        <TextInput
                            style={styles.input}
                            /*  onChangeText={(text) => this.handleChange("password", text)} */
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.textInputHead}>ออกกำลังกายบ่อยแค่ไหน</Text>
                    <RadioForm style={styles.radioStyle}
                        radio_props={radio_exercise}
                        initial={sex}
                        formHorizontal={true}
                        buttonSize={15}
                        labelStyle={{ fontSize: 16, color: '#2A323C' }}
                        onPress={(value) => { this.handleChange("exercise", value) }}
                    />
                </View>
                <View style={styles.areaViewButton}>
                    <Pressable style={styles.buttonBlue}  >
                        <Text style={styles.textButtonWhite}>ถัดไป</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    areaView: {
        padding:10,
        
    },
    textHead: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#2A323C"
    },
    textInputHead: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 16,
        color: "#2A323C",
    },
    viewRightTnput: {
        position: "relative",

    },
    input: {
        height: 56,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: "#93a8c1",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        position: "relative",

    },
    textRightTnput: {
        position: "absolute",
        fontSize: 16,
        textAlign: "right",
        paddingRight: 20,
        color: "#2A323C",
        marginTop: 16,
        zIndex: 1,
        right: 0
    },
    areaViewButton: {
        alignItems:"center",
        backgroundColor: "red",
        width:"100%",
       justifyContent:"flex-end",

    },
    buttonBlue: {
       
        marginTop:50,
        justifyContent:"flex-end",
        width: "90%",
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50,
      /*   marginBottom: 40, */
    },
    buttonGrey: {
        width: "90%",
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#C2D2E7',
        borderRadius: 24,
        height: 50,

    },
    textButtonWhite: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Prompt-Bold",
    },
    textButtonGrey: {
        color: "#93A8C1",
        fontSize: 16,
        fontFamily: "Prompt-Bold",
    }
});
export default PersonalData;