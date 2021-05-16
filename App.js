import React, {useState} from 'react';
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import {PlacesNavigator} from "./src/navigation/PlacesNavigator";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import {DB} from "./src/db/db";

const fetchFonts = async () => {
  try {
    await Font.loadAsync({
      'robotoReg': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
      'robotoBold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    })
    await DB.init()
    console.log('Database started.')
  } catch (e) {
    console.log(e)
  }
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return <AppLoading onFinish={() => setIsReady(true)}
                       startAsync={fetchFonts}
                       onError={e => console.log(e)} />
  }
  return(
      <Provider store={store}>
        <PlacesNavigator />
      </Provider>
  )
}
