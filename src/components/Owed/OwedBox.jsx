import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RightArrow from '../../../assets/icons/right-arrow-next.png'
import OwedIcon from '../../../assets/icons/owed.png'
import { Styles } from '../../Styles'

export default function OwedBox({data}) {
  const theme = Styles.light
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={[theme.bg1, styles.account_box]}>
        <View style={[styles.details]}>
          <View style={styles.row1}>
            <Image source={OwedIcon} style={{height: 25, width: 25}}/>
            <View style={{paddingLeft: 10}}><Text style={[styles.name, theme.c3]}>{data.name}</Text></View>
          </View>
          <View style={styles.row2}>
            <Text style={styles.balance_label}>Balance <Text style={[styles.amount, theme.c3]}>₹ {data.balance}</Text></Text>
          </View>
        </View>
        <TouchableOpacity style={styles.arrow}><Image source={RightArrow} style={{height: 25, width: 25}}/></TouchableOpacity>
      </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  account_box: {
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 4
  },
  details: {
    width: 240
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
  }
})