import React from "react";
import { View, Text, Image } from "react-native";
import SwiperComponent from "../components/SwiperComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import externalStyle from "./styleSheet";
const Detail = ({ navigation }) => {
  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>News</Text>
        </View>
      </View>
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
            Treading News
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
              More
            </Text>
          </View>
        </View>
      </View>
      <ScrollView vertical showsHorizontalScrollIndicator={false}>
        <View style={externalStyle.news_Page}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
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

        <View style={externalStyle.news_Page}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "contain",
            }}
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
export default Detail;
