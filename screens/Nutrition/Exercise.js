import React, { useState } from "react";
import {
    View,
    Text,
    LayoutAnimation,
    StyleSheet,
    UIManager,
    Platform
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(value => !value);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    return (
        <>
            <TouchableOpacity onPress={toggleOpen} style={styles.heading} activeOpacity={0.6}>
                {title}
                <Icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} size={18} color="black" />
            </TouchableOpacity>
            <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
                {children}
            </View>
        </>
    );
};




const App = () => {
    const title = (
        <View>
            <Text style={styles.sectionTitle} >Profile</Text>
        </View>
    )
    const body = (
        <View>
            <Text style={styles.sectionTitle} >Profile</Text>
            <Text style={styles.sectionDescription} >Address, Contact</Text>
            <Text style={styles.sectionTitle} >Profile</Text>
            <Text style={styles.sectionDescription} >Address, Contact</Text>
        </View>
    )
    return (
        <>
            <View style={styles.container}>
                <Accordion title={title} >
                    {body}
                </Accordion>
            </View>
            <View style={[styles.container, { backgroundColor: 'red' }]} >
                <Accordion title={title} >
                    {body}
                </Accordion>
            </View>
        </>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    safeArea: {
        flex: 1,
    },
    heading: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    hidden: {
        height: 0,
    },
    list: {
        overflow: 'hidden'
    },
    sectionTitle: {
        fontSize: 16,
        height: 30,
        marginLeft: '5%',
    },
    sectionDescription: {
        fontSize: 12,
        height: 30,
        marginLeft: '5%',
    },
    divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
    },
});

