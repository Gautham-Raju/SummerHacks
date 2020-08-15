import Vote from './vote.js';
import Election from './Election.js';
import React from 'react';
import { TransitionPresets, createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
import Header from './header.js'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigationParam, BaseRouter } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')



const screens = createStackNavigator({
    
    Election: {
        screen: Election,
        backgroundColor: 'white',
        navigationOptions: ({navigation}) => {
            return {
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }
        }
    },


    Vote: {
        screen: Vote,
        navigationOptions: ({navigation }) => {
            return {
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            };
        }
    }
},

);

screens.navigationOptions = ({ navigation }) => {   
    let tabBarVisible = true;   
    if (navigation.state.index > 0) {
        tabBarVisible = false;   
    }
    return {
        tabBarVisible,
    }; 
};

export default screens