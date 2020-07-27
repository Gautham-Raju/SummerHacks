import React from 'react';
import { Text, View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import {Feather, Entypo} from '@expo/vector-icons'

export default class float extends React.Component {

    constructor(props) {
        super(props);
        this.openModal = props.openModal.bind(this)  // DONT FORGET TO BIND
    }

    animation = new Animated.Value(0)

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1
        Animated.spring(this.animation, {
            toValue, 
            friction: 5
        }).start();

        this.open = !this.open
    }
    render(){
        const trashStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -80]
                    })
                }
            ]
        };

        const userStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -140]
                    })
                }
            ]
        };

        const adminStyle = {
            transform: [
                {scale: this.animation},
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -200]
                    })
                }
            ]
        };

        const rotation = {
            transform: [
                {
                rotate: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg']
                })
                }
            ]
        
        }

        const opacity = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        })
        return (
        <View style={styles.container, this.props.style}>
            <TouchableWithoutFeedback>
                <Animated.View style = {[styles.button, styles.second, adminStyle, opacity]}>
                    <Feather name = 'user-check' size = {20} color = 'white'/>
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress = {this.openModal}>
                <Animated.View style = {[styles.button, styles.second, userStyle, opacity]}>
                    <Feather name = 'users' size = {20} color = 'white'/>
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
                <Animated.View style = {[styles.button, styles.second, trashStyle, opacity]}>
                    <Feather name = 'trash' size = {20} color = 'white'/>
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress = {this.toggleMenu}>
                <Animated.View style = {[styles.button, styles.menu, rotation]}>
                    <Feather name = 'plus' size = {24} color = 'white'/>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute'
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#F02A4B',
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 }
    },
    menu: {
        backgroundColor: '#ef4565'
    },
    second: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginLeft: 5,
        backgroundColor: '#90b4ce'
    }

})