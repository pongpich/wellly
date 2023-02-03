import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Animated, Image, StatusBar, statusBarTransition } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { missionNumber } from "../../redux/personalUser";
import { connect } from 'react-redux';


class Successful extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberMission: null,
            study: true

        };
    }

    componentDidMount() {
        // รับ   params จาก  route
        const { id } = this.props.route.params;

        this.setState({
            numberMission: id,
        })
    }



    studyContentSection = () => {
        return (
            <View style={styles.studyContent}>
                <Image style={{ width: "100%", height: 208 }}
                    source={require('../../assets/images/logo/ng1.png')}
                />
            </View>

        )
    }


    render() {
        const { numberMission, study } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={ComponentsStyle.headBox}>
                    <View style={ComponentsStyle.areaNumber}>
                        <Text style={ComponentsStyle.areaNumberText}>
                            {numberMission}
                        </Text>
                    </View>
                    <View style={ComponentsStyle.nutritionMission}>
                        <Text style={ComponentsStyle.missionHead}>ภารกิจโภชนาการ</Text>
                        <Text style={ComponentsStyle.missionHeading}>Energy พร้อม!!!</Text>
                    </View>
                </View>
                <View style={ComponentsStyle.contentBox}>
                    <View style={styles.heading}>
                        <View style={styles.boxHeadingActive}>
                            <Text style={styles.sectionActive}> ความรู้</Text>
                        </View>
                        <View style={styles.boxHeading}>
                            <Text style={styles.section}> ภารกิจ</Text>
                        </View>
                    </View>
                    {
                        study ? <>{this.studyContentSection()}</> : null
                    }
                </View >
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        marginTop: 16,
        flexDirection: "row",
        marginHorizontal: 16,

    },
    boxHeadingActive: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,

        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.grey3
    },
    sectionActive: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        width: "100%",
        textAlign: "center",
    },
    section: {
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center",
    },
    studyContent: {
        marginHorizontal: 16,
        marginTop: 16
    }


});

const mapStateToProps = ({ personalDataUser }) => {
    const { number } = personalDataUser;
    return { number };
};

const mapActionsToProps = { missionNumber };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Successful);

