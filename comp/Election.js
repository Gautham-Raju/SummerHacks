import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Text, View, Dimensions, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, Linking } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GLOBALS from './Global.js';
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window')

const colors = ['#FE6C7C', '#61a8ff']
    let col = ''
    let qual= ['Must be at least a junior', 'Must be in the club for at least 2 years', 'Application essay required', '3.0 Minimum GPA', 'Willing to commit 6 hours a week']

    const spec= [['Ultimately responsible for all aspects of the club', 'Sets direction for the club and events organised',
        'Run club meetings and should be expected to be the primary contact between the club and outside contacts', 'Delegate tasks and roles to other club members']
    , ['Support the President who will delegate tasks like publicity or event marketing', 
        'Can work productively with the President as hostile relations in the executive can be disruptive for the club', 'Set a positive example to other committee members and help maintain morale'],
        ['In charge of club finances and grant applications', 'Record all monetary transactions and keep all receipts for the year'],
        ['Notify people of upcoming meetings', 'Take minutes at the meetings', 'Maintain an up to date membership database', 
        'Maintaining the clubs email and Facebook groups', 'Main point of contact between the committee, executive and club members'],
        ["Advise the president on any subject he may require relating to the duties of each member's respective office", 
        'Selling tickets to events', 'Organising club shirts and fundraising activities'],
        ['Tracking club attendance', 'Maintaining club membership lists', 'Keeping members informed through a club newsletter and Trefle', 'Collecting dues']]

function display({item}, {navigation}){
    return(
    <View style = {styles.container1}>
        <View>
        <TouchableOpacity onPress = {() => navigation.navigate('Vote', item)}>
            <View>
                <Text style = {styles.text1}>{item.info}</Text>
                <Text style = {styles.subtext1}>{item.club}</Text>
                <Image source={item.image} style={styles.image}></Image>
                <Feather name= {item.user} style = {styles.user1}/>
                <Text style = {styles.time1}>{item.end}</Text>
            </View>
        </TouchableOpacity>
        </View>
    </View>)
}


export default function Election({navigation}) {

    const [modalOpen, setModalOpen] = useState(false);
    const [secmodalOpen, setsecModalOpen] = useState({
        isOpen: false,
        position: []
    });

    function openModalWithItem(position) {
        setsecModalOpen({
            isOpen: true,
            position: position
        })
    }

    return (
    <View style={{
        flex: 1,
        backgroundColor: '#ebf2f8'
    }}>
    <Modal visible = {modalOpen}
    backdropColor = {'white'} backdropOpacity = {1} onBackdropPress={()=>this.closeModal()} 
    transparent= {true}>
        <Modal visible = {secmodalOpen.isOpen}
                backdropColor = {'white'} backdropOpacity = {1} onBackdropPress={()=>this.closeModal()} 
                transparent= {true} propagateSwipe = {true}>
                    <TouchableWithoutFeedback>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000040'}}>
                            <View style={{
                                    width: 250,
                                    height: 400,
                                    backgroundColor: '#fff', borderRadius: 25}}>
                                    <View style = {{backgroundColor: secmodalOpen.position.color, width: 250, height: 75, borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
                                        <Text style = {{color: 'white', fontSize: 20, marginLeft: 15, marginTop: 12, fontWeight: 'bold'}}>{secmodalOpen.position.role}</Text>
                                        <Text style = {{color: 'white', fontSize: 14, marginLeft: 15, marginTop: -1}}>{GLOBALS.UPCOMING[0].info}</Text>
                                    </View>
                                    <Swiper showsButtons nextButton={<Text style={{fontSize: 100, color: 'transparent'}}>›</Text>} 
                                    prevButton = {<Text style={{fontSize: 100, color: 'transparent'}}>‹</Text>}loop={false}>
                                        <View testID="Hello" style = {{paddingLeft: 25, paddingRight: 10}}>
                                        <Text style={{marginLeft: -10, fontSize: 18, color: '#094067', marginTop: 5}}>Specifications</Text>
                                        {
                                            spec[Math.floor(Math.random() * 6)].map((quali) => (
                                                <Text>- {quali}</Text>
                                            ))
                                        }
                                        </View>
                                        <View testID="Beautiful" style = {{paddingLeft: 30, paddingRight: 10}}>
                                        <Text style={{marginLeft: -10, fontSize: 18, color: '#094067', marginTop: 5}}>Qualifications</Text>
                                        {
                                            qual.map((quali) => (
                                            <Text>- {quali}</Text>
                                            ))
                                        }
                                        </View>
                                    </Swiper>
                                <Text onPress = {() => setsecModalOpen({isOpen: false, position:[]})} 
                                style = {{color: '#094067', fontWeight: 'bold', marginLeft: 95, marginBottom: 30, marginTop: -20}}>
                                    CANCEL
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
        <TouchableWithoutFeedback>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#00000040'}}>
                <View style={{
                        width: 275,
                        height: 200,
                        backgroundColor: '#fff', padding: 20, borderRadius: 25, flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style = {{color: '#094067', fontSize: 20, marginRight: 100, marginLeft: 6, marginTop: -5, marginBottom: 5}}>Positions</Text>
                        {
                            GLOBALS.UPCOMING[0].positions.map((position) => (
                                col = position.color,
                                <View style = {{backgroundColor: col, paddingHorizontal: 10, paddingVertical: 2, marginHorizontal: 4, borderRadius: 10, marginVertical: 4}}>
                                <Text onPress = {() => openModalWithItem(position)} style = {{color: 'white'}}>{position.role}</Text>
                                </View>
                            ))
                        }
                    <Text onPress = {() => setModalOpen(false)} 
                    style = {{position: 'absolute', color: '#094067', fontWeight: 'bold', marginLeft: 105, marginTop: 160}}>
                        CANCEL
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    <View style = {{backgroundColor: 'rgb(9, 136, 228)', width: width, height: 170}}>
        <Text style = {styles.title}>Voting Page</Text>
        <Text style = {styles.subtitle}>You have 2 live elections</Text>
        <Feather name="search" style = {styles.search}/>
    </View>
    <Text style = {styles.header1}>Live Elections</Text>
    <View style = {{marginBottom: 40}}>
    <FlatList 
        data = {GLOBALS.LIVE}
        renderItem = {({ item }) => (
            display({item}, {navigation})
        )}
    />
    </View>
    <Text style = {[styles.header1, {paddingTop: 20}]}>Upcoming Elections</Text>
    <FlatList 
        data = {GLOBALS.UPCOMING}
        renderItem = {({ item }) => (
            <View style = {styles.container2}>
        <View>
            <View>
            <Text style = {styles.text2}>{item.info}</Text>
                <Text style = {styles.subtext2}>{item.club}</Text>
                <Image source={item.image} style={styles.image2}></Image>
                <Feather name= {item.user} style = {styles.user2}/>
                <Text style = {styles.time2}>{item.start}</Text>
                <Text onPress = {() => setModalOpen(true)} style = {styles.position}>View Positions</Text>
                <View style = {styles.apply}>
                <Text onPress = {() => Linking.openURL(GLOBALS.UPCOMING[0].url.toString()).catch((err) => console.error('An error occurred', err))} style = {styles.applyText}>Apply</Text>
                </View>
            </View>
        </View>
    </View>
        )}
    />
    </View>
    );
}

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 60,
        paddingLeft: 20
    },
    subtitle: {
        color: 'white',
        fontSize: 15,
        paddingLeft: 24,
        paddingTop: 105
    },
    search: {
        color: 'white',
        fontSize: 20,
        position: 'absolute',
        paddingTop: 75,
        paddingLeft: width - 60
    },
    header1: {
        paddingLeft: 24,
        fontSize: 20,
        color: '#094067',
        paddingTop: 20
    },
    container1: {
        width: width - 40,
        height: 100,
        backgroundColor: 'white',
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 25

    },
    container2: {
        width: width - 40,
        height: 140,
        backgroundColor: 'white',
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 25
    },
    image: {
        width: 70,
        height: 70,
        position: 'absolute',
        marginTop: 14,
        marginLeft: 10
    },
    text1: {
        paddingLeft: 85,
        paddingTop: 25,
        fontSize: 18,
        color: '#094067',
    },
    subtext1: {
        paddingLeft: 85,
        paddingTop: 50,
        fontSize: 14,
        color: '#094067',
        position: 'absolute'
    },
    user1: {
        position:'absolute',
        paddingLeft: 320, 
        paddingTop: 32,
        fontSize: 18,
        color: '#094067'
    },
    time1: {
        position: 'absolute',
        paddingLeft: 307,
        paddingTop: 52,
        fontSize: 12,
        color: '#ef4565',
        fontWeight: 'bold'
    },
    image2: {
        width: 70,
        height: 70,
        position: 'absolute',
        marginTop: 14,
        marginLeft: 10
    },
    text2: {
        paddingLeft: 80,
        paddingTop: 25,
        fontSize: 18,
        color: '#094067',
    },
    subtext2: {
        paddingLeft: 80,
        paddingTop: 50,
        fontSize: 14,
        color: '#094067',
        position: 'absolute'
    },
    user2: {
        position:'absolute',
        paddingLeft: 320, 
        paddingTop: 32,
        fontSize: 18,
        color: '#094067'
    },
    time2: {
        position: 'absolute',
        paddingLeft: 307,
        paddingTop: 52,
        fontSize: 12,
        color: '#094067',
        fontWeight: 'bold'
    },
    position: {
        position:'absolute',
        color: '#094067',
        marginTop: 90,
        marginLeft: 40,
        fontSize: 18
    },
    apply: {
        position: 'absolute',
        backgroundColor: '#3da9fc',
        width: 120,
        height: 40,
        borderRadius: 4,
        marginLeft: 200,
        marginTop: 85
    },
    applyText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginLeft: 30
    }

});