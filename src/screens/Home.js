import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, ImageBackground, Keyboard } from "react-native";

import { Chip } from "react-native-paper";
import Chipfunction from "../components/Chipfunction";
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
import { set } from "react-native-reanimated";
const Home = ({ navigation }) => {
  ////////////////////////////////////////////////////////////////
  ///////////////////indistry top 10//////////////////////////////
  const [industryrank, setIndustryrank] = useState([]);
  const [ASCDESCbutton, setASCDESCbutton] = useState("ASC");
  const [setlectedindistry, setsetlectedindistry] = useState();
  // useEffect(() => {
  async function fetchIndustryRank(indistry) {
    setsetlectedindistry(indistry);
    const quary = `https://esgstock1.azurewebsites.net/top-ten?i=${encodeURIComponent(
      indistry
    ).replace(/%20/g, "+")}&q=${ASCDESCbutton}`;
    console.log(quary);
    const totalIndustryNumber = await fetch(quary);
    const Data = await totalIndustryNumber.json();
    setIndustryrank(Data);
  }
  const ASCDESCbuttonClicked = () => {
    if (ASCDESCbutton === "ASC") {
      setASCDESCbutton("DESC");
    } else {
      setASCDESCbutton("ASC");
    }
  };
  useEffect(() => {
    fetchIndustryRank(setlectedindistry);
  }, [ASCDESCbutton]);
  //   fetchIndustryNumber();
  // }, []);
  ///////////////////////////////////////////////////////////////
  /////////////////color///////////////////////////////////////
  const color = ["red", "#66CCFF", "#FFCC00", "#1C9379", "#8A7BA7"];

  randomColor = () => {
    let col = color[Math.floor(Math.random() * color.length)];
    return col;
  };
  ////////////////////////////////////////////////////////////
  ///////////////clear storage/////////////////////////////
  const clearstorage = () => {
    AsyncStorage.clear();
  };
  /////////////////////////////////////////////////////////
  //////// top ten button/////////////////////////////////
  const [topTenButtonText, setTopTenButtonText] = useState("More"); // topTenButtonText = "More"
  const [topTenCount, setTopTenCount] = useState(5); // topTenCount = 5
  const onMoreButtonClicked = () => {
    if (topTenCount == 5) {
      setTopTenCount(10); // setting setTopTenCount to 10
      setTopTenButtonText("Less");
    } else {
      setTopTenCount(5);
      setTopTenButtonText("More");
    }
  };
  /////////////////////////////////////////////////////////
  ///////////top ten data //////////////////////////////////////////
  const [isLoadingTopTen, setLoadingTopTen] = useState(true);
  const [topTen, setTopTen] = useState([]);
  const [indistry, setindistry] = useState([]);
  useEffect(() => {
    async function fetchAutoTopTen() {
      const topTenResponse = await fetch(
        "https://esgstock1.azurewebsites.net/hotstock"
      );
      const topTenData = await topTenResponse.json();

      setTopTen(topTenData);
      setLoadingTopTen(false);
    }

    // more functions

    fetchAutoTopTen();
    // call more here
  }, []);
  useEffect(() => {
    async function fetchindistry() {
      const indistryResponse = await fetch(
        "https://esgstock1.azurewebsites.net/getindistry"
      );
      const indistry = await indistryResponse.json();

      setindistry(indistry);

      // setTopTen(topTenData);
      // setLoadingTopTen(false);
    }

    // more functions

    fetchindistry();
    // call more here
  }, []);
  /////////////////////////////////////////////////////////
  // search data /////////////////////////////////////////
  search = async (value, storeInState = true) => {
    if (value) {
      const searchResponse = await fetch(
        `https://esgstock1.azurewebsites.net/search?q=${value}`
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
    // console.log(isKeyboardVisible);
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
  const [isStartedData, setIsStaratedDate] = useState(false);
  const updateStarred = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      // console.log("here are the keys");
      // console.log(keys);
      // for (var i = 0; i < keys.length; i++) {
      //   if (keys[i].substring(0, 9) == "numShares") {
      //     keys.splice(i, 1);
      //   }
      // }

      const allFavorites = await Promise.all(
        keys.map(async (item) => {
          console.log(item);
          if (
            item.substring(0, 9) != "numShares" &&
            item.substring(0, 12) != "averagePrice" &&
            item.substring() != "alreadyLaunched"
          ) {
            console.log("processing in favorites");
            const data = await search(item, false);
            // console.log(data[0]["price"]);
            return data.length > 0 ? data[0] : null;
          }
        })
      ).then(function (values) {
        return values.filter(function (value) {
          return typeof value !== "undefined";
        });
      });

      if (allFavorites.length != 0) {
        setIsStaratedDate(true);
      } else {
        setIsStaratedDate(false);
      }

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
          searchData.slice(0, 5).map((item, index) => (
            <SearchBarInfoCard
              navigation={navigation}
              stock={item.name || item.company}
              ticker={item.ticker || item.stockticker}
              esgrating={item.esgrating}
              industry={item.group}
              esgwarning={item.rating}
              key={index}
              onPress={(ticker) =>
                navigation.navigate("Detail", {
                  stock: item.company,
                  industry: item.industry,
                  esgrating: item.esgrating,
                  esgwarning: item.esgwarning,
                  ticker: item.stockticker,
                })
              }
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
      <View style={externalStyle.more_buttom}>
        <TouchableOpacity onPress={() => clearstorage()}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#FFF",
            }}
          >
            clear storage
          </Text>
        </TouchableOpacity>
      </View>

      <View style={externalStyle.home_component}>
        <View style={{ width: "50%" }}>
          <Text style={externalStyle.home_title}>Popular Stock</Text>
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
                ticker={item.ticker || item.stockticker}
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
        {isStartedData ? (
          staredData.map((item, index) => (
            <InfoCard
              navigation={navigation}
              stock={item.name || item.company}
              ticker={item.ticker || item.stockticker}
              esgrating={item.esgrating}
              industry={item.group}
              esgwarning={item.rating}
              key={index}
            />
          ))
        ) : (
          <View style={externalStyle.home_company_list}>
            <View style={externalStyle.card}>
              <Text style={externalStyle.home_company_text}>
                No Favorite Stocks
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={externalStyle.home_component}>
        <View style={{ width: "50%" }}>
          <Text style={externalStyle.home_title}>Indistry</Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <View style={externalStyle.more_buttom}>
            <TouchableOpacity onPress={() => ASCDESCbuttonClicked()}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
              >
                {ASCDESCbutton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 0 }}
      >
        <View
          style={{
            margin: 5,
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            maxWidth: 1800,
          }}
        >
          {indistry ? (
            indistry.map((item, index) => (
              <Chip
                onPress={() => fetchIndustryRank(item.group)}
                key={index}
                height={30}
                textStyle={{ color: "white", fontSize: 15 }}
                style={{ backgroundColor: randomColor(), margin: 5 }}
                mode="flat"
              >
                {item.group}
              </Chip>
            ))
          ) : (
            <View>indisty did not work</View>
          )}
        </View>
      </ScrollView>
      <View>
        {setlectedindistry ? (
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text style={externalStyle.home_title}>{setlectedindistry}</Text>
          </View>
        ) : (
          <View></View>
        )}
        {industryrank ? (
          industryrank.map((item, index) => (
            <InfoCard
              navigation={navigation}
              stock={item.name || item.company}
              ticker={item.ticker || item.stockticker}
              esgrating={item.esgrating}
              industry={item.group}
              esgwarning={item.rating}
              key={index}
            />
          ))
        ) : (
          <Text>nothing in industryrank</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
