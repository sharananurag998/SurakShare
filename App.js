import React, { useState } from 'react';
// import 'ethers/dist/shims.js';
import ethers from 'ethers';

import AppContainer from './routes/mainRoute';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

function App() {
    // const mnemonic =
    //   'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol';
    // const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic);

    const PROVIDER = ethers.providers.getDefaultProvider('ropsten');

    const [isLoadingComplete, setLoadingComplete] = useState(false);
    if (!isLoadingComplete) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return isLoadingComplete ? <AppContainer provider={PROVIDER} /> : <AppLoading />;
    }
}
async function loadResourcesAsync() {
    await Promise.all([
        Font.loadAsync({
            'roboto-regular': require('./assets/fonts/roboto-regular.ttf'),
        }),
    ]);
}
function handleLoadingError(error) {
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

export default App;
