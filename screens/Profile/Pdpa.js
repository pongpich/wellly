import { t } from 'i18next';
import React, { Component } from 'react'
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView, TouchableWithoutFeedback, TextInput, OpenURLButton, Linking } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Pdpa_th from './Pdpa_th';
/* import Pdpa_eng from './Pdpa_eng'; */


class Pdpa extends Component {
    render() {
        return (
            <>
                <Pdpa_th />
            </>
        )
    }
}
export default Pdpa; 