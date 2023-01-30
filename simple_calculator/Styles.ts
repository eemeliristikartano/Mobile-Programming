import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    textInput: {
        borderColor: 'black',
        width: 200,
        borderRadius: 10,
        borderWidth: 1
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 200,
        marginTop: 20,
    }
});