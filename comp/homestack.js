import ClubPage from './ClubPage';
import ClubDetails from './ClubDetails';
import React from 'react';
import { TransitionPresets, createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';
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
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerStyle: {
                    backgroundColor: 'rgb(9, 136, 228)',
                    height: height / 3,
                    borderBottomRightRadius: 40,
                    borderBottomLeftRadius: 40,
                },
                cardStyle: {backgroundColor: 'white'}
            }
        }
    },


    ClubDetail: {
        screen: ClubDetails,
        navigationOptions: ({navigation }) => {
            return {
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {backgroundColor: '#ebf2f8'}
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