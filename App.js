import React, { useState } from 'react';

<<<<<<< HEAD
import AppContainer from './routes/mainRoute';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

function App() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    if (!isLoadingComplete) {
        return <AppLoading startAsync={loadResourcesAsync} onError={handleLoadingError} onFinish={() => handleFinishLoading(setLoadingComplete)} />;
    } else {
        return isLoadingComplete ? <AppContainer /> : <AppLoading />;
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
=======
import AppContainer from './routes/mainRoute'; 
import { AppLoading } from "expo";
import * as Font from "expo-font";

function App() {
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
    return isLoadingComplete ? <AppContainer /> : <AppLoading />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      "roboto-regular": require("./assets/fonts/roboto-regular.ttf")
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;
>>>>>>> 75e320b7500d7144c9ee498be21dc7afbb462689
