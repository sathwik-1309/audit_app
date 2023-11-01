import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from '../Styles'
import ThemeContext from './Context/ThemeContext'
import SelectDropdown from 'react-native-select-dropdown'
import { MONTHS, YEARS } from '../config'
import ReloadIcon from '../../assets/icons/reload.png'

export default function MonthPicker({setMonth, setYear , onPress, year, month}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[styles.container, theme.bg2]}>
      
      <View style={[styles.flex_centered, {height: 25, width: 90, borderRadius: 4}]}><Text style={[theme.c3, {fontSize: 13, fontWeight: '500'}]}>Select Month</Text></View>
      <SelectDropdown
          data={MONTHS}
          onSelect={(selectedItem, index) => {
            setMonth(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem 
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          defaultButtonText='Month'
          buttonStyle={[styles.select_btn, theme.bg1]}
          buttonTextStyle={[styles.select_btn_text, theme.c3]}
          selectedRowStyle={theme.bg1}
          selectedRowTextStyle={theme.c3}
          showsVerticalScrollIndicator
          rowStyle={{height: 40}}
          rowTextStyle={{fontSize: 14, fontWeight: '600'}}
          defaultValue={month}
        />
      <SelectDropdown
          data={YEARS}
          onSelect={(selectedItem, index) => {
            setYear(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          defaultButtonText='Year'
          buttonStyle={[styles.select_btn, theme.bg1]}
          buttonTextStyle={[styles.select_btn_text, theme.c3]}
          selectedRowStyle={theme.bg1}
          selectedRowTextStyle={theme.c3}
          showsVerticalScrollIndicator
          rowStyle={{height: 40}}
          rowTextStyle={{fontSize: 14, fontWeight: '600'}}
          defaultValue={year}
        />
      <TouchableOpacity style={[styles.reload, {paddingRight: 10, alignItems: 'center'}]} onPress={onPress}><Image source={ReloadIcon} style={{width: 20, height: 20}}/></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20,
    paddingVertical: 6
  },
  flex_centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  select_btn: {
    width: 70,
    height: 25,
    borderRadius: 4,
    marginLeft: 8,
  },
  select_btn_text: {
    fontSize: 13,
    fontWeight: '500'
  },
  reload: {
    justifyContent: 'center',
    marginLeft: 10,
    padding: 6,
    height: 30,
  }
})