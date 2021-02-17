import * as React from "react";
import { Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Container, Header, Icon } from "native-base";
import Home from "../screens/Home";
import Ivestment from "../screens/Ivestment";
import News from "../screens/News";
import Detail from "../screens/Detail";
import Profile from "../screens/Profile";
import AboutUs from "../screens/AboutUs";
import Tutorial from "../screens/Tutorial";

import { Image } from "react-native";
import HomeStackNavigator from "../navigations/Navigator";
import Sidebar from "../components/DrewerNavigatorHelper";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "",
          drawerIcon: () => (
            <Image
              source={require("../Interface_icons/56-Social-Profile/48w/social-profile-avatar.png")}
              style={{ height: 20, width: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen name="News" component={News} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ESG Investing " component={Tutorial} />
      <Drawer.Screen name="About Us" component={AboutUs} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
