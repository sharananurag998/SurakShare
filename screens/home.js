import React from 'react';
import {Text, View, StatusBar, Button} from 'react-native';
import { globalStyles } from '../styles/global';


export default function Home({navigation}) {

    return(
        <View style={globalStyles.container}>
            <Text>Welcome to SurakShare</Text>
            <StatusBar style="auto" />
        </View>
    ); 
}
