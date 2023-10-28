import { SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import AccountList from '../components/Account/AccountList'

export default function Settings() {
  const theme = Styles.light
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <ScrollView>
        <View style={[styles.home]}>
          <AccountList />
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
    marginVertical: 20
  }
})