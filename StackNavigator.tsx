import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Accounts from './src/screens/Accounts'
import Categories from './src/screens/Categories'
import Settings from './src/screens/Settings'
import Cards from './src/screens/Cards'

export default function StackNavigator() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName='Home'>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Accounts" component={Accounts}/>
        <Stack.Screen name="Categories" component={Categories}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Cards" component={Cards}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})