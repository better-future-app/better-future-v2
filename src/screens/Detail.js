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

// term
const term = {
  monthly: "Monthly Time Series",
  daily: "Daily Time Series",
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// term.monthly

//  recive things from other pages , { navigation, route } : navigation is auto passed
//route is what you pass in, it must do the same way for other pages too
const Detail = ({ navigation, route }) => {
  //this is how to get your pass in data .
  const { stock, esgrating, industry, esgwarning, ticker } = route.params;

  const [isStartedStock, setisStartedStock] = useState(false);

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(stock, status);
    } catch (error) {
      console.log("error in _storeData", error);
    }
  };
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
    if (industry) {
      // if we have esg data ( if we dont have esg data industry is null )
      fetchIndustryNumber();
    }
  }, []);
  /////////////////////////////////////////////////////////////////////
  ///////////// stock price and discription ////////////////////////////
  const [currentstockprice, setcurrentstockprice] = useState();
  const [stockdiscription, setstockdiscription] = useState();
  useEffect(() => {
    async function fetchPriceData() {
      const stockhistoricPriceResponse = await fetch(
        `https://esgstockapi.azurewebsites.net/stockprice?q=${ticker}`
      );
      const stockpricedata = await stockhistoricPriceResponse.json();
      setcurrentstockprice(stockpricedata[0].close);
      const stockdiscriptionresponse = await fetch(
        `https://esgstockapi.azurewebsites.net/meta?q=${ticker}`
      );
      const stockdiscription = await stockdiscriptionresponse.json();
      setstockdiscription(stockdiscription.description.substr(0, 430) + "...");
    }
    fetchPriceData();
  }, []);
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

  const [isLoadinghistoricstockPrice, setLoadinghistoricstockPrice] = useState(
    true
  );
  const [fivemonthprice, setfivemonthprice] = useState(0);
  const [fourmonthprice, setfourmonthprice] = useState(0);
  const [threemonthprice, setthreemonthprice] = useState(0);
  const [twomonthprice, settwomonthprice] = useState(0);
  const [onemonthprice, setonemonthprice] = useState(0);
  const [stockPrice, setStockPrice] = useState();
  useEffect(() => {
    async function fetchAutohistoricPrice() {
      const stockhistoricPriceResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=45ZJ0MLEEW0P9DFL`
      );

      const stockPricehistoricData = await stockhistoricPriceResponse.json();
      const selectedUnit = "monthly"; // imageine this is state
      const selectedUnitKey = term.monthly; // todo: make a method to convert selected unit to key. getUnitKey(selectedUnit)

      const stockData = stockPricehistoricData[selectedUnitKey];
      // console.log(stockPricehistoricData);
      const sortedStockData = Object.keys(stockData)
        .map((key) => {
          var value = stockData[key];
          const date = new Date(key);
          return {
            date,
            closePrice: parseInt(value["4. close"]),
            displayString: monthNames[date.getMonth()], // getDisplayString(selectedUnit, date)
          };
        })
        .sort((a, b) => b.date - a.date)
        .slice(0, 5)
        .reverse();

      // console.log("Parsed dates", sortedStockData);
      setStockPrice(sortedStockData);
      // setonemonthprice(
      //   stockPricehistoricData["Monthly Time Series"]["2021-01-29"]["4. close"]
      // );
      // settwomonthprice(
      //   stockPricehistoricData["Monthly Time Series"]["2020-12-31"]["4. close"]
      // );
      // setthreemonthprice(
      //   stockPricehistoricData["Monthly Time Series"]["2020-11-30"]["4. close"]
      // );
      // setfourmonthprice(
      //   stockPricehistoricData["Monthly Time Series"]["2020-10-30"]["4. close"]
      // );
      // setfivemonthprice(
      //   stockPricehistoricData["Monthly Time Series"]["2020-09-30"]["4. close"]
      // );
      setLoadinghistoricstockPrice(false);
    }

    // more functions

    fetchAutohistoricPrice();
    // call more here
  }, []);

  const failed = false;

  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>{stock}</Text>
          <Text>{ticker}</Text>
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
          {currentstockprice}{" "}
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
        {stockPrice ? (
          <LineChart
            data={{
              labels: stockPrice.map((x) => x.displayString),
              datasets: [
                {
                  data: stockPrice.map((x) => x.closePrice),
                },
              ],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
        ) : (
          <View style={{ minHeight: failed ? 0 : 300 }}>
            <Text style={externalStyle.company_overallESG_text}>
              loading...
            </Text>
          </View>
        )}
      </View>
      {esgrating ? ( // if no esgrating, no showing the esg data
        <View>
          <Text style={externalStyle.company_overallESG_text}>
            OverAll ESG Score
          </Text>

          <View style={externalStyle.company_esg_score_card}>
            <SafeAreaView style={{ flex: 1 }}>
              <RNSpeedometer
                value={Math.ceil(esgrating)} // no more than 51 need to
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
        </View>
      ) : (
        <View style={{ padding: 20, paddingBottom: -10, flexDirection: "row" }}>
          <Image
            source={require("../Interface_icons/14-Alerts/48w/alert-circle.png")}
            style={{ height: 20, width: 20, paddingRight: 20 }}
          />
          <Text style={{ paddingLeft: 20 }}> ESG Data is not avaible</Text>
        </View>
      )}
      <Text style={externalStyle.company_overallESG_text}>Discription</Text>
      <View style={externalStyle.company_esg_score_card}>
        <View style={{ width: 370, paddingLeft: 25, paddingTop: 10 }}>
          <Text style={{ fontSize: 16 }}>{stockdiscription}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;
