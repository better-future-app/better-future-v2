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
import { LinearGradient } from "expo-linear-gradient";
import externalStyle from "./styleSheet";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import RNSpeedometer from "react-native-speedometer";

import ReactStoreIndicator from "react-score-indicator";
//  recive things from other pages , { navigation, route } : navigation is auto passed
//route is what you pass in, it must do the same way for other pages too
const Detail = ({ navigation, route }) => {
  //this is how to get your pass in data .
  const { stock, esgrating, industry, esgwarning } = route.params;
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
  });

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
          N/A
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingTop: 40,
          }}
        >
          USD
        </Text>
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
                labelColor: "#48CFAE",
                activeBarColor: "#48CFAE",
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
