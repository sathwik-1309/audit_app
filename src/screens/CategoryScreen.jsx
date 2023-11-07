import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import ThemeContext from '../components/Context/ThemeContext'
import Topbar from '../components/Topbar'
import AccountDetails from '../components/Account/AccountDetails'
import HomePie from '../components/Pie/HomePie'
import NavigationBar from '../components/NavigationBar'
import { TransactionListWrapper } from '../components/Transaction/TransactionListWrapper'
import AnalyticsParent from '../components/Transaction/AnalyticsParent'
import CategoryDetails from '../components/Category/CategoryDetails'
import SubcategoryList from '../components/Subcategory/SubcategoryList'

export default function CategoryScreen({route}) {
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

  const comp_details = <CategoryDetails id={id} category_name={name} setHeader={setHeader} drag={reload}/>
  const comp_category = <HomePie url_add={`&category_id=${id}`} drag={reload}/>

  const tr_api_payload = {
    category_id: id
  }
  const pages = [
    {
      name: 'Details',
      comp: comp_details
    },
    {
      name: 'Subcategory',
      comp: <SubcategoryList payload={tr_api_payload} id={id}/>
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