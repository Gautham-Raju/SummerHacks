import React from 'react';
import { Text, View } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

export default function HelloWorldApp() {
    return (
    <View style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text>Hello, world!</Text>
    </View>
    );
}