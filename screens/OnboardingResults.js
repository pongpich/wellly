import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { personal, healt } from "../redux/personalUser";
import { connect } from 'react-redux';

class OnboardingResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultsUser: null,
            diabetes: null,
            hypertension: null,
            exercise: null
        };
    }
    componentDidMount() {
        const { dataUser, healtDataUser } = this.props;
        const fpg = healtDataUser.mgDL;
        const hba1c = healtDataUser.mg;
        const sbp = healtDataUser.mmHGS;
        const dbp = healtDataUser.mmHGD;
        const exer = dataUser.exercise;
        console.log("componentDidMount",fpg, hba1c, sbp,dbp,exer);
        //  เบาหวาน
        if ((fpg < 100) && (hba1c < 5.7)) {
            this.setState({
                diabetes: "N"
            })
        } else if ((fpg > 101) && (fpg < 125) && (hba1c > 5.8) && (hba1c < 6.4)) {
            this.setState({
                diabetes: "Pre"
            })
        } else if ((fpg > 126) && (hba1c > 6.5)) {
            this.setState({
                diabetes: "Y"
            })
        }

        //  คาวมดัน
        if ((sbp > 40) && (sbp < 129) && (dbp > 40) && (dbp < 84)) {
            this.setState({
                hypertension: "N"
            })
        } else if ((sbp > 130) && (dbp > 85)) {
            this.setState({
                hypertension: "Y"
            })
        }

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
/*         this.setState({
            diabetes:"N",
            hypertension:"Y",
            exercise: "Y"
        }) */

    }

    componentDidUpdate(prevProps, prevState) {
        const { diabetes, hypertension, exercise } = this.state;

console.log("componentDidUpdate",diabetes, hypertension, exercise);
        if ((prevState.diabetes !== diabetes) && (prevState.hypertension !== hypertension) && (prevState.exercise !== exercise)) {
           
            if ((diabetes === "N") &&  (hypertension === "N")) {
                this.setState({
                    resultsUser: "A1"
                })
            }else if ((diabetes === "Pre") &&  (hypertension === "N") && (exercise === "N")) {
                this.setState({
                    resultsUser: "B1"
                })
            }else if ((diabetes === "Pre") &&  (hypertension === "Y") && (exercise === "N")) {
                this.setState({
                    resultsUser: "B2"
                })
            }else if ((diabetes === "Y") &&  (hypertension === "N") && (exercise === "N")) {
                this.setState({
                    resultsUser: "C1"
                })
            }else if ((diabetes === "Y") &&  (hypertension === "Y") && (exercise === "N")) {
                this.setState({
                    resultsUser: "C2"
                })
            }else if ((diabetes === "N") &&  (hypertension === "Y") && (exercise === "Y")) {
                this.setState({
                    resultsUser: "D1"
                })
            }
        }

    }

    onboarding_A1() {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#22B967', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_A.png')} />
                        <Text style={styles.text_1}>คุณมีสุขภาพร่างกาย</Text>
                        <Pressable style={styles.buttonStatusA}>
                            <Text style={styles.textStatus}>ปกติดี</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม {"\n"}จะช่วยรักษาสุขภาพให้ดียิ่งขึ้น</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={styles.buttonGuidance}  >
                            <Text style={styles.textGuidance}>รับคำแนะนำจากเรา</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
    onboarding_B1() {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#D89E08', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>คุณมีแนวโน้มเป็น</Text>
                        <Pressable style={styles.buttonStatusB1}>
                            <Text style={styles.textStatus}>ภาวะก่อนเบาหวาน</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม  จะช่วยลดความเสี่ยงภาวะก่อนเบาหวาน และทำให้สุขภาพดีขึ้นได้</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={styles.buttonGuidance}  >
                            <Text style={styles.textGuidance}>รับคำแนะนำจากเรา</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    onboarding_B2() {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#D89E08', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>คุณมีแนวโน้มเป็น</Text>
                        <Pressable style={styles.buttonStatusB2}>
                            <Text style={styles.textStatus}>ภาวะก่อนเบาหวานและความดันสูง</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม จะช่วยลดความเสี่ยงภาวะก่อนเบาหวาน และทำให้สุขภาพดีขึ้นได้</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={styles.buttonGuidance}  >
                            <Text style={styles.textGuidance}>รับคำแนะนำจากเรา</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    onboarding_C1() {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#F06A12', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_C.png')} />
                        <Text style={styles.text_1}>คุณมีแนวโน้มเป็น</Text>
                        <Pressable style={styles.buttonStatusC1}>
                            <Text style={styles.textStatus}>ภาวะเบาหวาน</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรมจะช่วยลดความเสี่ยงภาวะเบาหวานและทำให้สุขภาพดีขึ้นได้</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={styles.buttonGuidance}  >
                            <Text style={styles.textGuidance}>รับคำแนะนำจากเรา</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
    onboarding_C2() {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#F06A12', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_C.png')} />
                        <Text style={styles.text_1}>คุณมีแนวโน้มเป็น</Text>
                        <Pressable style={styles.buttonStatusC2}>
                            <Text style={styles.textStatus}>ภาวะเบาหวานและความดันสูง</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม จะช่วยลดความเสี่ยงภาวะเบาหวานและลดความดันโลหิตลง อีกทั้งทำให้สุขภาพดีขึ้นได้</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={styles.buttonGuidance}  >
                            <Text style={styles.textGuidance}>รับคำแนะนำจากเรา</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    onboarding_D1() {
        return (
            <LinearGradient
                style={styles.container}
                colors={['#D89E08', '#FFFFFF', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <SafeAreaView style={styles.areaView}>
                    <View style={styles.areaViewIcon}>
                        <Image source={require('../assets/images/icon/generic_B.png')} />
                        <Text style={styles.text_1}>คุณมีแนวโน้มเป็น</Text>
                        <Pressable style={styles.buttonStatusB1}>
                            <Text style={styles.textStatus}>ภาวะความดันสูง</Text>
                        </Pressable>
                        <View style={styles.areaViewText}>
                            <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม จะช่วยลดความเสี่ยงจากความดันโลหิตสูงลง อีกทั้งทำให้สุขภาพดีขึ้นได้</Text>
                        </View>
                    </View>
                    <View style={styles.areaViewButton}>
                        <Pressable style={styles.buttonGuidance}  >
                            <Text style={styles.textGuidance}>รับคำแนะนำจากเรา</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }

    render() {
        const { resultsUser } = this.state;

        return (
            <>
                {
                    resultsUser && resultsUser === "A1" ?
                        this.onboarding_A1()
                        :
                        resultsUser && resultsUser === "B1" ?
                            this.onboarding_B1()
                            :
                            resultsUser && resultsUser === "B2" ?
                                this.onboarding_B2()
                                :
                                resultsUser && resultsUser === "C1" ?
                                    this.onboarding_C1()
                                    :
                                    resultsUser && resultsUser === "C2" ?
                                        this.onboarding_C2()
                                        :
                                        resultsUser && resultsUser === "D1" ?
                                            this.onboarding_D1()
                                            :
                                            null
                }
            </>
        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignItems: "center",
    },
    areaView: {
        flex: 1,
        width: "100%",
    },
    areaViewIcon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -60,
    },
    text_1: {
        marginTop: 20,
        color: "#2A323C",
        fontSize: 24,
        fontFamily: "Prompt-Bold",
    },
    buttonStatusA: {
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#22B967',
        borderRadius: 24,
        height: 50
    },
    buttonStatusB1: {
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D89E08',
        borderRadius: 24,
        height: 50
    },
    buttonStatusB2: {
        width: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D89E08',
        borderRadius: 100,
        height: "auto",
        paddingTop: 10,
        paddingBottom: 10

    },
    buttonStatusC1: {
        width: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#F06A12',
        borderRadius: 100,
        height: "auto",
        paddingTop: 10,
        paddingBottom: 10

    },
    buttonStatusC2: {
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 0,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#F06A12',
        borderRadius: 24,
        height: 50
    },
    textStatus: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "Prompt-Bold",
        textAlign: "center"
    },
    areaViewText: {
        width: "75%",
        alignItems: "center",
    },
    text_2: {
        marginTop: 30,
        color: "#2A323C",
        fontSize: 16,
        fontFamily: "Prompt-Light",
        textAlign: "center"
    },
    areaViewButton: {
        justifyContent: "flex-end",
        marginBottom: 40,
        alignItems: "center"

    },
    buttonGuidance: {
        marginTop: 20,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#3762FC',
        borderRadius: 24,
        height: 50
    },
    textGuidance: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Prompt-Bold",
    }


});


const mapStateToProps = ({ personalDataUser }) => {
    const { dataUser, healtDataUser } = personalDataUser;
    return { dataUser, healtDataUser };
};

const mapActionsToProps = { personal, healt };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(OnboardingResults);
