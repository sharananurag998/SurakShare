import React from 'react';

import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from 'react-native-linear-gradient';
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements'
import avatarImage from '../assets/images/aniketh1.jpg'

function aboutUs(props)
{
    const members = [
        {
            name:"Anurag Sharan", 
            role:"Group Lead",
            url: "http://google.com"
        },
        {
            name:"Aniketh Hotagi",
            role:"Full Stack Developer"
        },
        {
            name:"Abdul Mateen",
            role:"Full Stack Developer"
        },
        {
            name:"Adarsh Nair",
            role:"Full Stack Developer"
        },
        {
            name:"Ankit Jaiswal",
            role:"Full Stack Developer"
        }
    ]
    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => 
    (
        <ListItem
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
                colors: ['#788eec', '#788eec'],
                start: [1, 0],
                end: [0.2, 0],
            }}
            ViewComponent={LinearGradient} // Only if no expo
            leftAvatar={{ rounded: true, source: {avatarImage} }}
            title={item.name}
            titleStyle={{ color: '#fff', fontWeight: 'bold' }}
            subtitleStyle={{ color: '#ddd' }}
            subtitle={item.role}
            style={styles.aboutus}
            chevron={{ color: '#fff' }}
            bottomDivider
        />
    )
        return (
            <FlatList
              keyExtractor={keyExtractor}
              data={members}
              renderItem={renderItem}/>
          );
}

export default aboutUs;

const styles = StyleSheet.create({
    aboutus:{
        margin:15,
        borderRadius: 2,
        borderWidth: 2, 
        borderColor: '#ccc'
    },
});