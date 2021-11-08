import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigator/Navigator';
import {PermissionsProvider} from './src/context/PermissionsContext';

const App = () => {
  return (
    <NavigationContainer>
      <PermissionsProvider>
        {/* Childrens */}
        <Navigator />
      </PermissionsProvider>
    </NavigationContainer>
  );
};

export default App;
