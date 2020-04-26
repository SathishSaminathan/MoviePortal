/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {Colors} from './src/constants/ThemeConstants';
import {MyStack} from './src/router/StackNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.yellow} />
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
};

export default App;
