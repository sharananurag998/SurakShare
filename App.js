import React, { useState } from 'react';

import AppContainer from './routes/mainRoute'; 
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { setCustomText, setCustomTextInput} from 'react-native-global-props';

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

const customTextProps = {
  style: {
    fontFamily: 'product-sans-regular',
  }
};

setCustomText(customTextProps);
setCustomTextInput(customTextProps);

export default App;
