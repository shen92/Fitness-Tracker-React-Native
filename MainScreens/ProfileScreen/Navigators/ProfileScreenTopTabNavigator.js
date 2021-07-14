import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from "react-navigation";
import ProfileTab from "../ProfileTab/ProfileTab";

const ProfileScreenTopTabNavigator = createMaterialTopTabNavigator(
    {
        Profile: {
            screen: ProfileTab,
            navigationOptions: {
                title: 'View/Edit Profile',
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

export default createAppContainer(ProfileScreenTopTabNavigator);