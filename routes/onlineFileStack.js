import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import WalletOverview from '../screens/WalletOverview';
import CreateWallet from '../screens/CreateWallet';
import RevealMnemonic from '../screens/RevealMnemonic';
import ConfirmMnemonics from '../screens/ConfirmMnemonics';
import WalletCreated from '../screens/WalletCreated';
import SelectFiles from '../screens/SelectFiles';
import UploadFilesToBlockChain from '../screens/UploadFilesToBlockChain';

const Stack = createStackNavigator();

const SecureFileShareStack = () => {
    <Stack.Navigator initialRouteName='WalletOverview'>
        <Stack.screen name='WalletOverview' component={WalletOverview} options={{ headerShown: false }} />
        <Stack.screen name='CreateWallet' component={CreateWallet} options={{ headerShown: false }} />
        <Stack.screen name='RevealMnemonic' component={RevealMnemonic} options={{ headerShown: false }} />
        <Stack.screen name='ConfirmMnemonics' component={ConfirmMnemonics} options={{ headerShown: false }} />
        <Stack.screen name='WalletCreated' component={WalletCreated} options={{ headerShown: false }} />
        <Stack.screen name='SelectFiles' component={SelectFiles} options={{ headerShown: false }} />
        <Stack.screen name='UploadFilesToBlockChain' component={UploadFilesToBlockChain} options={{ headerShown: false }} />
    </Stack.Navigator>;
};

export default SecureFileShareStack;
