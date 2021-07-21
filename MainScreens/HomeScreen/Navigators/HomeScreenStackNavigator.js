import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreenTopTabNavigator from "./HomeScreenTopTabNavigator";

const HomeScreenStackNavigator = createStackNavigator({
  testScreen: {
    screen: HomeScreenTopTabNavigator,
    navigationOptions: {
      title: "Home",
      headerBackTitleVisible: false,
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#00adb5",
        height: 84,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontFamily: "Copperplate",
        fontWeight: "400",
        fontSize: 32,
        color: "#eeeeee",
        marginTop: 0,
      },
    },
  },
});

export default createAppContainer(HomeScreenStackNavigator);
