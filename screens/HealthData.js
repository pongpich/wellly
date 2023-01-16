import React, { Component } from 'react'
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import { healt } from "../redux/personalUser";
import { connect } from 'react-redux';

class HealthData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mgDL: null,
            mg: null,
            bpm: null,
            mmHGS: null,
            mmHGD: null,
            statusMdDl: true,
            statusTextmg_dL: true,
            statusMg: true,
            statusTextMg: true,
            statusBpm:true,
            statusTextBpm: true,
            statusMmGH1:true,
            statusTextMmHG1: true,
            statusMmGH2:true,
            statusTextMmHG2: true,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { healtDataUser } = this.props;
        if (prevProps.healtDataUser !==  healtDataUser) {
            this.props.navigation.navigate("OnboardingResults");
        }
    }

    handleChange(fieldName, text) {
        this.setState({
            [fieldName]: text
        })
    }

    submit() {  
        const {mgDL, mg, bpm, mmHGS, mmHGD} = this.state;
        if ((mgDL < 4) || (mgDL > 1000)) {
            this.setState({
                statusMdDl: false,
                statusTextmg_dL: false
            })
        } else if ((mg < 3.5) || (mg > 19)) {
            this.setState({
                statusMg: false,
                statusTextMg: false,
            })
        } else if ((bpm < 40) || (bpm > 160)) {
            this.setState({
                statusBpm:false,
                statusTextBpm: false,
            })
        } else if ((bpm < 40) || (bpm > 190)) {
            this.setState({
                statusTextMmHG1: false,
                statusMmGH2:false,
            })
        }else if ((mmHGS < 40) || (mmHGS > 190)) {
            this.setState({
                statusTextMmHG1: false,
                statusMmGH1:false,
            })
        }else if ((mmHGD < 40) || (mmHGD > 170)) {
            this.setState({
                statusTextMmHG2: false,
                statusMmGH2:false,
            })
        } else{
            this.props.healt(mgDL, mg, bpm, mmHGS, mmHGD); 
        } 
    }

    render() {
        const { mgDL, mg, bpm, mmHGS, mmHGD, statusMdDl, statusTextmg_dL,statusMg, statusTextMg,statusBpm, statusTextBpm,statusMmGH1, statusTextMmHG1, statusMmGH2,statusTextMmHG2 } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.areaView}>
                    <ScrollView>
                        <View style={styles.areaViewPag}>
                            <Text style={styles.textHead}>ข้อมูลสุขภาพ</Text>
                            <Text style={styles.textInputHead}>น้ำตาลในเลือด</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>mg/dL</Text>
                                <TextInput
                                    style={statusMdDl === true ? styles.input : styles.inputError}
                                    onChangeText={(text) => this.handleChange("mgDL", text)}
                                    placeholder="0"
                                    keyboardType="numeric"
                                />
                                {
                                    statusTextmg_dL === false ?
                                        <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 4 - 1000 mg/dlL.</Text>
                                        : null
                                }

                            </View>
                            <Text style={styles.textInputHead}>ค่าน้ำตาลเฉลี่ยสะสมในเลือด (HbA1c)</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>mg%</Text>
                                <TextInput
                                    style={statusMg === true ? styles.input : styles.inputError}
                                    onChangeText={(text) => this.handleChange("mg", text)}
                                    placeholder="0"
                                    keyboardType="numeric"
                                />
                                {
                                    statusTextMg === false ?
                                        <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 3.5 - 19 mg%</Text>
                                        : null
                                }

                            </View>
                            <Text style={styles.textInputHead}>อัตราการเต้นของหัวใจขณะพัก</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>bpm</Text>
                                <TextInput
                                    style={statusBpm === true ? styles.input : styles.inputError}
                                    onChangeText={(text) => this.handleChange("bpm", text)}
                                    placeholder="0"
                                    keyboardType="numeric"
                                />
                                {
                                    statusTextBpm === false ?
                                        <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 40-160 bpm</Text>
                                        : null
                                }

                            </View>
                            <Text style={styles.textHeadMmHG}>ความดันโลหิต</Text>
                            <Text style={styles.textInputHead}>Systolic (ค่าสูงสุด)</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>mmHG</Text>
                                <TextInput
                                    style={statusMmGH1 === true ? styles.input : styles.inputError}
                                    onChangeText={(text) => this.handleChange("mmHGS", text)}
                                    placeholder="0"

                                    keyboardType="numeric"
                                />
                                {
                                    statusTextMmHG1 === false ?
                                        <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 40 - 190 mmHG</Text>
                                        : null
                                }

                            </View>
                            <Text style={styles.textInputHead}>Diastolic (ค่าต่ำสุด)</Text>
                            <View style={styles.viewRightTnput}>
                                <Text style={styles.textRightTnput}>mmHG</Text>
                                <TextInput
                                    style={statusMmGH2 === true ? styles.input : styles.inputError}
                                    onChangeText={(text) => this.handleChange("mmHGD", text)}
                                    placeholder="0"
                                    keyboardType="numeric"
                                />
                                {
                                    statusTextMmHG2 === false ?
                                        <Text style={styles.errorText}>กรุณากรอกค่าตั้งแต่ 40 - 170 mmHG</Text>
                                        : null
                                }

                            </View>
                        </View>
                        <View style={styles.areaViewButton}>
                            {
                                (mgDL !== null) && (mg !== null) && (bpm !== null) && (mmHGS !== null) && (mmHGD !== null) ?
                                    <Pressable style={styles.buttonBlue} onPress={() => this.submit()} >
                                        <Text style={styles.textButtonWhite}>ถัดไป</Text>
                                    </Pressable>
                                    :
                                    <Pressable s style={styles.buttonGrey} onPress={() => this.submit()} >
                                        <Text style={styles.textButtonGrey}>ถัดไป</Text>
                                    </Pressable>
                            }
                        </View>
                    </ScrollView>
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
        width: "100%",
    },
    areaViewPag: {
        padding: 10,
    },
    textHead: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#2A323C"
    },
    textHeadMmHG: {
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 20,
        color: "#3762FC",
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
        marginBottom: 30,
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
        marginBottom: 30,
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
    const { healtDataUser } = personalDataUser;
    return { healtDataUser };
  };
  
  const mapActionsToProps = { healt };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(HealthData);