import { Chip } from "react-native-paper";
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import externalStyle from "../screens/styleSheet";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default Chipfunction = ({ industry, onPress }) => {
  // make a fucntion to fatch the storage for average price and stock not a map fucntion
  //just use getiteam(numstock.contact(stock)) for numstock
  console.log(industry);
  return <Chip onPress={() => onPress(industry)}>{industry}</Chip>;
};
