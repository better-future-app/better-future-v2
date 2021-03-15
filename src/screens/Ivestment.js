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
      for (var property = 0; property < keys.length; property += 1) {
        if (keys[property].substring(0, 9) != "numShares") {
          console.log(keys[property]);
          qarr.unshift(await AsyncStorage.getItem(keys[property]));
        }
      }
      setstockQuantity(qarr);
      console.log(stockQuantity);
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

  ///////////////////////////////////////////////////////////////////////////Grabs current total value and current weighted ESG///////////////
  const [portfolioValue, setportfolioValue] = useState("N/A");
  const [portfolioweightedESG, setportfolioweightedESG] = useState(0);

  useEffect(() => {
    async function fetchcurrentPrice(x) {
      const stockhistoricPriceResponse = await fetch(
        `https://esgstock1.azurewebsites.net/stockprice?q=${x}`
      );
      const stockpricedata = await stockhistoricPriceResponse.json();
      return stockpricedata[0].close; ///Grabs price
    }
    var tickers;
    var parr = [];
    var ESGarr = [];
    var totalvalue = 0; //empty varaibles....
    var weightedESG = 0;

    (async () => {
      for (const x in investedsocks) {
        tickers = await fetchcurrentPrice(investedsocks[x]["ticker"]);
        parr.push(tickers); //grabs ticker prices
        ESGarr.push(investedsocks[x]["esgrating"]); //appends to array
      }

      for (const x in parr) {
        totalvalue =
          totalvalue + parseInt(parr[x]) * parseInt(stockQuantity[x]); //loop to create total value of portfolio
      }

      for (const x in ESGarr) {
        weightedESG =
          weightedESG +
          parseInt(ESGarr[x]) *
            ((parseInt(parr[x]) * parseInt(stockQuantity[x])) / totalvalue); //loop to create weighed ESG value
      }

      setportfolioValue(totalvalue); //sets temp values to const.
      setportfolioweightedESG(weightedESG); //sets temp value to const.
    })();
  }, [investedsocks]);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd; //Todays current date for the end endDate in URL

  ///////////////////////////////////////////////////////////////////////////////////////Grabs the historcal value of portfolio for the last 5 years/////
  const [porthistvalue, setporthistvalue] = useState([0]);
  useEffect(() => {
    async function fetchhistoryPrice(x, y) {
      const stockhistoricsPriceResponse = await fetch(
        `https://api.tiingo.com/tiingo/daily/${x}/prices?startDate=2016-1-1&endDate=${today}&resampleFreq=annually&token=480b701b38e160ecba1ccd3d9ecd6a5d2dd8a72d`
      );
      const stockpricedatas = await stockhistoricsPriceResponse.json();
      var harr;

      harr = parseInt(stockpricedatas[y].close); ///Grabs price

      return harr;
    }

    (async () => {
      var hprice = [];
      var tickerstwo;
      var count = 0;
      var histreturnsarray = [];
      for (var y = 0; y < 6; y += 1) {
        for (const x in investedsocks) {
          tickerstwo = await fetchhistoryPrice(investedsocks[x]["ticker"], y);

          count = count + tickerstwo * stockQuantity[x];
        }
        hprice.push(count);
        count = 0;
      }
      if (hprice[0] == 0) {
        console.log("im more powerful then you know");
      } else {
        for (var z = 1; z < 6; z += 1) {
          histreturnsarray.push(
            ((hprice[z] - hprice[z - 1]) / hprice[z - 1]) * 100
          );
        }
        setporthistvalue(histreturnsarray);
      }
    })();
  }, [investedsocks]);
  /////////////////////////////////////////Grabs benchmark data/////for graph
  const [benchmark, setbenchmark] = useState([0]);
  useEffect(() => {
    (async () => {
      const stockhistoricsPriceResponse = await fetch(
        `https://api.tiingo.com/tiingo/daily/SPY/prices?startDate=2016-1-1&endDate=${today}&resampleFreq=annually&token=480b701b38e160ecba1ccd3d9ecd6a5d2dd8a72d`
      );
      const stockpricedatass = await stockhistoricsPriceResponse.json();
      var spyArr = [];
      var spyHistArr = [];
      for (var z = 0; z < 6; z += 1) {
        spyArr.push(parseInt(stockpricedatass[z].close)); ///Grabs price
      }
      if (spyArr[0] == 0) {
        console.log(spy[z]);
      } else {
        for (var z = 1; z < 6; z += 1) {
          spyHistArr.push(((spyArr[z] - spyArr[z - 1]) / spyArr[z - 1]) * 100);
          console.log(spyHistArr);
        }
        setbenchmark(spyHistArr);
      }
    })();
  }, [investedsocks]);

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
                labels: ["2017", "2018", "2019", "2020", "2021"],
                datasets: [
                  {
                    data: porthistvalue,
                    color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,
                  },
                  {
                    data: benchmark,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  },
                ],
              }}
              width={Dimensions.get("window").width - 20} // from react-native
              height={300}
              withInnerLines={false}
              withOuterLines={false}
              yAxisLabel="."
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(60, 179, 113, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsforDots: {
                  r: "6",
                  strokeWdith: "2",
                  stroke: "#ffa726",
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
          <View style={{ marginTop: -25 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "mediumseagreen",
                }}
              >
                Investment Returns
              </Text>

              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "mediumseagreen",
                }}
              />
              <View
                style={{ width: 20, height: 20, backgroundColor: "black" }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "black",
                }}
              >
                Benchmark Returns
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
              padding: 20,
            }}
          >
            ESG Score
          </Text>
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
