import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
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

export default SearchBarInfoCard = ({
  image,
  stock,
  industry,
  esgrating,
  navigation,
  esgwarning,
  ticker,
  onPress,
}) => {
  return (
    <TouchableOpacity
      // this is how to pass things to other pages
      onPress={() => onPress(ticker)}
      style={{ paddingTop: 5 }}
    >
      <View style={externalStyle.Searchbar_size}>
        <Image source={image} />
        <View style={externalStyle.card}>
          <Text style={externalStyle.home_company_text}>{stock}</Text>
          <Text style={externalStyle.home_company_text}>{esgrating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
