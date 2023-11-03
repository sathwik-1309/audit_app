import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import AccountList from '../components/Account/AccountList'
import OwedList from '../components/Owed/OwedList'
import ThemeContext from '../components/Context/ThemeContext'
import Topbar from '../components/Topbar'
import AccountDetails from '../components/Account/AccountDetails'
import axios from 'axios'
import { HOST_IP, MONTHS, YEARS } from '../config'
import HomePie from '../components/Pie/HomePie'
import NavigationBar from '../components/NavigationBar'
import { getAuthToken } from '../util'
import TransactionsList from '../components/Transaction/TransactionsList'
import MonthPicker from '../components/MonthPicker'
import { TransactionListWrapper } from '../components/Transaction/TransactionListWrapper'
import AnalyticsParent from '../components/Transaction/AnalyticsParent'
import CreditcardDetails from '../components/Card/Creditcard/CreditcardDetails'
import DebitcardDetails from '../components/Card/Debitcard/DebitcardDetails'

export default function DebitcardScreen({route}) {
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

  const comp_details = <DebitcardDetails id={id} card_name={name} setHeader={setHeader} drag={reload}/>
  const comp_category = <HomePie url_add={`&card_id=${id}`} drag={reload}/>

  const tr_api_payload = {
    card_id: id
  }
  const pages = [
    {
      name: 'Details',
      comp: comp_details
    },
    {
      name: 'Transactions',
      comp: <TransactionListWrapper payload={tr_api_payload}/>
    },
    {
      name: 'Split',
      comp: comp_category
    },
    {
      name: 'Analytics',
      comp: <AnalyticsParent drag={reload} payload={tr_api_payload}/>
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