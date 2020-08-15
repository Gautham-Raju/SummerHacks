import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GLOBALS from './Global.js';
import { FlatList } from 'react-native-gesture-handler';
import MultipleChoice from 'react-native-multiple-choice-picker';
import AnimatedHeader from 'react-native-animated-header';

const { width, height } = Dimensions.get('window')

export default function Vote({navigation}) {
    let index = 0;

    const [modalOpen, setModalOpen] = useState({
        isOpen: false,
        position: 0
    });

    function openModalWithItem(position) {
        setModalOpen({
            isOpen: true,
            position: position
        })
    }

    let num = navigation.getParam('index');
    let number = 0;

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        const difference = +new Date(GLOBALS.LIVE[num].startTime) - +new Date();
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

    if(navigation.getParam('user') == 'users'){
    return (
    <View style={{
        flex: 1,
        backgroundColor: '#ebf2f8'
    }}>
    <View style = {{width: width, height: 170, backgroundColor: 'rgb(9, 136, 228)'}}>
        <Text style = {{marginLeft: 20, marginTop: 70, color: 'white', fontSize: 30, fontWeight:'bold', position: 'absolute'}}>Cast Your Votes</Text>
        <Text style = {{marginLeft: 22, marginTop: 115, color: 'white', fontSize: 15, position: 'absolute'}}>{timerComponents} left</Text>
        <Feather style = {{marginLeft: 18, marginTop: 40, position: 'absolute'}}name = 'arrow-left' size = {25} color = {'white'} onPress = {() => navigation.navigate('Election')}/>
        <View style = {{width: 80, height: 40, backgroundColor: '#3da9fc', marginLeft: 300, marginTop: 90, borderRadius: 15}}>
            <Text style = {{color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 19, marginTop: 10}}>VOTE</Text>
        </View>
    </View>
    <Modal visible = {modalOpen.isOpen}>
        <AnimatedHeader 
            style={{flex: 1 }}
            backText='Candidate Profile'
            title={GLOBALS.PEOPLE[modalOpen.position].user}
            renderLeft={() => (<Feather name='arrow-left' onPress = {() => setModalOpen({isOpen: false, position:0})} style={{ color: 'white', marginLeft: 20, fontSize: 20 }} />)}
            renderRight={() => (<Feather name='search' style={{ marginRight: 20, fontSize: 20, color: 'white' }} />)}
            backStyle={{ marginLeft: 10 }}
            backTextStyle={{fontSize: 20, color: 'white'}}
            titleStyle={{ fontSize: 30, left: 20, bottom: 20, color: 'white', marginLeft: 5, marginTop: -50 }}
            headerMaxHeight={300}
            imageSource={GLOBALS.PEOPLE[modalOpen.position].picture}
            toolbarColor='rgb(9, 136, 228)'
            disabled={false}
        >
        <ScrollView>
            <View style = {{width: width, paddingVertical: 20, paddingHorizontal: 10}}>
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold'}}>Short Biography</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 22, fontSize: 26, color: '#3da9fc' }} />
                <Text style = {{fontSize: 14, color: 'black', marginLeft: 10,}}>{GLOBALS.PEOPLE[4].clubBio}</Text>
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold', marginTop: 10}}>Election Manifesto</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 380, fontSize: 26, color: '#3da9fc' }} />
                <Text style = {{fontSize: 14, color: 'black', marginLeft: 10, marginRight: 10}}>{GLOBALS.PEOPLE[4].manifesto}</Text>
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold', marginTop: 10}}>Achievements</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 688, fontSize: 26, color: '#3da9fc' }} />
                {
                    GLOBALS.PEOPLE[4].achieve.map((a) => (
                    <Text style = {{fontSize: 14, color: 'black', marginLeft: 10, marginRight: 10}}>- {a}{'\n   '}</Text>
                    ))
                }
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold'}}>Related Experience</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 1220, fontSize: 26, color: '#3da9fc' }} />
                {
                    GLOBALS.PEOPLE[4].exp.map((e) => (
                        <View>
                        <Text style = {{fontSize: 16, color: 'black', marginLeft: 10}}>{e.title}</Text>
                        <Text style = {{fontSize: 14, color: 'black', marginLeft: 10}}>{e.role}</Text>
                        <Text style = {{fontSize: 12, color: 'black', marginLeft: 10}}>{e.duration}</Text>
                        <Text style = {{fontSize: 14, color: 'black', marginLeft: 10, marginBottom: 10}}>{e.description}</Text>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
        </AnimatedHeader>
    </Modal>
    <FlatList
        data = {GLOBALS.LIVE[num].positions}
        renderItem = {({ item }) => (
            number++,
            <View style = {{marginTop: 40, width: width - 15, paddingVertical: 10, backgroundColor: 'white', alignSelf: 'center', borderRadius: 20}}>
                {
                    (number % 2 == 0) &&
                    <View style = {{marginLeft: 15, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#FE6C7C', marginTop: -15, borderRadius: 10, position: 'absolute'}}>
                    <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>{item.role}</Text>
                    </View>
                }
                {
                    (number % 2 != 0) &&
                    <View style = {{marginLeft: 15, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#61a8ff', marginTop: -15, borderRadius: 10, position: 'absolute'}}>
                    <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>{item.role}</Text>
                    </View>
                }
                <MultipleChoice
                    style = {{height: 350}}
                    direction={'column'}
                    choices={['Football', 'Badminton', 'Basketball', 'Tennis']}
                    chosenIndex= {item.ind}
                    chosenColor= {'#3da9fc'}
                    chosenTextColor= {'#3da9fc'}
                />
                
                <View style = {{position: 'absolute', backgroundColor: 'transparent', marginLeft: 50, marginTop: 24}}>
                {
                    item.can.map((candidate) => (
                        <View style = {{marginBottom: 20, paddingVertical: 20, backgroundColor: 'white', borderRadius: 10,
                        paddingLeft: 5, marginLeft: -2, width: width - 100, elevation: 3, height: 70}}>
                            <Image source={GLOBALS.PEOPLE[candidate].picture} style={{marginLeft: 5, marginTop: 9, position: 'absolute', width: 50, height: 50, borderRadius: 5}}></Image>
                            <Text style = {{color: '#094067', fontSize: 20, marginLeft: 65, marginTop: -10}}>{GLOBALS.PEOPLE[candidate].user}</Text>
                            <Text style = {{color: '#094067', fontSize: 12, marginLeft: 72, position: 'absolute', marginTop: 38}}>{GLOBALS.PEOPLE[candidate].school} {GLOBALS.PEOPLE[candidate].year}</Text>
                            <Text onPress = {() => openModalWithItem(candidate)} style = {{fontWeight: 'bold', position: 'absolute', color: '#3da9fc', marginLeft: 250, marginTop: 25}}>VIEW</Text>
                        </View>
                    ))
                }
                </View>
            </View>
        )}/>
    </View>
    );
} else{
    return(
        <View style={{
            flex: 1,
            backgroundColor: '#ebf2f8'
        }}>
        <View style = {{width: width, height: 170, backgroundColor: 'rgb(9, 136, 228)'}}>
        <Text style = {{marginLeft: 20, marginTop: 70, color: 'white', fontSize: 30, fontWeight:'bold', position: 'absolute'}}>View Statistics</Text>
        <Text style = {{marginLeft: 22, marginTop: 115, color: 'white', fontSize: 15, position: 'absolute'}}>{timerComponents} left</Text>
        <View style = {{width: 80, height: 45, backgroundColor: '#3da9fc', marginLeft: 300, marginTop: 90, borderRadius: 15}}>
            <Text style = {{marginLeft: 20, marginTop: 2, fontWeight: 'bold', color: 'white', fontSize: 15, position: 'absolute'}}>8/64</Text>
            <Text style = {{marginLeft: 16, marginTop: 18, fontWeight: 'bold', color: 'white', fontSize: 15, position: 'absolute'}}>Voted</Text>
        </View>
        <Feather style = {{marginLeft: 18, marginTop: 40, position: 'absolute'}}name = 'arrow-left' size = {25} color = {'white'} onPress = {() => navigation.navigate('Election')}/>
        </View>
        <Modal visible = {modalOpen.isOpen}>
        <AnimatedHeader 
            style={{flex: 1 }}
            backText='Candidate Profile'
            title={GLOBALS.PEOPLE[modalOpen.position].user}
            renderLeft={() => (<Feather name='arrow-left' onPress = {() => setModalOpen({isOpen: false, position:0})} style={{ color: 'white', marginLeft: 20, fontSize: 20 }} />)}
            renderRight={() => (<Feather name='search' style={{ marginRight: 20, fontSize: 20, color: 'white' }} />)}
            backStyle={{ marginLeft: 10 }}
            backTextStyle={{fontSize: 20, color: 'white'}}
            titleStyle={{ fontSize: 30, left: 20, bottom: 20, color: 'white', marginLeft: 5, marginTop: -50 }}
            headerMaxHeight={300}
            imageSource={GLOBALS.PEOPLE[modalOpen.position].picture}
            toolbarColor='rgb(9, 136, 228)'
            disabled={false}
        >
        <ScrollView>
            <View style = {{width: width, paddingVertical: 20, paddingHorizontal: 10}}>
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold'}}>Short Biography</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 22, fontSize: 26, color: '#3da9fc' }} />
                <Text style = {{fontSize: 14, color: 'black', marginLeft: 10,}}>{GLOBALS.PEOPLE[4].clubBio}</Text>
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold', marginTop: 10}}>Election Manifesto</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 380, fontSize: 26, color: '#3da9fc' }} />
                <Text style = {{fontSize: 14, color: 'black', marginLeft: 10, marginRight: 10}}>{GLOBALS.PEOPLE[4].manifesto}</Text>
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold', marginTop: 10}}>Achievements</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 688, fontSize: 26, color: '#3da9fc' }} />
                {
                    GLOBALS.PEOPLE[4].achieve.map((a) => (
                    <Text style = {{fontSize: 14, color: 'black', marginLeft: 10, marginRight: 10}}>- {a}{'\n   '}</Text>
                    ))
                }
                <Text style = {{marginLeft: 10, marginBottom: 10, fontSize: 18, color: '#3da9fc', fontWeight: 'bold'}}>Related Experience</Text>
                <Feather name='chevron-down' style={{ position: 'absolute', marginLeft: 360, marginTop: 1220, fontSize: 26, color: '#3da9fc' }} />
                {
                    GLOBALS.PEOPLE[4].exp.map((e) => (
                        <View>
                        <Text style = {{fontSize: 16, color: 'black', marginLeft: 10}}>{e.title}</Text>
                        <Text style = {{fontSize: 14, color: 'black', marginLeft: 10}}>{e.role}</Text>
                        <Text style = {{fontSize: 12, color: 'black', marginLeft: 10}}>{e.duration}</Text>
                        <Text style = {{fontSize: 14, color: 'black', marginLeft: 10, marginBottom: 10}}>{e.description}</Text>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
        </AnimatedHeader>
    </Modal>
    <FlatList
        data = {GLOBALS.LIVE[1].positions}
        renderItem = {({ item }) => (
            number++,
            <View style = {{marginTop: 40, width: width - 15, paddingVertical: 30, backgroundColor: 'white', alignSelf: 'center', borderRadius: 20}}>
                {
                    (number % 2 == 0) &&
                    <View style = {{marginLeft: 15, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#FE6C7C', marginTop: -15, borderRadius: 10, position: 'absolute'}}>
                    <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>{item.role}</Text>
                    </View>
                }
                {
                    (number % 2 != 0) &&
                    <View style = {{marginLeft: 15, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#61a8ff', marginTop: -15, borderRadius: 10, position: 'absolute'}}>
                    <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>{item.role}</Text>
                    </View>
                }
                <MultipleChoice
                    style = {{height: 350}}
                    direction={'column'}
                    choices={['Football', 'Badminton', 'Basketball', 'Tennis']}
                    chosenIndex= {item.ind}
                    chosenColor= {'#3da9fc'}
                    chosenTextColor= {'#3da9fc'}
                />
                
                <View style = {{position: 'absolute', backgroundColor: 'transparent', marginLeft: 50, marginTop: 24}}>
                {
                    index = 0,
                    item.can.map((candidate) => (
                        index++,
                        <View style = {{marginBottom: 20, paddingVertical: 20, backgroundColor: 'white', borderRadius: 10,
                        paddingLeft: 5, marginLeft: -35, width: width - 45, elevation: 3, height: 80}}>
                            <Image source={GLOBALS.PEOPLE[candidate].picture} style={{marginLeft: 5, marginTop: 14, position: 'absolute', width: 50, height: 50, borderRadius: 5}}></Image>
                            <Text style = {{color: '#094067', fontSize: 20, marginLeft: 65, marginTop: -10}}>{GLOBALS.PEOPLE[candidate].user}</Text>
                            <Text style = {{color: '#094067', fontSize: 12, marginLeft: 72, position: 'absolute', marginTop: 38}}>{GLOBALS.PEOPLE[candidate].school} {GLOBALS.PEOPLE[candidate].year}</Text>
                            <Text onPress = {() => openModalWithItem(candidate)} style = {{fontWeight: 'bold', position: 'absolute', color: '#3da9fc', marginLeft: 310, marginTop: 30}}>VIEW</Text>
                    <Text style = {{fontSize: 14, position: 'absolute', marginLeft: 240, marginTop: 32, color: '#094067'}}>{item.vote[index - 1]}/8</Text>
                            <View style = {{marginTop: 60, marginLeft: 72, height: 3, width: width - 220, backgroundColor: '#e0e0e0', position: 'absolute', borderRadius: 4}}>
                            </View>
                            <View style = {{marginTop: 60, marginLeft: 72, height: 3, width: (width - 220) * ((item.vote[index - 1])/8), backgroundColor: '#3da9fc', position: 'absolute', borderRadius: 4}}>
                            </View>
                        </View>
                    ))
                }
                </View>
            </View>
        )}/>
        </View>
    )
}
}