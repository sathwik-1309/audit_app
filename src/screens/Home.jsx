import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, RefreshControl } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Styles } from '../Styles';
import BottomBar from '../components/BottomBar';
import DownArrow from '../../assets/icons/down-arrow.png';
import DownArrowColor from '../../assets/icons/up-arrow-color.png';
import DebitForm from '../components/Transaction/DebitForm';
import { HOST_IP } from '../config';
import CreditForm from '../components/Transaction/CreditForm';
import PaidByPartyForm from '../components/Transaction/PaidByPartyForm';
import HomePie from '../components/Pie/HomePie';
import { getAuthToken } from '../util';
import ThemeContext, { ThemeProvider } from '../components/Context/ThemeContext';
import NavigationBar from '../components/NavigationBar';
import { TransactionListWrapper } from '../components/Transaction/TransactionListWrapper';
import AnalyticsParent from '../components/Transaction/AnalyticsParent';
import axios from 'axios';

function TransactionBoxItem({ type, theme, selected, setselected, data }) {
  const image_source = type == selected ? DownArrowColor : DownArrow;
  const openForm = () => {
    if (type == selected) {
      setselected('');
    } else {
      setselected(type);
    }
  }
  let form;
  switch (type) {
    case 'DEBIT':
      form = <DebitForm data={data} close={setselected} />;
      break;
    case 'CREDIT':
      form = <CreditForm data={data} close={setselected} />;
      break;
    case 'PAID BY PARTY':
      form = <PaidByPartyForm data={data} close={setselected} />;
      break;
    default:
      break;
  }
  const bg_color = type == selected ? theme.bg3 : theme.bg1;
  const text_color = type == selected ? theme.c1 : theme.c3;

  return (
    <TouchableOpacity style={[styles.tb_item]} onPress={openForm}>
      <View style={[styles.tb_item_header, bg_color]}>
        <View style={styles.tb_label}><Text style={[styles.tb_item_text, text_color]}>{type}</Text></View>
        <Image source={image_source} style={{ height: 20, width: 20 }} />
      </View>
      {
        type == selected &&
        form
      }
    </TouchableOpacity>
  );
}

function TransactionBox({reload }) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [selected, setselected] = useState('');
  const [accounts, setAccounts] = useState(null);
  const [parties, setParties] = useState(null);
  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken();
      const url = `${HOST_IP}/v1/users/home?auth_token=${authToken}`;
      const response = await axios.get(url)
      setData(response.data)
    }

    fetchData();
  }, [reload]);

  return (
    <View style={[styles.container, theme.bg2]}>
      <View style={[styles.header]}>
        <Text style={[styles.header_text, theme.c3]}>ADD TRANSACTIONS</Text>
      </View>
      <View style={styles.body}>
        <TransactionBoxItem type='DEBIT' theme={theme} setselected={setselected} selected={selected} data={data} />
        <TransactionBoxItem type='CREDIT' theme={theme} setselected={setselected} selected={selected} data={data} />
        <TransactionBoxItem type='PAID BY PARTY' theme={theme} setselected={setselected} selected={selected} data={data} />
      </View>
    </View>
  );
}

export default function Home() {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(0)
  const onRefresh = () => {
    setRefreshing(true);
    setReload(reload+1)
    setRefreshing(false);
  }
  const pages = [
    {
      name: 'Add New',
      comp: <TransactionBox reload={reload}/>
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
          {page.comp}
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
    elevation: 2
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
  },
  tb_item: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tb_item_header: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  tb_item_text: {
    fontWeight: '600',
  },
  tb_label: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
