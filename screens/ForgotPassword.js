import React, { Component } from 'react';
import { Alert, Modal, StyleSheet, Text, Image, Linking, Button, Pressable, View } from "react-native";

class ForgotPassword extends Component {
  render() {
    return (
      <>
        <View style={styles.forgotPasswordView}>
          <Image
            style={styles.entryImage}
            source={require('../assets/images/icon/contextual.png')}
          />
          <Text style={styles.textForgotPass}>ลืมรหัสผ่าน</Text>
        </View>
        <View style={styles.areaText}>
          <Text style={styles.textForgotPass_2}>ติดต่อฝ่ายบุคคลบริษัทของคุณ{"\n"}เพื่อทำการตั้งค่ารหัสผ่านใหม่</Text>
        </View>
        <View style={styles.hrefView}>
          <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('tel:086-899-9089')}>
            <Text style={styles.textHref}>โทร{"\n"}086-899-9089</Text>
          </Pressable>
        </View>
        <View style={styles.hrefView}>
          <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('mailto:test@email.com')}>
            <Text style={styles.textHref}>email{"\n"}test@email.com</Text>
          </Pressable>
        </View>
        <View style={styles.buttonView}>
          <Pressable style={styles.buttonNext} onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.textNext}>กลับ</Text>
          </Pressable>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",

  },
  forgotPasswordView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textForgotPass: {
    marginTop: 40,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#2A323C"
  },
  textHref: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 20,
    color: "#2A323C"
  },
  areaText: {
    width: "100%"
  },
  textForgotPass_2: {
    fontFamily: "Prompt-Light",
    color: "#2A323C",
    fontSize: 16,
    textAlign: "center"
  },
  buttonView: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  hrefView: {
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonNext: {
    marginTop: 20,
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3762FC',
    borderRadius: 24,
    height: 50,
  },
  buttonContact: {
    marginTop: 10,
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#E5EEF9',
    borderRadius: 24,
    height: 100,
  },
  textNext: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center"
  },
});


export default ForgotPassword;