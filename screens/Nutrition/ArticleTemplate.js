import React, { useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import Carbohydrate from '../../components/knowledge/Carbohydrate';

const ArticleTemplate = ({ navigation: { goBack } }) => {
    const [statusBarColor, setStatusColor] = useState("light");

    return (
        <View style={styles.container}>
            <View style={{ height: 44, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                {
                    statusBarColor === "light" ?
                        <StatusBar barStyle="light-content" />
                        :
                        <StatusBar barStyle="dark-content" />
                }

            </View>
            <View style={{ height: 48, width: "100%", backgroundColor: statusBarColor === "light" ? colors.persianBlue : colors.white }}>
                <View style={{ marginLeft: 16 }}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image
                            source={statusBarColor === "light" ? require('../../assets/images/icon/chevron.png') : require('../../assets/images/icon/caret.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                onScroll={(event) => {
                    const scrolling = event.nativeEvent.contentOffset.y;
                    console.log("scrolling", scrolling);
                    if (scrolling > 150) {
                        setStatusColor("dark");
                    } else {

                        setStatusColor("light");
                    }
                }}
                scrollEventThrottle={16}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }} >
                    <Carbohydrate />
                </View>
            </ScrollView>
        </View>
    );
}

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    heading: {
        marginTop: 16,
        flexDirection: "row",
        marginHorizontal: 16,

    },
    boxHeadingActive: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.persianBlue
    },
    boxHeading: {
        alignItems: "center",
        justifyContent: "center",
        height: 49,
        width: "50%",
        paddingTop: 8,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: colors.grey3
    },
    sectionActive: {
        color: colors.persianBlue,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        width: "100%",
        textAlign: "center",
    },
    section: {
        color: colors.grey3,
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        textAlign: "center",
    },
    studyContent: {
        justifyContent: "space-between",
        marginHorizontal: 16,
        flex: 1,
        marginTop: 16,
        position: "relative",
    },
    boxButtonWhite: {
        height: "auto",
        width: "100%",
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: -15,
        },
        shadowOpacity: 0.58,
        /*   shadowRadius: 10.00, */
        elevation: 0,
        marginBottom: (deviceHeight != 844) ? 40 : 0
    },
    textHead: {
        marginTop: 24,
        fontSize: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    textContent: {
        fontSize: 16,
        color: colors.grey1,
        fontFamily: "IBMPlexSansThai-Regular",
    },

});
export default ArticleTemplate;