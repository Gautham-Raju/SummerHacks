import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

const codes = ['AaAa', 'BbBb', 'CcCc', 'DdDd']

const clubSchema = yup.object({
    code: yup.string().
    required()
    .min(4)
    .test('code found', 'This code does not exist', (val) => {
        return codes.includes(val)
    })
})

export default function UserCodeForm({addClubs}){
    return(
        <View>
            <Formik
                initialValues = {{code: ''}}
                validationSchema = {clubSchema}
                onSubmit = {(values, actions) => {
                    actions.resetForm();
                    addClubs(values);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput style = {styles.input} placeholder = 'Club Code' 
                        onChangeText = {props.handleChange('code')} value = {props.values.code}
                        onBlur = {props.handleBlur('code')}/> 
                        <Text style = {{color: '#F02A4B', fontWeight: 'bold', marginTop: 6, fontSize: 12}}>
                            {props.touched.code && props.errors.code}
                        </Text>
                        <View style = {{paddingLeft: 105, paddingTop: 85, position: 'absolute'}}>
                        <TouchableOpacity style={{ height: 50, width: 100, backgroundColor: '#3da9fc'}}>
                            <Text style = {{color: 'white', fontSize: 18, fontWeight: 'bold', paddingLeft: 28, paddingTop: 10}}>Join</Text>
                        </TouchableOpacity>
                        </View>
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