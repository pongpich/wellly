import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Animated, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';



const data = Array.from({ length: 3 });

class History extends Component {





    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.marginBox}>
                    <Text style={styles.missionHistory}>ประวัติภารกิจ</Text>
                    <ScrollView>
                        {
                            data.map((_, i) => (
                                //ส่ง params ผ่าน route
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Successful", { id: i + 1 })}>
                                    <View key={i} style={styles.row}>
                                        <View style={styles.numberView}>
                                            <Text style={styles.number}>{i + 1}</Text>
                                        </View>
                                        <View style={styles.missionData}>
                                            <Text style={styles.missionHead}>เริ่มต้นดีมีชัยไปกว่าครึ่ง ARE U READY ??</Text>
                                            <Text style={styles.missionContent}>
                                                การเลือกอาหารและโภชนาการถือเป็นเรื่องสำคัญอย่างมากสำหรับผู้ที่ออกกำลังกายอย่าง
                                            </Text>
                                        </View>
                                        <View style={styles.viewIconRight}>
                                            <AntDesign name="check" style={styles.iconRight} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
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
    row: {
        position: "relative",
        maxHeight: 170,
        height: "auto",
        marginBottom: 16,
        backgroundColor: colors.neutralGrey6,
        borderRadius: 16,
        flexDirection: "row",


    },
    missionData: {
        /* marginHorizontal: 16, */
        flexWrap: "nowrap",
        width: "75%",
        margin: 16

    },
    missionHead: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    missionContent: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.secondary_MayaBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.neutralGrey,
        marginTop: 16,
        marginLeft: 16,
        marginBottom: 16,
    },

    iconRight: {
        fontSize: ComponentsStyle.fontSize24,
        color: colors.positive1,
        marginRight: 8,
    },
    viewIconRight: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
    },

})
const mapStateToProps = ({ personalDataUser }) => {
    const { number } = personalDataUser;
    return { number };
};

const mapActionsToProps = { missionNumber };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(History);