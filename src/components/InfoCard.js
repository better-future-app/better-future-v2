import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import externalStyle from "../screens/styleSheet";

import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
// const test123 = () => {
//   return data.map((item, index) => {
//     return <InfoCard data={item} key={index} />;
//   });
// };
//export default test123;

export default InfoCard = ({
  image,
  stock,
  ticker,
  esgrating,
  industry,
  esgwarning,
  navigation,
  investmentPage,
}) => {
  // make a fucntion to fatch the storage for average price and stock not a map fucntion
  //just use getiteam(numstock.contact(stock)) for numstock
  const [esgColorIndicator, setEsgColorIndicator] = useState();
  const [esgRating, setEsgRating] = useState();
  const [isInvestmentPage, setIsInvestmentPage] = useState(false);
  const negl = "#A0D468";
  const lowRisk = "#AAEE68";
  const mediumRisk = "#DCCF36";
  const highRisk = "#FC6E51";
  const sever = "#ED5565";
  const noData = "#FFFFFF";
  useEffect(() => {
    function assingEsgIndicatorColor() {
      setEsgRating(esgrating);
      if (esgRating <= 10 && esgRating > 0) {
        setEsgColorIndicator(negl);
      } else if (esgRating >= 10 && esgRating <= 20) {
        setEsgColorIndicator(lowRisk);
      } else if (esgRating >= 20 && esgRating <= 30) {
        setEsgColorIndicator(mediumRisk);
      } else if (esgRating >= 30 && esgRating <= 40) {
        setEsgColorIndicator(highRisk);
      } else if (esgRating >= 40) {
        setEsgColorIndicator(sever);
      } else if (esgrating == null) {
        setEsgColorIndicator(noData);
      }
    }
    function checkisInvestmentPage() {
      if (investmentPage == "ture") {
        setIsInvestmentPage(true);
      }
    }
    assingEsgIndicatorColor();
    checkisInvestmentPage();
  }, []);

  return (
    <TouchableOpacity
      // this is how to pass things to other pages
      onPress={() =>
        navigation.navigate("Detail", {
          stock,
          esgrating,
          industry,
          esgwarning,
          ticker,
        })
      }
    >
      <View style={externalStyle.home_company_list}>
        <View style={externalStyle.card}>
          {/* chek for isInvestmentPage , and disply numstock  and average price  */}
          <Text style={externalStyle.home_company_text}>{stock}</Text>
          <Text style={externalStyle.home_company_text}>
            <View
              style={{
                borderRadius: 1000,
                width: 20,
                paddingBottom: 5,
                height: 10,
                backgroundColor: esgColorIndicator,
                justifyContent: "center",
                alignItems: "center",
              }}
              underlayColor="#ccc"
            ></View>
            {"     "}
            {esgrating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// inport
