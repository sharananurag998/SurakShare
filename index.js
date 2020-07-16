import { registerRootComponent } from 'expo';

<<<<<<< HEAD
import './utils/shims';
import App from './App';

// YellowBox.ignoreWarnings([
//   'Warning: componentWillMount',
//   'Warning: componentWillReceiveProps',
//   'Module RCTImageLoader',
//   'Class RCTCxxModule was not exported',
//   'Remote debugger',
// ])

=======
import App from './App';

>>>>>>> 75e320b7500d7144c9ee498be21dc7afbb462689
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
