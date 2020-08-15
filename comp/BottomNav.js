import HomeStack2 from './homestack2'
import Calendar from './Calendar'
import Messaging from './Messaging'

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Feather from 'react-native-vector-icons/Feather'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeStack from './homestack';
import {TouchableRipple} from 'react-native-paper'

import { Dimensions, TouchableWithoutFeedback} from 'react-native';

const { width, height } = Dimensions.get('window')

const SettingsTabs = createMaterialBottomTabNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            title: "Clubs",
            tabBarIcon: ({ focused, tintColor }) => (
                <Feather
                    focused = {focused}
                    name="home"
                    size={25}
                    borderColor = {tintColor}
                    color={tintColor} />
            ),
            initialRouteName: 'HomeStack',
            activeColor: 'rgb(9, 136, 228)',
            inactiveColor: '#bdbdbd',
            barStyle: {backgroundColor: 'white', borderColor: 'white'},
        },
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            //tabBarLabel: "Calendar",
            tabBarIcon: ({ focused, tintColor }) => (
                <Feather
                    focused = {focused}
                    name="calendar"
                    size={25}
                    color={tintColor} />
            ),
            activeColor: 'rgb(9, 136, 228)',
            inactiveColor: '#bdbdbd',
            barStyle: {backgroundColor: 'white', borderColor: 'white'},
        },
    },
    Messaging: {
        screen: Messaging,
        navigationOptions: {
            title: "Messaging",
            tabBarIcon: ({ focused, tintColor }) => (
                <Feather
                    focused = {focused}
                    name="message-square"
                    size={25}
                    color={tintColor} />
            ),
            activeColor: 'rgb(9, 136, 228)',
            inactiveColor: '#bdbdbd',
            barStyle: {backgroundColor: 'white', borderColor: 'white'},
        },
    },
    HomeStack2: {
        screen: HomeStack2,
        navigationOptions: {
            tabBarLabel: "Election",
            tabBarIcon: ({ focused, tintColor }) => (
                <Material
                    focused = {focused}
                    name="vote-outline"
                    size={25}
                    color={tintColor} />
            ),
            activeColor: 'rgb(9, 136, 228)',
            inactiveColor: '#bdbdbd',
            barStyle: {backgroundColor: 'white', borderColor: 'transparent', borderWidth: 0},
        },
    }
}, {
    shifting: true,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
        labelStyle: {
            fontWeight: 'bold'
        },
    },
}
    
);

export default createStackNavigator({ SettingsTabs }, { headerMode: "none" });

