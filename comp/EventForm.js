import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePickerModal from "react-native-modal-datetime-picker";

    const eventSchema = yup.object({
        date: yup.string()
        .required('Date required'),
        startTime: yup.string()
        .required('Start Time required'),
        endTime: yup.string()
        .required('End Time required'),
        title: yup.string()
        .required('Title required'),
        description: yup.string()
        .required('Description required')
    })

    export default function EventForm({addEvent}){
        const [pickerMode, setPickerMode] = useState(null);

        const showDatePicker = () => {
        setPickerMode("date");
        };

        const showTimePicker = () => {
        setPickerMode("time");
        };

        const hidePicker = () => {
        setPickerMode(null);
        };

        const handleConfirm = (date) => {
            const day   = date.getDate();
            const month = date.getMonth();
            const year  = date.getFullYear();
        console.warn("A date has been picked: ", date);
        hidePicker();
        };

        return(
            <View>
                <Formik
                    initialValues = {{date: '', startTime: '', endTime: '', title: '', description: ''}}
                    validationSchema = {eventSchema}
                    onSubmit = {(values, actions) => {
                        actions.resetForm();
                        addEvent(values);
                    }}
                >
                    {(props) => (
                        <View>
                            <TextInput style = {styles.input} placeholder = 'Date (2020-07-24)' 
                            onChangeText = {props.handleChange('date')} value = {props.values.date}
                            onBlur = {props.handleBlur('date')}/> 
                            <View style = {{paddingLeft: 185, paddingTop: 25, position: 'absolute'}}>
                            <Feather name = 'calendar' size = {20} color = {'#C7C7CD'} onPress = {showDatePicker}/>
                            </View>
                            <Text style = {{color: '#F02A4B', fontWeight: 'bold', marginTop: 6, fontSize: 12}}>
                                {props.touched.date && props.errors.date}
                            </Text>

                            <TextInput style = {styles.input} placeholder = 'Start Time (00:00AM)' 
                            onChangeText = {props.handleChange('startTime')} value = {props.values.startTime}
                            onBlur = {props.handleBlur('startTime')}/> 
                            <View style = {{paddingLeft: 185, paddingTop: 100, position: 'absolute'}}>
                            <Feather name = 'clock' size = {20} color = {'#C7C7CD'} onPress = {showTimePicker}/>
                            </View>
                            <Text style = {{color: '#F02A4B', fontWeight: 'bold', marginTop: 6, fontSize: 12}}>
                                {props.touched.startTime && props.errors.startTime}
                            </Text>

                            <TextInput style = {styles.input} placeholder = 'End Time (00:00AM)' 
                            onChangeText = {props.handleChange('endTime')} value = {props.values.endTime}
                            onBlur = {props.handleBlur('endTime')}/> 
                            <View style = {{paddingLeft: 185, paddingTop: 175, position: 'absolute'}}>
                            <Feather name = 'clock' size = {20} color = {'#C7C7CD'} onPress = {showTimePicker}/>
                            </View>
                            <Text style = {{color: '#F02A4B', fontWeight: 'bold', marginTop: 6, fontSize: 12}}>
                                {props.touched.endTime && props.errors.endTime}
                            </Text>

                            <TextInput style = {styles.input} placeholder = 'Title (Lorem Ipsum)' 
                            onChangeText = {props.handleChange('title')} value = {props.values.title}
                            onBlur = {props.handleBlur('title')}/> 
                            <Text style = {{color: '#F02A4B', fontWeight: 'bold', marginTop: 6, fontSize: 12}}>
                                {props.touched.title && props.errors.title}
                            </Text>

                            <TextInput style = {styles.input} placeholder = 'Description (Lorem Ipsum)' 
                            onChangeText = {props.handleChange('description')} value = {props.values.description}
                            onBlur = {props.handleBlur('description')}/> 
                            <Text style = {{color: '#F02A4B', fontWeight: 'bold', marginTop: 6, fontSize: 12}}>
                                {props.touched.description && props.errors.description}
                            </Text>

                            <View style = {{paddingLeft: 105, paddingTop: 395, position: 'absolute'}}>
                            <TouchableOpacity onPress = {props.handleSubmit} style={{ height: 50, width: 100, backgroundColor: '#3da9fc'}}>
                                <Text style = {{color: 'white', fontSize: 18, fontWeight: 'bold', paddingLeft: 30, paddingTop: 10}}>Add</Text>
                            </TouchableOpacity>
                            </View>

                            <DateTimePickerModal
                                isVisible={pickerMode !== null}
                                mode={pickerMode}
                                onConfirm={handleConfirm}
                                onCancel={hidePicker}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        )
    }

    const styles = StyleSheet.create({
        input: {
            borderBottomColor: '#3da9fc',
            borderLeftColor: 'white',
            borderRightColor: 'white',
            borderTopColor: 'white',
            borderWidth: 2,
            paddingTop: 20,
        }
    })