import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import TestPage from '../screens/containers/TestPage';
import Login from '../screens/Login.js';

const WalkthroughNavigator = createStackNavigator(
    {
        TestPage         : { screen : TestPage, navigationOptions: {
            headerShown: false,
        } },
        AfterTestPage    : { screen : Login, navigationOptions: {
            headerShown: false,
        } }
    },
    {
        initialRouteName : 'TestPage',
        navigationOptions: {
            headerShown: false,
        },
    }
)

export default WalkthroughNavigator;