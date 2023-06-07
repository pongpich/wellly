import React, { Component } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, TouchableOpacity, Image, Text, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ComponentsStyle from '../../constants/components';
import { StackActions } from '@react-navigation/native';
import colors from '../../constants/colors';
import { routeName } from "../../redux/personalUser";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class ConfirmSubmit extends Component {

    componentDidMount() {

        const { route } = this.props;
        this.props.routeName(route.name);
    }

    render() {
        const { t } = this.props;
        return (
            <LinearGradient
                style={ComponentsStyle.container}
                colors={['#59CBE4', 'white', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.container}>
                    <View style={styles.viewImage}>
                        <Image style={{ width: 144, height: 144 }} source={require('../../assets/images/icon/Generic_d.png')} />
                        <Text style={styles.textHead}>{t('great')}</Text>
                        <Text style={styles.textConter}>{t('evaluation_results')}</Text>
                    </View>
                    <View>
                        <View style={styles.buttonView}>
                            <View style={{ width: "48%" }}>
                                <Pressable onPress={() => this.props.navigation.dispatch(StackActions.replace('Home'))}  >
                                    <View style={ComponentsStyle.buttonWhite} >
                                        <Text style={ComponentsStyle.textButtonWhite}>
                                            {t('back_home')}
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                            <View style={{ width: "48%", marginLeft: 16 }}>
                                <Pressable onPress={() => this.props.navigation.navigate("ReportFeedback")}  >
                                    <View style={ComponentsStyle.button} >
                                        <Text style={ComponentsStyle.textButton}>
                                            {t('view_assessment_results')}
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>




                        </View>
                    </View>

                </View>

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "space-between"
    },
    viewImage: {
        alignItems: "center",
        marginTop: 120

    },
    textHead: {
        marginTop: 24,
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textConter: {
        marginTop: 8,
        color: colors.grey2,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    buttonView: {

        flexDirection: "row",
        marginBottom: 40,
        marginHorizontal: 16,
        alignItems: "center",
    }
});

const mapStateToProps = ({ personalDataUser }) => {
    const { route_name } = personalDataUser;
    return { route_name };
};

const mapActionsToProps = { routeName };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(ConfirmSubmit));

