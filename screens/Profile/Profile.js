import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Animated, Image, Pressable, ScrollView, Dimensions, TouchableWithoutFeedback, Modal, Button } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { logoutUser, deleteAccount, resetStatusDeleteAcc } from "../../redux/auth";
import { checkStar, checkTrophy } from "../../helpers/utils";


const data = Array.from({ length: 3 });
const startData = Array.from({ length: 3 });

class Profile extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            popupDeleteAccShow: false,
        };
    }


    componentDidMount() {
        this.props.resetStatusDeleteAcc();
    }

    componentDidUpdate(prevProps) {
        const { statusDeleteAcc } = this.props;
        if ((prevProps.statusDeleteAcc !== statusDeleteAcc) && (statusDeleteAcc === "success")) {
            setTimeout(() => {
                this.props.logoutUser();
            }, 5000);
        }
    }


    onDeleteAccount() {
        this.setState({
            popupDeleteAccShow: true
        })
    }

    render() {
        const { user, statusDeleteAcc } = this.props;
        const { popupDeleteAccShow } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.marginBox}>
                    <Text style={styles.missionHistory}>จัดการบัญชี</Text>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={popupDeleteAccShow}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            this.setState({ popupDeleteAccShow: !popupDeleteAccShow });
                        }}>
                        <View style={styles.centeredView}>
                            {
                                statusDeleteAcc === "success" ?
                                    <View style={styles.modalView}>
                                        <Text style={styles.missionHead}>ระบบทำการลบบัญชีของคุณแล้ว</Text>
                                    </View>
                                    :
                                    <View style={styles.modalView}>
                                        <Text style={styles.missionHead}>การลบบัญชีไม่สามารถย้อนกลับได้</Text>
                                        <Text style={styles.missionHead}>ข้อมูลบัญชีจะไม่สามารถกู้คืนได้</Text>
                                        <Text style={styles.missionHead}>คุณแน่ใจหรือไม่ ?</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1, marginRight: 10 }}>
                                                <Button title="ยกเลิก" onPress={() => this.setState({ popupDeleteAccShow: !popupDeleteAccShow })} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Button title="ยืนยัน" onPress={() => this.props.deleteAccount(user && user.user_id)} />
                                            </View>
                                        </View>
                                    </View>
                            }

                        </View>
                    </Modal>
                </View>
                <Pressable style={{ marginBottom: 15 }} onPress={() => this.onDeleteAccount()}  >
                    <View style={ComponentsStyle.button} >
                        <Text style={ComponentsStyle.textButton}>
                            ลบบัญชี
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => this.props.logoutUser()}  >
                    <View style={ComponentsStyle.button} >
                        <Text style={ComponentsStyle.textButton}>
                            ออกจากระบบ
                        </Text>
                    </View>
                </Pressable>
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
        backgroundColor: colors.grey6,
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
        color: "red",
    },
    missionContent: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.persianBlue,

    },
    numberView: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.persianBlue20,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }

})
const mapStateToProps = ({ authUser }) => {
    const { user, statusDeleteAcc } = authUser;
    return { user, statusDeleteAcc };
};

const mapActionsToProps = { logoutUser, deleteAccount, resetStatusDeleteAcc };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Profile);