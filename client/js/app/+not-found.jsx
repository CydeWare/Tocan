import { View, StyleSheet, Text } from "react-native";
import { Link, Stack } from "expo-router";
export default function NotFoundScreen() {
    return (<>
            <Stack.Screen options={{ title: "Oops! Not Found" }}></Stack.Screen>
            <View style={styles.container}>
                <Text style={styles.title}>Error 404, page not found!</Text>
                <Link href="/" style={styles.button}>
                    Go back to Homepage!
                </Link>
            </View>
        </>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#25292e"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    button: {
        fontSize: 20,
        textDecorationLine: "underline",
        color: "white"
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    }
});
