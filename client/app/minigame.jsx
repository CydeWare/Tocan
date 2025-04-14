import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction, removeCoinsAction } from "../store/productAction.js";
import { addCoinsAction, removeProductAction } from "../store/productAction.js";

export default function MiniGameScreen() {
  const [clicked, setClicked] = useState(false);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 3) + 1
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.productData.coins);

  console.log(randomNumber);

  const crackEgg = () => {
    setClicked(true);

    //Gold
    if (randomNumber === 1) {
      dispatch(addCoinsAction(100));
    }
    //Silver
    if (randomNumber === 2) {
      dispatch(addCoinsAction(50));
    }
    //Bronze
    if (randomNumber === 3) {
      dispatch(addCoinsAction(20));
    }
  };

  const getAnswer = (randNumber) => {
    if (randNumber === 1) {
      return "a gold coin!";
    }
    if (randNumber === 2) {
      return "a silver coin!";
    }
    if (randNumber === 3) {
      return "a bronze coin!";
    }
  };

  const renderImage = (randNumber) => {
    if (randNumber === 1) {
      return (
        <Image
          source={require("../assets/images/gold-coin.png")}
          style={styles.image3}
        />
      );
    }
    if (randNumber === 2) {
      return (
        <Image
          source={require("../assets/images/silver-coin.png")}
          style={styles.image3}
        />
      );
    }
    if (randNumber === 3) {
      return (
        <Image
          source={require("../assets/images/bronze-coin.png")}
          style={styles.image3}
        />
      );
    }
  };

  const renderReward = (randNumber) => {
    if (randNumber === 1) {
      return "100 coins have been added to your balance.";
    }
    if (randNumber === 2) {
      return "50 coins have been added to your balance.";
    }
    if (randNumber === 3) {
      return "20 coins have been added to your balance.";
    }
  };

  return (
    <View style={styles.wholebody}>
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.navigate("index")}>
          <Text
            style={styles.navbarText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {" "}
            {"<"} Minigame
          </Text>
        </Pressable>
      </View>

      <View style={styles.allCoinsContainer}>
        <Image
          source={require("../assets/images/gold-coin.png")}
          style={styles.image}
        />
        <Text style={styles.textTitle2}>100</Text>
        <Image
          source={require("../assets/images/silver-coin.png")}
          style={styles.image}
        />
        <Text style={styles.textTitle2}>50</Text>
        <Image
          source={require("../assets/images/bronze-coin.png")}
          style={styles.image}
        />
        <Text style={styles.textTitle2}>20</Text>
      </View>

      {clicked === true ? (
        <View>
        <Text style={styles.textTitle3}>Congratulations!</Text>
        <Text style={styles.textTitle3}>
          {`You got ${getAnswer(
          randomNumber
        )}`}</Text>
        </View>
      ) : (
        <Text style={styles.textTitle}>
          Click on the egg to get your prize!
        </Text>
      )}

      {clicked === true && renderImage(randomNumber)}

      <Pressable onPress={() => crackEgg()}>
        <View style={clicked ? styles.eggContainer2 : styles.eggContainer}>
          <Image
            source={
              clicked === true
                ? require("../assets/images/egg-broken.png")
                : require("../assets/images/egg-full.png")
            }
            style={styles.eggImage}
          />
        </View>
      </Pressable>

      {clicked === true && (
        <Text style={styles.textTitleReward}>{renderReward(randomNumber)}</Text>
      )}
    </View>
  );
}

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
    textAlign: "center",
    marginTop: 30,
    
    // marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textTitleReward: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    marginTop: 55,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    padding: 15,
  },
  textTitle2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    marginLeft: 5,
    marginRight: 20,
  },
  textTitle3: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    // marginLeft: 5,
    // marginRight: 20,
  },

  navbar: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
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
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
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
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 1000,
  },
  image3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    zIndex: 1000,
  },
  // image2: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   zIndex: 1000,
  // },
  eggImage: {
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
    paddingBottom: 25,
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
    padding: 10,
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

  buyText: {
    fontSize: 18,
    color: "white",
  },

  allCoinsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
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
    paddingBottom: 570,
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
    width: "30%",
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
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  coinsText: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 10,
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
    width: 400,
    height: 300,
    zIndex: 1005,
    marginTop: 45,
  },
  eggContainer2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    backgroundColor: "white",
    width: 400,
    height: 300,
    zIndex: 1005,
    marginTop: 5,
  },
});
