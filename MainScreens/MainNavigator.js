import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreenStackNavigator from "./HomeScreen/Navigators/HomeScreenStackNavigator";
import MealsScreenStackNavigator from "./MealsScreen/Navigators/MealsScreenStackNavigator";
import ActivitiesScreenStackNavigator from "./ActivitiesScreen/Navigators/ActivitiesScreenStackNavigator";
import ProfileScreenStackNavigator from "./ProfileScreen/Navigators/ProfileScreenStackNavigator";

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStackNavigator,
    },
    Meals: {
      screen: MealsScreenStackNavigator,
    },
    Activities: {
      screen: ActivitiesScreenStackNavigator,
    },
    Profile: {
      screen: ProfileScreenStackNavigator,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Meals") {
          iconName = "ios-cafe";
        } else if (routeName === "Activities") {
          iconName = "ios-bicycle";
        } else if (routeName === "Profile") {
          iconName = "ios-person";
        }
        return <Ionicons name={iconName} size={32} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      style: {
        height: 60,
      },
    },
    animationEnabled: true,
  }
);
export default createAppContainer(MainTabNavigator);
