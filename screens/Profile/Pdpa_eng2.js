
import { t } from 'i18next';
import React, { Component } from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback, TextInput, OpenURLButton, Linking } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';


const Pdpa_eng = () => {
    // Component implementation
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headText}>{t('consent')}</Text>
                <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.text}>
                            Privacy Policy
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            1. Introduction
                            BBPF Co., Ltd ("BBPF ", "We", "Us," "Our") develops mobile health application named Wellly ("Our Products", "Wellly","This App"). Our application may be downloaded from the App Store, which is operated and owned by Apple Inc. and other companies within its group ("Apple"). Our Android Applications may be downloaded from Google Play, which is owned and operated by Google Inc. and other companies within its group ("Google"). Our Products offer fitness-related content, features, functionality, and other information and services including, without limitation, viral, embeddable or application/device-based features and related technology, also when accessed via the Internet, mobile or other devices (collectively, "Our Services"). We develop Our Products for informational purposes only. You must ALWAYS consult your physician or doctor before starting any fitness and/or nutrition program. By agreeing to these Terms and Conditions, you confirm that you are solely responsible for your state of health.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            2. Acceptance of Terms and Conditions
                            By using Our Products and Services you accept these Terms and Conditions. If you do not accept these Terms and Conditions, you may not use Our Products and Services. BBPF reserves the right to amend these Terms and Conditions at any time without prior notice. The up-to-date version of these Terms and Conditions will be available on the official website of Wellly. (https://wellly.co/) And any changes will come into effect immediately upon posting. By continuing to use our products you agree to amended terms and conditions.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            3. Intellectual Property
                            The texts, graphics, designs, logos, button icons, images, data compilations and information ("Content") contained in Our Products and Services are Intellectual Property of BBPF (or belongs to it) and are protected by copyright laws. No trademarks may be used without prior written consent of BBPF. Except to identify the products or services associated therewith. Our Products and all related software, and all patent rights (including patent applications and disclosures), copyrights, trade secrets, know-how, and any other intellectual property rights therein or relating thereto (including derivative works), are and shall remain the exclusive property of BBPF or its licensors.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            4. Legality of Use
                            By using Our Products, you hereby warrant that:
                            · All information contained in any submission by you is either owned by you or rights have been granted to you permitting you to disseminate the information as set forth in these Terms and Conditions; and
                            · The information contained in any submissions by you does not infringe on the intellectual property rights of others, including but not limited to, copyright, trademark, patent, or trade secret rights. You accept full responsibility, assume all risk, and waive and/or release Us from any direct or indirect loss, injury, claim or damage arising from your use of Our Products, whether or not such use was appropriately supervised and regardless of whether you were negligent in such use. By using Our Products, you attest and verify that you are physically and mentally able to use Our Products, and knowingly accept and are fully aware of all risks associated with their use.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            5. Representations and Warranties, Limitation of Liability
                            BBPF makes no representations regarding: (a) the credentials of anyone using our Services and/or Products as part of any health care or medical plan of care or plan of treatment ("POC"); (b) the suitability of the exercises included in any such POC; (c) the viability, medical soundness or efficacy of any such POC; or (d) the overall health or medical benefits you might derive from using our services and products or POC which incorporates our services and products. The use of any software or hardware offered by BBPF is no substitute for the consultation by the user of a specialized doctor. Our Services and Products are provided "as is" without any warranties, expressed or implied, including but not limited to the implied warranties of merchantability, used for a particular purpose, or non-infringement. BBPF makes no representation or warranty that the information contained in our Services and/or Products will be current, timely, complete, accurate or error-free. To the extent that the law does not permit the disclaimer of warranties, all content accessible in our services and products, or any other web site to which our services and products link, is warranted only to the minimum amount legally required. In no event shall BBPF be liable to any party for any direct, indirect, special or other consequential damages for any use of this in our services and products, or on any linked web site, including, without limitation, any lost profits, business interruption or otherwise. BBPF shall be liable as currently provided by law, regardless of the statutory basis of such liability (pre-contractual, contractual, tort) only if BBPF has caused certain damage will fully or with gross negligence. In the event of slight negligence, BBPF shall not be liable to other businesses and shall be accountable to consumers only for personal damages. BBPF shall not be responsible to businesses for damages, financial losses, lost profits or damages resulting from claims of third parties.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            6. Privacy Policy
                            Please read the privacy policy available at <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://wellly.co/')}>https://wellly.co/</Text>
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            7. Maintenance
                            BBPF is not responsible for any outages or service interruptions that occur from time-to-time when using Our Products, including those due to software, hardware or power failures, or issues at the wireless carrier level. In addition, BBPF is not responsible for the products and services provided by others, including any User's mobile handsets or wireless data networks. BBPF, in its sole discretion, reserves the right to add or remove operating systems based on commercial factors it deems relevant such as use, adoption, and appeal of the operating system.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            8. Content Created by Users and Rights to such Content
                            The user consents that as a result of the automatic evaluation of the way the user uses Our Products, he/she may be exposed to certain offers and/or marketing messages tailored to such user. The user consents that marketing measures may also be taken in relation to created content, which is marketed by BBPF. The user grants BBPF the irrevocable, free, non-exclusive and unlimited right to use all content generated, transmitted, saved and published by such user. Accordingly, BBPF shall have the right to use all content, irrespective of the type of usage. This shall include the right to change and edit such content unless such changes or edits impair material interests of the user. In this connection, the user waives, to the extent legally permissible, all intellectual property rights. BBPF does not claim ownership of any content created by users and will not supervise such content.  You further hereby license to Us the right to make all content uploaded by you also available to other users, provided that this is done within the scope of the contractual purpose (for example, by reporting your copyright protected messages to other users.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            9. Termination for good cause
                            Irrespective of the foregoing provisions, either party has the right to terminate contracts for a good reason. In particular, we have the right to terminate the user agreement or your subscription with immediate effect and to cancel your user account if you have seriously or repeatedly breached provisions of the user agreement and/or these General Terms and Conditions or if you are behind with payment despite demand
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            10.   User agreement
                            · You may cancel your user account at any time for any or no reason and thereby also terminate your user agreement in its entirety.
                            · To do so, you must send an e-mail to your corporate. Then your company shall send US an email to xxxxxxxxxx so that We can erase your user data. Please note that after your user account has been canceled all content and workout performance data will or may be deleted by Us, and you will no longer have access to content you have already purchased.
                            · If at the time you cancel your account you still have a valid subscription, any amount your corporate may already have paid for the subscription will not be refunded – either in whole or in part.
                            · We have the right to terminate the user agreement for any or no reason in text form with two weeks’ prior notice, however not before the end of the minimum contract term or the end of the applicable renewal term of your subscription.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            11. Governing Law
                            These Terms of Use are governed by and construed under Thai laws, without giving effect to any principles of conflicts of law. For any action at law or in equity relating to the arbitration provision of these Terms of Use, the Excluded Disputes or if you opt out of the agreement to arbitrate, you agree to resolve any dispute you have with BBPF exclusively in a Supreme court located in Thailand, and to submit to the personal jurisdiction of the courts located in Thailand for litigating all such disputes. If any provision of these Terms of Use is held to be unlawful, void, or for any reason unenforceable during arbitration or by a court of competent jurisdiction, then that provision will be deemed severable from these Terms of Use and will not affect the validity and enforceability of any remaining provisions. BBPF's failure to insist upon or enforce strict performance of any provision of these Terms will not be construed as a waiver of any provision or right. No waiver of any of these Terms will be deemed a further or continuing waiver of such term or condition or any other term or condition. BBPF reserves the right to change this dispute resolution provision, but any such changes will not apply to disputes arising before the effective date of the amendment. This dispute resolution provision will survive the termination of any or all of your transactions with BBPF.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            12. GENERAL DISCLAIMER
                            Please review the following User Agreement carefully before using Wellly. You should also read our Privacy Policy.
                        </Text>
                        <Text style={[styles.text, { marginTop: 24, marginBottom: 100 }]}>
                            13. MEDICAL DISCLAIMER
                            This App provides only information, is not medical or treatment advice and may not be treated as such by the user. As such, Wellly may not be relied upon for the purposes of medical diagnosis or as a recommendation for medical care or treatment. The information on This App is not a substitute for professional medical advice, diagnosis or treatment. All information, including but not limited to, text, graphics, images, videos, and other material, contained on or available through This App is for general information purposes only.
                        </Text>

                    </ScrollView>
                </View>
            </View>
        </>
    );
};


const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white
    },
    headText: {
        marginHorizontal: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
    },
    text: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
    }
});


export default Pdpa_eng;