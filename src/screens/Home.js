import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, ImageBackground, Keyboard } from "react-native";

import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import externalStyle from "./styleSheet";
import InfoCard from "../components/InfoCard";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { debounce } from "lodash";
import SearchBarInfoCard from "../components/Searchbar";
import AsyncStorage from "@react-native-community/async-storage";
const Home = ({ navigation }) => {
  /////////////////////////////////////////////////////////
  //////// top ten button/////////////////////////////////
  const [topTenButtonText, setTopTenButtonText] = useState("More"); // topTenButtonText = "More"
  const [topTenCount, setTopTenCount] = useState(5); // topTenCount = 5
  const onMoreButtonClicked = () => {
    if (topTenCount == 5) {
      setTopTenCount(10); // setting setTopTenCount to 10
      setTopTenButtonText("Less");
      console.log("from main ");
    } else {
      setTopTenCount(5);
      setTopTenButtonText("More");
    }
  };
  /////////////////////////////////////////////////////////
  ///////////top ten data //////////////////////////////////////////
  const [isLoadingTopTen, setLoadingTopTen] = useState(true);
  const [topTen, setTopTen] = useState([]);
  useEffect(() => {
    async function fetchAutoTopTen() {
      const topTenResponse = await fetch(
        "https://esgstockapi.azurewebsites.net/hotstock"
      );
      const topTenData = await topTenResponse.json();

      setTopTen(topTenData);
      setLoadingTopTen(false);
    }

    // more functions

    fetchAutoTopTen();
    // call more here
    console.log("hi");
  }, []);
  /////////////////////////////////////////////////////////
  // search data /////////////////////////////////////////
  search = async (value, storeInState = true) => {
    console.log("search", value);
    if (value) {
      console.log("start loading");
      const searchResponse = await fetch(
        `https://esgstockapi.azurewebsites.net/search?q=${value}`
      );
      const searchData = await searchResponse.json();
      if (storeInState) {
        if (searchData == null) {
          setSearchData(["NO RESULT"]);
          console.log("null");
        } else setSearchData(searchData);
      } else {
        return searchData;
      }

      // console.log(searchData);
    }
  };

  // const [isSearching, setIsSearching] = useState(false);
  const searchHandle = useCallback(debounce(search, 500), []); //this is a fucntion
  onChangeText = (value) => {
    console.log(value);
    if (value.length > 1) {
      searchHandle(value);
      // setIsSearching(true);
    } else {
      searchHandle.cancel();
      // setIsSearching(false);
      setSearchData([]);
    }

    // setSearchData(value);
  };
  const [searchData, setSearchData] = useState([]);

  //////////////////////////////////////////////////////
  ///check keybaord is open for index///////////////////
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        // console.log("keyboard is on ");
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        // console.log("keyboard is on ");
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //////////////////////////////////////////////////////
  ////////////getting stared stocks /////////////////////////////
  const [staredData, setstaredData] = useState([]);
  const updateStarred = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("here are the keys");
      console.log(keys);

      const allFavorites = await Promise.all(
        keys.map(async (item) => {
          console.log(item);
          const data = await search(item, false);
          return data.length > 0 ? data[0] : null;
        })
      );

      setstaredData(allFavorites);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  useEffect(() => {
    updateStarred();

    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener("focus", updateStarred);
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      {/* <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer> */}
      <View style={externalStyle.header}>
        <Image
          source={require("../images/1.png")}
          style={{
            height: 10,
            width: 20,
            marginTop: 50,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 0,
            width: "100%",
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              source={require("../images/logo.png")}
              style={{
                width: 150,
                height: 150,
                marginTop: -50,
              }}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,0)", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -60,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFF",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 25,
            borderRadius: 15,
            marginTop: 25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="Search"
            placeholderTextColor="#b1e5d3"
            style={externalStyle.home_input}
            onChangeText={(text) => onChangeText(text)}
          />

          <Image
            source={require("../images/3.png")}
            style={{ height: 20, width: 20, paddingLeft: 20 }}
          />
        </View>
        {isKeyboardVisible ? (
          searchData
            .slice(0, 5)
            .map((item, index) => (
              <SearchBarInfoCard
                navigation={navigation}
                stock={item.name || item.company}
                ticker={item.ticker}
                esgrating={item.esgrating}
                industry={item.group}
                esgwarning={item.rating}
                key={index}
              />
            ))
        ) : (
          <Text></Text>
        )}
      </LinearGradient>
      {isKeyboardVisible ? (
        <View style={{ marginTop: "95%" }}></View>
      ) : (
        <Text></Text>
      )}

      <View style={externalStyle.home_component}>
        <View style={{ width: "50%" }}>
          <Text style={externalStyle.home_title}>Most Popular Stock</Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <View style={externalStyle.more_buttom}>
            <TouchableOpacity onPress={() => onMoreButtonClicked()}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
              >
                {topTenButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 0 }}
      >
        {isLoadingTopTen ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#FFF",
              textAlign: "center",
            }}
          >
            Loading top ten
          </Text>
        ) : (
          topTen
            .slice(0, topTenCount)
            .map((item, index) => (
              <InfoCard
                ticker={item.ticker}
                navigation={navigation}
                stock={item.name}
                esgrating={item.esgrating}
                industry={item.group}
                esgwarning={item.rating}
                key={index}
              />
            ))
        )}
      </ScrollView>

      <View style={externalStyle.home_component}>
        <View style={{ width: "70%" }}>
          <Text style={externalStyle.home_title}>Favorite Stocks</Text>
        </View>
        <View style={{ width: "30%", alignItems: "flex-end" }}>
          <View style={externalStyle.more_buttom}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              More{" "}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 0 }}
      >
        {isLoadingTopTen ? (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#FFF",
              textAlign: "center",
            }}
          >
            Loading top ten
          </Text>
        ) : (
          staredData.map((item, index) => (
            <InfoCard
              navigation={navigation}
              stock={item.name || item.company}
              ticker={item.ticker}
              esgrating={item.esgrating}
              industry={item.group}
              esgwarning={item.rating}
              key={index}
            />
          ))
        )}
      </ScrollView>
      <View style={externalStyle.home_component}>
        <View style={{ width: "50%" }}>
          <Text style={externalStyle.home_title}>Trending News</Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <View style={externalStyle.more_buttom}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              More
            </Text>
          </View>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={externalStyle.news}>
          <Image
            style={externalStyle.home_news_image}
            source={require("../images/news1.jpg")}
          />
          <View style={externalStyle.news_card}>
            <Text style={{ fontWeight: "bold" }}>Business Insider</Text>
            <Text
              style={{
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              Impact investing finances companies that aim to do good in the
              world — here's how it works and how to get involved
            </Text>
          </View>
        </View>

        <View style={externalStyle.news}>
          <Image
            style={externalStyle.home_news_image}
            source={require("../images/news2.jpg")}
          />
          <View style={externalStyle.news_card}>
            <Text style={{ fontWeight: "bold" }}>Financial Times</Text>
            <Text
              style={{
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              ESG accounting needs to cut through the greenwash
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
export default Home;

const data1 = [
  {
    stock: "Walmart",
    esgrating: "$117.8",
  },
  {
    stock: "MC DONALDS",
    esgrating: "$127.83",
  },
  {
    stock: "CISCO",
    esgrating: "$117.8",
  },
];
