import { Link } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {addProductAction, removeCoinsAction} from "../store/productAction.js";
import { addCoinsAction, removeProductAction } from "../store/productAction.js";

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
  Alert,
} from "react-native";
import SearchIcon from "@/assets/images/SearchIcon";

// const API_ENDPOINT = "https://fakestoreapi.com/products";

export default function ProductDetailsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [alreadyBought, setAlreadyBought] = useState(false);
  const [insufficientCoins, setInsufficientCoins] = useState(false);
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(state => state.productData.products);
  const coins = useSelector(state => state.productData.coins);

  // console.log("Props: ", props);
  // const route = props?.route;
  const routeFromUsed = useRoute();
  console.log("Route from used: ", routeFromUsed);
  console.log("ID from routeFromUsed: ", routeFromUsed.params.id);
  // const { id } = route?.params;
  const id = routeFromUsed?.params?.id;

  useEffect(() => {
    const API_ENDPOINT = `https://fakestoreapi.com/products/${id}`
    setIsLoading(true);
    fetchData(API_ENDPOINT);
    // console.log("ID: ", id);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);

      products.map((product) => {
        if(product.id === json.id){
          return setAlreadyBought(true);
        }
      })

      console.log(json);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setIsLoading(false);
    }
  };

  const buy = () => {
    if(coins < data.price){
      return setInsufficientCoins(true);
    } else {
      setInsufficientCoins(false);
    }

    dispatch(addProductAction(data));
    dispatch(removeCoinsAction(data.price));
    showAlert(data.title, Math.round((coins - data.price) * 100) / 100, true);
    navigation.navigate("products");
  }

  const sell = () => {
    dispatch(removeProductAction(data.id));
    dispatch(addCoinsAction(data.price));
    showAlert(data.title, Math.round((coins + data.price) * 100) / 100, false);
    navigation.navigate("products");
  }

  const showAlert = (title, coins, buy) => {
    Alert.alert(
      "Success!",
      `${title} was ${buy ? "bought" : "sold"} succesfully! Your current balance is ${coins}`,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );
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
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.wholebody} scrollEnabled={true}>
      
      <View style={styles.navbar}>
      <Pressable onPress={() => navigation.navigate("index")}>
        <Text style={styles.navbarText} numberOfLines={1} ellipsizeMode="tail"> {"<"} {data.title}</Text>
        </Pressable>
      </View>
      
      {/* <View style={styles.padded}> */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: data.image }} resizeMode="contain"  />
        </View>
        {/* <Text style={styles.textId}>{data.id}</Text> */}
        <Text style={styles.textTitle}>{data.title}</Text>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.textPrice}>${data.price}</Text>
        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.textDescription}>{data.description}</Text>
{/* 
      </View> */}
      {/* <Pressable style={alreadyBought === true ? styles.buyButton : styles.sellButton} onPress={alreadyBought === true ? () => buy() : () => sell()}>
        {alreadyBought === true ? <Text style={styles.sellText}>Sell</Text> : <Text style={styles.buyText}>Buy</Text>}

      
        
      </Pressable> */}

      {insufficientCoins === true && <Text style={styles.textWarning}>Insufficient Coins!</Text>}

      {alreadyBought === false ? <Pressable style={styles.buyButton} onPress={() => buy()}>
        <Text style={styles.buyText}>Buy</Text>
      </Pressable> : <Pressable style={styles.sellButton} onPress={() => sell()}>
        <Text style={styles.sellText}>Sell</Text>
      </Pressable>}
    </ScrollView>
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
  textName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
    color: "black",

    textAlign: "left",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    textAlign: "left",
    marginBottom: 20
  },
  textPrice: {
    fontSize: 17,

    fontWeight: "600",
    color: "black",

    textAlign: "left",
  },
  priceLabel: {
    fontSize: 17,
    // marginLeft: 10,
    fontWeight: "900",
    color: "black",
    marginTop: 20,
    textAlign: "left",
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "900",
    color: "black",
    textAlign: "left",
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    padding: 15,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  
  navbar: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%"
  },
  navbarText: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",

    textAlign: "left",
    paddingBottom: 5,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
  },
  wholebody: {
    backgroundColor: "white",
    padding: 15,
    paddingTop: 5,
    flexGrow: 1,
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
    marginTop: 10,
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3, 
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 10,
    maxWidth: "95%",
    padding: 10,
  },
  image: {
    // margin: "auto",
    width: "60%",
    // height: "100%",
    // height: "100%",
    height: 300,
    zIndex: 1000,
    flex: 1,
    resize: "container",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    // height: "100%"
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 25
  },  
  textName: {
    fontSize: 20,

    fontWeight: "600",
    color: "black",

    textAlign: "left",

  },
  textPrice: {
    fontSize: 17,

    fontWeight: "600",
    color: "black",
 
    textAlign: "left",
    marginTop: 5,
  },
  textId: {
    fontSize: 24,
    marginLeft: 12,
    fontWeight: "600",
    color: "black",
    maxWidth: "99%",
    textAlign: "left",
    flexWrap: "wrap",
  },
  textDescription: {
    fontSize: 18,

    fontWeight: "600",
    color: "black",
    textAlign: "left",
    marginTop: 5,
  },
  padded: {
    padding: 10
  },

  productContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    paddingBottom: 570,
  },

  buyButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgb(116, 55, 233)",
    color: "white",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  sellButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
    color: "white",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "rgb(116, 55, 233)",
  },
  sellText: {
    fontSize: 18,
    color: "rgb(116, 55, 233)",
    fontWeight: "bold",
  },

  buyText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  textWarning: {
    fontSize: 20,
    fontWeight: "600",
    color: "red",
    textAlign: "center",
    marginTop: 10,
    
  },
  

});
