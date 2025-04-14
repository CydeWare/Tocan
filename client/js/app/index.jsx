import { Link } from 'expo-router';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
const API_ENDPOINT = "https://fakestoreapi.com/products";
export default function TabOneScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT);
    }, []);
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);
            console.log(json.results);
            setIsLoading(false);
        }
        catch (err) {
            setError(err.message);
            console.log(err);
            setIsLoading(false);
        }
    };
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    if (isLoading) {
        return (<View style={styles.container}>
        <ActivityIndicator size={'large'} color="#5500dc"></ActivityIndicator>
      </View>);
    }
    if (error) {
        return (<View style={styles.container}>
        <Text>Error, Please check your internet connection</Text>
      </View>);
    }
    return (<SafeAreaView style={styles.wholebody}>
      <TextInput placeholder="Search" clearButtonMode='always' style={styles.searchBox} autoCapitalize='none' autoCorrect={false} value={searchQuery} onChangeText={(query) => handleSearch(query)}/>
      <Link style={styles.linkbtn} href={"/products"}>My Products</Link>
      {/* <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            <View>
  
            </View>
          }}
        /> */}
      
    </SafeAreaView>);
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
        flex: 1,
        marginHorizontal: 20
    },
    linkbtn: {
        backgroundColor: "rgb(251,251,251)",
        padding: 15,
    },
    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white"
    },
});
