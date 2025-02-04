import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/Login';
import LoginForm from '../screens/loginForm';
import SignUp from '../screens/SignUp';

import WalkthroughNavigator from './walkthroughRoutes';
import SurakShare from './stackAndDrawer';
import SecureFileShareStack from './SecureFileShareStack';
import ReceiveFiles from '../screens/ReceiveFiles';

const Stack = createStackNavigator();

function AppContainer() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen name='Walkthrough' component={WalkthroughNavigator} options={{ headerShown: false }} />
				<Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
				<Stack.Screen name='LoginForm' component={LoginForm} options={{ headerShown: false }} />
				<Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
				<Stack.Screen name='SurakShare' component={SurakShare} options={{ headerShown: false }} />
				<Stack.Screen name='SecureFileShare' component={SecureFileShareStack} options={{ headerShown: false }} />
				<Stack.Screen name='ReceiveFiles' component={ReceiveFiles} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppContainer;
