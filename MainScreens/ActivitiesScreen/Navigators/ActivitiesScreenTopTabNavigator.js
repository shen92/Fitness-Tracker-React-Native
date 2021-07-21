import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import ActivitiesTab from "../ActivitiesTab/ActivitiesTab";
import AddActivityTab from "../AddActivityTab/AddActivityTab";

const ActivitiesScreenTopTabNavigator = createMaterialTopTabNavigator(
  {
    Activities: {
      screen: ActivitiesTab,
      navigationOptions: {
        title: "Activities",
      },
    },
    AddActivity: {
      screen: AddActivityTab,
      navigationOptions: {
        title: "Create Activity",
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

export default createAppContainer(ActivitiesScreenTopTabNavigator);
