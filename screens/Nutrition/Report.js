import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, ScrollView, Modal, Dimensions, Pressable, TouchableOpacity, StatusBar } from 'react-native';
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
import { update_assessment_kit_activties } from "../../redux/update";
import ImageZoom from 'react-native-image-pan-zoom';


//update_assessment_kit_activties
class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            checked: 'unchecked',
            switchOn: false,
            numberArray: false,
            numberArrayCheck: null,
            numberCheck: false,
            multiplChoice: "multiple_choice",
            checkList: "check_list",
            assessmentKit: null,
            assessmentKitActivities: null,
            missionId: null,
            user_id: null,
            week_in_program: null,
            modalVisible: false,
            urlZoom: null
        };
    }
    componentDidMount() {
        const { nutrition_mission, user, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission } = this.props;
        const { assessmentKit, assessmentKitActivities, multiplChoice, checkList, numberArrayCheck } = this.state;
        
        //START-----------------------------เพิ่มมาเพื่อแก้บัคข้อจาก Tester ข้อ 18-----------------------------
        let result = assessmentKitActivities && assessmentKitActivities.map((member, i) => {
            let ke = Object.keys(member);
            return ke && ke.filter((key_name, l) => {
                if (key_name != "index") {
                    if (member[key_name] == true) {
                        return member;
                    }
                }

            })
        })
        let len = result && result.filter((res) => {
            return res.length != 0
        })

        if (numberArrayCheck === (len && len.length)) {
            this.setState({
                numberCheck: true
            })
        } else {
            this.setState({
                numberCheck: false
            })
        }
   //END-----------------------------เพิ่มมาเพื่อแก้บัคข้อจาก Tester ข้อ 18-----------------------------

        if (nutrition_mission.assessment_kit) {
            var assessment_kit = JSON.parse(nutrition_mission.assessment_kit);
            this.setState({
                assessmentKit: assessment_kit,
                missionId: nutrition_mission.id,
                user_id: user.user_id,
                week_in_program: nutrition_mission.week_in_program
            })

            this.props.getNutritionActivityIdMission(user.user_id, nutrition_mission.id)

            if (assessmentKitActivities == null) {
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
                let result2 = assessment_kit && assessment_kit.filter((member2) => {
                    return member2.type == "check_list"
                })
                this.setState({
                    numberArrayCheck: result2.length
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { user_id, week_in_program, missionId, assessmentKitActivities } = this.state;
        const { nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, statusAssessment_kit_activties } = this.props;
        if ((prevProps.statusGetNutritionActivityIdMission !== statusGetNutritionActivityIdMission) && (statusGetNutritionActivityIdMission == "success")) {
            let mission = JSON.parse(nutrition_activity_id_Mission.assessment_kit_activties)
            if (mission != null) {
                this.setState({
                    assessmentKitActivities: mission
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



    allSelectChoice(index, choice) {

        const { user_id, week_in_program, missionId, assessmentKitActivities } = this.state;
        assessmentKitActivities.forEach((animal) => {
            if (animal.index == index) {
                animal.select_choice = choice
            }
        })
        this.setState({
            assessmentKitActivities: assessmentKitActivities
        })

        this.props.update_assessment_kit_activties(user_id, week_in_program, assessmentKitActivities, "null");
        this.setButtonRadios()
    }

    allCheckList(index, choice) {

        const { user_id, week_in_program, missionId, assessmentKit, assessmentKitActivities, numberArrayCheck } = this.state;

        assessmentKitActivities.forEach((animal) => {
            if (animal.index == index) {
                const array = Object.entries(animal);
                var result = array && array.filter((member) => {
                    return member[0] == choice;
                })
                let status = !result[0][1];
                animal[choice] = status;
                animal.type = "check_list";
            }
        })
        this.setState({
            assessmentKitActivities: assessmentKitActivities
        })
        this.props.update_assessment_kit_activties(user_id, week_in_program, assessmentKitActivities, "null");
        this.setButtonChecks()

    }

    setButtonRadios() {
        const { assessmentKitActivities } = this.state;
        let result = assessmentKitActivities && assessmentKitActivities.filter((member) => {
            if (member.type == "multiple_choice") {
                return member.select_choice == null
            }
        })
        if (result.length == 0) {
            this.setState({
                numberArray: true
            })
        }
    }
    setButtonChecks() {

        const { assessmentKitActivities, numberArrayCheck } = this.state;
        let result = assessmentKitActivities && assessmentKitActivities.map((member, i) => {
            let ke = Object.keys(member);
            return ke && ke.filter((key_name, l) => {
                if (key_name != "index") {
                    if (member[key_name] == true) {
                        return member;
                    }
                }

            })
        })



        let len = result.filter((res) => {
            return res.length != 0
        })

        if (numberArrayCheck === len.length) {
            this.setState({
                numberCheck: true
            })
        } else {
            this.setState({
                numberCheck: false
            })
        }
    }

    submit() {
        const { user_id, week_in_program, assessmentKitActivities } = this.state;
        const { statusAssessment_kit_activties } = this.props;
        this.props.update_assessment_kit_activties(user_id, week_in_program, assessmentKitActivities, "1");

        if (statusAssessment_kit_activties == "success") {
            this.props.navigation.navigate("ConfirmSubmit")
        }
    }



    render() {
        const { isFocused, switchOn, numberArray, assessmentKit, assessmentKitActivities,
            multiplChoice, checkList, numberArrayCheck, user_id, week_in_program, missionId, numberCheck, modalVisible, urlZoom } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <View>
                    <Text style={styles.exercise}>การประเมิน</Text>
                    <Text style={styles.week}>สัปดาห์ที่ {week_in_program}</Text>
                    <ScrollView>
                        <View style={styles.areaView}>
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

                                        var img = value.image;
                                        var image = [img];
                                        const arrayImag = Object.entries(image[0]);
                                        return (
                                            <View key={i + "v"}>
                                                {value.question ?
                                                    <Text style={styles.question}>
                                                        {value.question}
                                                    </Text>
                                                    : null}

                                                <Text style={[styles.questionClause, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : { marginTop: 24 }]}>
                                                    {choice.clause_question}
                                                </Text>

                                                {

                                                    img != null ?
                                                        <>
                                                            {
                                                                arrayImag.map((img, i) => {
                                                                    return (
                                                                        <View style={week_in_program == "1" ? styles.boxImage1 : week_in_program == "2" ? styles.boxImage2 :
                                                                            missionId == "sna1" ? styles.boxImageSna1 : missionId == "sna2" ? styles.boxImageSna2 :
                                                                                missionId == "snb2" ? styles.boxImageSnb2 : null} key={i + 'img'}>
                                                                            <TouchableOpacity onPress={() => this.setState({
                                                                                modalVisible: true,
                                                                                urlZoom: img[1]
                                                                            })}>
                                                                                <Image style={{ width: "100%", height: "100%", }} source={{ uri: img[1] }} resizeMode='stretch' />
                                                                            </TouchableOpacity>

                                                                        </View>
                                                                    )
                                                                })
                                                            }
                                                        </>

                                                        : null
                                                    /*  <View style={styles.boxImage}>
                                                    <Image style={{ width: "100%", height: "100%", }} source={{ uri: value.image }} resizeMode='stretch' />
                                                </View>  */
                                                    //  enum('cover', 'contain', 'stretch', 'repeat', 'center')
                                                }
                                                <View   >
                                                    {
                                                        choice.a ?
                                                            (result && result[0].index === value.index) && result && result[0].select_choice == "a" ?
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable>
                                                                        <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.a}</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable onPress={() => this.allSelectChoice(choice.index, 'a')}>
                                                                        <Image source={require('../../assets/images/icon/radio.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.a}</Text>
                                                                </View>
                                                            : null
                                                    }
                                                    {
                                                        choice.b ?
                                                            (result && result[0].index === value.index) && result && result[0].select_choice == "b" ?
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable>
                                                                        <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.b}</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable onPress={() => this.allSelectChoice(choice.index, 'b')}>
                                                                        <Image source={require('../../assets/images/icon/radio.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.b}</Text>
                                                                </View>
                                                            : null
                                                    }
                                                    {
                                                        choice.c ?
                                                            (result && result[0].index === value.index) && result && result[0].select_choice == "c" ?
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable>
                                                                        <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.c}</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable onPress={() => this.allSelectChoice(choice.index, 'c')}>
                                                                        <Image source={require('../../assets/images/icon/radio.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.c}</Text>
                                                                </View>
                                                            : null
                                                    }
                                                    {
                                                        choice.d ?
                                                            (result && result[0].index === value.index) && result && result[0].select_choice == "d" ?
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable>
                                                                        <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.d}</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable onPress={() => this.allSelectChoice(choice.index, 'd')}>
                                                                        <Image source={require('../../assets/images/icon/radio.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.d}</Text>
                                                                </View>
                                                            : null
                                                    }
                                                    {
                                                        choice.e ?
                                                            (result && result[0].index === value.index) && result && result[0].select_choice == "e" ?
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable>
                                                                        <Image source={require('../../assets/images/icon/radioActive.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.e}</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.quiz, ((value.question !== null) && (choice.index === i)) ? { marginLeft: 8 } : null]} >
                                                                    <Pressable onPress={() => this.allSelectChoice(choice.index, 'e')}>
                                                                        <Image source={require('../../assets/images/icon/radio.png')} />
                                                                    </Pressable>
                                                                    <Text style={styles.responseView}>{choice.e}</Text>
                                                                </View>
                                                            : null
                                                    }
                                                </View>
                                            </View>
                                        )
                                    } else {
                                        if (assessmentKitActivities != null) {
                                            if (value.type === checkList) {
                                                let data = value.choice.clause.clause_question;
                                                let choices = [value.choice.clause];
                                                const array = Object.entries(choices[0]);
                                                let inne = value.choice.clause.index;
                                                var result2 = assessmentKitActivities && assessmentKitActivities.filter((member3) => {
                                                    if (member3.index == inne) {
                                                        return member3
                                                    }
                                                })
                                                const array2 = Object.entries(result2[0]);
                                                return (
                                                    <View key={i + "vl"}>
                                                        <Text style={styles.question}>
                                                            {data}
                                                        </Text>
                                                        {
                                                            array.map((item, k) => {
                                                                let ind = value.choice.clause.index;
                                                                if (item[0] != 'index') {
                                                                    if (item[0] != 'clause_question') {
                                                                        let dat = array2.map((item2, k) => {
                                                                            if (item[0] == item2[0]) {
                                                                                return (
                                                                                    <View style={styles.quiz} key={k + "qv"} >
                                                                                        <Pressable onPress={() => this.allCheckList(ind, item[0])}>
                                                                                            <Image source={item2[1] == true ? require('../../assets/images/icon/ChecksActive.png') : require('../../assets/images/icon/Checks.png')} />
                                                                                        </Pressable>
                                                                                        <Text style={styles.responseView}>{item[1]}</Text>
                                                                                    </View>)
                                                                            }

                                                                        })
                                                                        return dat
                                                                    }
                                                                }

                                                            })
                                                        }
                                                    </View>
                                                )
                                            }
                                        }
                                    }

                                })
                            }
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
                                <View style={{ marginBottom: 40 }}>
                                    {
                                        ((numberArray == true) || (numberCheck == true)) && (switchOn === true) ?
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
                            </View>
                        </View>
                    </ScrollView>
                </View >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        /*  Alert.alert('Modal has been closed.'); */
                        this.setState({ modalVisible: !modalVisible });
                    }}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => this.setState({
                            modalVisible: false,
                            urlZoom: null
                        })} style={styles.closeButton}>
                            <Text style={{ color: colors.white, fontSize: 24, marginRight: 16, marginTop: 16 }} >X</Text>
                        </TouchableOpacity>
                        <ImageZoom cropWidth={Dimensions.get('window').width}
                            cropHeight={Dimensions.get('window').height}
                            imageWidth={Dimensions.get('window').width}
                            imageHeight={Dimensions.get('window').height}>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                                <Image source={{ uri: urlZoom }} style={{ width: "100%", height: 350, marginTop: 16 }} resizeMode="stretch" />
                            </View>
                        </ImageZoom>
                    </View>
                </Modal>
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
        marginHorizontal: 16,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    week: {
        marginHorizontal: 16,
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
    boxImage1: {
        marginTop: 16,
        width: (deviceHeight > 1023) ? "100%" : "100%",
        height: (deviceHeight > 1023) ? 400 : 315
    },
    boxImage2: {
        marginTop: 16,
        marginBottom: 6,
        width: (deviceHeight > 1023) ? "100%" : "100%",
        height: (deviceHeight > 1023) ? 400 : 230
    },
    boxImageSna1: {
        marginTop: 16,
        marginBottom: 16,
        width: (deviceHeight > 1023) ? "100%" : "100%",
        height: (deviceHeight > 1023) ? 700 : 500
    },
    boxImageSna2: {
        marginTop: 16,
        marginBottom: 6,
        width: (deviceHeight > 1023) ? "100%" : "100%",
        height: (deviceHeight > 1023) ? 250 : 190
    },
    boxImageSnb2: {
        marginTop: 16,
        marginBottom: 16,
        width: (deviceHeight > 1023) ? "100%" : "100%",
        height: (deviceHeight > 1023) ? 500 : 290
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImageContainer: {
        width: '100%',
        height: '80%',
    },
    modalImage: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        zIndex: 999,
    },
});



const mapStateToProps = ({ authUser, getData, personalDataUser, updateData }) => {
    const { user } = authUser;
    const { route_name } = personalDataUser;
    const { statusAssessment_kit_activties } = updateData;
    const { nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission } = getData;
    return { statusAssessment_kit_activties, user, nutrition_mission, statusGetNutritionMission, nutrition_activity_id_Mission, statusGetNutritionActivityIdMission, route_name };
};

const mapActionsToProps = { logoutUser, getNutritionMission, update_assessment_kit_activties, getNutritionActivityIdMission, routeName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Report));

