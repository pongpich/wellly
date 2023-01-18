import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { personal } from "../redux/personalUser";
import { connect } from 'react-redux'


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
        const { dataUser } = this.props;
        if (prevProps.dataUser !==  dataUser) {
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
         console.log("handleFocus",fieldName, text);
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
                statusTextHeight: null
            });
            this.props.personal(sex, age, weight, height, exercise); 

        }

    }

    render() {
        const { sex, age, weight, height, exercise, statusAge, statusTextAge, statusWeight, statusTextWeight, statusHeight, statusTextHeight,
            isFocusedAge,isFocusedWeight ,isFocusedHeight} = this.state;
        console.log("isFocusedAge",isFocusedAge);
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
                           onFocus={(text) => this.handleFocus("isFocusedAge", true)}
                           onBlur={(text) => this.handleBlur("isFocusedAge", false)}
                            style={statusAge === true ? isFocusedAge === true ? styles.inputIsFocused: styles.input : styles.inputError}
                           
                            onChangeText={(text) => this.handleChange("age", text)}
                            placeholder="ระบุอายุ"
                            value={age}
                            keyboardType="numeric"
                        />
                        {
                            statusTextAge === 0 ?
                                <Text style={styles.errorText}>กรุณากรอกตามความเป็นจริง</Text> :
                                statusTextAge === 1 ?
                                    <Text style={styles.errorText}>โปรแกรมรองรับผู้ใช้ที่มีอายุระหว่าง 18-65 ปี เท่านั้น</Text>
                                    : null
                        }


                    </View>
                    <Text style={styles.textInputHead}>น้ำหนัก</Text>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>กิโลกรัม</Text>
                        <TextInput
                         onFocus={(text) => this.handleFocus("isFocusedWeight", true)}
                         onBlur={(text) => this.handleBlur("isFocusedWeight", false)}
                            style={statusWeight === true ?  isFocusedWeight === true ? styles.inputIsFocused: styles.input  : styles.inputError}
                            onChangeText={(text) => this.handleChange("weight", text)}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                        {
                            statusTextWeight === 0 ?
                                <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 1 ขึ้นไป</Text>
                                :
                                statusTextWeight === 1 ?
                                    <Text style={styles.errorText}>โปรแกรมรองรับผู้ใช้ที่มีน้ำหนักระหว่าง 30-250  {"\n"}กิโลกรัม เท่านั้น</Text>
                                    : null
                        }


                    </View>
                    <Text style={styles.textInputHead}>ส่วนสูง</Text>
                    <View style={styles.viewRightTnput}>
                        <Text style={styles.textRightTnput}>เซนติเมตร</Text>
                        <TextInput
                          onFocus={(text) => this.handleFocus("isFocusedHeight", true)}
                          onBlur={(text) => this.handleBlur("isFocusedHeight", false)}
                            style={statusHeight === true ? isFocusedHeight === true ? styles.inputIsFocused: styles.input  : styles.inputError}
                            onChangeText={(text) => this.handleChange("height", text)}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                        {
                            statusTextHeight === 0 ?
                                <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 100 ขึ้นไป</Text>
                                :
                                statusTextHeight === 1 ?
                                    <Text style={styles.errorText}>โปรแกรมรองรับผู้ใช้ที่มีส่วนสูงระหว่าง 100-280 {"\n"}เซนติเมตร เท่านั้น</Text>
                                    : null
                        }


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
                    {
                        (sex !== null) && (age !== null) && (weight !== null) && (height !== null) && (exercise !== null) ?
                            <Pressable style={styles.buttonBlue} onPress={() => this.submit()} >
                                <Text style={styles.textButtonWhite}>ถัดไป</Text>
                            </Pressable>
                            :
                            <Pressable s style={styles.buttonGrey} /* onPress={() =>  this.props.navigation.navigate("HealthData")} */ >
                                <Text style={styles.textButtonGrey}>ถัดไป</Text>
                            </Pressable>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    areaView: {
        padding: 10,
        width:"100%",

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
    inputIsFocused: {
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#3762FC",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        position: "relative",
        alignContent: "center"
    },
    inputError: {
        height: 56,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: "#D43A3A",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        position: "relative",

    },
    errorText: {
        color: "#D43A3A",
        alignItems: "flex-start",
        fontFamily: "Prompt-Light"
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
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 50,
        width: "100%",
        alignItems: "center",
    },
    buttonBlue: {
        justifyContent: "flex-end",
        width: "90%",
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50,
        marginBottom: 20,
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
        marginBottom: 20,
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



const mapStateToProps = ({ personalDataUser }) => {
    const { dataUser,username } = personalDataUser;
    return { dataUser,username };
  };
  
  const mapActionsToProps = { personal };
  
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(PersonalData);