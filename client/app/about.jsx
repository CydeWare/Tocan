import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen(){

    return (
        <View style={styles.container}>
            <Text style={styles.text}>About Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgb(116, 55, 233)"
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "white"
    },
    
  });