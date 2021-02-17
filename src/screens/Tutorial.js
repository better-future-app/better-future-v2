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

import ProgressCircle from "react-native-progress-circle";

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
          <Text style={externalStyle.header_text}>ESG Investing</Text>
        </View>
      </View>

      <View style={{ paddingLeft: "10%", paddingTop: "5%" }}>
        <Image
          source={require("../images/esg_chart1.jpg")}
          style={{
            width: windowWidth - 100,
            height: 300,
            borderRadius: 200,
          }}
        />
      </View>
      <View style={{ padding: "5%" }}>
        <Text style={externalStyle.tutorial_title}>
          What is ESG Investing ?
        </Text>
        <Text>
          ESG stands for environmental, social, and governance. Investors who
          use this approach incorporate information about a business’
          operational performance across the three pillars:
        </Text>
        <Text>
          <Text style={externalStyle.tutorial_title}>E</Text> – Environmental
          factors such as a company’s carbon footprint, water footprint and
          waste management policies.
        </Text>
        <Text>
          <Text style={externalStyle.tutorial_title}>S</Text> – Social factors
          such as labour standards in their supply chain, data protection and
          the health and safety of employees.
        </Text>
        <Text>
          <Text style={externalStyle.tutorial_title}>G</Text> – Governance
          factors such as independence and composition of the board, lobbying,
          bribery and corruption.
        </Text>
        <Text style={externalStyle.tutorial_title}>How does it help?</Text>
        <Text>
          It seems commonsense that the way companies treat their employees,
          their negative environmental footprints and the way they are governed
          can affect companies’ financial performance. If managed badly, these
          behaviours are risks that can damage a company’s reputation, lead to
          litigation costs and result in lower productivity.
        </Text>
        <Text style={externalStyle.tutorial_title}>
          How is ESG different to sustainable investing?
        </Text>
        <Text>
          ESG integration as an investment tool is very different from
          sustainable investing. While some ESG factors do describe aspects of
          company sustainability, its aim is to unlock factors that affect
          financial performance only. For example, an excellent ESG integrated
          strategy may still invest in sectors that you may consider
          unsustainable – like tobacco manufacturers or fossil fuel extractors.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Detail;
