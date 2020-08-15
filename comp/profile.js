import React, { useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker'
import GLOBALS from './Global.js';

const { width, height } = Dimensions.get('window')

export default function Profile({navigation}) {

    let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    }

    const [selectedImage, setSelectedImage] = React.useState(null);

    const open = () => {
        navigation.openDrawer()
    }

    return (
    <View style={{
        flex: 1,
        backgroundColor: '#ebf2f8'
    }}>
    <View style = {{width: width, height: 350, backgroundColor: 'rgb(9, 136, 228)'}}>
    <Text style = {{position: 'absolute', marginLeft: 140, marginTop: 60, fontSize: 23, color: 'white', fontWeight: 'bold'}}>Edit Profile</Text>
    <Feather name="x" style = {{
        position: 'absolute',
        marginLeft: 45,
        marginTop: 65,
        fontSize: 25,
        color: 'white'}} onPress = {open}/>
    
    <Feather name="check" style = {{
        position: 'absolute',
        marginLeft: 335,
        marginTop: 65,
        fontSize: 25,
        color: 'white'}} onPress = {open}/>
    <Image
        style={{ height: 150, width: 150, borderRadius: 100, marginLeft: 130, marginTop: 120}}
        source={require('./profile4.jpg')} 
        />
        <TouchableOpacity style={styles.addPictureIcon} onPress={openImagePickerAsync}>
        <Feather name="camera" size={20} color = {'white'} />
        </TouchableOpacity>
    
    </View>

    <ScrollView style = {{marginBottom: 20}}>
    <Text style = {{fontWeight: 'bold', marginLeft: 20, marginTop: 60, fontSize: 18, color: '#094067' }}>Short Bio</Text>
    <Feather name="user" style = {{
        position: 'absolute', marginLeft: 110, marginTop: 64.5, fontSize: 18, color: '#094067'}}/>
    <TextInput multiline = {true} style = {{marginLeft: 20, marginTop: 5, fontSize: 18, color: '#094067', width: 370 }} value = {GLOBALS.PEOPLE[0].bio}/>
    <Text style = {{fontWeight: 'bold', marginLeft: 20, marginTop: 30, fontSize: 18, color: '#094067' }}>Location</Text>
    <Feather name="map-pin" style = {{
        position: 'absolute', marginLeft: 105, marginTop: 454.5, fontSize: 18, color: '#094067'}}/>
    <TextInput style = {{marginLeft: 20, marginTop: 5, fontSize: 18, color: '#094067'}} value = {'University of Texas at Austin'}/>
    <Text style = {{fontWeight: 'bold', marginLeft: 20, marginTop: 30, fontSize: 18, color: '#094067' }}>Graduation Year</Text>
    <Feather name="calendar" style = {{
        position: 'absolute', marginLeft: 175, marginTop: 544.5, fontSize: 18, color: '#094067'}}/>
    <TextInput style = {{marginLeft: 20, marginTop: 5, fontSize: 18, color: '#094067'}} value = {'Class of ' + GLOBALS.PEOPLE[0].year}/>
    <Text style = {{fontWeight: 'bold', marginLeft: 20, marginTop: 30, fontSize: 18, color: '#094067' }}>Birthday</Text>
    <Feather name="calendar" style = {{
        position: 'absolute', marginLeft: 105, marginTop: 634.5, fontSize: 18, color: '#094067'}}/>
    <TextInput style = {{marginLeft: 20, marginTop: 5, fontSize: 18, color: '#094067'}} value = {'Jan 1st, 2001'}/>
    <Text style = {{fontWeight: 'bold', marginLeft: 20, marginTop: 30, fontSize: 18, color: '#094067' }}>Accomplishments</Text>
    <Feather name="award" style = {{
        position: 'absolute', marginLeft: 190, marginTop: 723.5, fontSize: 18, color: '#094067'}}/>
    {
        GLOBALS.PEOPLE[0].accomplishments.map((acc) => (
            <TextInput multiline = {true} style = {{marginLeft: 20, marginTop: 5, fontSize: 18, color: '#094067', width: 370 }} value = {'- ' + acc}/>
        ))
    }
    </ScrollView>
    <View style = {{marginLeft: 85, marginTop: 300, position: 'absolute', width: 250, height: 100, backgroundColor: 'white',
        borderRadius: 25}}>
    <TextInput style = {{color: '#094067', marginTop: 10, marginLeft: 54, position: 'absolute', fontSize: 20, fontWeight: 'bold'}} value = {'Gautham Raju'}/>
    <Image source={require('./twitter.png')} style={{width: 30, height: 30, marginLeft: 153, position: 'absolute', marginTop: 53}}></Image>
    <Image source={require('./mail.png')} style={{width: 25, height: 25, marginLeft: 125, position: 'absolute', marginTop: 55}}></Image>
    <Image source={require('./ig.png')} style={{width: 25, height: 25, marginLeft: 95, position: 'absolute', marginTop: 55}}></Image>
    <Image source={require('./ln.png')} style={{width: 30, height: 30, marginLeft: 63, position: 'absolute', marginTop: 53}}></Image>
    <View style = {{backgroundColor: '#3da9fc', width: 200, height: 2, marginTop: 45, marginLeft: 23}}></View>
    </View>

    </View>
    
    );
}



const styles = StyleSheet.create({
    addPictureIcon: {
    height: 40,
    width: 40,
    backgroundColor: '#3da9fc',
    borderRadius: 50,
    position: 'absolute',
    left: 65,
    top: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
    marginLeft: 170,
    marginTop: 155,
    elevation: 2
    }
});