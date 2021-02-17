import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import externalStyle from "./styleSheet";
import InfoCard from "../components/test";

// const test123 = () => {
//   return data.map((item, index) => {
//     return <InfoCard data={item} key={index} />;
//   });
// };
//export default test123;
const data = [
  {
    image: "./apple-logo.png",
    brand: "Apple",
    amount: "$127.83",
  },
  {
    image: "./googl-logo.png",
    brand: "google",
    amount: "$117.8",
  },
];

// imageUrl

const Home = ({ navigation }) => {
  return (
    <ScrollView
      vertical
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 0 }}
    >
      <View style={externalStyle.header}>
        <Image
          source={require("../images/1.png")}
          style={{
            height: 10,
            width: 20,
            marginTop: 50,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 0,
            width: "100%",
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              source={require("../images/logo.png")}
              style={{
                width: 150,
                height: 150,
                marginTop: -50,
              }}
            />
          </View>
        </View>
      </View>

      <LinearGradient
        colors={["rgba(0,0,0,0)", "transparent"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -60,
        }}
      >
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
            placeholder="Search"
            placeholderTextColor="#b1e5d3"
            style={{
              fontWeight: "bold",
              fontSize: 19,
              width: 300,
            }}
          />
          <Image
            source={require("../images/3.png")}
            style={{ height: 20, width: 20, paddingLeft: 20 }}
          />
        </View>
      </LinearGradient>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
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
            Top ESG Rating Stock
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
          onPress={() => navigation.navigate("Detail")}
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

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ width: "70%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
            }}
          >
            Top Worst ESG Rating Stock
          </Text>
        </View>
        <View style={{ width: "30%", alignItems: "flex-end" }}>
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
            source={require("../images/walmart-logo.png")}
          />
          <View style={externalStyle.card}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              WALMART
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#00a46c",
                paddingLeft: 30,
                paddingBottom: 30,
              }}
            >
              $143.39
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
            source={require("../images/mcdonalds-logo.png")}
          />
          <View style={externalStyle.card}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              McDONALDS
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#00a46c",
                paddingLeft: 8,
                paddingBottom: 30,
              }}
            >
              $209.09
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
            source={require("../images/cisco-logo.png")}
          />
          <View style={externalStyle.card}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              CISCO
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#00a46c",
                paddingLeft: 65,
                paddingBottom: 30,
              }}
            >
              $45.19
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
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
            Trending News
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={externalStyle.news}>
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

        <View style={externalStyle.news}>
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
export default Home;
