import React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './components/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <AppNavigator/>
    </NativeBaseProvider>
  );
};