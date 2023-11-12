import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, RefreshControl } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Styles } from '../Styles';
import BottomBar from '../components/BottomBar';
import { HOST_IP } from '../config';
import HomePie from '../components/Pie/HomePie';
import { getAuthToken } from '../util';
import ThemeContext, { ThemeProvider } from '../components/Context/ThemeContext';
import NavigationBar from '../components/NavigationBar';
import { TransactionListWrapper } from '../components/Transaction/TransactionListWrapper';
import AnalyticsParent from '../components/Transaction/AnalyticsParent';
import axios from 'axios';
import { TransactionBoxItem } from '../components/Transaction/TransactionBoxItem';

function TransactionBox({drag}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [selected, setselected] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken();
      const url = `${HOST_IP}/v1/users/home?auth_token=${authToken}`;
      const response = await axios.get(url)
      setData(response.data)
    }

    fetchData();
  }, [drag]);

  return (
    <View style={[styles.container, theme.bg2]}>
      <View style={[styles.header]}>
        <Text style={[styles.header_text, theme.c3]}>ADD TRANSACTIONS</Text>
      </View>
      <View style={styles.body}>
        <TransactionBoxItem type='DEBIT' theme={theme} setselected={setselected} selected={selected} data={data} />
        <TransactionBoxItem type='CREDIT' theme={theme} setselected={setselected} selected={selected} data={data}  />
        <TransactionBoxItem type='PAID BY PARTY' theme={theme} setselected={setselected} selected={selected} data={data}  />
        <TransactionBoxItem type='SPLIT' theme={theme} setselected={setselected} selected={selected} data={data}  />
      </View>
    </View>
  );
}

export default function Home() {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(1)
  const onRefresh = () => {
    setRefreshing(true)
    setReload(reload+1)
    setRefreshing(false)
  }
  const pages = [
    {
      name: 'Add New',
      comp: <TransactionBox drag={reload} />
    },
    {
      name: 'Transactions',
      comp: <TransactionListWrapper />
    },
    {
      name: 'Split',
      comp: <View style={{marginTop: 20}}><HomePie drag={reload}/></View>
    },
    {
      name: 'Analytics',
      comp: <AnalyticsParent drag={reload}/>
    }
  ]
  const [page, setPage] = useState(pages[0])

  return (
    <SafeAreaView style={styles.safe_area_view}>
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
          {reload && page.comp}
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
    flexDirection: 'column',
  },
  home: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  container: {
    width: 320,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  header_text: {
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 15,
  },
  body: {
    marginTop: 10,
    alignItems: 'center',
  }
});
