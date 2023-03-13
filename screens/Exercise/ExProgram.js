import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Modal from "react-native-modal";
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';

const data = Array.from({ length: 30 });


const ExProgram = ({ navigation }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [modalVisible, setModalVisible] = React.useState(true);
    const [statusMoadal, setStatusMoadal] = React.useState(false);
    const [playVideo, setPlayVideo] = React.useState(1);
    const deviceWidth = Math.round(Dimensions.get('window').width);
    const clickPlayVide = (e) => {
        setPlayVideo(e)
        setModalVisible(!modalVisible)
    }
    const clickMoadal = () => {
        setModalVisible(!modalVisible)
    }




    return (
        <View style={styles.centered}>
            <View style={{ height: 44, zIndex: 10, width: "100%", backgroundColor: colors.white }}>
                <StatusBar barStyle="dark-content" />
            </View>
            <View style={{ position: "relative", height: 212, width: deviceWidth, alignItems: "flex-end" }}>
                <Pressable onPress={() => navigation.popToTop()} style={{ zIndex: 3, position: "absolute" }}>
                    <Image
                        source={require('../../assets/images/icon/close_white.png')}
                        style={{
                            width: 24, height: 24, marginTop: 16, marginRight: 16

                        }}
                    />
                </Pressable>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </View>
            <View style={styles.headTime}>
                <Text style={styles.nameProgram}>Prone Arm and Opposite Leg Raise</Text>
                <Text style={styles.playTime}>0:16</Text>
            </View>
            <View style={styles.setConter}>
                <View>
                    <Text style={styles.setText}>เซต</Text>
                    <Text style={styles.setTextBold}>2</Text>
                </View>
                <View style={styles.viewSet}>
                    <Text style={styles.setText}>ครั้ง</Text>
                    <Text style={styles.setTextBold}>12-20</Text>
                </View>
                <View style={styles.viewSet}>
                    <Text style={styles.setText}>จังหวะ</Text>
                    <Text style={styles.setTextBold}>ช้า (4-6 วินาที/ครั้ง)</Text>
                </View>
            </View>
            <View style={styles.conterVideo}>
                <ScrollView>
                    <View style={{ marginBottom: 400 }}>
                        {
                            data.map((item, i) => {
                                return (
                                    <Pressable key={i + "vp"} onPress={() => clickPlayVide(i + 1)}>
                                        <View style={playVideo == i + 1 ? styles.rowProgramPlay : styles.rowProgram}>
                                            <View style={1 == i + 1 ? styles.imageProgramViewSucceed : styles.imageProgramView}>
                                                {1 === i + 1 ?
                                                    <Image
                                                        style={styles.checkIcon}
                                                        source={require('../../assets/images/exercise/Tick3x.png')}
                                                    />
                                                    : null}
                                                <Image
                                                    style={{ height: 80, width: 140, zIndex: 1, opacity: 0.3, borderRadius: 8 }}
                                                    source={require('../../assets/images/exercise/Alternating.png')}
                                                />
                                            </View>
                                            <View style={styles.programData} key={i + 'vd2'}>
                                                <Text style={[styles.missionHead, 1 == i + 1 ? { color: colors.positive1 } : { color: null }]}>Core + Balance Training</Text>
                                                <Text style={styles.missionContent}>
                                                    45 นาที
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>

            <View style={styles.centeredView}>

                <Modal animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(modalVisible)
                    }}

                    style={{ margin: 0 }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.conterModel}>
                            {statusMoadal === true ?
                                <View style={{ height: "100%", justifyContent: "space-between" }}>
                                    <View style={{ marginTop: "160%" }}>
                                        <Text style={styles.textBadge}>คุณได้รับตรา</Text>
                                        <Image style={{ width: 143, height: 194 }} source={require('../../assets/images/exercise/Badge.png')} />
                                    </View>
                                    <View style={[styles.buotonBadge, { marginBottom: 40 }]}>
                                        <Pressable onPress={() => clickMoadal()}>
                                            <Text style={styles.buotonBadgeText}>สำเร็จ</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                :
                                <View style={{ alignItems: "center" }}>
                                    <Image style={{ width: 120, height: 120 }} source={require('../../assets/images/icon/generic_A.png')} />
                                    <Text style={[styles.textBadge, { marginTop: 16 }]}>ทำภารกิจสำเร็จ!</Text>
                                </View>
                            }
                        </View>
                        <View style={styles.modalView2}>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}


const deviceHeight = Math.round(Dimensions.get('window').height);
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        backgroundColor: "white",
        textAlign: "center"
    },
    video: {
        width: deviceWidth,
        height: 212,
    },
    headTime: {
        marginTop: 16,
        flexDirection: "row",
        paddingHorizontal: 16
    },
    nameProgram: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
        width: "90%"
    },
    playTime: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,

    },
    setConter: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginTop: 8
    },
    viewSet: {
        marginLeft: 16
    },
    setText: {
        fontSize: 12,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    setTextBold: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    conterVideo: {
        marginTop: 32,


    },
    rowProgram: {
        height: "auto",
        marginBottom: 16,
        borderRadius: 16,
        flexDirection: "row",
        paddingHorizontal: 16,
    },
    rowProgramPlay: {
        paddingHorizontal: 16,
        height: "auto",
        marginBottom: 16,
        paddingVertical: 8,
        flexDirection: "row",
        backgroundColor: colors.grey6

    },
    imageProgramView: {
        width: 140,
        height: 80,
        borderRadius: 8,
        zIndex: 2,
        backgroundColor: colors.grey4
    },
    imageProgramViewSucceed: {
        width: 140,
        height: 80,
        borderRadius: 8,
        opacity: 1,
        zIndex: 10,
        backgroundColor: colors.positive1
    },
    programData: {
        /* marginHorizontal: 16, */
        flexWrap: "nowrap",
        width: "75%",
        marginHorizontal: 16,

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
    checkIcon: {
        height: 24,
        width: 24,
        zIndex: 2,
        position: "absolute",
        marginLeft: "35%",
        marginTop: "15%"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    conterModel: {
        zIndex: 4,
        position: "absolute",
        justifyContent: "center",
        height: "100%"
    },
    modalView2: {
        position: "relative",
        zIndex: 3,
        backgroundColor: colors.grey1,
        opacity: 0.8,
        width: "100%",
        paddingHorizontal: 16,
        flex: 1,
        paddingTop: 32,
        marginTop: 0,
        alignItems: "center",
        justifyContent: "space-between",
    },
    textBadge: {
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.white,
        marginBottom: 24,
        textAlign: "center"
    },
    buotonBadge: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        borderRadius: 24,
        height: 48,
        borderColor: colors.white,
        borderWidth: 2
    },
    buotonBadgeText: {
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.white,
        alignItems: "center"
    },
});

export default ExProgram;
