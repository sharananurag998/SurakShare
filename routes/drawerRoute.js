import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import HomeStack from './homeStack';
import ShareFileStack from './shareFileStack';
import UserProfileStack from './userProfileStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home:{
        name: 'Home',
        screen: HomeStack,
        navigationOptions:{
            headerMode: 'screen'
        }
    },
    ShareFilesStack:{
        name:'Offline File Sharing',
        screen: ShareFileStack,
        navigationOptions: {
            title: 'Offline File Sharing',
            headerMode: 'screen'
        },
    },
    UserProfileStack:{
        name: 'Your Profile',
        screen: UserProfileStack,
        navigationOptions: {
            title: 'Your Profile',
            headerMode: 'screen'
        },
    },
})

const DrawerRoute = RootDrawerNavigator;

export default DrawerRoute;