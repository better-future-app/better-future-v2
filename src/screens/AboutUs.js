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

const windowWidth = Dimensions.get("window").width;

const Detail = ({ navigation }) => {
  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <View style={externalStyle.more_buttom}>
          <Text style={externalStyle.header_text}>About Us</Text>
        </View>
      </View>

      <View style={{ paddingLeft: "5%", paddingTop: "5%" }}>
        <Image
          source={require("../images/wwulogo.png")}
          style={{
            width: windowWidth - 60,
            height: 180,
          }}
        />
      </View>

      <View style={{ paddingLeft: "10%", paddingTop: "5%" }}></View>
      <View style={{ padding: "5%" }}>
        <Text>
          <Text style={externalStyle.tutorial_title}>Origins</Text>
          {"\n"}
          Better Future was created with the intention of educating and teaching
          ethical investing. The program was developed by a group of students
          from Western Washington University as part of their CSCI 436 -
          'Technology for the Social Good' curriculum.{"\n"}
        </Text>
        <Text>
          <Text style={externalStyle.tutorial_title}>Sources</Text>
          {"\n"}
          The ESG data located within the application is sourced from
          Sustainalytics, and the stock price data is accessed through Alpha
          Vantage.{"\n"}
        </Text>
        <Text>
          <Text style={externalStyle.tutorial_title}>Data Collection</Text>
          {"\n"}
          All of your data processed by this app is local side only, we do not
          collect personal information entered into Better Future.{"\n"}
        </Text>
        <Text>
          <Text style={externalStyle.tutorial_title}>Contact Information</Text>
          {"\n"}
          Please contact us with inquiries and bug reports at:
          NotAnEmailAddress@fix.this.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Detail;
