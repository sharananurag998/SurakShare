import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import WalkthroughNavigator from './walkthroughRoutes';
import SurakShare from './stackAndDrawer';
import OnlineFileStack from './onlineFileStack';

const Stack = createStackNavigator();

function AppContainer() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                {/* <Stack.Screen name="Walkthrough" component={WalkthroughNavigator} options= {{headerShown: false}} /> */}
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name='SurakShare' component={SurakShare} options={{ headerShown: false }} />
                <Stack.Screen name='OnlineFileShare' component={OnlineFileStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppContainer;
