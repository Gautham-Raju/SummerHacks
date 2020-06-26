import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window')

export default function Header( {navigation} ) {

    const open = () => {
        navigation.openDrawer()
    }
    var hours = new Date().getHours();
    var text = 'Good Morning,'
    if(hours >= 20){
        text = 'Good Night,'
    } else if(hours >= 17){
        text = 'Good Evening,'
    } else if(hours >= 12){
        text = 'Good Afternoon,'
    }

    return (
        <View style = {{flexDirection: 'row'}}>
            <View style = {style.container}>
                <Feather name="bar-chart-2" style = {style.button} onPress = {open}/>
                <View style = {{paddingTop: height/32}}>
                    <Text style = {style.txt}>Good Afternoon,</Text>
                    <Text style = {style.txt2}>My Clubs</Text>
                </View>
            </View>
            <View style = {[{marginLeft: -20}, {marginTop: -20}]}>
                <Image source = {require('./school-tools.png')} style = {style.image}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingBottom: 12
    },
    txt: {
        paddingTop: height/ 16,
        paddingLeft: width/32,
        fontSize: 18,
        color: 'white'
    },
    button: {
        fontSize: 30,
        transform: [{ rotate: '0deg' }],
        color: 'white',
        alignSelf: 'flex-start',
        paddingLeft: width/32,
        paddingTop: 0,
        transform: [{ rotate: '90deg' }]
    },
    txt2: {
        fontSize: 40,
        paddingLeft: width/32,
        marginTop: - height/128,
        color: 'white'
    },
    image: {
        width: width/2,
        height: height/4,
        resizeMode: 'contain'
    }
});
