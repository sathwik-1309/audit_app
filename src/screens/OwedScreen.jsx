import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import ThemeContext from '../components/Context/ThemeContext'
import Topbar from '../components/Topbar'
import NavigationBar from '../components/NavigationBar'
import { TransactionListWrapper } from '../components/Transaction/TransactionListWrapper'
import OwedDetails from '../components/Owed/OwedDetails'

export default function OwedScreen({route}) {
  const { id, name } = route.params
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]

  const [header, setHeader] = useState(name)
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(0)
  const onRefresh = () => {
    setRefreshing(true);
    setReload(reload+1)
    setRefreshing(false);
  }

  const tr_api_payload = {
    party: id
  }
  const pages = [
    {
      name: 'Details',
      comp: <OwedDetails id={id} acc_name={name} setHeader={setHeader} drag={reload}/>
    },
    {
      name: 'Transactions',
      comp: <TransactionListWrapper payload={tr_api_payload}/>
    }
  ]
  const [page, setPage] = useState(pages[0])
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <Topbar header={header}/>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={[styles.home]}>
          <NavigationBar pages={pages} cur_page={page} setPage={setPage}/>
          {page.comp}
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