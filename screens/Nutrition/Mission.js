import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, TouchableWithoutFeedback } from 'react-native';
import colors from '../../constants/colors';
import { getNutritionMission } from "../../redux/get";
import ComponentsStyle from '../../constants/components';
import { connect } from 'react-redux';
import i18next from 'i18next';


class Mission extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);
        this.state = {
            mission: null,
        };
    }
    componentDidMount() {
        const { nutrition_mission } = this.props;
        let missionData = (i18next.language === "th") ? JSON.parse(nutrition_mission.mission) : JSON.parse(nutrition_mission.mission_eng);
        this.setState({
            mission: missionData
        })

    }
    render() {
        const { mission } = this.state;
        return (
            <View style={styles.container}>
                {
                    mission && mission.map((value, i,) => {

                        return (
                            <View style={{ flexDirection: "row", marginRight: 16 }} key={i + "iv"}>
                                <Text style={styles.textMission} key={i + "iv2"}> {value.index}. </Text>
                                <Text style={styles.textMission} key={i + "iv3"}> {value.title}</Text>
                            </View>


                        )

                    })
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        position: "relative",
        backgroundColor: colors.white

    },
    textMission: {
        color: colors.grey1,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    }
});


const mapStateToProps = ({ getData }) => {

    const { nutrition_mission, statusGetNutritionMission } = getData;
    return { nutrition_mission, statusGetNutritionMission };
};

const mapActionsToProps = { getNutritionMission };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Mission);