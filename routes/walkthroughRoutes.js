import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';
import TestPage from '../screens/containers/TestPage';
import AfterTestPage from '../screens/Login.js';

const AppNavigator = createStackNavigator(
    {
        TestPage         : { screen : TestPage },
        AfterTestPage    : { screen : AfterTestPage }
    },
    {
        initialRouteName : 'TestPage',
        navigationOptions : {

        },
        headerMode : 'none'
    }
)

const App = createAppContainer(AppNavigator);

export default AppNavigator;