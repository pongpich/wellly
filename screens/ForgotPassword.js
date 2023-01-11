import React, { Component } from 'react';
import { Alert, Modal, StyleSheet, Text, Button,Pressable, View } from "react-native";

 class ForgotPassword extends Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile screen</Text>
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        width:"100%"

    },
});


export default ForgotPassword;