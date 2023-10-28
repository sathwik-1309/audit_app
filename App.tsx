/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import  { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator';

function App(): JSX.Element {
  
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  
});

export default App;
