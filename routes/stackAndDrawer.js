import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';

//Screen Imports
import Home from '../screens/home'; 
import UserProfile from '../screens/userProfile'; 
import ShareFiles from '../screens/shareFiles';

const Stack = createStackNavigator();

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}


function HomeStackNavigator({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: 'Home', //Set Header Title
          headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#5b0a91', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
        }}/>
    </Stack.Navigator>
  );
}

function ProfileStackNavigator({ navigation }) {
    return (
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: '#5b0a91', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
        }}>
        <Stack.Screen 
          name="Profile" 
          component={UserProfile} 
          options={{
            title: 'User Profile', //Set Header Title
          }}/>
      </Stack.Navigator>
    );
}

function ShareFilesStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#5b0a91', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
      }}>
      <Stack.Screen 
        name="Share Files" 
        component={ShareFiles} 
        options={{
          title: 'Share Files', //Set Header Title
        }}/>
    </Stack.Navigator>
  );
}


  const Drawer = createDrawerNavigator();
  
  export default function SurakShare() {
    return (
      <NavigationContainer>
        <Drawer.Navigator 
        initialRouteName="Home" 
        drawerContentOptions={{
          activeTintColor: '#5B0A91',
          itemStyle: { marginVertical: 5 },
        }}>
          <Drawer.Screen name="Home" component={HomeStackNavigator} />
          <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
          <Drawer.Screen name="Share Files" component={ShareFilesStackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }