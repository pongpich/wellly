import colors from './colors';
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    // อื่น
    buttonLogin: {
        marginTop: 20,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: colors.persianBlue,
        borderRadius: 24,
        height: 50
    },
    textButtonLogin: {
        color: colors.white,
        fontSize: 16,
        fontFamily: "Prompt-Bold"
    },
    textErrorInput: {
        color: "#3762FC",
        fontSize: 16,
        fontFamily: "Prompt-Bold"
    },
    textForgotPassword: {
        color: "#3762FC",
        fontSize: 16,
        fontFamily: "Prompt-Bold",
    },
});


