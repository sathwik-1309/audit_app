import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import RightArrow from '../../../assets/icons/right-arrow-next.png'
import Wallet from '../../../assets/icons/wallet.png'
import { Styles } from '../../Styles'
import ThemeContext from '../Context/ThemeContext'
import TransactionBox from '../Transaction/TransactionBox'
import { useNavigation } from '@react-navigation/native'

export default function AccountBox({data}) {
  console.log(data)
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation()
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[theme.bg1, styles.account_box]} onPress={()=>{setVisible(!visible)}}>
        <View style={[styles.details]}>
          <View style={styles.row1}>
            <Image source={Wallet} style={{height: 25, width: 25}}/>
            <View style={{paddingLeft: 10}}><Text style={[styles.name, theme.c3]}>{data && data.name}</Text></View>
          </View>
          <View style={styles.row2}>
            <Text style={[styles.balance_label, {color: Styles.lightgray}]}>Balance <Text style={[styles.amount, theme.c3]}>₹ {data && data.formatted_balance}</Text></Text>
          </View>
        </View>
        <TouchableOpacity style={styles.arrow} onPress={()=>navigation.navigate("Account", {id: data.id, name: data.name})}><Image source={RightArrow} style={{height: 25, width: 25}}/></TouchableOpacity>
      </TouchableOpacity>
      {
        visible &&
        <View style={[styles.transaction_boxes]}>
          <View style={[styles.t_label]}><Text style={[theme.c3, {fontWeight: '500'}]}>Last 5 Transactions</Text></View>
          {
            data.transactions.map((transaction, index)=>{
              return (<TransactionBox data={transaction} key={index} index={index}/>)
            })
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  account_box: {
    borderRadius: 10,
    flexDirection: 'row',
  },
  details: {
    width: 230,
  },
  arrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row1: {
    flexDirection: 'row',
    paddingLeft: 20,
    height: 40,
    alignItems: 'center'
  },
  name: {
    fontWeight: '600',
    fontSize: 15
  },
  row2: {
    height: 30,

    alignItems: 'center',

  },
  balance_label: {
    fontSize: 12,
    fontWeight: '400'
  },
  amount: {
    fontSize: 14,
    fontWeight: '700'
  },
  transaction_boxes: {
    padding: 10,
    borderRadius: 10
  },
  t_label: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 5
  }
})