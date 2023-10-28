import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Styles } from '../../Styles'
function DetailBoxItem({data}) {
  const theme = Styles.light
  return(
    <View style={[styles.detail_box_item, theme.bg3]}>
      <View style={{backgroundColor: data.color, width: 35, height: 35, borderRadius: 6}}></View>
      <View style={styles.percentage}><Text style={[styles.percentage_text, theme.c1]}>{data.percentage} <Text style={{fontWeight: '500', fontSize: 12}}>%</Text></Text></View>
      <View style={styles.category}><Text style={[styles.catgeory_text, theme.c1]}>{data.category}</Text></View>
      <View style={styles.category}><Text style={[styles.expenditure_text, theme.c1]}>₹ {data.expenditure}</Text></View>
    </View>
  )
}

export default function DetailBox({data}) {
  const theme = Styles.light
  return (
    <View style={[styles.detail_box, theme.bg2]}>
      <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
        <View style={{width: 45, alignItems: 'center'}}><Text style={[styles.percentage_text, theme.c3]}>Color</Text></View>
        <View style={{width: 45, alignItems: 'center'}}><Text style={[styles.percentage_text, theme.c3]}>%</Text></View>
        <View style={{width: 65, alignItems: 'center'}}><Text style={[styles.percentage_text, theme.c3]}>Category</Text></View>
        <View style={{width: 80, alignItems: 'center'}}><Text style={[styles.percentage_text, theme.c3]}>Spent</Text></View>
      </View>
      {
        data.map((item, index)=>{
          return(<DetailBoxItem data={item} key={index}/>)
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  detail_box: {
    padding: 10,
    borderRadius: 8
  },
  detail_box_item: {
    flexDirection: 'row',
    height: 45,
    marginVertical: 3,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8
  },
  category: {
    width: 65,
    justifyContent: 'center',
    alignItems: 'center'
  },
  catgeory_text: {
    fontSize: 14,
    fontWeight: '500'
  },
  percentage: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  percentage_text: {
    fontSize: 14,
    fontWeight: '700'
  },
  expenditure_text: {
    fontSize: 14,
    fontWeight: '700'
  }
})