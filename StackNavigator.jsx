import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home'
import Accounts from './src/screens/Accounts'
import Categories from './src/screens/Categories'
import Settings from './src/screens/Settings'
import Cards from './src/screens/Cards'
import Login from './src/screens/Login'
import { getAuthToken } from './src/util'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Signup from './src/screens/Signup'
import AccountScreen from './src/screens/AccountScreen'
import CreditcardScreen from './src/screens/CreditcardScreen'
import DebitcardScreen from './src/screens/DebitcardScreen'
import CategoryScreen from './src/screens/CategoryScreen'
import OwedScreen from './src/screens/OwedScreen'
import TransactionScreen from './src/screens/TransactionScreen'

export default function StackNavigator() {
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()

  useEffect(() => {
    async function checkAuthToken() {
      try {
        const auth_token = await AsyncStorage.getItem('auth_token');
        if (auth_token) {
          navigation.navigate('Home')
        }
      } catch (error) {
      }
    }

    checkAuthToken();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'default'}} initialRouteName='Login'>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Accounts" component={Accounts}/>
        <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name="Owed" component={OwedScreen}/>
        <Stack.Screen name="Categories" component={Categories}/>
        <Stack.Screen name="Category" component={CategoryScreen}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Cards" component={Cards}/>
        <Stack.Screen name="Creditcard" component={CreditcardScreen}/>
        <Stack.Screen name="Debitcard" component={DebitcardScreen}/>
        <Stack.Screen name="Transaction" component={TransactionScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Group>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})