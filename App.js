import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./src/navigations/Navigator";
import DrawerNavigator from "./src/navigations/DrawerNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
export default App;
