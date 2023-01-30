import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, StatusBar, statusBarStyle, statusBarTransition, hidden, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';
export default class Home extends Component {
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
