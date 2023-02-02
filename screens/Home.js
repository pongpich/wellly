import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
import { logoutUser } from "../redux/auth";
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class Home extends Component {
    componentDidMount() {
        const { user } = this.props;

        if (!user) {
            this.props.navigation.navigate("Login");
        }
    }

    componentDidUpdate(prevProps) {
        const { user } = this.props;
        if ((prevProps.user !== user) && (!user)) {
            this.props.navigation.navigate("Login");
        }
    }

    render() {
        return (
            <View>
                <StatusBar
                /*   animated={false}
                  backgroundColor="blue"
                  /*  barStyle="default" */
                /*  showHideTransition={statusBarTransition} */
                /*   hidden={hidden} */
                />
                <Pressable /* style={ComponentsStyle.button} */ onPress={() => this.props.navigation.navigate("Page1")} >
                    <Text /* style={ComponentsStyle.textButton} */>home </Text>
                </Pressable>
                <Pressable onPress={() => this.props.logoutUser()} >
                    <Text >Logout </Text>
                </Pressable>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        /*         backgroundColor: 'red', */
    },
    buttonsContainer: {
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
});

const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user };
};

const mapActionsToProps = { logoutUser };

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withTranslation()(Home));


