import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { Component } from "react";
//Screen Imports
import Home from '../screens/home'; 
import UserProfile from '../screens/userProfile'; 
import ShareFiles from '../screens/shareFiles'; 
import shareFiles from '../screens/shareFiles';

const Stack = createStackNavigator();

function HomeStackNavigator() {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
}

function ProfileStackNavigator() {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Profile" component={UserProfile} />
      </Stack.Navigator>
    );
}

function ShareFilesStackNavigator() {
    return (
      <Stack.Navigator headerMode="none" initialRouteName="Home">
        <Stack.Screen name="Share Files" component={shareFiles} />
      </Stack.Navigator>
    );
}


  const Drawer = createDrawerNavigator();
  
  export default function SurakShare() {
    return (
      <NavigationContainer>
        <Drawer.Navigator headerMode="none" initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStackNavigator} />
          <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
          <Drawer.Screen name="Share Files" component={ShareFilesStackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }