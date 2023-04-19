import React, { Component } from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';


class Pdpa extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headText}>การยินยอมและเงื่อนไข</Text>
                <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
                    <ScrollView>
                        <Text style={styles.text}>
                            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                        </Text>
                        <Text style={[styles.text, { marginTop: 24 }]}>
                            The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.
                        </Text>

                    </ScrollView>
                </View>
            </View>
        )
    }
}
const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: colors.white
    },
    headText: {
        marginHorizontal: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 24,
    },
    text: {
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: 16,
    }
});

export default Pdpa; 