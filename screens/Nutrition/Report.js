import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, ScrollView, Dimensions, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native-switch';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            checked: 'unchecked',
            switchOn: false,
            numberArray: 0
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
        const { isFocused, switchOn, numberArray } = this.state;

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
                        <View style={[styles.viewSwitches, switchOn === true ? { backgroundColor: colors.positive3 } : null]}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={[styles.switchesTextHead, switchOn === true ? { color: colors.positive1 } : null]}>ยืนยันคำตอบ</Text>
                                <Switch
                                    value={switchOn}
                                    onValueChange={(value) => this.setState({ switchOn: value })}
                                    backgroundActive={colors.positive1}
                                    backgroundInactive={colors.grey4}
                                    style={styles.switch}
                                    renderActiveText={false}
                                    renderInActiveText={false}
                                    innerCircleStyle={{ alignItems: "center", justifyContent: "center" }}
                                    circleSize={30}
                                    barHeight={35}
                                    switchLeftPx={2.5}
                                    switchRightPx={2.5}
                                    switchWidthMultiplier={2}
                                    switchBorderRadius={30}
                                    circleBorderWidth={0}

                                />
                            </View>
                            <Text style={styles.switchesTexConter}>คำตอบจะมีผลต่อภารกิจถัดไป โดยเมื่อส่งแล้วจะไม่สามารถมาแก้ไขได้</Text>
                        </View>
                        {numberArray == 0 ?
                            <Pressable onPress={() => this.allSelectChoiceSubmit()}>
                                <View style={styles.pressableView}>
                                    <View style={ComponentsStyle.button}>
                                        <Text style={ComponentsStyle.textButton}>
                                            ส่งคำตอบ
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                            :
                            <Pressable>
                                <View style={styles.pressableView}>
                                    <View style={ComponentsStyle.buttonGrey}>
                                        <Text style={ComponentsStyle.textButtonGrey}>
                                            ส่งคำตอบ
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        }
                    </ScrollView>
                </View >
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white,
    },
    areaView: {
        marginLeft: 16,
        marginRight: 16,
        flex: 1,

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
        marginTop: 24,
        backgroundColor: colors.grey6,
        width: "100%",
        height: "auto",
        borderRadius: 16,
        padding: 16,
    },
    switchesTextHead: {
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    switchesTexConter: {
        width: "80%",
        color: colors.neutralGrey3,
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
    },
});

export default Report;