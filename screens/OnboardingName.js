import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Switch } from 'react-native';

export default class OnboardingName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            switchOn: false,
            setSwitchOn: false
        };
    }

    render() {
        const { name, switchOn, setSwitchOn } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <View>
                    <View>
                        <Text style={{ fontWeight: "bold", justifyContent: "center" }}>อยากให้เราเรียกคุณว่าอะไร?</Text>
                    </View>

                    <TextInput
                        multiline={true}
                        numberOfLines={6}
                        maxLength={50}
                        placeholder='ชื่อของคุณ'
                        onChangeText={(name) => this.setState({ name })}

                    />
                    <Text style={{ textAlign: "right" }}>
                        {name.length}/50
                    </Text>
                </View>

                <View>
                    <Text>ฉันยอมรับ
                        <Text style={{ color: 'blue' }}
                            onPress={() => Linking.openURL('http://google.com')}>
                            เงื่อนไขและข้อตกลง
                        </Text>
                        การใช้งาน{"\n"} WELLLY
                    </Text>
                    <Switch
                        value={switchOn}
                        onValueChange={(value) => this.setState({ setSwitchOn: value })}
                        trackColor={{ false: "#ff0000", true: "#0000ff" }}
                    />
                </View>

                <View style={styles.areaViewButton}>
                    {
                        (name.length > 0) && (switchOn == true) ?
                            <Pressable style={styles.buttonBlue} onPress={() => this.submit()} >
                                <Text style={styles.textButtonWhite}>ถัดไป</Text>
                            </Pressable>
                            :
                            <Pressable s style={styles.buttonGrey} /* onPress={() =>  this.props.navigation.navigate("HealthData")} */ >
                                <Text style={styles.textButtonGrey}>ถัดไป</Text>
                            </Pressable>
                    }
                </View>
            </SafeAreaView>


        )
    }
}
const styles = StyleSheet.create({
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
        marginBottom: 20,
    },
    textButtonWhite: {
        color: "#FFFFFF",
        fontSize: 16,
        fontFamily: "Prompt-Bold",
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
        marginBottom: 20,
    },
    textButtonGrey: {
        color: "#93A8C1",
        fontSize: 16,
        fontFamily: "Prompt-Bold",
    }
})