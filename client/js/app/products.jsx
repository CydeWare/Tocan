import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, View, } from 'react-native';
export default function Products() {
    return (<View style={styles.wholebody}>
      <Link href={"/products"}></Link>
      
    </View>);
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
    wholebody: {
        backgroundColor: "rgb(135,117,169)",
    },
    linkbtn: {
        backgroundColor: "rgb(251,251,251)"
    }
});
