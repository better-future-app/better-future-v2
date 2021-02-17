import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Container, Thumbnail, Header, Content, Left, View } from "native-base";
import { Image, Text } from "react-native";
function sidebar({ ...props }) {
  return (
    <Container>
      <View
        style={{
          paddingTop: "20%",
          flexDirection: "row",
          paddingLeft: "10%",
        }}
      >
        <Image
          source={require("../images/yoda_bb.png")}
          style={{ height: 50, width: 50 }}
        />
        <Text
          style={{ padding: "10%", paddingTop: "7%", paddingBottom: "-7%" }}
        >
          USERNANME
        </Text>
      </View>

      <Content>
        <DrawerContentScrollView {...props}></DrawerContentScrollView>
        <DrawerItemList {...props} />
      </Content>
    </Container>
  );
}
export default sidebar;
