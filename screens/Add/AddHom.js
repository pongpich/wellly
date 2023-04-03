import React, { Component } from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback } from 'react-native';

export class AddHom extends Component {
    componentDidMount() {
        this.props.navigation.navigate("Add");
    }

    render() {
        return (
            <Text>Text</Text>
        )
    }
}

export default AddHom