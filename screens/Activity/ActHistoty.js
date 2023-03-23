import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
const data = Array.from({ length: 30 });
class ActHistoty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusMonth: "ม.ค."
        };
    }

    selectMonth(e) {

        this.setState({
            statusMonth: e
        })
    }
    render() {
        const { statusMonth } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.marginBox}>
                    <View style={[styles.rowView, { justifyContent: "space-between" }]}>
                        <Text style={styles.missionHistory}>ประวัติภารกิจ</Text>
                        <View style={[styles.rowView, { marginTop: 10 }]}>
                            <Text style={[styles.month, { marginRight: 24 }]}>เดือนนี้</Text>
                            <View style={[styles.rowView, { marginRight: 16 }]}>
                                <Text style={styles.textyy}>2556</Text>
                                <Image
                                    style={{ height: 16, width: 16, marginLeft: 4 }}
                                    source={require('../../assets/images/activity/Chevron.png')}
                                />
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal={true}
                        style={{ paddingBottom: 20 }}>
                        <View style={[styles.rowView, { justifyContent: "flex-end" }]}>
                            <Pressable style={[{ width: "auto", paddingHorizontal: 8 }, statusMonth === "ม.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ม.ค.")} >
                                <Text style={[styles.mission, statusMonth === "ม.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>ม.ค.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "ก.พ." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ก.พ.")} >
                                <Text style={[styles.mission, statusMonth === "ก.พ." ? { color: colors.white } : { color: colors.persianBlue }]}>ก.พ.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "มี.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("มี.ค.")} >
                                <Text style={[styles.mission, statusMonth === "มี.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>มี.ค.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "เม.ย." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("เม.ย.")} >
                                <Text style={[styles.mission, statusMonth === "เม.ย." ? { color: colors.white } : { color: colors.persianBlue }]}>เม.ย.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "พ.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("พ.ค.")} >
                                <Text style={[styles.mission, statusMonth === "พ.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>พ.ค.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "มิ.ย." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("มิ.ย.")} >
                                <Text style={[styles.mission, statusMonth === "มิ.ย." ? { color: colors.white } : { color: colors.persianBlue }]}>มิ.ย.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "ก.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ก.ค.")} >
                                <Text style={[styles.mission, statusMonth === "ก.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>ก.ค.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "ส.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ส.ค.")} >
                                <Text style={[styles.mission, statusMonth === "ส.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>ส.ค.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "ก.ย." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ก.ย.")} >
                                <Text style={[styles.mission, statusMonth === "ก.ย." ? { color: colors.white } : { color: colors.persianBlue }]}>ก.ย.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "ต.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ต.ค.")} >
                                <Text style={[styles.mission, statusMonth === "ต.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>ต.ค.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "พ.ย." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("พ.ย.")} >
                                <Text style={[styles.mission, statusMonth === "พ.ย." ? { color: colors.white } : { color: colors.persianBlue }]}>พ.ย.</Text>
                            </Pressable>
                            <Pressable style={[{ marginLeft: 8, paddingHorizontal: 8, width: "auto" }, statusMonth === "ธ.ค." ? styles.missionPre : styles.programPre]} onPress={() => this.selectMonth("ธ.ค.")} >
                                <Text style={[styles.mission, statusMonth === "ธ.ค." ? { color: colors.white } : { color: colors.persianBlue }]}>ธ.ค.</Text>
                            </Pressable>

                        </View>
                    </ScrollView>
                </View>
                <View>
                    <ScrollView>
                        {
                            <View style={{
                                marginTop: 20
                            }}>
                                {
                                    data.map((item, i) => {

                                        return (
                                            <Pressable key={i + "tfb"}>
                                                <View key={i} style={styles.row}>
                                                    <Image style={styles.activityImage} source={require('../../assets/images/activity/Activitylow.png')} />
                                                    <View style={styles.missionData}>
                                                        <Text style={styles.missionHead}>ปกติ</Text>
                                                        <View style={styles.rowView}>
                                                            <Text style={styles.dateData}>
                                                                31 ธ.ค. 2566
                                                            </Text>
                                                            <Text style={styles.li}>{"\u2B24" + " "}</Text>
                                                            <Text style={styles.dateData}>
                                                                เข้มข้นต่ำ
                                                            </Text>
                                                        </View>
                                                        <Text style={styles.timeData}>29 นาที</Text>
                                                        <View style={styles.rowView}>
                                                            <Image
                                                                style={{ height: 12, width: 12, marginTop: 5, marginRight: 4 }}
                                                                source={require('../../assets/images/activity/Note.png')}
                                                            />
                                                            <Text style={styles.editNote}>เดินกินลม</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.viewIconRight}>
                                                        <Pressable /* onPress={() => refresh()} */>
                                                            <Image
                                                                style={{ height: 24, width: 24, zIndex: 1, marginRight: 8 }}
                                                                source={require('../../assets/images/icon/right.png')}
                                                            />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )

                                    })
                                }
                            </View>

                        }
                    </ScrollView>
                </View>
            </SafeAreaView >
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey7
    },
    marginBox: {
        marginHorizontal: 16
    },
    missionHistory: {
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        marginBottom: 16,
    },
    month: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue
    },
    textyy: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
        color: colors.grey1
    },
    rowView: {
        flexDirection: "row"
    },
    missionPre: {
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.persianBlue,
        borderRadius: 100,
    },
    programPre: {
        height: 37,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.persianBlue20,
        borderRadius: 100,
    },
    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    row: {
        position: "relative",
        height: "auto",
        marginBottom: 16,
        backgroundColor: colors.white,
        borderRadius: 16,
        flexDirection: "row",
        marginLeft: 16,
        marginRight: (deviceHeight > 1023) ? 32 : 16
    },
    activityImage: {
        width: 32,
        height: 32,
        marginTop: 16,
        marginLeft: 16
    },
    missionData: {
        flexWrap: "nowrap",
        width: "75%",
        margin: 16
    },
    missionHead: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    dateData: {
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey3,
    },
    timeData: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize20,
        color: colors.grey1,
    },
    li: {
        marginLeft: 4,
        marginRight: 4,
        marginTop: 6,
        fontSize: 5,
        color: colors.grey4,
    },
    editNote: {
        fontSize: 14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    viewIconRight: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",

    },
})
export default ActHistoty;