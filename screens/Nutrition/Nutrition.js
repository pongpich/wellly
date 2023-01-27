import React, { Component } from 'react';
import { View, StyleSheet, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Text, Linking, KeyboardAvoidingView, Platform, Dimensions, Modal, InputAccessoryView, Keyboard } from 'react-native';

export default class Nutrition extends Component {
    render() {
        return (
            <Pressable /* style={ComponentsStyle.button} */ onPress={() => this.props.navigation.navigate("Page2")} >
                <Text /* style={ComponentsStyle.textButton} */>Nutrition</Text>
            </Pressable>

        )
    }
}
