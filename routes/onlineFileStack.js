import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import WalletOverview from '../screens/WalletOverview';
import CreateWallet from '../screens/CreateWallet';
import RevealMnemonic from '../screens/RevealMnemonic';
import ConfirmMnemonics from '../screens/ConfirmMnemonics';

const Stack = createStackNavigator();

const onlineFileStack = () => {
    <Stack.Navigator initialRouteName='WalletOverview'>
        <Stack.screen name='WalletOverview' component={WalletOverview} options={{ headerShown: false }} />
        <Stack.screen name='CreateWallet' component={CreateWallet} options={{ headerShown: false }} />
        <Stack.screen name='CreateWallet' component={RevealMnemonic} options={{ headerShown: false }} />
        <Stack.screen name='ConfirmMnemonics' component={ConfirmMnemonics} options={{ headerShown: false }} />
    </Stack.Navigator>;
};

export default onlineFileStack;
