
import { t } from 'i18next';
import React, { Component } from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback, TextInput, OpenURLButton, Linking } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';


const Pdpa_eng = () => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.headText}>{t('consent')}</Text>
                <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.head}>
                            Privacy Policy
                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            This Privacy Policy is made by BBPF Co.,Ltd and affiliated companies  (the “Company”)
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}The Company would like to inform you who contacts the Company via websites, applications, social medias, or other channels that it is necessary to collect, compile and use your personal data for the Company’s service in accordance with this Privacy Policy. By contacting and disclosing your personal data to the Company for the purposes of communication, coordination, and/or provision of the Company's services to you, it deems that you agree and accept to be bound by and comply with this Privacy Policy.
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "} Personal data being processed, the Company may obtain your personal data from various channels as follows:
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}1. Directly from you through the Company's communications with you;
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}2.Indirectly, via a referral from a third party to whom you may grant consent to disclose your personal data to the Company; or
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}3.Automatically collected through means named “Cookie” or other similar means when you access the Company's website and/or use the services by electronic devices such as mobile phones, computers, laptop, and etc.
                        </Text>

                        <Text style={[styles.head, { marginTop: 16 }]}>
                            The personal data that the Company is necessary to collect, compile, use and process under this Privacy Policy are as follows:
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}1.Your full name, including your related information or your representative information (in the case that you are contacting us in the name of a juristic person) which may include your identity information document.
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}2.Contact information such as telephone number, email or social media account information.
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}3. Other personal data that you may provide to the Company during the communications such as information on matters of inquiry, interest information or any other personally identifiable information you provide to the Company directly through various communication channels.
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}4.In case of communication via the website, may include your technical information such as IP Address, Cookies, including information about your browsing behavior.
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}5.Sensitive personal information includes racial or ethnic origin, political opinions, religious or philosophical beliefs, a person’s sex life or sexual orientation, criminal record, medical and health-related data, data that reveals trade-union membership, genetic and biometric data used to identify an individual or others which can adversely affect the privacy or welfare as imposed by the personal data protection committee.

                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            Purpose of the Personal Data Processing and Using, the Company is necessary to collect, compile and use the Job Applicant’s personal data for the following purposes:
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}1.For the purpose of providing services, this may include registering and maintaining an online or offline account, designing you personalized program based on data that you fill in, and tracking your fitness activity. The Company is necessary to collect and store your information so that you can review it on the Platform and track your progress.
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}2.For the management of communications with which you have communicated with the Company, such as answering questions, providing relevant information as requested and required, managing complaints, or responding to comments you make directly to the Company via various communication channels, including continuous coordination, service agreement execution, and/or performance of rights and obligations that the Company and you may agree on;

                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}3.For the performance of legal obligations to which the Company may be subject to certain conditions. This may include, but is not limited to, performing duties associated with the preparation of accounting documents and taxes in connection with any services provided by the Company to you;
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}4.For the purpose of building and improving business relationships, including enhancing the service that the Company provides for your benefit, which the Company may collect and/or use your personal data for the purpose of control, assurance of service, management analysis and resolution of business-related issues, including, but not limited to, employee training and future service improvement planning;
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}5.For the purpose of protecting and defending the Company's legal rights in the event that you and the Company have a dispute; and
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}6.Subject to an explicit consent granted to the Company such as marketing and newsletter communications, the Company may process the Personal Data for the purposes as defined in the consent.
                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            Retention Period of Personal Data, in order to perform in accordance with the purposes described above, the Company is necessary to collect, compile and process your personal data according to the following period:
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}1.For personal data processing for the purpose of providing services, an agreement execution and/or the performance of rights and duties under the agreement, the Company is necessary to process your personal data as long as the company has a duty to provide services to you;
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}2.For personal data processing for the purpose of performing the duties according to applicable laws, the Company is necessary to process your personal data for a period of time specified by applicable laws;
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}3.For personal data processing for the purpose of building and improving business relationships and/or improving the service, the Company reserves the right to retain that personal data to the extent that the Company may have business necessity. The Company warrants that the retention of the personal data will not unreasonably affect the rights of the data subject;
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}4.For personal data processing for the sake of protection and fighting for legitimate rights of the Company, the Company has a necessity to keep such personal data according to the prescription defined by applicable laws; and
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}5. In case you give consent to the Company to process your personal data for specific purposes, the Company will process your personal data until you withdraw such consent.
                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            Disclosure of the personal data, generally, your personal data will not be disclosed, except for the circumstance that the Company would need to disclose to the following person:
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "} 1.Your information shall be disclosure or revealed to only relevant staffs or teams which are required for the purpose of providing services. Those staffs or teams will only be provided with access to your information as is reasonably necessary.
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "} 2.External service providers of the Company engaged for providing supporting services to the Company in providing services to you, including consultants of the Company. Such disclosure of the personal data to these third parties shall be done in accordance with the purposes and only on a need-to-know basis; or

                        </Text>
                        <Text style={[styles.text]}>
                            {"  "} 3.Government, regulatory authorities or courts that the Company may be subject to an order, law or judgment to disclose the personal data.
                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            The Company undertakes to implement appropriate personal data security measures to prevent any unauthorized and unlawful access, modification, amendment, or disclosure. The Company commits to reviewing these measures on a regular basis to ensure its compatibility to the standards and to applicable laws.
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}Data subject rights, the Company respects your rights as the data subject under applicable laws. You can contact to the Company to exercise the rights which are
                        </Text>

                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "}1. The rights to withdraw consent
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}2.The right to access
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}3.The right request a copy of the personal data
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}4.The right to correct the personal data
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "} 5.The right to object to any processing of the personal data
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "} 6.The right to request for data portability in the event that the Company stores the personal data in the format which is readable or commonly used by automated tools or equipment including the right to transfer such personal data to other data controllers
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}7.The right to request for the deletion or de-identification of the personal data upon there is no necessity to process
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}8.The right to request for suspension of the use of the personal data
                        </Text>
                        <Text style={[styles.text]}>
                            {"  "}9.The right to file a complaint.
                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            Law enforcement
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            {"  "} You have agreed and acknowledged that this private policy is legally enforceable under the Thai Laws. Thai courts have jurisdiction to adjudicate any disputes. {"\n"}
                            Announced on xxxxxx

                        </Text>
                        <Text style={[styles.head, { marginTop: 16 }]}>
                            Contact information
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            Data Protection Officer
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            Khun Tanakorn Numrubporn
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            Address: 429/129 Songpraha Road, Donmuang Sub-district, Donmuang District, Bangkok 10210
                        </Text>
                        <Text style={[styles.text, { marginTop: 16 }]}>
                            Email: 	tanakorn@planforfit.com
                        </Text>
                        <Text style={[styles.text, { marginTop: 16, marginBottom: 100 }]}>
                            Phone Number: 083-066-4647, 093-883-2339
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
    head: {

        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
    },
    text: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
    }
});


export default Pdpa_eng;