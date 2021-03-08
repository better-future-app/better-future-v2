import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import InfoCard from "../components/InfoCard";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import externalStyle from "./styleSheet";
import RNSpeedometer from "react-native-speedometer";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { debounce } from "lodash";
import SearchBarInfoCard from "../components/Searchbar";
import { set } from "react-native-reanimated";

const Favourite = ({ navigation }) => {
  /////////////////////////////////////////////////////////
  // search data /////////////////////////////////////////
  const search = async (value, storeInState = true) => {
    if (value) {
      // console.log("searching", value);
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
  const [averagePrice, setAveragePrice] = useState();
  const saveinstorage = async (value) => {
    if (averagePrice) {
      setaddbuttonactivity(false);
      setresultdisplay(true);
      setplaceholder("Search");
      setaddbuttondisplay("add");
      setAveragePrice();
      console.log(
        "selectedStock",
        selectedStock,
        "averagePrice",
        averagePrice,
        "numberofstock",
        value
      );
      AsyncStorage.setItem(`numShares${selectedStock}`, String(value));
      AsyncStorage.setItem(
        `averagePrice${selectedStock}`,
        String(averagePrice)
      );
      var message = selectedStock.concat(" is in your invested stock");
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          40,
          5
        );
      }
    } else {
      setplaceholder("Average Price");
      setAveragePrice(value);
    }
  };

  const onChangeText = (value) => {
    // console.log(value);
    if (resultdisplay) {
      if (value.length > 1) {
        searchHandle(value);
        // setIsSearching(true);
      } else {
        searchHandle.cancel();
        // setIsSearching(false);
        setSearchData([]);
      }
    }

    // setSearchData(value);
  };
  const [searchData, setSearchData] = useState([]);

  ///////////////////////////////////////////////////////////////////
  ////////////////add stock status////////////////////////////////
  const [addbuttonactivity, setaddbuttonactivity] = useState(false);
  const [addbuttondisplay, setaddbuttondisplay] = useState("add");

  const addstockbutton = () => {
    if (addbuttonactivity) {
      setaddbuttonactivity(false);
      setaddbuttondisplay("add");
      // console.log(addbuttonactivity);
    } else {
      setaddbuttonactivity(true);
      setaddbuttondisplay("cancel");
      // console.log(addbuttonactivity);
    }
  };
  ////////////////////////////////////////////////////////////////
  ///////////remove result if selected////////////////////////////
  const [resultdisplay, setresultdisplay] = useState(true);

  ////////////////////////////////////////////////////////////////
  ///////////////////select stock ///////////////////////////////
  const [selectedStock, setSelectedStock] = useState();
  const [placeholder, setplaceholder] = useState("Search");
  const addstock = (stock) => {
    setSelectedStock(stock);
    setplaceholder("Number of Stock");
    // console.log(stock);
    setresultdisplay(false);
    setSearchData([]);
  };

  //////////////////////////////////////////////////////
  ////////////getting invested stocks /////////////////////////////
  const [investedsocks, setInvestedStocks] = useState([]);
  const [stockQuantity, setstockQuantity] = useState([]); // quantity into array
  //var quantity_Stocks = [];
  const updateInvestedStock = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      //console.log("here are the keys");
      //console.log(keys);
      var qarr = [];
      for (const property in keys) {
        //console.log(keys[property]);
        //console.log(await AsyncStorage.getItem(keys[property]));
        qarr.push(await AsyncStorage.getItem(keys[property]));
      }
      setstockQuantity(qarr);

      const allinvestedsocks = await Promise.all(
        keys.map(async (item) => {
          if (item.substring(0, 9) == "numShares") {
            // console.log(item.substring(9));
            const data = await search(item.substring(9), false);
            return data.length > 0 ? data[0] : null;
          }
        })
      ).then(function (values) {
        return values.filter(function (value) {
          return typeof value !== "undefined" && value !== null;
        });
      });
      // console.log("allinvestedsocks", allinvestedsocks);
      setInvestedStocks(allinvestedsocks);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  useEffect(() => {
    updateInvestedStock();

    // Subscribe for the focus Listener
    // const unsubscribe = navigation.addListener("focus", updateInvestedStock);
    // return () => {
    //   unsubscribe();
    // };
  }, [addbuttonactivity]);

  const [stockPrice, setstockPrice] = useState([]);
  const [stockESGrating, setstockESGrating] = useState([]);
  const [portfolioValue, setportfolioValue] = useState(0);
  const [portfolioweightedESG, setportfolioweightedESG] = useState(0);
  var tickers;

  useEffect(() => {
    async function fetchcurrentPrice(x) {
      const stockhistoricPriceResponse = await fetch(
        `https://esgstock1.azurewebsites.net/stockprice?q=${x}`
      );
      const stockpricedata = await stockhistoricPriceResponse.json();
      //console.log(x);
      //console.log(stockpricedata[0].close);
      return stockpricedata[0].close; ///Grabs price
    }

    var parr = [];
    var ESGarr = [];
    var totalvalue = 0; //empty varaibles....
    var weightedESG = 0;
    (async () => {
      for (const x in investedsocks) {
        tickers = await fetchcurrentPrice(investedsocks[x]["ticker"]); //grabs price for each stocks
        parr.push(tickers); //grabs ticker prices

        ESGarr.push(investedsocks[x]["esgrating"]); //appends to array
      }
      setstockPrice(parr); ///sets const variable equiv to temp array for both ESG and stockPRice
      setstockESGrating(ESGarr);
    })();
    //console.log(stockPrice);
    for (const x in stockPrice) {
      totalvalue =
        totalvalue + parseInt(stockPrice[x]) * parseInt(stockQuantity[x]); //loop to create total value of portfolio
    }
    for (const x in stockPrice) {
      weightedESG =
        weightedESG +
        parseInt(stockESGrating[x]) *
          ((parseInt(stockPrice[x]) * parseInt(stockQuantity[x])) / totalvalue); //loop to create weighed ESG value
    }
    console.log("totalvalue");
    console.log(weightedESG);
    setportfolioValue(totalvalue); //sets temp values to const.
    setportfolioweightedESG(weightedESG); //sets temp value to const.
  }, [addbuttonactivity]);

  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>Investments</Text>
        </View>
      </View>
      {addbuttonactivity ? (
        <View></View>
      ) : (
        <View>
          <Text
            style={{
              fontWeight: "200",
              fontSize: 50,
              padding: 10,
              paddingBottom: -10,
              color: "#000000",
            }}
          >
            ${portfolioValue}
            <Text
              style={{
                fontSize: 20,
                paddingTop: 40,
              }}
            >
              USD
            </Text>
          </Text>

          <View>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    data: [
                      Math.ceil(portfolioValue) - Math.random() * 100,
                      Math.ceil(portfolioValue) - Math.random() * 100,
                      Math.ceil(portfolioValue) - Math.random() * 100,
                      Math.ceil(portfolioValue) - Math.random() * 100,
                      Math.ceil(portfolioValue) - Math.random() * 100,
                      Math.ceil(portfolioValue) - Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width - 20} // from react-native
              height={300}
              withInnerLines={false}
              withOuterLines={false}
              yAxisLabel="$"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={{
                padding: 10,
                borderRadius: 16,
                marginBottom: -10,
              }}
            />
          </View>
          <Text style={externalStyle.company_overallESG_text}>ESG Score</Text>
          <View style={externalStyle.company_esg_score_card}>
            <SafeAreaView style={{ flex: 1 }}>
              <RNSpeedometer
                value={Math.ceil(portfolioweightedESG)} // no more than 51 need to
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
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
          paddingTop: 20,
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
            }}
          >
            Invested Stock
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <View style={externalStyle.more_buttom}>
            <TouchableOpacity onPress={() => addstockbutton()}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
              >
                {addbuttondisplay}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {addbuttonactivity ? (
        <View>
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
              placeholder={placeholder}
              placeholderTextColor="#b1e5d3"
              style={externalStyle.home_input}
              // onChangeText={(text) => onChangeText(text)}
              onChangeText={(text) => onChangeText(text)}
              onSubmitEditing={({ nativeEvent: { text } }) => {
                // console.log("Text value on press enter: ", text);
                saveinstorage(text);
              }}
            />

            <Image
              source={require("../images/3.png")}
              style={{ height: 20, width: 20, paddingLeft: 20 }}
            />
          </View>
          {resultdisplay ? (
            searchData.slice(0, 5).map((item, index) => (
              <SearchBarInfoCard
                stock={item.name || item.company}
                ticker={item.ticker || item.stockticker}
                esgrating={item.esgrating}
                industry={item.group}
                esgwarning={item.rating}
                key={index}
                onPress={() => {
                  // setSelectedStock(item.name);
                  addstock(item.name);
                  // setSearchData([]);
                }}
              />
            ))
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View></View>
      )}
      <View>
        {addbuttonactivity ? (
          <View></View>
        ) : (
          <View style={{ paddingTop: 15 }}>
            {investedsocks.map((item, index) => (
              <InfoCard
                navigation={navigation}
                stock={item.name || item.company}
                ticker={item.ticker || item.stockticker}
                esgrating={item.esgrating}
                industry={item.group}
                esgwarning={item.rating}
                key={index}
                onPress={(ticker) =>
                  navigation.navigate("Detail", {
                    stock: item.stock,
                    industry: item.industry,
                    esgrating: item.esgrating,
                    esgwarning: item.esgwarning,
                    ticker: item.ticker,
                  })
                }
              />
            ))}
          </View>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 0 }}
      >
        <View></View>
      </ScrollView>
    </ScrollView>
  );
};
export default Favourite;
