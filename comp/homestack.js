import ClubPage from './ClubPage';
import ClubDetails from './ClubDetails';
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from './header.js'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigationParam, BaseRouter } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

const screens = createStackNavigator({
    Club: {
        screen: ClubPage,
        backgroundColor: 'white',
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: () => <Header navigation = {navigation}/>,
                headerStyle: {
                    backgroundColor: 'rgb(9, 136, 228)',
                    height: height / 3,
                    borderBottomRightRadius: 40,
                    borderBottomLeftRadius: 40,
                },
            }
        }
    },


    ClubDetail: {
        screen: ClubDetails,
        navigationOptions: ({navigation }) => {
            return {
                headerStyle: {
                    backgroundColor: 'rgb(9, 136, 228)',
                    height: height/10
                }
            };
        }
    }
},
    {
        defaultNavigationOptions: {
            cardStyle: { backgroundColor: '#FFFFFF' },
        },
    }

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