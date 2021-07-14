import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from "react-navigation";
import DailySummaryTab from "../DailySummaryTab/DailySummaryTab";
import WeeklySummaryTab from "../WeeklySummaryTab/WeeklySummaryTab";

const HomeScreenTopTabNavigator = createMaterialTopTabNavigator(
    {
        DailySummary: {
            screen: DailySummaryTab,
            navigationOptions: {
                title: 'Daily Summary',
            }
        },
        WeeklySummary: {
            screen: WeeklySummaryTab,
            navigationOptions: {
                title: 'Weekly Summary',
            }
        },
    }, {
        tabBarOptions: {
            upperCaseLabel: false,
            tabStyle: {
                height: 25,
            },
            indicatorStyle: {
                borderBottomColor: '#eeeeee',
                borderBottomWidth: 2,
            },
            labelStyle: {
                fontSize: 15,
                color: '#eeeeee',
                marginTop: -18,
            },
            style: {
                backgroundColor: '#00adb5',
            },
        },
    });

export default createAppContainer(HomeScreenTopTabNavigator);