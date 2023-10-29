import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import RightArrow from '../../../assets/icons/right-arrow-next-color.png'
import CategoryIcon from '../../../assets/icons/category-color.png'
import { Styles } from '../../Styles'
import ThemeContext from '../Context/ThemeContext'

export default function CategoryBox({data}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const progress = 40
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={[theme.bg3, styles.account_box]}>
        <View style={[styles.details]}>
          <View style={styles.row1}>
            <Image source={CategoryIcon} style={{height: 25, width: 25}}/>
            <View style={{paddingLeft: 10}}><Text style={[styles.name, theme.c1]}>{data.name}</Text></View>
          </View>
          <View style={styles.row2}>
            <View style={styles.progress_bar}>
              <View style={[{width: progress, height: 20, backgroundColor: data.color}]}></View>
              <View style={[{width: 100-progress, height: 20, opacity: 0.5, backgroundColor: data.color}]}></View>
            </View>
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
    justifyContent: 'flex-start'
  },
  balance_label: {
    fontSize: 12,
    fontWeight: '400'
  },
  amount: {
    fontSize: 14,
    fontWeight: '700'
  },
  progress_bar: {
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden'
  }
})