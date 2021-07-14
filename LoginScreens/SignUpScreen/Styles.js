import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    root: {
        backgroundColor: '#222831',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },

    appNameContainer: {
        flex: 1,
        marginTop: 120,
        flexDirection: 'row',
    },

    appName: {
        color: '#eeeeee',
        fontFamily: 'Copperplate',
        fontSize: 45,
    },

    inputContainer: {
        flex: 5,
        marginTop: 40,
        flexDirection: 'column'
    },

    inputBox: {
        height: 45,
        width: 300,
        marginTop: 2,
        marginBottom: 8,
        borderColor: '#eeeeee',
        borderWidth: 1,
        fontSize: 18,
        color: '#eeeeee'
    },

    buttonsContainer: {
        flex: 2,
        marginTop: 80,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    button: {
        backgroundColor: '#00adb5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 15
    },

    buttonText: {
        color: '#eeeeee',
        fontSize: 15
    },

    defaultText: {
        color: '#eeeeee',
        fontSize: 15
    }
});