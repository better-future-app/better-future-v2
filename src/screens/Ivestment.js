import React from "react";
import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
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

const Favourite = () => {
  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>Investment</Text>
        </View>
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
          height={400}
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 0,
          width: "100%",
        }}
      ></View>
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
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 0 }}
      >
        <TouchableOpacity
          // onPress={() => navigation.navigate("Detail")}
          style={externalStyle.image}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
            source={require("../images/google-logo.png")}
          />
          <View style={externalStyle.card}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              GOOGLE
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#00a46c",
                paddingLeft: 30,
                paddingBottom: 30,
              }}
            >
              $1,784.47
            </Text>
          </View>
        </TouchableOpacity>
        <View
          // onPress={() => navigation.navigate("Detail")}
          style={externalStyle.image}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
            source={require("../images/apple-logo.png")}
          />
          <View style={externalStyle.card}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              APPLE
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#00a46c",
                paddingLeft: 30,
                paddingBottom: 30,
              }}
            >
              $127.83{" "}
            </Text>
          </View>
        </View>
        <View
          // onPress={() => navigation.navigate("Detail")}
          style={externalStyle.image}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
            source={require("../images/amazon-logo.png")}
          />
          <View style={externalStyle.card}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              AMAZON
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#00a46c",
                paddingLeft: 30,
                paddingBottom: 30,
              }}
            >
              $3,120.76
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
export default Favourite;
