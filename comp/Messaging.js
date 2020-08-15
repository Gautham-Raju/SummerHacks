import React from 'react';
import { Text, View, Image } from 'react-native';

export default function Messaging() {
    return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }}>
    <Image source = {require('./coming.png')} style = {{width: 300, height: 300}}/>
    <Text style = {{color: '#094067', fontSize: 20, fontWeight: 'bold', paddingTop: 20}}>Coming Soon!</Text>
    </View>
    );
}