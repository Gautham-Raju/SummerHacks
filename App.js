import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
// import Header from './comp/header'
// import Club from './comp/club'
// import ClubPage from './comp/ClubPage'
import Navigator from './comp/drawer'

const { width, height } = Dimensions.get('window')

export default function App() {
  console.disableYellowBox = true;
  return(
    <Navigator/>
  );
}

const styles = StyleSheet.create({
});
