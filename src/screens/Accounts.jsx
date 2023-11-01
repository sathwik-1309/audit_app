import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext, useState } from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import AccountList from '../components/Account/AccountList'
import OwedList from '../components/Owed/OwedList'
import ThemeContext from '../components/Context/ThemeContext'

export default function Accounts() {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(0)
  const onRefresh = () => {
    setRefreshing(true);
    setReload(reload+1)
    setRefreshing(false);
  }
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <View style={[styles.home]}>
          <AccountList drag={reload}/>
          <View style={{marginTop: 40}}>
            <OwedList drag={reload}/>
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