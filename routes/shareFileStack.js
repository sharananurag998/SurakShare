import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';
import shareFiles from '../screens/shareFiles';
import Header from '../shared/header';

const screens = {
    ShareFiles: {
        screen: shareFiles,
        navigationOptions: ({ navigation }) => {
            return {
              headerTitle: () => <Header title='Share Files' navigation={navigation} />
            }
        }
    }
};
const ShareFileStack = createStackNavigator(screens);

export default ShareFileStack;