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
const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// term.monthly
console.log("detials page");
//  recive things from other pages , { navigation, route } : navigation is auto passed
//route is what you pass in, it must do the same way for other pages too
const Detail = ({ navigation, route }) => {
  //this is how to get your pass in data .
  const { stock, esgrating, industry, esgwarning, ticker } = route.params;

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(stock, status); //setItem (key ,value ) (tsla,stared ) ("numberofstock"stock+,10)
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
  const noStock = require("../Interface_icons/63-Stock/stock.png");
  const yseStock = require("../Interface_icons/63-Stock/stockdel.png");
  const [stockicon, setstockicon] = useState(noStock);
  const [starPath, setstartPath] = useState(loading);
  const [numshare, setnumshare] = useState();
  const [avgprice, setavgprice] = useState();
  const [equalityvalue, setEqualityvalue] = useState(0);
  const [isAddStockCliked, setisAddStockCliked] = useState(false);
  const [averagePrice, setAveragePrice] = useState();
  const [placeholder, setplaceholder] = useState("number of stock");
  const saveinstorage = async (value) => {
    if (averagePrice) {
      try {
        setisAddStockCliked(false);
        setplaceholder("number of stock");
        setAveragePrice(null);

        AsyncStorage.setItem(`numShares${stock}`, String(value));
        AsyncStorage.setItem(`averagePrice${stock}`, String(averagePrice));
        var message = "Your setup is compeleted";
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            40,
            5
          );
        }
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    } else {
      setplaceholder("Average Price");
      setAveragePrice(value);
    }
  };
  useEffect(() => {
    async function checkifstarted() {
      try {
        const value = await AsyncStorage.getItem(stock);
        if (value !== null) {
          // We have data!!

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

    async function checkifisinvested() {
      try {
        const value = await AsyncStorage.getItem(`numShares${stock}`);
        if (value !== null) {
          console.log("number of shares", value);
          setnumshare(value);
          setstockicon(yseStock);
          getaverageprice();
        } else {
          setnumshare(null);
        }
      } catch (error) {
        console.log("error in _retrieveData");
        // Error retrieving data
        // console.log(error);
      }
    }

    async function getaverageprice() {
      try {
        const getaveragepriceesult = await AsyncStorage.getItem(
          `averagePrice${stock}`
        );
        if (getaveragepriceesult !== null) {
          setavgprice(getaveragepriceesult);

          console.log("average", getaveragepriceesult);
        }
      } catch (error) {
        console.log("error in _retrieveData");
        // Error retrieving data
        // console.log(error);
      }
    }

    checkifisinvested();
    checkifstarted();
  }, [averagePrice]);

  const starButtonClicked = () => {
    if (starPath === defaults) {
      _storeData();
      setnumshare(null);
      setstartPath(clicked);
    } else {
      setstartPath(defaults);
      _removeData();
    }
  };

  const addOrRemoveInvestedstock = async () => {
    if (stockicon === noStock) {
      _storeData();
      setstockicon(yseStock);
      setisAddStockCliked(true);
    } else {
      setstockicon(noStock);
      _removeData();
      setplaceholder("number of stock");
      setAveragePrice(null);
      setisAddStockCliked(false);
      console.log("deleted");
      await AsyncStorage.removeItem(`numShares${stock}`);
      await AsyncStorage.removeItem(`averagePrice${stock}`);
    }
  };
  ////Butttons For GRAPH///
  const [colorDefaultone, setcolorDefaultone] = useState("#ffffff");
  const [colorDefaulttwo, setcolorDefaulttwo] = useState("#ffffff");
  const [colorDefaultthree, setcolorDefaultthree] = useState("#00bfff");
  const [colorDefaultfour, setcolorDefaultfour] = useState("#ffffff");
  const [Freq, setFreq] = useState("monthly"); // topTenCount = 5
  const onDButtonClicked = () => {
    setFreq("daily");
    setcolorDefaultone("#00bfff");
    setcolorDefaulttwo("#ffffff");
    setcolorDefaultthree("#ffffff");
    setcolorDefaultfour("#ffffff");
    // console.log("D");
  };
  const onWButtonClicked = () => {
    setFreq("weekly");
    setcolorDefaultone("#ffffff");
    setcolorDefaulttwo("#00bfff");
    setcolorDefaultthree("#ffffff");
    setcolorDefaultfour("#ffffff");
    // console.log("W");
  };
  const onMButtonClicked = () => {
    setFreq("monthly");
    setcolorDefaultone("#ffffff");
    setcolorDefaulttwo("#ffffff");
    setcolorDefaultthree("#00bfff");
    setcolorDefaultfour("#ffffff");
    //  console.log("M");
  };
  const onYButtonClicked = () => {
    setFreq("annually");
    setcolorDefaultone("#ffffff");
    setcolorDefaulttwo("#ffffff");
    setcolorDefaultthree("#ffffff");
    setcolorDefaultfour("#00bfff");
    //  console.log("Y");
  };

  function freqforGraph(date) {
    // console.log(date.getFullYear());
    if (Freq == "daily") {
      return dayNames[date.getDay()];
    }
    if (Freq == "monthly") {
      return monthNames[date.getMonth()];
    }
    if (Freq == "annually") {
      return date.getFullYear();
    }
    if (Freq == "weekly") {
      return monthNames[date.getMonth()];
    }
  }

  /////////////////////////////////////////////////////////////////////
  ///////////// ranking data ////////////////////////////
  const [totalIndustryNumber, settotalIndustryNumber] = useState();
  const [industryRank, setindustryRank] = useState();
  const [totalglobalNumber, settotalglobalNumber] = useState();
  const [globalrank, setglobalrank] = useState();

  useEffect(() => {
    async function fetchIndustryNumber() {
      const totalIndustryNumber = await fetch(
        `https://esgstock1.azurewebsites.net/detials?industry=${encodeURIComponent(
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
  const [currentstockprice, setcurrentstockprice] = useState("N/A");
  const [stockdiscription, setstockdiscription] = useState();

  async function fetchPriceData() {
    const stockhistoricPriceResponse = await fetch(
      `https://esgstock1.azurewebsites.net/stockprice?q=${ticker}`
    );
    const stockpricedata = await stockhistoricPriceResponse.json();
    setcurrentstockprice(stockpricedata[0].close);
    const stockdiscriptionresponse = await fetch(
      `https://esgstock1.azurewebsites.net/meta?q=${ticker}`
    );
    const stockdiscription = await stockdiscriptionresponse.json();
    setstockdiscription(stockdiscription.description.substr(0, 430) + "...");
  }

  useEffect(() => {
    if (ticker) {
      fetchPriceData();
    }
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd; //Todays current date for the end endDate in URL

  const [isLoadinghistoricstockPrice, setLoadinghistoricstockPrice] = useState(
    true
  );
  const [stockPrice, setStockPrice] = useState();
  useEffect(() => {
    // console.log('render');

    let isMounted = true;
    async function fetchAutohistoricPrice() {
      const stockhistoricPriceResponse = await fetch(
        `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=2015-1-1&endDate=${today}&resampleFreq=${Freq}&token=a3c84e49049c02fdbb248d63c783e5e18a621639`
      );

      const stockPricehistoricData = await stockhistoricPriceResponse.json();

      const sortedStockData = Object.keys(stockPricehistoricData) //makes a set of keys from data
        .map((key) => {
          var value = stockPricehistoricData[key];
          const date = new Date(value["date"]); //takes date from JSON file
          return {
            date,
            closePrice: parseInt(value["close"]), //get close price
            displayString: freqforGraph(date), // converts date to number and then assigns to a string name representation.
          };
        })
        .sort((a, b) => b.date - a.date)
        .slice(0, 5)
        .reverse();

      if (isMounted) {
        setStockPrice(sortedStockData);
        setLoadinghistoricstockPrice(false);
      }
    }

    // more functions
    if (ticker) {
      fetchAutohistoricPrice();
    }
    // call more here
    return () => {
      console.log("unmounted");
      isMounted = false;
    };
  }, [Freq]);

  const failed = false;

  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <Text style={externalStyle.header_text}>{stock}</Text>
        <Text>{ticker}</Text>
      </View>

      <View style={externalStyle.priceBar}>
        <Text
          style={{
            fontWeight: "200",
            fontSize: 60,
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

        <TouchableOpacity onPress={() => addOrRemoveInvestedstock()}>
          <Image
            source={stockicon}
            style={{
              Height: 36,
              Width: 38,
              marginTop: 22,
              marginLeft: 20,
            }}
          />
        </TouchableOpacity>

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
      {isAddStockCliked ? (
        <View style={externalStyle.searchbar}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#b1e5d3"
            keyboardType="numeric"
            style={externalStyle.home_input}
            // onChangeText={(text) => onChangeText(text)}
            onChangeText={(text) => onChangeText(text)}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              // console.log("Text value on press enter: ", text);
              saveinstorage(text);
            }}
          />
        </View>
      ) : (
        <View></View>
      )}

      <View>
        {stockPrice ? (
          <View>
            <View>
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
            </View>
            <View style={{ marginTop: -30 }}>
              <View style={externalStyle.home_component}>
                <View style={{ width: "27.5%", alignItems: "flex-end" }}>
                  <View style={externalStyle.more_buttom}>
                    <TouchableOpacity onPress={() => onDButtonClicked()}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 13,
                          color: colorDefaultone,
                        }}
                      >
                        {"W"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: "20%", alignItems: "flex-end" }}>
                  <View style={externalStyle.more_buttom}>
                    <TouchableOpacity onPress={() => onWButtonClicked()}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 13,
                          color: colorDefaulttwo,
                        }}
                      >
                        {"M"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: "20%", alignItems: "flex-end" }}>
                  <View style={externalStyle.more_buttom}>
                    <TouchableOpacity onPress={() => onMButtonClicked()}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 13,
                          color: colorDefaultthree,
                        }}
                      >
                        {"5M"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ width: "20%", alignItems: "flex-end" }}>
                  <View style={externalStyle.more_buttom}>
                    <TouchableOpacity onPress={() => onYButtonClicked()}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 13,
                          color: colorDefaultfour,
                        }}
                      >
                        {"5Y"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{ padding: 20, paddingBottom: -10, flexDirection: "row" }}
          >
            <Image
              source={require("../Interface_icons/14-Alerts/48w/alert-circle.png")}
              style={{ height: 20, width: 20, paddingRight: 20 }}
            />
            <Text style={{ paddingLeft: 20 }}> Stock Data is not avaible</Text>
          </View>
        )}
      </View>
      {numshare ? (
        <View>
          <View style={externalStyle.position_component}>
            <View style={{ width: "50%" }}>
              <Text style={externalStyle.company_overallESG_text}>
                Position
              </Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end" }}>
              <View style={externalStyle.more_buttom}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 13,
                      color: "#FFF",
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={externalStyle.position}>
            <View style={externalStyle.card}>
              <Text style={externalStyle.company_status}>
                Shares {"\n"}
                <Text style={{ fontSize: 30 }}>{numshare} </Text>
              </Text>
              <Text style={externalStyle.company_status}>
                Avg Cost{"\n"}
                <Text style={{ fontSize: 30 }}>{avgprice} </Text>
              </Text>
              <Text style={externalStyle.company_status}>
                Equality value {"\n"}
                <Text style={{ fontSize: 30 }}>
                  {Math.ceil(numshare * currentstockprice)}{" "}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}

      {esgrating ? ( // if no esgrating, no showing the esg data
        <View>
          <Text style={externalStyle.company_overallESG_text}>ESG Score</Text>
          <View style={externalStyle.company_esg_score_card}>
            <SafeAreaView style={{ flex: 1 }}>
              <RNSpeedometer
                value={Math.ceil(esgrating)} // no more than 51 need to
                size={300}
                maxValue={50}
                labels={[
                  {
                    name: "Negl.",
                    labelColor: "#90be5d",
                    activeBarColor: "#90be5d",
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
      {stockPrice ? (
        <View>
          <Text style={externalStyle.company_overallESG_text}>Discription</Text>
          <View style={externalStyle.company_esg_score_card}>
            <View style={{ width: 370, paddingLeft: 25, paddingTop: 10 }}>
              <Text style={{ fontSize: 16 }}>{stockdiscription}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text></Text>
      )}
    </ScrollView>
  );
};

export default Detail;
