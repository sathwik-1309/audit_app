import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
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

function TransactionBoxItem({ type, theme, selected, setselected, accounts, categories, parties }) {
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
      form = <DebitForm accounts={accounts} categories={categories} close={setselected} />;
      break;
    case 'CREDIT':
      form = <CreditForm accounts={accounts} close={setselected} />;
      break;
    case 'PAID BY PARTY':
      form = <PaidByPartyForm parties={parties} close={setselected} categories={categories} />;
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

function TransactionBox({ theme, reload }) {
  const [selected, setselected] = useState('');
  const [accounts, setAccounts] = useState(null);
  const [parties, setParties] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await getAuthToken();
        const url = `${HOST_IP}/accounts/index?auth_token=${authToken}`;
        const url2 = `${HOST_IP}/sub_categories/index?auth_token=${authToken}`;
        const url3 = `${HOST_IP}/accounts/index_owed?auth_token=${authToken}`;
        
        const [response, response2, response3] = await Promise.all([
          fetch(url),
          fetch(url2),
          fetch(url3),
        ]);
        
        const [jsonData, jsonData2, jsonData3] = await Promise.all([
          response.json(),
          response2.json(),
          response3.json(),
        ]);
        
        setAccounts(jsonData);
        setCategories(jsonData2);
        setParties(jsonData3);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reload]);

  return (
    <View style={[styles.container, theme.bg2]}>
      <View style={[styles.header]}>
        <Text style={[styles.header_text, theme.c3]}>ADD TRANSACTIONS</Text>
      </View>
      <View style={styles.body}>
        <TransactionBoxItem type='DEBIT' theme={theme} setselected={setselected} selected={selected} accounts={accounts} categories={categories} parties={parties} />
        <TransactionBoxItem type='CREDIT' theme={theme} setselected={setselected} selected={selected} accounts={accounts} parties={parties} />
        <TransactionBoxItem type='PAID BY PARTY' theme={theme} setselected={setselected} selected={selected} parties={parties} categories={categories} />
      </View>
    </View>
  );
}

export default function Home() {
  const theme = Styles.light;
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(0)
  
  const onRefresh = () => {
    setRefreshing(true);
    setReload(reload+1)
    setRefreshing(false);
  };

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
          <TransactionBox theme={theme} reload={reload}/>
          <HomePie reload={reload}/>
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
