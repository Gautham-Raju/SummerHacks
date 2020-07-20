import { NavigationContainer } from '@react-navigation/native'
import ClubPage from './ClubPage';
import ClubDetails from './ClubDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Election from './Election'
import Calendar from './Calendar'
import Messaging from './Messaging'

import React, { ReactElement } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeStack from './homestack';

import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window')

const SettingsTabs = createBottomTabNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            title: "Clubs",
            tabBarIcon: ({ tintColor }) => (
                <Feather
                    name="home"
                    size={25}
                    borderColor = {tintColor}
                    color={tintColor} />
            )
        }
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            //tabBarLabel: "Calendar",
            tabBarIcon: ({ tintColor }) => (
                <Feather
                    name="calendar"
                    size={25}
                    color={tintColor} />
            )
        }
    },
    Messaging: {
        screen: Messaging,
        navigationOptions: {
            title: "Messaging",
            tabBarIcon: ({ tintColor }) => (
                <Feather
                    name="message-square"
                    size={25}
                    color={tintColor} />
            )
        }
    },
    Election: {
        screen: Election,
        navigationOptions: {
            tabBarLabel: "Election",
            tabBarIcon: ({ tintColor }) => (
                <Material
                    name="vote-outline"
                    size={25}
                    color={tintColor} />
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'rgb(9, 136, 228)',
        inactiveTintColor: '#bdbdbd',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: 'white',
            height: height/ 12,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            borderColor: 'white',
            borderTopColor: 'white',
            paddingHorizontal: 15
            // shadowOffset: {width: 1, height: 1},
            // shadowColor: '#333',
            // shadowOpacity: 0.3,
            // shadowRadius: 2,
        },
        showLabel: false
    }
});

export default createStackNavigator({ SettingsTabs }, { headerMode: "none" });

