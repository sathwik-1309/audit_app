import { SafeAreaView, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import DebitcardList from '../components/Card/Debitcard/DebitcardList'
import { HOST_IP } from '../config'
import CreditcardList from '../components/Card/Creditcard/CreditcardList'

export default function Cards() {
  const [data, setData] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [reload, setReload] = useState(false)
  const authToken = 'RU1DXY3JdugqBy3yoWzy'
  const url = `${HOST_IP}/cards/index?auth_token=${authToken}`
  const url2 = `${HOST_IP}/accounts/index?auth_token=${authToken}`
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData)
    setData(jsonData);
    const response2 = await fetch(url2);
    const jsonData2 = await response2.json();
    setAccounts(jsonData2)
    };

    fetchData();
  }, [reload, authToken]);

  const handleReload = () => {
    setReload(reload+1)
  }
  const theme = Styles.light
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <ScrollView>
        <View style={[styles.home]}>
          
          {
            data &&
            <>
            <DebitcardList data={data.debitcard} reload={handleReload} accounts={accounts}/>
            <CreditcardList data={data.creditcard} reload={handleReload} />
            </>
          }
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