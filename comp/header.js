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
    var text = 'Good Morning!'
    if(hours >= 20){
        text = 'Good Night!'
    } else if(hours >= 17){
        text = 'Good Evening!'
    } else if(hours >= 12){
        text = 'Good Afternoon!'
    }

    var date = new Date().getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

    var month = monthNames[new Date().getMonth()];
    var year = new Date().getFullYear();

    return (
        <View style = {{flexDirection: 'row'}}>
            <View style = {style.container}>
                <Feather name="bar-chart-2" style = {style.button} onPress = {open}/>
                <View style = {{paddingTop: height/8}}>
                <Text style = {{paddingLeft: 15, paddingBottom: 5, color: '#90b4ce'}}>{month} {date}, {year}</Text>
                    <Text style = {style.txt2}>{text}</Text>
                </View>
            </View>
            <View style = {[{marginLeft: -20}, {marginTop: -20}]}>
                <Image source = {require('./read.png')} style = {style.image}/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingBottom: 12,
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
        fontSize: 26,
        fontWeight: 'bold',
        paddingLeft: width/32,
        marginTop: - height/128,
        color: 'white'
    },
    image: {
        width: width/2,
        height: height/4,
        resizeMode: 'contain',
        marginTop: -10,
        marginLeft: 20
    }
});
