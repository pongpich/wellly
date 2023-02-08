import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';

export default class Submitted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: null,
            numbeQuzi: null
        };
    }


    componentDidMount() {
        // รับ   params จาก  route
        const { data, numbeQuzi } = this.props.route.params;
        this.setState({
            quiz: data,
            numbeQuzi: numbeQuzi
        })

        setTimeout(() => {
            this.props.navigation.navigate("QuizAnswer")
        }, 3000);
    }


    render() {
        const { quiz, numbeQuzi } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{ width: 120, height: 120 }}
                        source={require('../../assets/images/icon/Generic_Q.png')}
                    />
                    {
                        quiz && quiz == "ถูกทุกข้อ" ?
                            <Text style={styles.text}>เยี่ยมมาก! ถูกทุกข้อ</Text>
                            :
                            <Text style={styles.text}>ตอบถูก {numbeQuzi} ข้อ</Text>
                    }
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.grey1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        marginTop: 16,
        color: colors.white,
        fontSize: ComponentsStyle.fontSize24,
        fontFamily: "IBMPlexSansThai-Bold",
    }
});
