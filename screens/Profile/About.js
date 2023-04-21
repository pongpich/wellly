import React, { Component } from 'react';
import { Alert, Modal, SafeAreaView, StyleSheet, Text, Image, Linking, Dimensions, Pressable, View } from "react-native";
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class About extends Component {

    render() {
        const { t } = this.props;
        return (
            <View style={ComponentsStyle.containerWhite}>
                <View style={ComponentsStyle.viewStyle}>
                    <View style={ComponentsStyle.viewStyle_1}>
                        <View style={styles.imageContextual}>
                            <Image
                                style={{ width: 90, height: 90 }}
                                source={require('../../assets/images/logo/Frame_4.png')}
                            />
                            <Text style={styles.textForgotPass}>Wellly</Text>
                        </View>
                        <View style={styles.hrefViewTel}>
                            <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('tel:086-899-9089')}>
                                <Image
                                    style={{ marginTop: 10, marginRight: 10 }}
                                    source={require('../../assets/images/icon/phone.png')}
                                />
                                <View>
                                    <Text style={styles.textHref}>{t('tel')}</Text>
                                    <Text style={styles.textHref_2}>086-899-9089</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.hrefView}>
                            <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('mailto:human@email.com')}>
                                <Image
                                    style={styles.IconEmail}
                                    source={require('../../assets/images/icon/email.png')}
                                />
                                <View style={styles.textViewEmail}>
                                    <Text style={styles.textHref}>{t('email')}</Text>
                                    <Text style={styles.textHref_2}>human@email.com</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}
const devicehHeight = Math.round(Dimensions.get('window').height);
//        marginTop: (devicehHeight > 668) ? "20%" : "10%",
const styles = StyleSheet.create({
    imageContextual: {
        marginTop: (devicehHeight > 668) ? 28 : 10,
        /*  marginTop: 24, */
        width: "100%",
        alignItems: "center"
    },
    textForgotPass: {
        textAlign: "center",
        marginTop: 16,
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textForgotPass_2: {
        textAlign: "center",
        width: "80%",
        marginTop: 8,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    hrefViewTel: {
        width: "100%",
        marginTop: 26,
        /*  marginTop: 40, */
        backgroundColor: colors.grey6,
        borderRadius: 8,
        flexDirection: "row"
    },
    hrefView: {
        width: "100%",
        marginTop: 16,
        backgroundColor: colors.grey6,
        borderRadius: 8,
        flexDirection: "row"
    },
    buttonContact: {
        padding: 16,
        flexDirection: "row"
    },
    IconEmail: {
        paddingTop: 16,
    },
    textViewEmail: {
        marginLeft: 16
    },
    textHref: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textHref_2: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    viewButton: {
        width: "100%",
        marginBottom: 40,
    }
});


export default (withTranslation()(About));