import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useContext, useState } from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import AccountList from '../components/Account/AccountList'
import OwedList from '../components/Owed/OwedList'
import ThemeContext from '../components/Context/ThemeContext'
import Topbar from '../components/Topbar'
import AccountDetails from '../components/Account/AccountDetails'

export default function AccountScreen({route}) {
  const { id, name } = route.params
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]

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
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <Topbar header={name}/>
      <ScrollView>
        <View style={[styles.home]}>
          <AccountDetails />
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