import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, ScrollView, Dimensions, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { Checkbox } from 'react-native-paper';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            checked: 'unchecked'
        };
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

    allSelectChoice(index, choice) {
        /*    const { user_id, week_in_program, missionId, allSelectChoice } = this.state;
           allSelectChoice.forEach((animal) => {
               if (animal.index == index) {
                   animal.select_choice = choice
               }
           })
           this.setState({
               allSelectChoice: allSelectChoice
           })
   
   
           let result = allSelectChoice && allSelectChoice.filter((member) => {
               return member.select_choice == null
           })
           this.setState({
               numberArray: result.length
           })
   
           this.props.update_quiz_activities(user_id, week_in_program, allSelectChoice, null); */

    }

    checkedBox(checked) {
        console.log("asd");
        if (checked === 'checked') {
            this.setState({
                checked: 'unchecked'
            });
        } else {
            this.setState({
                checked: 'checked'
            });
        }

    }

    render() {
        const { isFocused, checked } = this.state;
        console.log("checked", checked);
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.areaView}>
                    <Text style={styles.exercise}>การประเมิน</Text>
                    <Text style={styles.week}>สัปดาห์ที่ 1</Text>
                    <ScrollView>
                        <View>
                            <Text style={styles.question}>
                                1. คุณสามารถรับประทานอาหารได้ตามเป้าหมายการจัดจาน 2-1-1 (ผัก2 เนื้อและแป้ง อย่างละ 1)หรือไม่
                            </Text>
                            <View style={styles.quiz} >
                                <TouchableOpacity>
                                    <Image source={require('../../assets/images/icon/radioActive.png')} />
                                </TouchableOpacity>
                                <Text style={styles.responseView}>ทำได้อย่างสม่ำเสมอ</Text>
                            </View>
                            <View style={styles.quiz}>
                                <TouchableOpacity onPress={() => this.allSelectChoice("11", 'a')}  >
                                    <Image source={require('../../assets/images/icon/radio.png')} />
                                </TouchableOpacity>

                                <Text style={styles.responseView}>ทำได้อย่างสม่ำเสมอ</Text>
                            </View>
                            <View style={styles.quiz} >
                                <TouchableOpacity onPress={() => this.allSelectChoice("11", 'a')}  >
                                    <Image source={require('../../assets/images/icon/radio.png')} />
                                </TouchableOpacity>

                                <Text style={styles.responseView}>ทำได้อย่างสม่ำเสมอ</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.question}>
                                2. คุณทานอาหารหลังออกกำลังกาย ภายใน 30 นาที- 1 ชั่วโมงหรือไม่
                            </Text>
                            <View style={styles.quizView}>
                                <View style={styles.quiz} >
                                    <TouchableOpacity  >
                                        <Image source={require('../../assets/images/icon/radioActive.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.responseView} >ใช่</Text>
                                </View>
                                <View style={styles.quiz}>
                                    <TouchableOpacity onPress={() => this.allSelectChoice("11", 'a')}  >
                                        <Image source={require('../../assets/images/icon/radio.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.responseView}>ไม่</Text>
                                </View>
                            </View>
                            <View style={styles.input}>
                                <TextInput
                                    onFocus={(text) => this.handleFocus("isFocused", true)}
                                    onBlur={(text) => this.handleBlur("isFocused", false)}
                                    style={isFocused === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input}
                                    //  onChangeText={(text) => this.handleChange("mmHGD", text)}
                                    //placeholder="เล่นเสร็จทีไรร้านปิดทุกที"
                                    keyboardType="numeric"
                                    inputAccessoryViewID="textInput5"
                                /*      numberOfLines={4}
                                     multiline={true} */
                                // ref={(input) => { this.textInput5 = input; }}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.question}>
                                3. เลือกทำเครื่องหมาย ข้อที่คุณสามารถทำได้ก่อนออกกำลังกาย (เลือกได้มากกว่า 1 ข้อ)
                            </Text>
                            <View style={styles.quiz} >
                                <TouchableOpacity >
                                    <Image source={require('../../assets/images/icon/Checks.png')} />
                                </TouchableOpacity>
                                <Text style={styles.responseView} >ทำได้อย่างสม่ำเสมอ</Text>
                            </View>
                            <View style={styles.quiz} >
                                <TouchableOpacity onPress={() => this.allSelectChoice("11", 'a')} >
                                    <Image source={require('../../assets/images/icon/Checks.png')} />
                                </TouchableOpacity>

                                <Text style={styles.responseView} >ทำได้อย่างสม่ำเสมอ</Text>
                            </View>
                            <View style={styles.quiz} >
                                <TouchableOpacity onPress={() => this.allSelectChoice("11", 'a')} >
                                    <Image source={require('../../assets/images/icon/ChecksActive.png')} />
                                </TouchableOpacity>

                                <Text style={styles.responseView} >ทำได้อย่างสม่ำเสมอ</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.question}>
                                4. สิ่งใดเป็นปัจจัย และสาเหตุของการทานอาหารซ้ำ
                            </Text>
                            <View style={styles.input}>
                                <TextInput
                                    onFocus={(text) => this.handleFocus("isFocused", true)}
                                    onBlur={(text) => this.handleBlur("isFocused", false)}
                                    style={isFocused === true ? ComponentsStyle.inputIsFocused : ComponentsStyle.input}
                                    //  onChangeText={(text) => this.handleChange("mmHGD", text)}
                                    // placeholder="มันนัวเข้าเนื้อดี"
                                    keyboardType="numeric"
                                    inputAccessoryViewID="textInput5"
                                /*      numberOfLines={4}
                                     multiline={true} */
                                // ref={(input) => { this.textInput5 = input; }}
                                />
                            </View>
                        </View>
                        <View style={styles.viewSwitches}>

                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    areaView: {
        marginLeft: 16,
        marginRight: 16,
        flex: 1
    },
    exercise: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    week: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    question: {
        marginTop: 24,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    quiz: {
        marginTop: 16,
        flexDirection: "row"
    },
    quizView: {
        flexDirection: "row",
        paddingLeft: 16

    },
    pressableView: {
        marginTop: 32,
        marginBottom: 80,
    },
    responseView: {
        marginLeft: 8,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
        marginRight: 32
    },
    input: {
        marginLeft: 16,
        marginTop: 16
    },
    viewSwitches: {
        backgroundColor: colors.grey3,
        width: "100%",
        height: 40
    }
});

export default Report;