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

export default function AccountScreen({route}) {
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

  const [data, setData] = useState(null)
  const [period, setPeriod] = useState('week')
  const today = new Date()
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay())
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()))
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // const [startDate, setStartDate] = useState(startOfWeek.toISOString().slice(0, 10))
  // const [endDate, setEndDate] = useState(endOfWeek.toISOString().slice(0, 10))
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const changePeriod = (p) => {
    setPeriod(p)
    switch (p){
      case 'today':
        setStartDate(today.toISOString().slice(0, 10))
        setEndDate(today.toISOString().slice(0, 10))
        break;
      case 'week':
        setStartDate(startOfWeek.toISOString().slice(0, 10))
        setEndDate(endOfWeek.toISOString().slice(0, 10))
        break;
      case 'month':
        setStartDate(startOfMonth.toISOString().slice(0, 10))
        setEndDate(endOfMonth.toISOString().slice(0, 10))
        break;
      case 'overall':
        setEndDate(null)
        setStartDate(null)
        break
      default:
        break;
    }
  }

  const comp_details = <AccountDetails id={id} acc_name={name} setHeader={setHeader} reload={reload}/>
  const comp_category = <HomePie url_add={`&account_id=${id}`} drag={reload}/>

  const tr_api_payload = {
    account_id: id
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