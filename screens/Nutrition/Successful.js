import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Animated, Image, StatusBar, statusBarTransition } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';



class Successful extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: null,

        };
    }

    componentDidMount() {
        const { number } = this.props;
        this.setState({
            number: number,
        })
    }

    render() {
        const { number } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.headBox}>

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headBox: {
        width: "100%",
        height: 118,
        backgroundColor: colors.persianBlue
    }
});



export default Successful;