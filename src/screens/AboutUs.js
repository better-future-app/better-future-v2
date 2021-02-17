import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import SwiperComponent from "../components/SwiperComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import externalStyle from "./styleSheet";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import ProgressCircle from "react-native-progress-circle";
const Detail = ({ navigation }) => {
  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>Profile</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          paddingBottom: -15,
        }}
      >
        <View
          onPress={() => navigation.navigate("Detail")}
          style={externalStyle.profile_image}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              marginTop: -50,
              resizeMode: "contain",
              justifyContent: "center",
              alignItems: "center",
            }}
            source={require("../images/yoda_bb.png")}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "100",
            fontSize: 20,
            color: "#000000",
            paddingBottom: 5,
            paddingLeft: 20,
          }}
        >
          OverAll Score
        </Text>
      </View>

      <View style={externalStyle.company_overall}>
        <View
          style={{
            padding: 25,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <ProgressCircle
              percent={80}
              radius={50}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{"80%"}</Text>
            </ProgressCircle>
            <Text style={{ fontSize: 12, textAlign: "center" }}>ENV</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <ProgressCircle
              percent={60}
              radius={50}
              borderWidth={8}
              color="#ffc305"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{"60%"}</Text>
            </ProgressCircle>
            <Text style={{ fontSize: 12, textAlign: "center" }}>SOC</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <ProgressCircle
              percent={40}
              radius={50}
              borderWidth={8}
              color="#c70039"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18 }}>{"40%"}</Text>
            </ProgressCircle>
            <Text style={{ fontSize: 12, textAlign: "center" }}>GOV</Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 20, paddingBottom: -10, flexDirection: "row" }}>
        <Image
          source={require("../Interface_icons/14-Alerts/48w/alert-circle.png")}
          style={{ height: 20, width: 20, paddingRight: 20 }}
        />
        <Text style={{ paddingLeft: 20 }}> Your GOV area is below average</Text>
      </View>
      <View style={externalStyle.company_overall}></View>
    </ScrollView>
  );
};

export default Detail;
