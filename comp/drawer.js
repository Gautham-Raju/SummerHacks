import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native'
import ClubPage from './ClubPage';
import ClubDetails from './ClubDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Election from './Election'
import Calendar from './Calendar'
import Messaging from './Messaging'
import Notifications from './Notifications'
import { Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Drawer } from 'react-native-paper';
import HomeStack from './homestack.js'
import BottomNav from './BottomNav.js'

const Tab = createMaterialBottomTabNavigator();

const DrawerNavigation = createDrawerNavigator({
    Home: {
        screen: BottomNav,
    },
    Notifications: {
        screen: Notifications
    },
}
);

export default createAppContainer(DrawerNavigation)




