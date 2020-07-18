import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import './utils/shims';
import App from './App';

LogBox.ignoreLogs([
    'Waarning: SplashScreen.hide',
    'Warning: SplashScreen.preventAutoHide',
    'Warning: VirtualizedLists',
    'Warning: componentWillReceiveProps',
]);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
