import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import mobileAds from 'react-native-google-mobile-ads';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from 'sentry-expo'; //sentry-expo bug causes build to fail related to github open issue #279
import { captureException, captureMessage } from '@sentry/react-native';
import * as app from './app.json';
import AppNavigator from './components/AppNavigator';
import { SENTRY_DSN } from '@env';

Sentry.init({
  dsn: SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: false
});

mobileAds().initialize().then(adapterStatuses => {
  captureMessage(JSON.stringify(adapterStatuses, null, 2));
  //console.info(JSON.stringify(adapterStatuses, null, 2));
  // Initialization complete!
})
.catch(err => {
  captureException(err.message);
  //console.error(err.message);
});

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  // default lightBlue theme color
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      }
    },
    config: {
      useSystemColorMode: false,
      initialColorMode: 'light',
    }
  });

  return (
    <NativeBaseProvider config={config} theme={theme}>
      <Provider store={store}>
        <PaperProvider>
          <StatusBar style='dark'/>
          <AppNavigator/>
        </PaperProvider>
      </Provider>
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(app.expo.name, () => App);