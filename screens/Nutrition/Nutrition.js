import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, Image, ImageBackground, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import ComponentsStyle from '../../constants/components';
import { AntDesign } from '@expo/vector-icons';


const HEADER_MAX_HEIGHT = 500;
const HEADER_MIN_HEIGHT = 10;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


const data = Array.from({ length: 30 });

const Nutrition = () => {

    const animatedScrollYValue = useRef(new Animated.Value(0)).current;
    const headerHeight = animatedScrollYValue.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.20],
        extrapolate: 'clamp',
    });
    let name = "การเลือกอาหารและโภชนาการถือเป็นเรื่องสำคัญอย่างมากสำหรับผู้ที่"
    console.log("11", name.length)

    return (
        <View style={styles.fill}>
            <Animated.ScrollView
                style={styles.fill2}
                contentContainerStyle={styles.scrollViewContent}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }])}
            >
                <View style={styles.scrollViewContent}>
                    <View style={styles.missionText}>
                        <Text style={styles.mission}>ภารกิจล่าสุด</Text>
                        <Image
                            style={{ height: 24, width: 24, zIndex: 1 }}
                            source={require('../../assets/images/icon/History.png')}
                        />
                    </View>
                    {data.map((_, i) => (
                        <View key={i} style={styles.row}>
                            <View style={styles.numberView}>
                                <Text style={styles.number}>{i + 1}</Text>
                            </View>
                            <View style={styles.missionData}>
                                <Text style={styles.missionHead}>เริ่มต้นดีมีชัยไปกว่าครึ่ง ARE U READY ??</Text>
                                <Text style={styles.missionContent}>
                                    การเลือกอาหารและโภชนาการถือเป็นเรื่องสำคัญอย่างมากสำหรับผู้ที่ออก
                                </Text>
                                {/*  <View style={styles.notifiedRed}>
                                    <Text style={styles.notifiedTextRed}>
                                        วันสุดท้าย
                                    </Text>
                                </View> */}
                                <View style={styles.notifiedYellow}>
                                    <Text style={styles.notifiedTextYellow}>
                                        ภารกิจที่ยังทำไม่เสร็จ
                                    </Text>
                                </View>
                            </View>

                        </View>
                    ))}
                </View>
            </Animated.ScrollView>
            <Text style={styles.nutritionText}>โภชนาการ</Text>
            <Animated.View opacity={headerHeight} style={[styles.header]}>
                <View style={styles.imageView}>
                    <ImageBackground
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                        source={require('../../assets/images/logo/Sample.png')}
                    />
                </View>
            </Animated.View>
        </View>
    );
};

Nutrition.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
const deviceHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: colors.neutralGrey6
    },
    fill2: {
        marginTop: 107,
        flex: 1,
        zIndex: 1,


    },

    nutritionText: {
        marginHorizontal: 16,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize24,
        color: colors.grey1,
        marginHorizontal: 16,
        marginTop: 60,
        opacity: 1,
        zIndex: 10,
        position: 'absolute'

    },
    row: {
        maxHeight: 160,
        height: "auto",
        marginBottom: 16,
        marginHorizontal: 16,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
    },
    missionText: {
        justifyContent: "space-between",
        paddingHorizontal: 16,
        flexDirection: "row",
        marginBottom: 16,
    },
    mission: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    missionData: {
        marginHorizontal: 16,
        width: 231

    },
    missionHead: {
        fontSize: ComponentsStyle.fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.grey1,
    },
    missionContent: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.grey2,
    },
    header: {
        position: 'absolute',
        width: "100%",
    },
    number: {
        fontSize: ComponentsStyle.fontSize20,
        fontFamily: "IBMPlexSansThai-Bold",
        color: colors.mayaBlue,

    },
    numberView: {

        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.mayaBlue20
    },
    imageView: {
        width: "100%",
        height: 500

    },
    scrollViewContent: {
        marginTop: (deviceHeight > 688) ? "52%" : "35%",
        opacity: 1

    },
    notifiedRed: {
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        width: 71,
        height: 25,
        borderRadius: 16,
        backgroundColor: colors.negative2,
        paddingHorizontal: 8,
        paddingVertical: 3,

    },
    notifiedTextRed: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.negative1,
    },
    notifiedYellow: {
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        height: 25,
        borderRadius: 16,
        backgroundColor: colors.warning2,
        paddingHorizontal: 8,
        paddingVertical: 3,

    },
    notifiedTextYellow: {
        fontSize: ComponentsStyle.fontSize14,
        fontFamily: "IBMPlexSansThai-Regular",
        color: colors.warning1,
    },
});


export default Nutrition;
