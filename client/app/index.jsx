import { Link } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import filter from "lodash.filter";
import _ from "lodash";

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import SearchIcon from "@/assets/images/SearchIcon";
import GridViewIcon from "@/assets/images/GridViewIcon";
import ListViewIcon from "@/assets/images/ListViewIcon";

const API_ENDPOINT = "https://fakestoreapi.com/products";

export default function Home() {
  const [isGridView, setIsGridView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation();

  const coins = useSelector(state => state.productData.coins);

  useEffect(() => {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  //Fetch semua data dengan URL itu
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);
      setFullData(json);

      console.log(json);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setIsLoading(false);
    }
  };


  //Handle the search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (product) => {
      return contains(product, formattedQuery);
    });
    const filteredData2 = fullData.filter((product) => {
      return contains(product, formattedQuery);
    })
    setData(filteredData2);
  };

  const contains = ({title}, query) => {
    title = title.toLowerCase();
    console.log("title from query: " + title);

    if(title.includes(query)){
      return true;
    } 

      return false;
    
  }

  const toggleView = () => {
    setIsGridView(!isGridView); // Switch between grid and list views
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="#5500dc"></ActivityIndicator>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error, Please check your internet connection</Text>
      </View>
    );
  }

  return (
    <View style={styles.wholebody}>
      <View style={styles.padded}>
        
        <View style={styles.searchContainer}>
          <SearchIcon style={styles.searchIcon} size={30} />
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            style={styles.searchBox}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />
        </View>

        <View style={styles.coinsAndLinkContainer}>
          <Link style={styles.linkbtn} href={"/products"}>
            My Products {">"}
          </Link>

          

          <View style={styles.coinsContainer}>
            <Text style={styles.coinsNumber}>{Math.round(coins * 100) / 100}</Text>
            <Text style={styles.coinsText}>My Coins</Text>
          </View>
        </View>

      <View style={styles.eggContainer}>
        <Link href="/minigame"><Image source={require('C:/Users/Owner/Creative Cloud Files/React Native 2/expo-demo/assets/images/egg-full.png')} style={styles.eggImage}/></Link>
        
      </View>

        <View style={styles.productContainer}>
          <View style={styles.availableProductsContainer}>
          <Text style={styles.title}>Available Products</Text>
          {isGridView === false ? <Pressable onPress={() => toggleView()}><ListViewIcon /></Pressable> : <Pressable onPress={() => toggleView()}><GridViewIcon /></Pressable>}
          </View>
          {/* <View style={styles.allContainer}> */}
          <FlatList
            data={data}
            key={isGridView ? "g" : "l"}
            numColumns={isGridView ? 2 : 1}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            
            <Pressable onPress={() => navigation.navigate('productdetails', { id: item.id })}>
              <View style={isGridView ? styles.gridItem : styles.itemContainer}>
                <Image style={isGridView ? styles.image2 : styles.image} source={{ uri: item.image }} />
                <View style={{ flexWrap: "wrap", maxWidth: "87%" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.textName}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={styles.textPrice}
                  >
                    ${item.price}
                  </Text>
                </View>
              </View>
              </Pressable>
            )}
            
            contentContainerStyle={isGridView && styles.contentContainer}
                      />
            {/* </View> */}
          
        </View>
        
      </View>
      
    </View>
  );
}

/*
renderItem={({item}) => {
          {console.log("item: " + JSON.stringify(item))}
          {console.log("item id: " + item.id)}
          {console.log("item title: " + item.title)}
          <View>
            { <Image source={{uri: item.item.image}} /> }
            <View >
              <Text>{item.id}</Text>
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          </View>
        }}

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    padding: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
  },
  wholebody: {
    backgroundColor: "rgb(135,117,169)",
    flex: 1,
    height: "100%",
  },
  linkbtn: {
    backgroundColor: "rgb(251,251,251)",
    padding: 15,
    width: "41%",
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "600",
    fontSize: 20,
    borderRadius: 10,
  },
  searchBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    paddingLeft: 50,
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    maxWidth: "95%",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 1000,
  },
  eggImage: {
    width: 40,
    height: 45,
    borderRadius: 25,
    zIndex: 1000,
  },
  image2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 1000,
    margin: "auto",
  },
  image3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    zIndex: 1000,
  },
  textName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
    color: "black",
    maxWidth: "99%",
    textAlign: "left",
    flexWrap: "wrap",
  },
  textPrice: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
    color: "black",
    width: "100%",
    textAlign: "left",
    flexWrap: "wrap",
  },
  padded: {
    position: "relative",
  },

  productContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    paddingBottom: 460,
  },

  searchIcon: {
    position: "absolute",
    zIndex: 1000,
    width: 60,
    marginLeft: 10,
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  coinsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 20,
    paddingLeft: 15,
    minWidth: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Offset for the shadow
    shadowOpacity: 0.25, // Opacity
    shadowRadius: 3.84, // Blur radius
  },

  coinsNumber: {
    color: "rgb(116, 55, 233)",
    fontSize: 30,
    fontWeight: "900",
    marginRight: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 3 
  },

  coinsText: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 10
  },

  coinsAndLinkContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  eggContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "white",
    position: "absolute",
    width: 80,
    height: 80,
    right: 20,
    bottom: 253,
    zIndex: 1005,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
    borderWidth: 0.5,
    borderColor: 'black',
  },

  availableProductsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 5,
    paddingRight: 15,
  },
  gridItem: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    // maxWidth: "95%",
    width: 150,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  allContainer: {
    width: "10%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },  
});
