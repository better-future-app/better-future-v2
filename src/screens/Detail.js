import React, { useEffect, useState, useCallback, Component } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import externalStyle from "./styleSheet";
import { LineChart } from "react-native-chart-kit";
import RNSpeedometer from "react-native-speedometer";
const status = "stared";
//  recive things from other pages , { navigation, route } : navigation is auto passed
//route is what you pass in, it must do the same way for other pages too
const Detail = ({ navigation, route }) => {
  //this is how to get your pass in data .
  const { stock, esgrating, industry, esgwarning } = route.params;

  const [isStartedStock, setisStartedStock] = useState(false);

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(stock, status);
    } catch (error) {
      console.log("error in _storeData", error);
    }
  };

  // const _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(stock);
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //       setisStartedStock(true);
  //     } else {
  //       setisStartedStock(false);
  //     }
  //   } catch (error) {
  //     console.log("error in _retrieveData");
  //     // Error retrieving data
  //     // console.log(error);
  //   }
  // };
  const _removeData = async () => {
    try {
      await AsyncStorage.removeItem(stock);
    } catch (error) {
      // Error retrieving data
      console.log("error in _removeData ");
    }
  };

  /////////////////////////////////////////////////////////////////////
  /////////////star path////////////////////////////

  const defaults = require("../Interface_icons/62-Star/rating-star-add.png");
  const clicked = require("../Interface_icons/62-Star/rating-star-check.png");
  const loading = require("../images/giphy.gif");
  const [starPath, setstartPath] = useState(loading);
  const count = 0;
  useEffect(() => {
    async function checkifstarted() {
      try {
        const value = await AsyncStorage.getItem(stock);
        if (value !== null) {
          // We have data!!
          console.log(value);
          setstartPath(clicked);
        } else {
          setstartPath(defaults);
        }
      } catch (error) {
        console.log("error in _retrieveData");
        // Error retrieving data
        // console.log(error);
      }
    }
    checkifstarted();
  }, []);

  const starButtonClicked = () => {
    if (starPath === defaults) {
      _storeData();
      setstartPath(clicked);
    } else {
      setstartPath(defaults);
      _removeData();
    }
  };

  /////////////////////////////////////////////////////////////////////
  ///////////// ranking data ////////////////////////////
  const [totalIndustryNumber, settotalIndustryNumber] = useState();
  const [industryRank, setindustryRank] = useState();
  const [totalglobalNumber, settotalglobalNumber] = useState();
  const [globalrank, setglobalrank] = useState();

  useEffect(() => {
    async function fetchIndustryNumber() {
      const totalIndustryNumber = await fetch(
        `https://esgstockapi.azurewebsites.net/detials?industry=${encodeURIComponent(
          industry
        ).replace(/%20/g, "+")}&company=${stock.replace(/\s+/g, "+")}`
      );
      const Data = await totalIndustryNumber.json();
      settotalIndustryNumber(Data.industryTotal);
      setindustryRank(Data.industryRank);
      settotalglobalNumber(Data.globalTotal);
      setglobalrank(Data.globalRank);
    }
    fetchIndustryNumber();
  }, []);
  /////////////////////////////////////////////////////////////////////
  ///////////// ranking data ////////////////////////////
  // const [star, setTopTen] = useState([]);
  // useEffect(() => {
  //   const starData = require("../local_data/data.json");
  //   var json = JSON.stringify(starData);
  //   var parsedJson = JSON.parse(json);
  //   //searching in json
  //   // parsedJson.company.map((item, index) => {
  //   //     console.log(item);
  //   //   }
  //   // });
  // 1   const data = JSON.parse(storage.getItem(starKey) || ""); // might crash the first time
  //   const valueToRemove = "Apple";
  //  2 const filteredItems = data.filter(  // adding or removing
  //     (item) => item !== valueToRemove
  //   );
  //  3  storage.setItem(starKey, JSON.stringify(filteredItems));
  //   console.log(filteredItems);
  // });

  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>{stock}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "200",
            fontSize: 50,
            padding: 10,
            paddingBottom: -10,
          }}
        >
          N/A{" "}
          <Text
            style={{
              fontSize: 20,
              paddingTop: 40,
            }}
          >
            USD
          </Text>
        </Text>

        <TouchableOpacity onPress={() => starButtonClicked()}>
          <Image
            // source={starPath}
            source={starPath}
            style={{
              maxHeight: 48,
              maxWidth: 48,
              marginTop: 20,
              marginRight: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 20} // from react-native
          height={300}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#cccccc",
            backgroundGradientFrom: "#cccccc",
            backgroundGradientTo: "#eeeeee",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#000000",
            },
          }}
          bezier
          style={{
            padding: 10,
            borderRadius: 16,
            marginBottom: -10,
          }}
        />
      </View>
      <Text style={externalStyle.company_overallESG_text}>
        OverAll ESG Score
      </Text>
      <View style={externalStyle.company_esg_score_card}>
        <SafeAreaView style={{ flex: 1 }}>
          <RNSpeedometer
            value={esgrating + 1}
            size={300}
            maxValue={50}
            labels={[
              {
                name: "Negl.",
                labelColor: "A0D468",
                activeBarColor: "#A0D468",
              },
              {
                name: "Low Risk",
                labelColor: "#AAEE68",
                activeBarColor: "#AAEE68",
              },
              {
                name: "Medium Risk",
                labelColor: "#dccf36",
                activeBarColor: "#dccf36",
              },
              {
                name: "High Risk",
                labelColor: "#FC6E51",
                activeBarColor: "#FC6E51",
              },
              {
                name: "Severe",
                labelColor: "#ed5565",
                activeBarColor: "#ed5565",
              },
            ]}
          />
        </SafeAreaView>
      </View>
      <Text style={externalStyle.company_overallESG_text}>Ranking</Text>
      <View style={externalStyle.company_ranking}>
        <View style={externalStyle.card}>
          <Text style={externalStyle.company_status}>
            INDUSTRY GROUP {"\n"}
            <Text style={{ fontSize: 12 }}>
              {industry}
              {"\n"}
            </Text>
          </Text>
          <Text style={externalStyle.company_risk}>
            <Text style={{ fontSize: 30 }}>{industryRank} </Text>out of{" "}
            {totalIndustryNumber}
          </Text>
        </View>
        <View style={externalStyle.card}>
          <Text style={externalStyle.company_status}>
            UNIVERSE{"\n"}
            <Text style={{ fontSize: 12 }}>Global Universe{"\n"}</Text>
          </Text>
          <Text style={externalStyle.company_risk}>
            <Text style={{ fontSize: 30 }}>{globalrank} </Text>out of{" "}
            {totalglobalNumber}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const data = {
  labels: ["Env", "Soc", "Gov"], // optional
  data: [0.4, 0.6, 0.8],
};

const chartConfig = {
  backgroundColor: "#cccccc",
  backgroundGradientFrom: "#cccccc",
  backgroundGradientTo: "#eeeeee",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};
export default Detail;
