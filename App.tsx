import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as app from './app.json';
import AppNavigator from './components/AppNavigator';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator/>
        </PaperProvider>
      </Provider>
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(app.expo.name, () => App);