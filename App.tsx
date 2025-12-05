import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { RootProvider } from './src/context/RootContext';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <RootProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </RootProvider>
    </SafeAreaProvider>
  );
};

export default App;
