import { Link } from "expo-router";
import React from "react";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";

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
} from "react-native";
import SearchIcon from "@/assets/images/SearchIcon";

// const API_ENDPOINT = "https://fakestoreapi.com/products";

export default function ProductDetailsScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("Props: ", props);
  // const route = props?.route;
  const routeFromUsed = useRoute();
  console.log("Route from used: ", routeFromUsed);
  console.log("ID from routeFromUsed: ", routeFromUsed.params.id);
  // const { id } = route?.params;
  const id = routeFromUsed?.params?.id;

  useEffect(() => {
    const API_ENDPOINT = `https://fakestoreapi.com/products/${id}`;
    setIsLoading(true);
    fetchData(API_ENDPOINT);
    // console.log("ID: ", id);
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);

      console.log(json);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
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
    <ScrollView style={styles.wholebodyall}>
      <View style={styles.wholebody}>
        <Link href="/">
          <View style={styles.navbar}>
            <Text
              style={styles.navbarText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {" "}
              {"<"} {data.title}
            </Text>
          </View>
        </Link>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: data.image }}
            resizeMode="contain"
          />
        </View>
        {/* <Text style={styles.textId}>{data.id}</Text> */}
        <Text style={styles.textTitle}>{data.title}</Text>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.textPrice}>{data.price}</Text>
        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.textDescription}>{data.description}</Text>
      </View>
    </ScrollView>
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
    backgroundColor: "#25292e",
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
  navbar: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    marginBottom: 20,
    zIndex: 1057,
  },
  navbarText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
    color: "black",

    textAlign: "left",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
  },
  wholebody: {
    backgroundColor: "white",
    padding: 10,
    zIndex: 1007,
  },
  wholebodyall: {
    backgroundColor: "white",
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
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 10,
    maxWidth: "95%",
    padding: 10,
  },
  image: {
    // margin: "auto",
    width: "60%",
    // height: "100%",
    height: "100%",
    zIndex: 1000,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    // width: "100%",
    // height: "100%"
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

    textAlign: "left",
  },
  descriptionLabel: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "900",
    color: "black",
    textAlign: "left",
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
    marginLeft: 10,
    fontWeight: "600",
    color: "black",

    textAlign: "left",
  },
  padded: {
    padding: 10,
  },

  productContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    paddingBottom: 570,
  },
});
