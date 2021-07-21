import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import MealsTab from "../MealsTab/MealsTab";
import AddMealTab from "../AddMealTab/AddMealTab";

const MealsScreenTopTabNavigator = createMaterialTopTabNavigator(
  {
    Meals: {
      screen: MealsTab,
      navigationOptions: {
        title: "Meals",
      },
    },
    AddMeal: {
      screen: AddMealTab,
      navigationOptions: {
        title: "Create Meal",
      },
    },
  },
  {
    tabBarOptions: {
      upperCaseLabel: false,
      tabStyle: {
        height: 25,
      },
      indicatorStyle: {
        borderBottomColor: "#eeeeee",
        borderBottomWidth: 2,
      },
      labelStyle: {
        fontSize: 15,
        color: "#eeeeee",
        marginTop: -18,
      },
      style: {
        backgroundColor: "#00adb5",
      },
    },
  }
);

export default createAppContainer(MealsScreenTopTabNavigator);
