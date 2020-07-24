import { registerRootComponent } from 'expo';
import React from 'react';
import { LogBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import './utils/shims';
import './shim';
import App from './App';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgba(93,161,172,0.96)',
        accent: 'tomato',
    },
};

LogBox.ignoreLogs([
    'Waarning: SplashScreen.hide',
    'Warning: SplashScreen.preventAutoHide',
    'Warning: VirtualizedLists',
    'Warning: componentWillReceiveProps',
]);

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
