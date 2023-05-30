import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';


class C4 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
        };
    }

    handleLoad = () => {
        this.setState({ loading: false });
    };

    handleError = () => {
        this.setState({ loading: false, error: true });
    };

    renderImg(img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/exercise/${img_index}.png`
        const { loading, error } = this.state;
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={(size === 'md') ? styles.boxImage : styles.boxImage2}>
                    {
                        loading &&
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={require('../../assets/images/icon/ImageArticle.png')}
                            resizeMode='stretch'
                        />}
                    {error && <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        source={require('../../assets/images/icon/ImageArticle.png')}
                        resizeMode='stretch'
                    />}
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        onLoad={this.handleLoad}
                        onError={this.handleError}
                        source={{ uri: imgUrl }}
                        resizeMode='stretch'
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.scrollViewbox} >
                {
                    this.renderImg('Exercise_w_8', 'md')
                }
                <Text style={styles.title}>
                    Flexibility
                </Text>
                <Text style={styles.content}>
                    is one of the health-related components of physical fitness, which is essential to everyone. Flexibility affects the ability to move. Thus, a lack of flexibility will likely cause improper movement and increase the risk of injuries.
                </Text>
                <Text style={styles.title}>
                    Flexibility training
                </Text>
                <Text style={styles.content}>
                    helps movement efficiency, prevents injury, and improves overall fitness.
                </Text>
                <Text style={styles.title}>
                    Benefits of Flexibility Training
                </Text>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Improves joint motion
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Corrects muscle imbalances
                    </Text>
                </View>
                <View style={styles.viewLi1}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Reduces joint pressure
                    </Text>
                </View>
                <View style={[styles.viewLi1, { marginBottom: 40 }]}>
                    <Text style={styles.li}>{"\u2B24" + " "}</Text>
                    <Text style={[styles.content2]} >
                        Relieves joint stiffness, especially for people with diabetes. Thus, flexible training should be prioritized for these people.
                    </Text>
                </View>

            </View>
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center",
        width: "100%"

    },
    li: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 5
    },
    titleLi: {
        marginTop: 10,
        color: colors.grey1,
        fontSize: 6
    },
    viewLi: {
        paddingLeft: 16,
        flexDirection: "row"
    },
    viewLi1: {
        marginLeft: 8,
        flexDirection: "row"
    },
    viewLi2: {
        marginLeft: 32,
        flexDirection: "row",
    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    title2: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },

    tableEx: {
        marginLeft: 16,
        marginTop: 32,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
    },
    content: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    content1: {
        fontFamily: "IBMPlexSansThai-SemiBold",
        fontSize: 15,
        color: colors.grey1
    },
    content2: {
        marginLeft: 8,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    boxImage: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 400 : 208
    },
    boxImage2: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 327,
        height: (deviceHeight > 1023) ? 1100 : 276,
        marginBottom: 40
    },
})


export default C4;