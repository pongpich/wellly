import colors from '../constants/colors';
import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Math.round(Dimensions.get('window').width);

const fontSize14 = 14;
const fontSize16 = 16;
const fontSize20 = 20;
const fontSize24 = 24;
const fontSize40 = 40;


export default StyleSheet.create({
    // อื่น
    fontSize14,
    fontSize16,
    fontSize20,
    fontSize24,
    fontSize40,

    fontRegular16: {
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        width: "100%",

    },
    containerWhite: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        backgroundColor: colors.white
    },
    viewStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
    },
    viewStyle_1: {
        width: "100%",
        paddingHorizontal: 16,
    },
    viewStyle_2: {
        width: "100%",
        paddingHorizontal: 16,

    },
    viewInput: {
        width: "100%",
        alignItems: "center",
        marginTop: "15%"

    },
    //
    input: {
        width: "100%",
        height: 56,
        borderWidth: 1,
        /*   padding: 16, */
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: colors.grey4,
        color: colors.grey1,
        backgroundColor: colors.white,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    inputIsFocused: {
        width: "100%",
        height: 56,
        borderWidth: 2,
        /*         padding: 16, */
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: colors.persianBlue,
        color: colors.grey1,
        backgroundColor: colors.white,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    inputError: {
        width: "100%",
        height: 56,
        borderWidth: 2,
        /*  padding: 16, */
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: colors.negative1,
        color: colors.grey1,
        backgroundColor: colors.white,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    viewTextError: {
        width: "100%",
        marginTop: 8,
    },
    textError: {
        width: "100%",
        color: colors.negative1,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Regular",
    },
    button: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.persianBlue,
        borderRadius: 24,
        height: 48
    },
    textButton: {
        color: colors.white,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    buttonGrey: {
        width: "100%",
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.grey4,
        borderRadius: 24,
        height: 50,
    },
    textButtonGrey: {
        color: colors.grey3,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    buttonWhite: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.white,
        borderRadius: 24,
        height: 48,
        borderColor: colors.persianBlue,
        borderWidth: 2
    },
    textButtonWhite: {
        color: colors.persianBlue,
        fontSize: fontSize16,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    headBox: {
        width: "100%",
        height: 118,
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 32,
        backgroundColor: colors.persianBlue,
        flexDirection: "row"
    },
    areaNumber: {
        height: 56,
        width: 56,
        borderColor: colors.secondary_MayaBlue,
        borderWidth: 4,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    areaNumberText: {
        fontSize: 32,
        color: colors.white,
        fontFamily: "IBMPlexSansThai-Bold",
    },
    nutritionMission: {
        marginLeft: 8
    },
    missionHead: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: fontSize14,
        color: colors.grey4
    },
    missionHeading: {
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: fontSize24,
        color: colors.white
    },
    contentBox: {

        backgroundColor: colors.white,
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: "relative",

    }

});


