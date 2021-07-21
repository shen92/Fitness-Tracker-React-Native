import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginStackNavigator from "./LoginScreens/LoginNavigator";
import MainTabNavigator from "./MainScreens/MainNavigator";

const AppStackNavigator = createStackNavigator(
  {
    loginScreens: {
      screen: LoginStackNavigator,
    },
    mainScreens: {
      screen: MainTabNavigator,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    headerMode: "none",
  }
);

export default createAppContainer(AppStackNavigator);
