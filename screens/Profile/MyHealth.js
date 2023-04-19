import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Animated, StatusBar, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback, Button } from 'react-native';
import ComponentsStyle from '../../constants/components';
import { getNutritionMission, getNutritionActivity, getExerciserActivity, getActivityList, setIntensityFromExArticleTemplate } from "../../redux/get";
import colors from '../../constants/colors';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class MyHealth extends Component {

    render() {

        const { user } = this.props;
        const healthData = user && JSON.parse(user.health_data)
        const personal_data = user && JSON.parse(user.personal_data)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.headText}>ข้อมูลส่วนตัว</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>เพศ</Text>
                        <Text style={styles.subject}>{personal_data.sex = "male" ? "ชาย" : "หญิง"}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>อายุ</Text>
                        <Text style={styles.subject}>{personal_data.age}  ปี</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>น้ำหนัก</Text>
                        <Text style={styles.subject}>{personal_data.weight}  กิโลกรัม</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>ส่วนสูง</Text>
                        <Text style={styles.subject}>{personal_data.height}  เซนติเมตร</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>ออกกำลังกายบ่อยแค่ไหน</Text>
                        <Text style={styles.subject}>{personal_data.frequency_of_exercise == "always" ? "ประจำ" : personal_data.frequency_of_exercise == "sometimes" ? "บางครั้ง" : "ไม่เลย"}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={styles.line2} />
                    <Text style={styles.headText}>ข้อมูลส่วนตัว</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>น้ำตาลในเลือด</Text>
                        <Text style={styles.subject}>{healthData.blood_glucose}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>ค่าน้ำตาลเฉลี่ยสะสมในเลือด (HbA1c)</Text>
                        <Text style={styles.subject}>{healthData.hbA1C}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>อัตราการเต้นของหัวใจขณะพัก</Text>
                        <Text style={styles.subject}>{healthData.rhr}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <Text style={[styles.topic, { marginLeft: 16, marginBottom: 8 }]}>ความดันโลหิต</Text>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16 }}>
                        <Text style={styles.topic}>Systolic (ค่าตัวบน)</Text>
                        <Text style={styles.subject}>{healthData.blood_pressure_systolic}</Text>
                    </View>
                    <View style={styles.line}>
                        <View style={styles.line1} />
                    </View>
                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 16, marginBottom: 40 }}>
                        <Text style={styles.topic}>Diastolic (ค่าตัวล่าง)</Text>
                        <Text style={styles.subject}>{healthData.blood_pressure_diastolic}</Text>
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    headText: {
        marginHorizontal: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
        marginBottom: 16
    },
    topic: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16
    },
    subject: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16
    },

    line: {
        paddingHorizontal: 16,
        width: "100%",

    },
    line1: {
        marginTop: 16,
        width: "100%",
        height: 1,
        backgroundColor: colors.grey6,
        marginBottom: 16,
    },
    line2: {
        marginTop: 24,
        width: "100%",
        height: 8,
        backgroundColor: colors.grey6,
        marginBottom: 24,
    },
});


const mapStateToProps = ({ authUser }) => {
    const { user, statusDeleteAcc } = authUser;

    return { user, statusDeleteAcc };
};

const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(MyHealth));

