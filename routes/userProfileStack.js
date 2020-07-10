import {createStackNavigator} from 'react-navigation-stack';
import userProfile from '../screens/userProfile';
import React from 'react';
import Header from '../shared/header';

const screens = {
    UserProfile: {
        screen: userProfile,
        navigationOptions: ({ navigation }) => {
            return {
              headerTitle: () => <Header title='Your Profile' navigation={navigation} />
            }
        }
    }
};
const UserProfileStack = createStackNavigator(screens);

export default UserProfileStack;