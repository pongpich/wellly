import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Modal from "react-native-modal";
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from '@react-navigation/native';



const data = Array.from({ length: 30 });



const ExProgram = ({ navigation }) => {
    const dispatch = useDispatch()
    const { trainingSet } = useSelector(({ getData }) => getData ? getData : "");

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [modalVisible, setModalVisible] = React.useState(true);
    const [statusMoadal, setStatusMoadal] = React.useState(false);
    const [playVideo, setPlayVideo] = React.useState(1);
    const [finishedPlayingSet, setFinishedPlayingSet] = React.useState([]);
    const [urlPlay, setUrlPlay] = React.useState(null);
    const [playSet, setPlaySet] = React.useState(null);
    const [playRest, setPlayRest] = React.useState(null);
    const [playRep, setPlayRep] = React.useState(null);
    const [playTempo, setPlayTempo] = React.useState(null);
    const [playName, setPlayName] = React.useState(null);
    const [ststus_m_f, setStstus_m_f] = React.useState(null);
    const deviceWidth = Math.round(Dimensions.get('window').width);

    const route = useRoute();


    useEffect(() => {
        const { status_male_female } = route.params;
        setStstus_m_f(status_male_female)
        const dataTrainingSet = trainingSet && Object.entries(trainingSet);
        const data = dataTrainingSet[0][1][0];
        /*  console.log('ataTrainingSet', dataTrainingSet[0][1][0]); */
        setPlayTempo(data.tempo)
        setPlayRep(data.rep)
        setPlaySet(data.set)
        setPlayName(data.name)
        setPlayVideo(1)

        if (status_male_female === "ชาย") {
            setUrlPlay(data.img_url_m)
        } else {
            if (data.img_url_f !== null) {
                setUrlPlay(data.img_url_f)
            } else {
                setUrlPlay(data.img_url_m)
            }
        }
    }, []);



    const clickPlayVide = (e, i) => {

        setPlayTempo(e.tempo)
        setPlayRep(e.rep)
        setPlaySet(e.set)
        setPlayName(e.name)
        setPlayVideo(i)
        /* setUrlPlay(e.img_url_m) */
        /*      console.log("e", e); */
        setModalVisible(!modalVisible)
        if (ststus_m_f === "ชาย") {
            setUrlPlay(e.img_url_m)
        } else {
            if (e.img_url_f !== null) {
                setUrlPlay(e.img_url_f)
            } else {
                setUrlPlay(e.img_url_m)
            }
        }
    }

    const finishedPlaying = () => {

        setFinishedPlayingSet((prevArray) => [...prevArray, playVideo]);
    }


    const clickMoadal = () => {
        setModalVisible(!modalVisible)
    }
    /*     const finishedPlayingMap = (e) => {
    
            finishedPlayingSet && finishedPlayingSet.filter((val, j) => {
    
                return val = e;
            })
        } */


    const dataTrainingSet = trainingSet && Object.entries(trainingSet);


    return (
        <View style={styles.centered}>
            <View style={{ flex: 0.9 }}>
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
                    <Image
                        style={styles.video}
                        source={{ uri: urlPlay }}
                        resizeMode="contain"
                        animated={true}
                    />
                </View>
                <View style={styles.headTime}>
                    <Text style={styles.nameProgram}>{playName}</Text>
                    {/*  <Text style={styles.playTime}>0:16</Text> */}
                </View>
                <View style={styles.setConter}>
                    <View>
                        <Text style={styles.setText}>เซต</Text>
                        <Text style={styles.setTextBold}>{playSet}</Text>
                    </View>
                    <View style={styles.viewSet}>
                        <Text style={styles.setText}>ครั้ง</Text>
                        <Text style={styles.setTextBold}>{playRep}</Text>
                    </View>
                    <View style={styles.viewSet}>
                        <Text style={styles.setText}>จังหวะ</Text>
                        <Text style={styles.setTextBold}>ช้า (4-6 วินาที/ครั้ง)</Text>
                    </View>
                </View>
                <View style={styles.conterVideo}>
                    <ScrollView>
                        <View style={{ marginBottom: 400, }}>
                            {
                                dataTrainingSet && dataTrainingSet.map((item, i) => {
                                    return (
                                        <Pressable key={i + "vp"} onPress={() => clickPlayVide(item[1][0], i + 1)}>
                                            <View style={playVideo == i + 1 ? styles.rowProgramPlay : styles.rowProgram}>
                                                <View style={finishedPlayingSet.includes(i + 1) ? styles.imageProgramViewSucceed : styles.imageProgramView}>
                                                    {finishedPlayingSet.includes(i + 1) ?
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
                                                    <Text style={[styles.missionHead, finishedPlayingSet.includes(i + 1) ? { color: colors.positive1 } : { color: null }]}>{item[1][0].name}</Text>
                                                    <Text style={styles.missionContent}>
                                                        {item[1][0].rest}
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
            </View>
            {
                finishedPlayingSet.includes(playVideo) ? null :
                    <View style={styles.buotonBadgeBox}>
                        <Pressable onPress={() => finishedPlaying()}>
                            <View style={ComponentsStyle.button} >
                                <Text style={ComponentsStyle.textButton}>
                                    เล่นท่านี้เสร็จแล้ว
                                </Text>
                            </View>
                        </Pressable>
                    </View>

            }

            {/* <View style={styles.centeredView}>

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
            </View> */}
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
        zIndex: 1

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
        width: "70%"
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
    buotonBadgeBox: {

        marginTop: 30,
        width: "100%",
        paddingHorizontal: 16,
        flex: 0.1,
        zIndex: 0,
        backgroundColor: colors.white,
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 32,
        shadowRadius: 32.00,
        elevation: 1,
    },
});

export default ExProgram;
