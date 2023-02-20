import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, ScrollView, Dimensions, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { logoutUser } from "../../redux/auth";
import { getNutritionMission, getNutritionActivityIdMission } from "../../redux/get";
import Carbohydrate from '../../components/knowledge/Carbohydrate';
import { connect } from 'react-redux';
import { routeName } from "../../redux/personalUser";
import { withTranslation } from 'react-i18next';
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native-switch';

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            checked: 'unchecked',
            switchOn: false,
            numberArray: null,
            multiplChoice: "multiple_choice",
            checkList: "check_list",
            assessmentKit: null,
            assessmentKitActivities: null,
            missionId: null
        };
    }
    componentDidMount() {
        const { nutrition_mission } = this.props;
        const { assessmentKit, assessmentKitActivities, multiplChoice, checkList } = this.state;

        if (nutrition_mission.assessment_kit) {
            let assessment_kit = JSON.parse(nutrition_mission.assessment_kit);
            this.setState({
                assessmentKit: assessment_kit,
                missionId: nutrition_mission.id,
            })

            if ((assessmentKitActivities === null)) {
                let value = assessment_kit && assessment_kit.map((value, i) => {

                    var choice = value.choice.clause;
                    if (value.type === multiplChoice) {
                        return {
                            "select_choice": null,
                            "a": null,
                            "b": null,
                            "c": null,
                            "d": null,
                            "type": value.type,
                            "index": choice.index,
                        }
                    } else {
                        const array = Object.entries(choice);
                        let myObj = array.map((value, i) => {
                            var val = value[0]
                            let val2 = value[1]
                            let myArray;
                            if (val != 'index') {
                                if (val != 'clause_question') {
                                    myArray = { [val]: false };
                                } else {
                                    myArray = { [val]: null };
                                }
                            } else {
                                myArray = { [val]: val2 };
                            }
                            return myArray;
                        })
                        let mu = myObj.reduce(function (result, item) {
                            var key = Object.keys(item)[0];
                            result[key] = item[key];
                            return result;
                        }, {});
                        return mu;
                    }


                })
                this.setState({
                    assessmentKitActivities: value,
                })
            }
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

    allSelectChoice(index, choice) {
        //  console.log(index, choice);
        const { user_id, week_in_program, missionId, assessmentKitActivities } = this.state;
        assessmentKitActivities.forEach((animal) => {
            if (animal.index == index) {
                animal.select_choice = choice
            }
        })
        this.setState({
            assessmentKitActivities: assessmentKitActivities
        })
        let result = assessmentKitActivities && assessmentKitActivities.filter((member) => {
            return member.select_choice == null
        })
        this.setState({
            numberArray: result.length
        })
        // this.props.update_quiz_activities(user_id, week_in_program, allSelectChoice, null);
    }

    allCheckList(index, choice) {
        const { user_id, week_in_program, missionId, assessmentKit, assessmentKitActivities } = this.state;


        assessmentKitActivities.forEach((animal) => {

            if (animal.index == index) {
                const array = Object.entries(animal);
                var result = array && array.filter((member) => {
                    return member[0] == choice;
                })
                let status = !result[0][1];
                if (choice == 'a') {
                    animal.a = status;
                }
                if (choice == 'b') {
                    animal.b = status;
                }
                if (choice == 'c') {
                    animal.c = status;
                }
                if (choice == 'd') {
                    animal.d = status;
                }
                if (choice == 'e') {
                    animal.e = status;
                }
                if (choice == 'f') {
                    animal.f = status;
                }
                if (choice == 'g') {
                    animal.g = status;
                }
            }
        })

        this.setState({
            assessmentKitActivities: assessmentKitActivities
        })

    }

    submit() {
        this.props.navigation.navigate("ConfirmSubmit")
    }



    render() {
        const { isFocused, switchOn, numberArray, assessmentKit, assessmentKitActivities, multiplChoice, checkList } = this.state;
        //console.log("assessmentKitActivities", assessmentKitActivities);

        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.areaView}>
                    <Text style={styles.exercise}>การประเมิน</Text>
                    <Text style={styles.week}>สัปดาห์ที่ 1</Text>
                    <ScrollView>
                        {
                            assessmentKit && assessmentKit.map((value, i) => {

                                if (value.type === multiplChoice) {
                                    let choice = value.choice.clause;
                                    let ic = ++i;
                                    var result = assessmentKitActivities && assessmentKitActivities.filter((member) => {

                                        if (member && member.type === multiplChoice) {
                                            return member.index === choice.index
                                        }

                                    })
                                    return (
                                        <View key={i + "v"}>
                                            {value.question ?
                                                <Text style={styles.question}>
                                                    {value.question}
                                                </Text>
                                                : null}

                                            <Text style={[styles.questionClause, ((value.question) && (choice.index === i)) ? { marginLeft: 8 } : { marginTop: 24 }]}>
                                                {choice.clause_question}
                                            </Text>
                                            {
                                                value.image ?
                                                    <View style={styles.boxImage}>
                                                        <Image style={{ width: "100%", height: "100%", }} source={{ uri: value.image }} resizeMode='stretch' />
                                                    </View>

                                                    : null

                                                //  enum('cover', 'contain', 'stretch', 'repeat', 'center')
                                            }
                                            {
                                                choice.a ?
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "a" ?
                                                        <View style={[styles.quiz, ((value.question) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                            <TouchableOpacity>
                                                                <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.a}</Text>
                                                        </View>
                                                        :
                                                        <View style={[styles.quiz, ((value.question) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                            <TouchableOpacity onPress={() => this.allSelectChoice(choice.index, 'a')}>
                                                                <Image source={require('../../assets/images/icon/radio.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.a}</Text>
                                                        </View>
                                                    : null
                                            }
                                            {
                                                choice.b ?
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "b" ?
                                                        <View style={styles.quiz} >
                                                            <TouchableOpacity>
                                                                <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.b}</Text>
                                                        </View>
                                                        :
                                                        <View style={styles.quiz} >
                                                            <TouchableOpacity onPress={() => this.allSelectChoice(choice.index, 'b')}>
                                                                <Image source={require('../../assets/images/icon/radio.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.b}</Text>
                                                        </View>
                                                    : null
                                            }
                                            {
                                                choice.c ?
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "c" ?
                                                        <View style={styles.quiz} >
                                                            <TouchableOpacity>
                                                                <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.c}</Text>
                                                        </View>
                                                        :
                                                        <View style={styles.quiz} >
                                                            <TouchableOpacity onPress={() => this.allSelectChoice(choice.index, 'c')}>
                                                                <Image source={require('../../assets/images/icon/radio.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.c}</Text>
                                                        </View>
                                                    : null
                                            }
                                            {
                                                choice.d ?
                                                    (result && result[0].index === value.index) && result && result[0].select_choice == "d" ?
                                                        <View style={styles.quiz} >
                                                            <TouchableOpacity>
                                                                <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.d}</Text>
                                                        </View>
                                                        :
                                                        <View style={styles.quiz} >
                                                            <TouchableOpacity onPress={() => this.allSelectChoice(choice.index, 'd')}>
                                                                <Image source={require('../../assets/images/icon/radio.png')} />
                                                            </TouchableOpacity>
                                                            <Text style={styles.responseView}>{choice.d}</Text>
                                                        </View>
                                                    : null
                                            }
                                        </View>
                                    )
                                } else {
                                    if (value.type === checkList) {

                                        let data = value.choice.clause.clause_question;
                                        let choices = [value.choice.clause];
                                        const array = Object.entries(choices[0]);
                                        return (
                                            <View key={i + "vl"}>
                                                <Text style={styles.question}>
                                                    {data}
                                                </Text>
                                                {
                                                    array.map((item, k) => {
                                                        //     console.log("item", item[0], item[1]);
                                                        let ind = value.choice.clause.index;
                                                        if (item[0] != 'index') {
                                                            if (item[0] != 'clause_question') {
                                                                return (
                                                                    <View style={styles.quiz} key={k + "qv"} >
                                                                        <TouchableOpacity onPress={() => this.allCheckList(ind, item[0])}>
                                                                            <Image source={require('../../assets/images/icon/Checks.png')} />
                                                                        </TouchableOpacity>
                                                                        <Text style={styles.responseView} >{item[0]}{item[1]}</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        }

                                                    })
                                                }

                                            </View>
                                        )
                                    }
                                }

                            })
                        }


                        {/*                         <View>
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
                                // ref={(input) => { this.textInput5 = input; }}
                                />
                            </View>
                        </View> */}
                        <View>
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
                                <Pressable onPress={() => this.submit()}>
                                    <View style={styles.pressableView}>
                                        <View style={ComponentsStyle.button}>
                                            <Text style={ComponentsStyle.textButton}>
                                                ส่งคำตอบ
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                                :
                                <Pressable >
                                    <View style={styles.pressableView}>
                                        <View style={ComponentsStyle.buttonGrey}>
                                            <Text style={ComponentsStyle.textButtonGrey}>
                                                ส่งคำตอบ
                                            </Text>
                                        </View>
                                    </View>
                                </Pressable>
                            }
                        </View>
                    </ScrollView>
                </View >
            </View >
        )
    }
}

const deviceHeight = Math.round(Dimensions.get('window').height);
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
    questionClause: {
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
    boxImage: {
        width: (deviceHeight > 1023) ? "100%" : "100%",
        height: (deviceHeight > 1023) ? 400 : 320
    },
});



const mapStateToProps = ({ authUser, getData, personalDataUser }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { user, nutrition_mission, statusGetNutritionMission, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, routeName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Report));

