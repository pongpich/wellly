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

        };
    }

    componentDidMount() {
        // รับ   params จาก  route
        const { id } = this.props.route.params;

        this.setState({
            numberMission: id,
        })
    }


    render() {
        const { numberMission } = this.state;

        console.log("navigation",);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.headBox}>
                    <View style={styles.areaNumber}>
                        <Text style={styles.areaNumberText}>
                            {numberMission}
                        </Text>
                    </View>
                    <View style={styles.nutritionMission}>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headBox: {
        width: "100%",
        height: 118,
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 32,
        backgroundColor: colors.persianBlue,
        flexDirection: "row"
    },
    areaNumber: {
        height: 56,
        width: 56,
        borderColor: colors.secondary_MayaBlue,
        borderWidth: 4,
        borderRadius: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    areaNumberText: {
        fontSize: 32,
        color: colors.white,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    nutritionMission: {
        marginLeft: 8
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

