import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerContent } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Text, TouchableRipple, Switch } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

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
import SelectFiles from '../screens/SelectFiles';
import UploadFilesToBlockChain from '../screens/UploadFilesToBlockChain';
import AboutUs from '../screens/aboutUs';
import Welcome from '../screens/welcomeScreen';
import QrScan from '../screens/qrScan';
import Login from '../screens/Login';
import changePassword from '../screens/changePassword';

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
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('QrScan');
            }}>
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
                name='ChangePassword'
                component={changePassword}
                options={{
                    title: 'ChangePassword', //Set Header Title
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

function SecureFileShareStackNavigator({ navigation }) {
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
            <Stack.Screen
                name='SelectFiles'
                component={SelectFiles}
                options={{
                    title: 'Select files to share', //Set Header Title
                }}
            />
            <Stack.Screen
                name='UploadFilesToBlockChain'
                component={UploadFilesToBlockChain}
                options={{
                    title: 'Upload Files to BlockChain', //Set Header Title
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

function SignOutStackNavigator({ navigation }) {
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
                name='Sign Out'
                component={Welcome}
                options={{
                    title: 'Sign Out', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SurakShare(props) {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                headerMode='none'
                initialRouteName='Home'
                drawerContentOptions={{
                    activeTintColor: '#5B0A91',
                    itemStyle: { marginVertical: 5 },
                }}
                drawerStyle={{
                    backgroundColor: '#fbeeff',
                    width: '70%',
                }}>
                <Drawer.Screen
                    name='Home'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <Icon name='home' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={HomeStackNavigator}
                />

                <Drawer.Screen
                    name='Profile'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name='account' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={ProfileStackNavigator}
                />

                <Drawer.Screen
                    name='Share Files'
                    options={{
                        drawerIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons name='share-variant' style={{ color: '#000', fontSize: 30 }} />
                        ),
                    }}
                    component={ShareFilesStackNavigator}
                />

                <Drawer.Screen
                    name='OnlineFileShare'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name='web' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={SecureFileShareStackNavigator}
                />

                <Drawer.Screen
                    name='Groups'
                    options={{
                        drawerIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons name='account-group' style={{ color: '#000', fontSize: 30 }} />
                        ),
                    }}
                    component={TransferHistoryStackNavigator}
                />

                <Drawer.Screen
                    name='Transfer History'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name='history' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={TransferHistoryStackNavigator}
                />

                <Drawer.Screen
                    name='Document Scanner'
                    options={{
                        drawerIcon: ({ focused, color, size }) => (
                            <MaterialCommunityIcons name='file-document' style={{ color: '#000', fontSize: 30 }} />
                        ),
                    }}
                    component={TransferHistoryStackNavigator}
                />

                <Drawer.Screen
                    name='About Us'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name='dev-to' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={AboutUsStackNavigator}
                />

                <Drawer.Screen
                    name='Setting'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name='settings' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={ProfileStackNavigator}
                />

                <Drawer.Screen
                    name='Sign Out'
                    options={{
                        drawerIcon: ({ focused, color, size }) => <MaterialCommunityIcons name='logout' style={{ color: '#000', fontSize: 30 }} />,
                    }}
                    component={SignOutStackNavigator}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
