import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import ProfileScreenTopTabNavigator from "./ProfileScreenTopTabNavigator";

const ProfileScreenStackNavigator = createStackNavigator(
    {
        testScreen: {
            screen: ProfileScreenTopTabNavigator,
            navigationOptions: {
                title: 'Profile',
                headerStyle: {
                    backgroundColor: '#00adb5',
                    height: 40,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontFamily: 'Copperplate',
                    fontWeight: '400',
                    fontSize: 32,
                    color: '#eeeeee',
                    marginTop: 0,
                },
            },
        },
    }, {
        headerMode: "screen",
    }
);

export default createAppContainer(ProfileScreenStackNavigator);