import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Dimensions, Image, Linking, Keyboard, TouchableWithoutFeedback, Modal, ScrollView } from 'react-native';
//import Modal from 'react-native-modal'
import Feather from 'react-native-vector-icons/Feather';
import GLOBALS from './Global.js';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Autocomplete from 'react-native-autocomplete-input';

const { width, height } = Dimensions.get('window')

export default function ClubDetails({navigation}){

    const ann= JSON.parse(JSON.stringify(navigation.getParam('announcements')));
    const elect= JSON.parse(JSON.stringify(navigation.getParam('election')));

    const [secmodalOpen, setsecModalOpen] = useState(false);

    function openModalWithItem(item) {
        setModalOpen({
            isOpen: true,
            color: item.color,
            image: item.person.picture.toString(),
            name: item.person.user,
            school: item.person.school,
            year: item.person.year,
            bio: item.person.bio,
            accomplishments: item.person.accomplishments,
            interests: item.person.interests,
            additional: item.person.additional
        })
    }

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(elect[0].start) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
        timeLeft = {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)), 
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60)
        };
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
        return;
    }

    timerComponents.push(
        <Text>
        {timeLeft[interval]}{interval}{" "}
        </Text>
    );
    });

    const [modalOpen, setModalOpen] = useState({
        isOpen: false,
        color: '',
        image: '',
        user: '',
        school: '',
        year: '',
        bio: '',
        accomplishments: [],
        interests: '',
        additional: ''
    });

    function applyModal(){
        if(elect[0].started == 'NO'){
        return(
            <View style = {{width: 400, height: 300}}>
            <Image source = {require('./time.png')} style = {{position: 'absolute', height: 100, width: 200, marginLeft: 5, marginTop: 20}}/>
            <Text style = {{fontSize: 14, color: '#094067', fontWeight: 'bold', position: 'absolute', paddingTop: 15, paddingLeft: 225 }}>Starts In:</Text>
            <Text style = {{color: '#094067', paddingLeft: 225, paddingTop: 35}}>{timerComponents}</Text>
            <TouchableWithoutFeedback onPress = {() => {console.log('hi')}}>
            <View style = {{marginLeft: 230, width: 100, height: 40, position: 'absolute', marginTop : 65, backgroundColor: '#3da9fc', borderRadius: 20}}>
                <Text style = {{color: 'white', fontWeight: 'bold', marginTop: 7.5, marginLeft: 27}}>Apply</Text>
            </View>
            </TouchableWithoutFeedback>
            </View>
        )
        }
    }

    return (
        <View styles = {styles.container}>
            <View style = {{width: width, height: 200, backgroundColor: 'rgb(9, 136, 228)'}}>
                <View style = {{paddingLeft: 20, paddingTop: 50}}>
                <Feather name = 'arrow-left' size = {25} color = {'white'} onPress = {() => navigation.navigate('Club')}/>
                </View>
                <Image source = {navigation.getParam('image')} style = {{borderRadius: 20, width: 40, height: 40, 
                position: 'absolute', marginLeft: 340, marginTop: 45}}></Image>
                <View>
                <Text style = {styles.headerText}> { navigation.getParam('text') } </Text>
                <Text style = {styles.code}> {navigation.getParam('code')} </Text>
                </View>
                <View style = {styles.button}>
                    <Text style = {{paddingLeft: 18, color: 'white', fontWeight: 'bold', paddingTop: 9}} onPress = {() => Linking.openURL(navigation.getParam('url').toString()).catch((err) => console.error('An error occurred', err))}>Link</Text>
                    <Feather name = 'external-link' style = {styles.icon} onPress = {() => Linking.openURL(navigation.getParam('url').toString()).catch((err) => console.error('An error occurred', err))}/>
                </View>
            </View>

            {
                navigation.getParam('user') == 'user-check' && 
                <View style = {{width: 200, height: 100, position: 'absolute', marginLeft: 10, marginTop: height - 30}}>
                <View style = {{borderRadius: 10, marginLeft: 40, width: 100, height: 50, backgroundColor: '#61a8ff', color: 'white', position: 'absolute'}}>
                    <Text onPress = {() => setsecModalOpen(true)} style = {{color: 'white', marginTop: 14, marginLeft: 16, fontWeight: 'bold'}}>Add User</Text>
                </View>
                <View style = {{borderRadius: 10, marginLeft: 150, width: 200, paddingHorizontal: 10, height: 50, backgroundColor: '#FE6C7C', position: 'absolute'}}>
                    <Text style = {{color: 'white', marginTop: 14, marginLeft: 15, fontWeight: 'bold'}}>Make Announcement</Text>
                </View>
            </View>
            }

            <View style = {{borderWidth: 10, borderColor: '#ebf2f8',}}>
            <Modal visible = {modalOpen.isOpen}
                backdropColor = {'white'} backdropOpacity = {1} onBackdropPress={()=> closeModal()} 
                transparent= {true}
                propagateSwipe = {true}
                >
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
                                        onPress = {() => setModalOpen({isOpen: false, color: '', image: '', user: '', school: '', user: '', bio: '', accomplishments: [], interests: '', additional: ''})}/>
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
                                <ScrollView style = {{paddingTop: 50, flex: 1}}>
                                    
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16}}>About</Text>
                                    <Text style = {{color: '#5f6c7b', fontSize: 12, marginTop: 4}}>
                                        {modalOpen.bio}</Text>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16, marginTop: 4}}>Interests</Text>
                                    <Text style = {{color: '#5f6c7b', fontSize: 12, paddingLeft: 2}}>{modalOpen.interests}</Text>
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16, marginTop: 2}}>Accomplishments</Text>
                                    {
                                        modalOpen.accomplishments.map((accomp) => (
                                        <Text style = {{color: '#5f6c7b', fontSize: 12, paddingLeft: 0, paddingTop: 2}} key = {accomp}> - {accomp}</Text>
                                        ))
                                    }
                                    <Text style = {{color: '#094067', fontWeight: 'bold', fontSize: 16, marginTop: 4}}>Additional</Text>
                                    <Text style = {{color: '#5f6c7b', fontSize: 12, paddingLeft: 2}}>{modalOpen.additional}</Text>
                                        
                                </ScrollView>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal visible = {secmodalOpen}
                backdropColor = {'white'} backdropOpacity = {1} onBackdropPress={()=>this.closeModal()} 
                transparent= {true}>
                    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#00000040'}}>
                            <View style={{
                                    width: 250,
                                    height: 200,
                                    backgroundColor: '#fff', padding: 20, borderRadius: 25}}>
                                    <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#094067'}}>Add Club Member</Text>
                                    <TextInput style = {{marginTop: 20}} placeholder = {'Club Member Name'}/>
                                    <View style = {{height: 2, width: 200, backgroundColor: '#3da9fc'}}></View>
                                    <Feather name="user" style = {{
                                        position: 'absolute', marginLeft: 190, marginTop: 75, fontSize: 18, color: '#d3d3d3'}}/>
                                <Text onPress = {() => setsecModalOpen(false)} 
                                style = {{color: '#094067', fontWeight: 'bold', marginLeft: 92, marginTop: 140, position: 'absolute'}}>
                                    CANCEL
                                </Text>
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
                <View style = {{marginTop: 40, width: width - 15, height: 150, backgroundColor: 'white', alignSelf: 'center', borderRadius: 20}}>
                <View style = {{marginLeft: 15, width: 120, height: 40, backgroundColor: '#61a8ff', marginTop: -15, borderRadius: 10, position: 'absolute'}}>
                    <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center', marginTop: 6}}>Election</Text>
                    <View>
                    {
                        (elect[0].started == 'N/A') && 
                        <View style = {{width: 300, height: 300}}>
                        <Image source = {require('./no.png')} style = {{position: 'absolute', height: 75, width: 100, marginLeft: 130, marginTop: 15}}/>
                        <Text style = {{fontSize: 14, color: '#094067', fontWeight: 'bold', position: 'absolute', paddingTop: 95, paddingLeft: 95 }}>No Election at this time!</Text>
                        </View>
                    }
                    </View>
                        {applyModal()}
                    <View>
                    {
                        (elect[0].started == 'YES') && 
                        <View style = {{width: 400, height: 300}}>
                        <Image source = {require('./vote.png')} style = {{position: 'absolute', height: 120, width: 160, marginLeft: 15, marginTop: 15}}/>
                        <Text style = {{fontSize: 20, color: '#094067', fontWeight: 'bold', position: 'absolute', paddingTop: 20, paddingLeft: 225 }}>Now Live</Text>
                        <View style = {{marginLeft: 220, width: 100, height: 40, position: 'absolute', marginTop : 55, backgroundColor: '#3da9fc', borderRadius: 20}}>
                            <Text style = {{color: 'white', fontWeight: 'bold', marginTop: 7.5, marginLeft: 18}}>Go Vote!</Text>
                        </View>
                        </View>
                    }
                    </View>
                </View>
                </View>

                <View style = {{marginTop: 40, width: width - 15, height: 225, backgroundColor: 'white', alignSelf: 'center', borderRadius: 20}}>
                <View style = {{marginLeft: 15, width: 200, height: 40, backgroundColor: '#FE6C7C', marginTop: -15, borderRadius: 10, position: 'absolute'}}>
                    <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center', marginTop: 6}}>Announcements</Text>
                    <View>
                    {
                        (ann === undefined || ann.length == 0) && 
                        <View style = {{width: 300, height: 300}}>
                        <Image source = {require('./empty.png')} style = {{position: 'absolute', height: 150, width: 200, marginLeft: 85, marginTop: 18}}/>
                        <Text style = {{fontSize: 14, color: '#094067', fontWeight: 'bold', position: 'absolute', paddingTop: 170, paddingLeft: 110}}>No Announcements!</Text>
                        </View>
                    }
                    </View>
                    <View>
                        {
                            (ann != undefined || ann.length != 0) && 
                            <View>
                            <ScrollView style = {{width: width - 45, height: 300, paddingTop: 5}}>
                            {ann.map((announce) => (
                                <View style = {{width: width - 45, paddingBottom: 15,
                                marginTop: 20, borderRadius: 8, paddingTop: 10, backgroundColor: '#c4dcf2'}} key = {announce}>
                                    <Text style = {{color: '#094067', fontSize: 16, paddingLeft: 12, paddingTop: 2, width: 100,
                                width: width - 100}}>{announce.info}</Text>
                                    <Image source={announce.person.picture} style={{borderRadius: 20, marginTop: 5, 
                                        width: 30, height: 30, marginLeft: 15}}></Image>
                                    <Text style = {{position: 'absolute', paddingLeft: 50, paddingTop: 45, color: '#778596'}}>
                                        Dhruv {announce.person.user}</Text>
                                    <Text style = {{fontSize: 12, position: 'absolute', paddingLeft: 300, paddingTop: 47, color: '#778596'}}>
                                        {announce.time}</Text>
                                    <Text style = {{fontSize: 32, position: 'absolute', paddingLeft: 308, marginTop: -10, color: '#778596'}}>
                                        ...</Text>
                                </View>
                                ))
                            }
                            </ScrollView>
                            <View style = {{backgroundColor: '#3da9fc', width: 120, height: 40, borderRadius: 10, 
                            position: 'absolute', marginTop: 140, marginLeft: 115}}>
                                <Text style = {{ marginTop: 8.5, marginLeft: 35, color: 'white', fontWeight: 'bold'}}>CLEAR</Text>
                            </View>
                            </View>
                        }
                    </View>
                </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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