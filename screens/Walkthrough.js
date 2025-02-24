import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Pressable, SafeAreaView, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import ComponentsStyle from '../constants/components';
import { getProfanity } from "../redux/get";
import { updateDisplayName } from "../redux/auth";
import colors from '../constants/colors';
import Swiper from 'react-native-swiper';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class Walkthrough extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swiperIndex: 0,

        }
    }

    componentDidMount() {
        const { user } = this.props;

        const display_name = user && user.display_name;
        const personal_data = user && user.personal_data;
        const health_data = user && user.health_data;

        if (!display_name) {
            this.props.navigation.navigate("OnboardingName")
        } else if (!personal_data) {
            this.props.navigation.navigate("PersonalData")
        } else if (!health_data) {
            this.props.navigation.navigate("HealthData");
        } else {
            this.props.navigation.navigate("Home");
        }
    }

    handleChange(fieldName, text) {
        /*  this.refs.swiper.scrollBy(text); */
        /* this.setState({
            [fieldName]: text
        }) */
        if (text == null) {
            this.refs.swiper.scrollBy(1);
        } else {
            /*  this.setState({
                 [fieldName]: text
             }) */
            this.refs.swiper.scrollBy(2);
        }

    }

    onSwipe = (index) => {

        this.setState({
            swiperIndex: index
        })
        /*  this.refs.swiper.scrollBy(1); */
    }

    swiper() {
        const { swiperIndex } = this.state;
        const { t } = this.props;

        return (
            <>
                <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false}
                    index={swiperIndex}
                    loop={false}
                    bounces={false}
                    automaticallyAdjustContentInsets={true}
                    onIndexChanged={this.onSwipe}
                    ref={'swiper'}
                /*   dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 70, }} />}
                  activeDot={<View style={{ backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 70, }} />} */
                >
                    <View style={styles.slide1} >
                        <Image
                            style={styles.entryImage}
                            source={require('../assets/images/icon/walkthrough_1.png')}
                        />
                        <Text style={styles.textWellly}>{t('welcome_to_Wellly')}</Text>
                        <View style={styles.areaText}>
                            <Text style={styles.textWellly_2}>{t('health_app')}</Text>
                        </View>
                    </View>
                    <View style={styles.slide1} >
                        <Image
                            style={styles.entryImage}
                            source={require('../assets/images/icon/walkthrough_2.png')}
                        />
                        <Text style={styles.textWellly}>{t('health_better_way')}</Text>
                        <View style={styles.areaText}>
                            <Text style={styles.textWellly_2}>{t('start_exercising')}</Text>
                        </View>
                    </View>
                    <View style={styles.slide1}>
                        <Image
                            style={styles.entryImage}
                            source={require('../assets/images/icon/walkthrough_3.png')}
                        />
                        <Text style={styles.textWellly}>{t('proper_way')}</Text>
                        <View style={styles.areaText}>
                            <Text style={styles.textWellly_2}>{t('lets_get_started')}</Text>
                        </View>
                    </View>
                </Swiper >
            </>

        )

    }



    onChanged() {
        const { user } = this.props;

        const display_name = user && user.display_name;
        const personal_data = user && user.personal_data;
        const health_data = user && user.health_data;

        if (!display_name) {
            this.props.navigation.navigate("OnboardingName")
        } else if (!personal_data) {
            this.props.navigation.navigate("PersonalData")
        } else if (!health_data) {
            this.props.navigation.navigate("HealthData");
        } else {
            this.props.navigation.navigate("Home");
        }
    }

    render() {
        const { swiperIndex } = this.state;
        const { t } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.swiperBox}>
                    <>
                        {
                            this.swiper()

                        }
                    </>
                    <View style={styles.circle}>
                        <View style={swiperIndex == "0" ? styles.circleActive : styles.circleDot} />
                        <View style={swiperIndex == "1" ? styles.circleActive : styles.circleDot} />
                        <View style={swiperIndex == "2" ? styles.circleActive : styles.circleDot} />
                    </View>
                </View>

                <View style={styles.buttonView}>
                    {swiperIndex < 2 ?
                        <>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.handleChange("swiperIndex", null)} >
                                <Text style={ComponentsStyle.textButton} >{t('next')}</Text>
                            </Pressable>
                            <Pressable style={styles.buttonCross} onPress={() => this.handleChange("swiperIndex", 2)} >
                                <Text style={styles.textCross}>{t('cross')}</Text>
                            </Pressable>

                        </> :
                        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 28 }}>
                            <Pressable style={ComponentsStyle.button} onPress={() => this.onChanged()} >
                                <Text style={ComponentsStyle.textButton} >{t('lets_start')}</Text>
                            </Pressable>
                        </View>
                    }
                </View>
            </View >
        )
    }
}


const devicehHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    wrapper: {
        marginTop: (devicehHeight > 668) ? "30%" : "10%",

        marginBottom: 0
    },
    slide1: {
        width: "100%",
        height: "auto",
        justifyContent: 'center',
        alignItems: 'center',
    },
    entryImage: {
        width: 280,
        height: 280
    },
    boxView: {
        alignItems: 'center',

    },
    swiperBox: {
        flex: 0.9,

    },
    welllyView: {
        position: "relative",
        height: "100%",

    },
    textWellly: {
        marginTop: 40,
        textAlign: "center",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 20,
        color: colors.grey1
    },
    areaText: {
        width: "70%",
    },
    textWellly_2: {
        marginTop: 8,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey1,
        fontSize: 16,
        textAlign: "center",
    },
    circle: {
        flexDirection: "row",
        while: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -8,

    },
    circleActive: {
        textAlign: "center",
        width: 8,
        height: 8,
        backgroundColor: colors.persianBlue,
        border: "solid 5px darkcyan",
        borderRadius: 100,
        marginLeft: 8,
    },
    circleDot: {
        width: 8,
        height: 8,
        backgroundColor: colors.grey4,
        border: "solid 5px darkcyan",
        borderRadius: 100,
        marginLeft: 8,

    },

    buttonView: {
        paddingHorizontal: 16,
        height: 120
    },
    buttonCross: {
        marginTop: 21,
        width: "100%",
    },
    textCross: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 16,
        color: colors.persianBlue,
        textAlign: "center",
    },


});


const mapStateToProps = ({ getData, authUser }) => {
    const { profanity } = getData;
    const { user, statusUpdateDisplayName } = authUser;
    return { profanity, user, statusUpdateDisplayName };
};

const mapActionsToProps = { getProfanity, updateDisplayName };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Walkthrough));

