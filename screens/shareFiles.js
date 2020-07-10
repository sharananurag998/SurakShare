import React from 'react';
import {Text, View, StatusBar, Button} from 'react-native';
import { globalStyles } from '../styles/global';


export default function shareFiles({navigation}) {

    return(
        <View style={globalStyles.container}>
            <Text>Share Files Screen</Text>
            <StatusBar style="auto" />
        </View>
    ); 
}
