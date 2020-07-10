import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import HomeStack from './homeStack';
import ShareFileStack from './shareFileStack';
import UserProfileStack from './userProfileStack';

const RootDrawerNavigator = createDrawerNavigator({
    Home:{
        screen: HomeStack
    },
    ShareFilesStack:{
        screen: ShareFileStack,
        navigationOptions: {
            title: 'Offline File Sharing'
        },
    },
    UserProfileStack:{
        screen: UserProfileStack,
        navigationOptions: {
            title: 'Your Profile'
        },
    },
})

export default createAppContainer(RootDrawerNavigator);