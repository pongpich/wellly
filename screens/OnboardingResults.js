import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class OnboardingResults extends Component {

    onboarding_A1() {
        return(
            <LinearGradient
            style={styles.container}
            colors={['#22B967', '#FFFFFF','#FFFFFF']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.areaView}>
                <View style={styles.areaViewIcon}>
                    <Image source={require('../assets/images/icon/generic_A.png')} />
                    <Text style={styles.text_1}>คุณมีสุขภาพร่างกาย</Text>
                    <Pressable style={styles.buttonStatus}>
                        <Text style={styles.textStatus}>ปกติดี</Text>
                    </Pressable>
                    <View style={styles.areaViewText}>
                        <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม จะช่วยรักษาสุขภาพให้ดียิ่งขึ้น</Text>
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
        return(
            <LinearGradient
            style={styles.container}
            colors={['#22B967', '#FFFFFF','#FFFFFF']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.areaView}>
                <View style={styles.areaViewIcon}>
                    <Image source={require('../assets/images/icon/generic_A.png')} />
                    <Text style={styles.text_1}>คุณมีสุขภาพร่างกาย</Text>
                    <Pressable style={styles.buttonStatus}>
                        <Text style={styles.textStatus}>ปกติดี</Text>
                    </Pressable>
                    <View style={styles.areaViewText}>
                        <Text style={styles.text_2}>การคุมอาหารและออกกำลังกายตามโปรแกรม จะช่วยรักษาสุขภาพให้ดียิ่งขึ้น</Text>
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
        return (
            <>
                {
                    this.onboarding_A1()
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
    buttonStatus: {
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
    textStatus: {
        color: "#FFFFFF",
        fontSize: 24,
        fontFamily: "Prompt-Bold",
    },
    areaViewText: {
        width: "70%",
        alignItems: "center"
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
        alignItems:"center"
        
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

export default OnboardingResults;