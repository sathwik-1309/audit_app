import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from '../../Styles'
import ThemeContext from '../Context/ThemeContext'
import AccountIcon from '../../../assets/icons/wallet-image.png'
import CashIcon from '../../../assets/icons/dollar.png'
import CardIcon from '../../../assets/icons/card-image.png'
import PartyIcon from '../../../assets/icons/party-image.png'
import { useNavigation } from '@react-navigation/native'

export default function TransactionBox2({data, index}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const navigation = useNavigation()
  let icon
  switch (data.payment_symbol.symbol){
    case 'account':
      icon = AccountIcon
      break
    case 'cash':
      icon = CashIcon
      break
    case 'card':
      icon = CardIcon
      break
    case 'party':
      icon = PartyIcon
      break
  }
  return (
    <TouchableOpacity style={[theme.bg1, styles.box]} onPress={()=>navigation.navigate("Transaction", {data: data})}>
      <View style={{height: 30, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingLeft: 10, width: 230}}><Text style={{fontSize: 12, fontWeight: '500', color: Styles.lightgray}}>{data.date_text}</Text></View>
        <View style={{justifyContent: 'flex-end'}}>
          {
            data.category &&
            <View style={[styles.category, {backgroundColor: data.category.color}]}><Text style={[{fontSize: 10, fontWeight: '900'}, theme.c3]}>{data.sub_category}</Text></View>
          }
        </View>
      </View>
      <View style={{height: 30, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingLeft: 20, width: 140}}><Text style={[theme.c3, {fontWeight: '700', fontSize: 16}]}>{data.signed_amount}</Text></View>
        <View><Text style={{fontSize: 11, fontWeight: '400', color: Styles.lightgray}}>Balance <Text style={[theme.c3, {fontSize: 12, fontWeight: '500'}]}>₹ {data.balance_after ? data.balance_after : data.o_balance_after}</Text></Text></View>
        
      </View>
      <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
        <View style={{width: 220, paddingLeft: 20}}><Text style={[theme.c3, styles.comments_text]}>{data.comments}</Text></View>
        <View style={{width: 15, height: 30, justifyContent: 'center'}}><Image style={{width: 15, height: 15}} source={icon}/></View>
        <View style={{width: 65, justifyContent: 'center', paddingLeft: 4}}><Text style={[{fontSize: 9, fontWeight: '500'}, theme.c3]}>{data.payment_symbol.name}</Text></View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 300,
    marginBottom: 1,
  },
  comment: {
    paddingLeft: 10,
    height: 20
  },
  comments_text: {
    fontSize: 12,
    fontWeight: '400'
  },
  category: {
    width: 60,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  opacity: {
    opacity: 0.9
  }
})