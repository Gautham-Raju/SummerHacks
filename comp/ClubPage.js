import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image, Modal, 
    TouchableWithoutFeedback, Keyboard } from 'react-native';
import Club from './club'
import Feather from 'react-native-vector-icons/Feather';
import Float from './float.js'
import UserCodeForm from './UserCodeForm.js'
import GLOBALS from './Global.js'

const { width, height } = Dimensions.get('window')

const colors = JSON.parse(JSON.stringify(GLOBALS.COLOR));

function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
        if (copy.length < 1) { copy = array.slice(0); }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        return item;
    };
    }

    var chooser = randomNoRepeats(colors);

function display({item}, {navigation}){
    const colorStyles = {
        backgroundColor: item.color
    };
    return(
    <View style = {[styles.card, colorStyles]}>
        <View>
        <TouchableOpacity onPress = {() => navigation.navigate('ClubDetail', item)}>
            <Club>
            <View style = {styles.component}>
                <Image source={item.image} style={[styles.image, {borderColor: item.color}]}></Image>
                <Text style = {styles.text}>{item.text}</Text>
                <Feather name = {item.user} size = {20} fontWeight = 'bold' color = '#094067'/>
            </View>
            </Club>
        </TouchableOpacity>
        </View>
    </View>)
}

export default function ClubPage({navigation}) {

    const [modalOpen, setModalOpen] = useState(false);

    const [clubs, setClubs] = useState([
        { text: 'Student Congress', key: '1', color: '#fe8a71', image: require('./ut.png'), user: 'users', code: 'AaAa',
        url: 'https://www.utsg.org/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
        {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
        {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [{info: 'Welcome to Student Congress', time: 'Aug 11', person: GLOBALS.PEOPLE[1]}], 
        election: [{info:'hi', started: 'NO', start: '2020-08-18', 
        positions: [
            {role: 'President', 
            qual: ['Must be at least a junior', 'Must be in the club for at least 2 years', 'Application essay required', '3.0 Minimum GPA', 'Willing to commit 6 hours a week'], 
            spec: ['Ultimately responsible for all aspects of the club', 'Sets direction for the club and events organised',
        'Run club meetings and should be expected to be the primary contact between the club and outside contacts', 'Delegate tasks and roles to other club members', 'Prepare future execs for their roles']}, 
            {role: 'Vice President', 
            qual: ['Must be at least a junior', 'Must be in the club for at least 2 years', 'Application essay required', '3.0 Minimum GPA', 'Willing to commit 6 hours a week'], 
            spec: ['Support the President who will delegate tasks like publicity or event marketing', 
        'Can work productively with the President as hostile relations in the executive can be disruptive for the club', 'Set a positive example to other committee members and help maintain morale']}, 
            {role: 'Treasurer', 
            qual: ['Attends the club leadership seminar or has experience keeping detailed financial accounts', 'Finance major or 2 years experience in maintaining accounts', 'At least a sophomore'], 
            spec: ['In charge of club finances and grant applications', 'Record all monetary transactions and keep all receipts for the year']}, 
            {role: 'Secretary', 
            qual: ['Must be at least a junior', 'Must be in the club for at least 2 years', 'Application essay required', '3.0 Minimum GPA', 'Willing to commit 6 hours a week'], 
            spec: ['Notify people of upcoming meetings', 'Take minutes at the meetings', 'Maintain an up to date membership database', 
        'Maintaining the clubs email and Facebook groups', 'Main point of contact between the committee, executive and club members']}, 
            {role: 'Committee', 
            qual: ['Must be at least a sophomore', 'Must be in the club for at least 2 years', 'Application essay required', '3.0 Minimum GPA', 'Willing to commit 6 hours a week'], 
            spec: ["Advise the president on any subject he may require relating to the duties of each member's respective office", 
        'Selling tickets to events', 'Organising club shirts and fundraising activities']}, 
            {role: 'Admin', 
            qual: ['Must be knowledgeable about Trefle', 'Must be in the club for at least 1 year', 'Application essay required', '3.0 Minimum GPA', 'Willing to commit 2 hours a week'], 
            spec: ['Tracking club attendance', 'Maintaining club membership lists', 'Keeping members informed through a club newsletter and Trefle', 'Collecting dues']}]}]}, 
        { text: 'ACM', key: '2', color: '#fec8c1', image: require('./acm.png'), user: 'user-check', code: 'BbBb', url: 'https://www.texasacm.org/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
        {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
        {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [], 
        election: [{started: 'N/A'}]},
        { text: 'Code Orange', key: '3', color: '#adcbe3', image: require('./orange.png'),user: 'users', code: 'CcCc', url: 'http://codeorange.io/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
        {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
        {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [], 
        election: [{started: 'YES'}]}
    ]);

    const addClubs = (club) =>{
        console.log('Hi')
        club.key = (clubs.length + 1).toString;
        club.text = codes[clubs.length].text
        club.color = codes[clubs.length].color
        club.image = codes[clubs.length].image
        club.user = codes[clubs.length].user
        club.code = codes[clubs.length].code
        club.url = codes[clubs.length].url
        club.people = codes[clubs.length].people
        club.announcements = codes[clubs.length].announcements
        club.election = codes[clubs.length].election
        setClubs((currentClubs) => {
            return [club, ...currentClubs];
        });
        setModalOpen(false);
    }

    const codes = [{ text: 'Student Congress', key: '1', color: '#FF6347', image: require('./ut.png'), user: 'users', code: 'AaAa', url: 'https://www.utsg.org/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
    {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
    {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [{info: 'Welcome to Student Congress', time: 'Aug 11', person: GLOBALS.PEOPLE[1]},
    {info: 'Welcome to Student Congress', time: 'Aug 11', person: GLOBALS.PEOPLE[1]}], election: [{info:'hi'}]},
    { text: 'ACM', key: '2', color: '#fed8b1', image: require('./acm.png'), user: 'user-check', code: 'BbBb', url: 'https://www.texasacm.org/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
    {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
    {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [], election: []},
    { text: 'Code Orange', key: '3', color: '#ACDDDE', image: require('./orange.png'),user: 'users', code: 'CcCc', url: 'http://codeorange.io/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
    {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
    {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [], election: []},
    { text: 'Freetail Hackers', key: '4', color: '#ACDDDE', image: require('./nhs.png'),user: 'users', code: 'DdDd', url: 'https://freetailhackers.com/', people: [{person: GLOBALS.PEOPLE[3], position: 'President', key: '0', color: chooser()}, 
    {person: GLOBALS.PEOPLE[2], position: 'Vice President', key: '1', color: chooser()}, {person: GLOBALS.PEOPLE[1], position: 'Treasurer', key: '2', color: chooser()}, 
    {person: GLOBALS.PEOPLE[0], position: 'Secretary', key: '3', color: chooser()}], announcements: [], election: []}]

    return (
    <View style = {styles.container}>
        <View style = {{flex: 1}}>
            <View style = {{flex: 1}}>
                <Modal visible = {modalOpen}
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
                                    <Text style = {{color: '#094067'}}>Enter club code to join.</Text>
                                    <Feather name="users" style = {{
                                        position: 'absolute', marginLeft: 190, marginTop: 70, fontSize: 18, color: '#d3d3d3'}}/>
                                <UserCodeForm addClubs = {addClubs}/>
                                <Text onPress = {() => setModalOpen(false)} 
                                style = {{color: '#094067', fontWeight: 'bold', paddingLeft: 12, paddingTop: 20,}}>
                                    CANCEL
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <FlatList 
                    data = {clubs}
                    renderItem = {({ item }) => (
                        display({item}, {navigation})
                    )}
                />
            </View>
            <Float openModal = {() => setModalOpen(true)} style = {{ bottom: 90, alignSelf: 'flex-end', marginRight: 80 }}/>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: width,
        height: height,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        flex: 1
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#094067',
        marginVertical: 40,
        flex: 1,
        paddingRight: -10

    },
    component: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    card: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginBottom: 20,
        alignSelf: 'center',
        width: width * .9,
        height: height * .12
    },
    image: {
        width: width * .225, 
        height: width * .225, 
        borderRadius: 15, 
        marginHorizontal: 10,
    },
    modal: {

    }
});
