import React, { Component } from "react";
import {
    View,
    Text,
    LayoutAnimation,
    StyleSheet,
    UIManager,
    Platform,
    Animated,
    Image
} from "react-native";
import { List } from 'react-native-paper';
import colors from '../../constants/colors';



export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.slideAnim = new Animated.Value(0);

        this.state = {
            expanded: true,


        };
    }


    handlePress = () => {
        const { expanded } = this.state;
        this.setState({
            expanded: !expanded
        })
    };

    render() {
        const { expanded } = this.state;
        console.log('expanded', expanded);
        return (
            <>
                <List.Section /* title="Accordions" */ style={{ backgroundColor: colors.grey7 }}>

                    <List.Accordion style={{ backgroundColor: colors.grey7 }}

                        title={<Text style={{ color: "red" }}>Accordion title</Text>}
                        right={props =>
                            <List.Icon {...props} icon={({ size, color, direction }) => (
                                expanded ?
                                    <Image
                                        source={require('../../assets/images/icon/ChevronUp.png')}
                                        style={{ width: 16, height: 16 }}
                                    />
                                    :
                                    <Image
                                        source={require('../../assets/images/icon/ChevronDown.png')}
                                        style={{ width: 16, height: 16 }}
                                    />
                            )}
                            />}
                        expanded={expanded}
                        onPress={this.handlePress}>
                        <Text>
                            Whether the accordion is expanded If this prop is provided, the accordion will be
                            Whether the accordion is expanded If this prop is provided, the accordion will behave as a "controlled component". You'll need to update this prop when you want to toggle the component or on onPress.
                            have as a "controlled component". You'll need to update this prop when you want to toggle the component or on onPress.
                        </Text>
                    </List.Accordion>
                </List.Section>
            </>
        )
    }
}




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


/* const Accordion = ({ title, children }) => {
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
}; */