import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import Club from './club'
import Feather from 'react-native-vector-icons/Feather';
import Float from './float.js'

const { width, height } = Dimensions.get('window')

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
        { text: 'Student Congress', key: '1', color: '#FF6347', image: require('./nhs.png'), user: 'users' },
        { text: 'ACM', key: '2', color: '#fed8b1', image: require('./nhs.png'), user: 'user-check' },
        { text: 'Convergent', key: '3', color: '#ACDDDE', image: require('./nhs.png'),user: 'users' },
    ]);

    return (
    <View style = {styles.container}>
        <View style = {{flex: 1}}>
            <View style = {{flex: 1}}>
                <Modal visible = {modalOpen}>
                    <View styles = {styles.modal}>
                        <Text>Hello</Text>
                        <Feather onPress = {() => setModalOpen(false)} name = 'users' size = {20} color = 'white'/>
                    </View>
                </Modal>
                <FlatList 
                    data = {clubs}
                    renderItem = {({ item }) => (
                        display({item}, {navigation})
                    )}
                />
            </View>
            <Float style = {{ bottom: 90, alignSelf: 'flex-end', marginRight: 80 }}/>
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
    }
});
