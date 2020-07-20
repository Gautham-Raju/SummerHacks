import React from 'react';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationHelpersContext } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')
const name = 'Bitchass Gauth'
const email = 'bitchass@gauth.com'

export default SideBar = props => (
    <ScrollView>
        <View
            style = {{ width: undefined, padding: 16, paddingTop: 48, backgroundColor: 'rgb(9, 136, 228)'}}
        >
            <Image source = {require('./nhs.png')}
            style = {styles.profile}/>
            <Text style = {styles.name}>{name}</Text>
            <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.email}>{email}</Text>
                <Feather name = 'mail' size = {16} color = 'rgba(255, 255, 255, 0.8)'/>
            </View>
        </View>

        <View style = {styles.container}>
            <DrawerNavigatorItems {...props}/>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: width * .2,
        height: width * .2,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'white',
        //alignSelf: 'center'
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
        //alignSelf: 'center'
    },
    email: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        marginRight: 4,
        marginVertical: -2,
        //marginLeft: width *.1
    }
})