import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, Linking, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GLOBALS from './Global.js';
import { LightenDarkenColor } from 'lighten-darken-color'; 

const { width, height } = Dimensions.get('window')



export default function ClubDetails({navigation}){

    function openModalWithItem(item) {
        setModalOpen: {
            setModalOpen({
                isOpen: true,
                color: item.color,
                image: item.person.picture.toString(),
                name: item.person.user,
                school: item.person.school,
                year: item.person.year,
                bio: item.person.bio
            })
        }
    }

    const [modalOpen, setModalOpen] = useState({
        isOpen: false,
        color: '',
        image: '',
        user: '',
        school: '',
        year: '',
        bio: ''
    });

    return (
        <View styles = {styles.container}>
            <View style = {{width: width, height: 200, backgroundColor: 'rgb(9, 136, 228)'}}>
                <View style = {{paddingLeft: 20, paddingTop: 50}}>
                <Feather name = 'arrow-left' size = {25} color = {'white'} onPress = {() => navigation.navigate('Club')}/>
                </View>
                <View>
                <Text style = {styles.headerText}> { navigation.getParam('text') } </Text>
                <Text style = {styles.code}> {navigation.getParam('code')} </Text>
                </View>
                <View style = {styles.button}>
                    <Text style = {{paddingLeft: 18, color: 'white', fontWeight: 'bold', paddingTop: 9}} onPress = {() => Linking.openURL(navigation.getParam('url').toString()).catch((err) => console.error('An error occurred', err))}>Link</Text>
                    <Feather name = 'external-link' style = {styles.icon} onPress = {() => Linking.openURL(navigation.getParam('url').toString()).catch((err) => console.error('An error occurred', err))}/>
                </View>
            </View>

            <View style = {{borderWidth: 10, borderColor: '#ebf2f8'}}>
            <Modal visible = {modalOpen.isOpen}
                backdropColor = {'white'} backdropOpacity = {1} onBackdropPress={()=> closeModal()} 
                transparent= {true}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000040'}}>
                            <View style={{
                                    width: 250,
                                    height: 500,
                                    backgroundColor: modalOpen.color, padding: 20, borderRadius: 25}}>
                                    <View style = {{width: 30, height: 30, backgroundColor: LightenDarkenColor(modalOpen.color, 20), 
                                        borderRadius: 10, position: 'absolute', marginTop: 25, marginLeft: 20}}>
                                    <Feather style = {{paddingLeft: 4, paddingTop: 4}} name = 'chevron-left' size = {20} color = {'white'} 
                                        onPress = {() => setModalOpen({isOpen: false, color: '', image: '', user: '', school: '', user: '', bio: ''})}/>
                                    </View>
                                <View style={{
                                    width: 250,
                                    height: 425,
                                    marginLeft: -20,
                                    marginTop: 55,
                                    backgroundColor: 'white', padding: 20, borderRadius: 25}}>
                                    <Image source={modalOpen.image} style={styles.image}></Image>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 18, marginLeft: -1, marginTop: 12, alignSelf: 'center'}}>{modalOpen.name}</Text>
                                <Text style = {{color: '#5f6c7b', fontSize: 12, marginLeft: -1, marginTop: -2, alignSelf: 'center'}}>{modalOpen.school} {modalOpen.year}</Text>
                                <Image source={require('./twitter.png')} style={{width: 30, height: 30, marginLeft: 153, position: 'absolute', marginTop: 83}}></Image>
                                <Image source={require('./mail.png')} style={{width: 25, height: 25, marginLeft: 125, position: 'absolute', marginTop: 85}}></Image>
                                <Image source={require('./ig.png')} style={{width: 25, height: 25, marginLeft: 95, position: 'absolute', marginTop: 85}}></Image>
                                <Image source={require('./ln.png')} style={{width: 30, height: 30, marginLeft: 63, position: 'absolute', marginTop: 83}}></Image>
                                <ScrollView style = {{paddingTop: 50}}>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16}}>About</Text>
                                    <Text style = {{color: '#5f6c7b', fontSize: 12, paddingLeft: 15}}>
                                        {modalOpen.bio}</Text>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16}}>Interests</Text>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16}}>Accomplishments</Text>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16}}>Additional</Text>
                                </ScrollView>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                    data = {navigation.getParam('people')}
                    renderItem = {({item}) => (
                        <TouchableWithoutFeedback onPress = {() => openModalWithItem(item)}>
                        <View style = {[styles.card, {backgroundColor:item.color}]}>
                            <Image source={item.person.picture} style={[styles.profileImage]}></Image>
                            <Text style={styles.cardTitle}>
                                {item.person.user}
                            </Text>
                            <Text style = {styles.cardDescription}>
                                {item.position}
                            </Text>
                            <Image source = {require('./pencil.png')} style = {{marginLeft: 68, tintColor: 'white', marginTop: -100, width: 50, height: 50, backgroundColor: '#00000000'}}></Image>
                        </View>
                        </TouchableWithoutFeedback>
                    )}
                />
                    
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    headerText: {
        paddingLeft: 15,
        paddingTop: 20,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    code: {
        color: 'white',
        paddingLeft: 18,
        fontSize: 16
    },
    image: {
        borderColor: '#90b4ce',
        borderRadius: 100,
        width: 40,
        height: 40,
        borderWidth: 4,
        position: 'absolute',
        marginTop: 43,
        marginLeft: width - 70
    },
    button: {
        width: 90,
        height: 40,
        backgroundColor: '#3da9fc',
        position: 'absolute',
        marginLeft: width - 120,
        marginTop: 108,
        borderRadius: 25
    },
    icon: {
        position: 'absolute',
        paddingLeft: 55,
        paddingTop: 11,
        color: 'white',
        fontSize: 16
    },
    card: {
        width: 125,
        height: 150,
        borderRadius: 25,
        marginTop: 10,
        marginRight: 10,
    },
    cardTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 14,
        marginTop: 80
    },
    cardDescription: {
        color: 'white',
        paddingLeft: 14,
        fontSize: 13
    }, 
    profileImage: {
        borderColor: '#90b4ce',
        borderRadius: 100,
        width: 40,
        height: 40,
        borderWidth: 0,
        position: 'absolute',
        marginTop: 13,
        marginLeft: 13
    },
    image: {
        position: 'absolute',
        width: 60,
        height: 60,
        marginTop: -30,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white'
    }
});