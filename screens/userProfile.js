import React from 'react';
import {Text, View, StatusBar } from 'react-native';
import { globalStyles } from '../styles/global';


export default function Home() {
    return(
        <View style={globalStyles.container}>
            <Text>USer Profile Screen</Text>
            <StatusBar style="auto" />
        </View>
    ); 
}
