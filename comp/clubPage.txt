import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';
import Club from './club'

const { width, height } = Dimensions.get('window')

function display({item}, {navigation}){
    const colorStyles = {
        backgroundColor: item.color
    };
    if (item.key % 2 != 0){
    return(
    <View style = {[styles.card, colorStyles]}>
        <View style = {styles.cardContent}>
        <TouchableOpacity onPress = {() => navigation.navigate('ClubDetail', item)}>
            <Club>
            <View style = {styles.component}>
              <Image source={item.image} style={{ width: width * .15, height: width * .15, borderRadius: 15, alignSelf: 'center' }}>
                </Image>
                <Text style = {styles.text}>{item.text}</Text>
            </View>
            </Club>
        </TouchableOpacity>
        </View>
    </View>)
    }
    else{
    return(
        <View style = {[styles.cardEnd, colorStyles]}>
        <View style = {styles.cardContent}>
            <TouchableOpacity onPress = {() => navigation.navigate('ClubDetail', {item, title: item.text})}>
            <Club>
                <View style = {styles.component}>
                <Text style = {styles.textEnd}>{item.text}</Text>
                <Image source={item.image} style={{ width: width * .15, height: width * .15, borderRadius: 15, alignSelf: 'center' }}>
                </Image>
                </View>
            </Club>
            </TouchableOpacity>
        </View>
    </View>)
    }
}

export default function ClubPage({navigation}) {
    const [clubs, setClubs] = useState([
        { text: 'Student Congress', key: '1', color: 'rgb(237, 82, 82)', image: require('./nhs.png') },
        { text: 'Association for Computing Machinery', key: '2', color: 'rgb(235, 153, 29)', image: require('./nhs.png') },
        { text: 'Convergent', key: '3', color: 'rgb(40, 160, 21)', image: require('./nhs.png') },
    ]);

    return (
    <View style = {styles.container}>
        <View>
            <View>
                <FlatList
                    data = {clubs}
                    renderItem = {({ item }) => (
                        display({item}, {navigation})
                    )}
                />
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        paddingLeft: width * .025,
        textAlignVertical: 'center',
        flex: 1
    },
    textEnd: {
        fontSize: 20,
        paddingRight: width * .025,
        textAlignVertical: 'center',
        flex: 1
    },
    component: {
        flexDirection: 'row',
    },
    card: {
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginTop: 20,
        alignSelf: 'flex-end',
        width: width * .8,
    },
    cardEnd: {
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginTop: 20,
        alignSelf: 'flex-start',
        width: width * .8
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    }
});
