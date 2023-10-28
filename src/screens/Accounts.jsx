import { SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import AccountList from '../components/Account/AccountList'
import OwedList from '../components/Owed/OwedList'

export default function Accounts() {
  const theme = Styles.light
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <ScrollView>
        <View style={[styles.home]}>
          <AccountList />
          <View style={{marginTop: 40}}>
            <OwedList />
          </View>
          
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
    flexDirection: 'column'
  },
  home: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50
  }
})