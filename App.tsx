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
import ThemeContext, { ThemeProvider } from './src/components/Context/ThemeContext';

function App(): JSX.Element {
  
  return (
    <ThemeProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  
});

export default App;
