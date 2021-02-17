import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Ivestment from "../screens/Ivestment";
import News from "../screens/News";
import Detail from "../screens/Detail";
import Profile from "../screens/Profile";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 40,
          justifyContent: "center",
          paddingVertical: 15,
          backgroundColor: "#eff4f0",
          elevation: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../Interface_icons/01-Home/48w/house-1.png")}
              style={{ height: 20, width: 20 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Investment"
        component={Ivestment}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../Interface_icons/02-Dashboard/48w/pie-line-graph.png")}
              style={{ height: 20, width: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../Interface_icons/59-Newspapers/48w/newspaper.png")}
              style={{ height: 20, width: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../Interface_icons/56-Social-Profile/48w/social-profile-avatar.png")}
              style={{ height: 20, width: 20 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
export default HomeStackNavigator;
