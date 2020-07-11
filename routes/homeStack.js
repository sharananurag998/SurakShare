import {createStackNavigator} from 'react-navigation-stack';
import home from '../screens/home';
import React from 'react';
import Header from '../shared/header';
const screens = {
    Home: {
        screen: home,
        navigationOptions: ({ navigation }) => {
            return {
              headerTitle: () => <Header title='Home' navigation={navigation} />
            }
        }
    }
};
const HomeStack = createStackNavigator(screens);

export default HomeStack;