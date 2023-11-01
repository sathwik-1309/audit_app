import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from '../../Styles'
import ThemeContext from '../Context/ThemeContext'


export default function TransactionBox2({data, index}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[theme.bg1, styles.box]}>
      <View style={{height: 30, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{paddingLeft: 10, width: 230}}><Text style={{fontSize: 12, fontWeight: '400'}}>{data.date}</Text></View>
        <View>
          {
            data.category && 
            <View style={[styles.category, {backgroundColor: data.category.color}]}><Text style={[{fontSize: 10, fontWeight: '700'}, theme.c3]}>{data.sub_category}</Text></View>
          }
        </View>
      </View>
      <View style={{height: 30, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingLeft: 20, width: 140}}><Text style={[theme.c3, {fontWeight: '700', fontSize: 15}]}>{data.signed_amount}</Text></View>
        <View><Text style={{fontSize: 11, fontWeight: '400'}}>Balance <Text style={[theme.c3, {fontSize: 12, fontWeight: '500'}]}>₹ {data.balance_after}</Text></Text></View>
        
      </View>
      <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
        <View style={{width: 250, paddingLeft: 20}}><Text style={[theme.c3, styles.comments_text]}>{data.comments}</Text></View>
        <View style={{width: 100, justifyContent: 'center'}}><Text style={{fontSize: 10, fontWeight: '500'}}>{data.ttype.toUpperCase()}</Text></View>
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 300,
    marginBottom: 5,
    borderRadius: 8
  },
  comment: {
    paddingLeft: 10,
    height: 20
  },
  comments_text: {
    fontSize: 13,
    fontWeight: '400'
  },
  category: {
    width: 60,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  opacity: {
    opacity: 0.9
  }
})