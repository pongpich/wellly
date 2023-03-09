import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';

const data = Array.from({ length: 30 });


const ExProgram = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [playVideo, setPlayVideo] = React.useState(1);

    const clickPlayVide = (e) => {
        setPlayVideo(e)
    }

    return (
        <View style={styles.centered}>
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
                                        <View key={i + "vd"} style={playVideo == i + 1 ? styles.rowProgramPlay : styles.rowProgram}>
                                            <View style={i + 1 == 1 ? styles.imageProgramViewSucceed : styles.imageProgramView} key={i + "vd2"}>
                                                <Image
                                                    style={{ height: 80, width: 140, zIndex: 1, opacity: 0.3, borderRadius: 8 }} key="i+ v1ig"
                                                    source={require('../../assets/images/exercise/Alternating.png')}
                                                />
                                            </View>
                                            <View style={styles.programData} key="i+ vd2">
                                                <Text style={[styles.missionHead, i + 1 == 1 ? { color: colors.positive1 } : { color: null }]} key="i+ v6t">Core + Balance Training</Text>
                                                <Text style={styles.missionContent} key="i+ v7t">
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
        </View>
    )
}


const deviceHeight = Math.round(Dimensions.get('window').height);
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        backgroundColor: "white",

    },
    video: {
        alignSelf: 'center',
        width: deviceWidth,
        height: 200,
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
    }

});

export default ExProgram;