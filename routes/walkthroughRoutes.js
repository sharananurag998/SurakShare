import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TestPage from '../screens/containers/TestPage';
import Login from '../screens/Login.js';

const Stack = createStackNavigator();

function WalkthroughNavigator() {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="TestPage" component={TestPage} options= {{headerShown: false}} />
      <Stack.Screen name="AfterTestPage" component={Login} options= {{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default WalkthroughNavigator;