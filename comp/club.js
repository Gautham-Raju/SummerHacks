import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, ImagePropTypes } from 'react-native';

const { width, height } = Dimensions.get('window')

export default function Club(props) {
    return (
        <View>
            { props.children }
        </View>
    )
}
