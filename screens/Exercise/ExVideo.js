import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions, Pressable, ScrollView } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Modal from "react-native-modal";
export default class ExVideo extends Component {
    render() {
        return (
            <View style={[styles.centeredView,]}>
                <View style={styles.centeredView2}>
                    <Pressable onPress={() => clickPlayExample()}>
                        <Image
                            source={require('../../assets/images/icon/close_white.png')}
                            style={{
                                width: 54, height: 54, zIndex: 2, position: "relative",

                            }}
                        />
                    </Pressable>
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    >
                    </Video>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    centeredView2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 12
    }
})