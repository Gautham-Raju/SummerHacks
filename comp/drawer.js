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
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Drawer } from 'react-native-paper';
import HomeStack from './homestack.js'
import Profile from './profile.js'
import Preferences from './preferences.js'
import SignOut from './signout.js'
import BottomNav from './BottomNav.js'
import SideBar from './SideBar.js'
import Feather from 'react-native-vector-icons/Feather';


const { width, height } = Dimensions.get('window')

const Tab = createMaterialBottomTabNavigator();

const DrawerNavigation = createDrawerNavigator({
    Home: {
        screen: BottomNav,
        navigationOptions: {
            title: 'My Clubs',
            drawerIcon: ({tintColor}) => <Feather name = 'home' size = {16} color = {tintColor}/>
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
            drawerIcon: ({tintColor}) => <Feather name = 'user' size = {16} color = {tintColor}/>
        }
    },
    Notifications: {
        screen: Notifications,
        navigationOptions: {
            title: 'Notifications',
            drawerIcon: ({tintColor}) => <Feather name = 'bell' size = {16} color = {tintColor}/>
        }
    },
    Preferences: {
        screen: Preferences,
        navigationOptions: {
            title: 'Preferences',
            drawerIcon: ({tintColor}) => <Feather name = 'settings' size = {16} color = {tintColor}/>
        }
    },
    SignOut: {
        screen: SignOut,
        navigationOptions: {
            title: 'Sign Out',
            drawerIcon: ({tintColor}) => <Feather name = 'log-out' size = {16} color = {tintColor}/>
        }
    },
},
{
    initialRouteName: 'Home',
    drawerWidth: width * .75,
    contentOptions: {
        activeBackgroundColor: '#d4ebf2',
        activeTintColor: 'rgba(9, 136, 228, 1.0)',
        inactiveTintColor: '#094067',
        itemsContainerStyle: {
            marginTop: 16,
            marginHorizontal: 8
        },
        itemStyle: {
            borderRadius: 4,
        }
    },
    contentComponent: props => <SideBar {...props}/>
    
}
);



export default createAppContainer(DrawerNavigation)




