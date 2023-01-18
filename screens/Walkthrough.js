import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';

class Walkthrough extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stepNext: 1,

        }
    }

    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }


    step_1() {
        return (
            <>
                <View style={styles.welllyView}>
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_1.png')}
                    />
                    <Text style={styles.textWellly}>ยินดีต้อนรับสู่ Wellly</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>แอพพัฒนาสุขภาพ ส่วนบุคคลที่จะช่วยแนะนำคุณทีละขั้นตอน</Text>
                    </View>
                    <View style={styles.circle}>
                        <View style={styles.circle_1} />
                        <View style={styles.circle_2} />
                        <View style={styles.circle_2} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.buttonNext} onPress={() => this.handleChange("stepNext", 2)}>
                        <Text style={styles.textNext}>ถัดไป</Text>
                    </Pressable>
                    <Pressable style={styles.buttonCross} onPress={() => this.handleChange("stepNext", 3)} >
                        <Text style={styles.textCross}>ข้าม</Text>
                    </Pressable>
                </View>
            </>
        )
    }
    step_2() {
        return (
            <>
                <View style={styles.welllyView}>
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_2.png')}
                    />
                    <Text style={styles.textWellly}>พาสุขภาพไปในทางที่ดีขึ้น</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>ปรับเปลี่ยนวิธีคิด, โภชนาการ และ เริ่มต้นออกกำลังกาย</Text>
                    </View>
                    <View style={styles.circle}>
                        <View style={styles.circle_2} />
                        <View style={styles.circle_1} />
                        <View style={styles.circle_2} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Pressable style={styles.buttonNext} onPress={() => this.handleChange("stepNext", 3)} >
                        <Text style={styles.textNext} >ถัดไป</Text>
                    </Pressable>
                    <Pressable style={styles.buttonCross}  onPress={() => this.handleChange("stepNext", 3)} >
                        <Text style={styles.textCross}>ข้าม</Text>
                    </Pressable>
                </View>
            </>
        )
    }
    step_3() {
        return (
            <>
                <View style={styles.welllyView}>
                    <Image
                        style={styles.entryImage}
                        source={require('../assets/images/icon/walkthrough_3.png')}
                    />
                    <Text style={styles.textWellly}>ในแบบที่เหมาะสม</Text>
                    <View style={styles.areaText}>
                        <Text style={styles.textWellly_2}>กับสถานะสุขภาพของคุณเอง ได้อย่างสนุก และท้าทาย เริ่มกันเลย!</Text>
                    </View>
                    <View style={styles.circle}>
                        <View style={styles.circle_2} />
                        <View style={styles.circle_2} />
                        <View style={styles.circle_1} />
                    </View>
                </View>
                <View style={styles.buttonView}>
                <Pressable style={styles.buttonCross} />
                    
                    <Pressable style={styles.buttonNext} onPress={() => this.props.navigation.navigate("OnboardingName")} >
                        <Text style={styles.textNext}>เริ่มกันเลย!</Text>
                    </Pressable>
                </View>
            </>
        )
    }

    render() {

        const { stepNext } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {
                    stepNext === 1 ? this.step_1() :
                        stepNext === 2 ? this.step_2() :
                            this.step_3()
                }
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",

    },
    welllyView: {
        flex: 1,
        marginTop:60,
        alignItems: "center",
        justifyContent: "center",
    },
    textWellly: {
        marginTop: 40,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#2A323C"
    },
    areaText: {
        width: "70%",
    },
    textWellly_2: {
        marginTop: 20,
        fontFamily: "Prompt-Light",
        color: "#2A323C",
        fontSize: 16,
        textAlign: "center"
    },
    circle: {
        flexDirection: "row",
        while: "100%",
        alignItems: "center"
    },
    circle_1: {
        marginTop: 20,
        width: 10,
        height: 10,
        backgroundColor: "#3762FC",
        border: "solid 5px darkcyan",
        borderRadius: 100,
        marginLeft: 5,
    },
    circle_2: {
        marginTop: 20,
        width: 10,
        height: 10,
        backgroundColor: "#C2D2E7",
        border: "solid 5px darkcyan",
        borderRadius: 100,
        marginLeft: 5,
    },
    buttonView: {
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    buttonNext: {
        marginTop: 20,
        width: "90%",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50,
    },
/*     buttonNext_2: {
       marginBottom:60,
        width: "90%",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50,
    }, */
    textNext: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#FFFFFF",
        textAlign: "center"
    },
    buttonCross: {
        marginTop: 30,
        width: "90%",
        height: 50,
    },
    textCross: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#3762FC",
        textAlign: "center"
    },
});
export default Walkthrough;