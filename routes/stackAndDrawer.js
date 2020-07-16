import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Screen Imports
import Home from '../screens/home';
import UserProfile from '../screens/userProfile';
import ShareFiles from '../screens/shareFiles';
import TransferHistory from '../screens/transferHistory';
import WalletOverview from '../screens/WalletOverview';
import CreateWallet from '../screens/CreateWallet';
import RevealMnemonic from '../screens/RevealMnemonic';
import ConfirmMnemonics from '../screens/ConfirmMnemonics';
import WalletCreated from '../screens/WalletCreated';
import AboutUs from '../screens/aboutUs';
import QrScan from '../screens/qrScan';

const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <MaterialIcons name='menu' size={29} style={{ left: 20, color: 'white' }} />
            </TouchableOpacity>
        </View>
    );
};

// App Header Config

const header = {
    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
    headerStyle: {
        backgroundColor: '#5b0a91', //Set Header color
    },
    headerTintColor: '#fff', //Set Header text color
    title: 'SurakShare',
    headerRight: () => (
        <TouchableOpacity>
            <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' />
        </TouchableOpacity>
    ),
    headerLayoutPreset: 'center',
};

function HomeStackNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#5b0a91', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    title: 'SurakShare',
                    headerRight: () => (
                        <TouchableOpacity>
                            <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                        </TouchableOpacity>
                    ),
                    headerLayoutPreset: 'center',
                }}
            />
            <Stack.Screen
                name='TransferHistory'
                component={TransferHistory}
                options={{
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#5b0a91', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    title: 'Transfer History',
                    headerRight: () => (
                        <TouchableOpacity>
                            <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                        </TouchableOpacity>
                    ),
                    headerLayoutPreset: 'center',
                }}
            />
        </Stack.Navigator>
    );
}

function ProfileStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#5b0a91', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                title: 'SurakShare',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('QrScan');
                        }}>
                        <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                    </TouchableOpacity>
                ),
                headerLayoutPreset: 'center',
            }}>
            <Stack.Screen
                name='Profile'
                component={UserProfile}
                options={{
                    title: 'User Profile', //Set Header Title
                }}
            />
            <Stack.Screen
                name='QrScan'
                component={QrScan}
                options={{
                    headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                    headerStyle: {
                        backgroundColor: '#5b0a91', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    title: 'QR Scanner',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('QrScan');
                            }}>
                            <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                        </TouchableOpacity>
                    ),
                    headerLayoutPreset: 'center',
                }}
            />
        </Stack.Navigator>
    );
}

function ShareFilesStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#5b0a91', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                title: 'SurakShare',
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                    </TouchableOpacity>
                ),
                headerLayoutPreset: 'center',
            }}>
            <Stack.Screen
                name='Share Files'
                component={ShareFiles}
                options={{
                    title: 'Share Files', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
}

function TransferHistoryStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#5b0a91', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                title: 'SurakShare',
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                    </TouchableOpacity>
                ),
                headerLayoutPreset: 'center',
            }}>
            <Stack.Screen
                name='Transfer History'
                component={TransferHistory}
                options={{
                    title: 'Transfer History', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
}

function OnlineFileStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='WalletOverview'
            screenOptions={{
                headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#5DA1AC', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                title: 'SurakShare',
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                    </TouchableOpacity>
                ),
                headerLayoutPreset: 'center',
            }}>
            <Stack.Screen
                name='WalletOverview'
                component={WalletOverview}
                options={{
                    title: 'Share Files Online', //Set Header Title
                }}
            />
            <Stack.Screen
                name='CreateWallet'
                component={CreateWallet}
                options={{
                    title: 'Create a Wallet', //Set Header Title
                }}
            />
            <Stack.Screen
                name='RevealMnemonic'
                component={RevealMnemonic}
                options={{
                    title: 'Reveal Mnemonic', //Set Header Title
                }}
            />
            <Stack.Screen
                name='ConfirmMnemonics'
                component={ConfirmMnemonics}
                options={{
                    title: 'Confirm Mnemonic', //Set Header Title
                }}
            />
            <Stack.Screen
                name='WalletCreated'
                component={WalletCreated}
                options={{
                    title: 'Generate Wallet', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
}

function AboutUsStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
                headerStyle: {
                    backgroundColor: '#5b0a91', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                title: 'SurakShare',
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='qrcode-scan' size={24} color='white' style={{ right: 10 }} />
                    </TouchableOpacity>
                ),
                headerLayoutPreset: 'center',
            }}>
            <Stack.Screen
                name='About Us'
                component={AboutUs}
                options={{
                    title: 'About Us', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

export default function SurakShare() {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                headerMode='none'
                initialRouteName='Home'
                drawerContentOptions={{
                    activeTintColor: '#5B0A91',
                    itemStyle: { marginVertical: 5 },
                }}>
                <Drawer.Screen name='Home' component={HomeStackNavigator} />
                <Drawer.Screen name='Profile' component={ProfileStackNavigator} />
                <Drawer.Screen name='Share Files' component={ShareFilesStackNavigator} />
                <Drawer.Screen name='Groups' component={TransferHistoryStackNavigator} />
                <Drawer.Screen name='Transfer History' component={TransferHistoryStackNavigator} />
                <Drawer.Screen name='Document Scanner' component={TransferHistoryStackNavigator} />
                <Drawer.Screen name='About Us' component={AboutUsStackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
