import React, { Component } from 'react';
import { Alert, Modal, SafeAreaView, StyleSheet, Text, Image, Linking, Button, Pressable, View } from "react-native";
import colors from '../constants/colors';
import ComponentsStyle from '../constants/components';

class ForgotPassword extends Component {
  render() {
    return (
      <SafeAreaView style={ComponentsStyle.containerWhite}>
        <View style={ComponentsStyle.viewStyle}>
          <View style={ComponentsStyle.viewStyle_1}>
            <View style={styles.imageContextual}>
              <Image
                style={styles.entryImage}
                source={require('../assets/images/icon/contextual.png')}
              />
              <Text style={styles.textForgotPass}>ลืมรหัสผ่าน</Text>
              <Text style={styles.textForgotPass_2}>ติดต่อฝ่ายบุคคลบริษัทของคุณเพื่อทำการตั้งค่ารหัสผ่านใหม่</Text>
            </View>
            <View style={styles.hrefViewTel}>
              <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('tel:086-899-9089')}>
                <Image
                  style={{ marginTop: 10, marginRight: 10 }}
                  source={require('../assets/images/icon/phone.png')}
                />
                <View>
                  <Text style={styles.textHref}>โทร</Text>
                  <Text style={styles.textHref_2}>086-899-9089</Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.hrefView}>
              <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('mailto:human@email.com')}>
                <Image
                  style={styles.IconEmail}
                  source={require('../assets/images/icon/email.png')}
                />
                <View style={styles.textViewEmail}>
                  <Text style={styles.textHref}>อีเมล</Text>
                  <Text style={styles.textHref_2}>human@email.com</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={ComponentsStyle.viewStyle_2}>
            <View style={styles.viewButton}>
              <Pressable style={ComponentsStyle.button} onPress={() => this.props.navigation.goBack()}>
                <Text style={ComponentsStyle.textButton}>กลับ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
      /*  <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
         <View>
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
               <Image
                 style={{ marginTop: 10, marginRight: 10 }}
                 source={require('../assets/images/icon/phone.png')}
               />
               <View>
                 <Text style={styles.textHref}>โทร</Text>
                 <Text style={styles.textForgotPass_2}>086-899-9089</Text>
               </View>
             </Pressable>
           </View>
           <View style={styles.hrefView}>
             <Pressable style={styles.buttonContact} onPress={() => Linking.openURL('mailto:test@email.com')}>
               <Image
                 style={{ marginTop: 10, marginRight: 10 }}
                 source={require('../assets/images/icon/email.png')}
               />
               <View><Text style={styles.textHref}>อีเมล</Text>
                 <Text style={styles.textForgotPass_2}>test@email.com</Text>
               </View>
             </Pressable>
           </View>
         </View>
         <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
           <View style={styles.buttonView}>
             <Pressable style={styles.buttonNext} onPress={() => this.props.navigation.goBack()}>
               <Text style={styles.textNext}>กลับ</Text>
             </Pressable>
           </View>
         </View>
       </View> */
    )
  }
}

const styles = StyleSheet.create({
  imageContextual: {
    marginTop: 24,
    width: "100%",
    alignItems: "center"
  },
  textForgotPass: {
    textAlign: "center",
    marginTop: 24,
    fontSize: ComponentsStyle.fontSize20,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  textForgotPass_2: {
    textAlign: "center",
    width: "80%",
    marginTop: 8,
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Regular",
  },
  hrefViewTel: {
    width: "100%",
    marginTop: 40,
    backgroundColor: colors.neutralGrey6,
    borderRadius: 8,
    flexDirection: "row"
  },
  hrefView: {
    width: "100%",
    marginTop: 16,
    backgroundColor: colors.neutralGrey6,
    borderRadius: 8,
    flexDirection: "row"
  },
  buttonContact: {
    padding: 16,
    flexDirection: "row"
  },
  IconEmail: {
    paddingTop: 16,
  },
  textViewEmail: {
    marginLeft: 16
  },
  textHref: {
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Bold",
  },
  textHref_2: {
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Regular",
  },
  viewButton: {
    width: "100%",
    marginBottom: 40,
  }
});


export default ForgotPassword;