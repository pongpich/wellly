import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Switch } from 'react-native';
import { getProfanity } from "../redux/get";
import { userName } from "../redux/personalUser";
import { connect } from 'react-redux';

class OnboardingName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            switchOn: false,
            isFocused: false,
            errorInput: false,
            words: null
        };
    }

    componentDidMount() {
        this.props.getProfanity();
    }

    componentDidUpdate(prevProps, prevState) {
        const { profanity } = this.props;
        /*  if ((prevProps.profanity !== profanity) && (profanity !== "loading")) {
             let profanities =  profanity && profanity.profanities;
             const keyWord = [];
             const map1 = profanities.map((val, i ) => {
                 keyWord.push(val.word);
             });
             this.setState({
                 words: keyWord
             })
         } */
    }

    submit() {
        const { name, words } = this.state;
/*         const result = words.filter(word => word == name);

        if (result && result.length > 0) {
            this.setState({
                errorInput: true
            })
        } else {
            this.props.userName(name);
            this.props.navigation.navigate("PersonalData")
        } */

        this.props.userName(name);
        this.props.navigation.navigate("PersonalData")
    }

    render() {
        const { name, switchOn, isFocused, errorInput, word } = this.state;
        const handleFocus = () => this.setState({ isFocused: true })
        const handleBlur = () => this.setState({ isFocused: false })
        /*  console.log("word",word); */
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <View style={{ justifyContent: "center", textAlign: "center", flex: 1, paddingHorizontal: 20 }}>
                    <View>
                        <Text style={{ fontFamily: "Prompt-Bold", fontSize: 24, justifyContent: "center", marginBottom: 10 }}>อยากให้เราเรียกคุณว่าอะไร?</Text>
                    </View>

                    <View>
                        <TextInput style={
                            errorInput === true ? styles.inputError : isFocused === true ? styles.inputIsFocused : styles.input}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            numberOfLines={6}
                            maxLength={50}
                            placeholder='ชื่อของคุณ'
                            autoCapitalize='none'
                            onChangeText={(name) => this.setState({ name })}
                        />
                        <View style={styles.error}>
                            {
                                errorInput === true ?
                                    <Text style={styles.errorText}>ชื่อต้องเป็นคำที่สุภาพ</Text>
                                    : null
                            }
                        </View>
                    </View>
                    <Text style={{ textAlign: "right" }}>
                        {name.length}/50
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                    <Text>ฉันยอมรับ
                        <Text style={{ color: 'blue' }}
                            onPress={() => Linking.openURL('http://google.com')}>
                            เงื่อนไขและข้อตกลง
                        </Text>
                        การใช้งาน{"\n"} WELLLY
                    </Text>
                    <Switch
                        value={switchOn}
                        onValueChange={(value) => this.setState({ switchOn: value })}
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
                            <Pressable s style={styles.buttonGrey} >
                                <Text style={styles.textButtonGrey}>ถัดไป</Text>
                            </Pressable>
                    }
                </View>
            </SafeAreaView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
    },
    areaViewButton: {
        justifyContent: 'flex-end',
        marginTop: 20,
        width: "100%",
        alignItems: "center",
    },
    input: {
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#C2D2E7",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        position: "relative",
        alignContent: "center"
    },
    inputIsFocused: {
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#3762FC",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        position: "relative",
        alignContent: "center"
    },
    inputError: {
        height: 56,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 8,
        borderColor: "#D43A3A",
        color: "#2A323C",
        backgroundColor: "#FFFFFF",
        fontFamily: "Prompt-Light",
        position: "relative",
        alignContent: "center"
    },
    errorText: {
        color: "#D43A3A",
        alignItems: "flex-start",
        fontFamily: "Prompt-Light"
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

const mapStateToProps = ({ getData, personalDataUser }) => {
    const { profanity } = getData;
    const { username } = personalDataUser;
    return { profanity };
};

const mapActionsToProps = { getProfanity, userName };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(OnboardingName);


