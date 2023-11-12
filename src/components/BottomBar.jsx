import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Styles } from '../Styles'
import Icon from './Icon'
import { useNavigation } from '@react-navigation/native'
import ThemeContext from './Context/ThemeContext'


function BottomBarItem({data}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const navigation = useNavigation()
  let icon
  switch(data){
    case 'Home':
      icon = 'home'
      break
    case 'Accounts':
      icon = 'wallet'
      break
    case 'Category':
      icon = 'category'
      break
    case 'Cards':
      icon = 'card'
      break
    case 'Settings':
      icon = 'settings'
      break
    case 'Owed':
      icon = 'owed'
      break
  }
  const navigate_to = data == 'Category' ? 'Categories' : data
  return (
    <TouchableOpacity style={styles.BottomBarItem} onPress={()=>{navigation.navigate(navigate_to)}}>
      <Icon icon={icon}/>
      <Text style={[styles.text, theme.c3]}>{data}</Text>
    </TouchableOpacity>
  )
}

export default function BottomBar() {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[styles.BottomBar, theme.bg1]}>
      <BottomBarItem data='Home'/>
      <BottomBarItem data='Accounts'/>
      <BottomBarItem data='Cards'/>
      <BottomBarItem data='Category'/>
      <BottomBarItem data='Settings'/>
    </View>
  )
}

const styles = StyleSheet.create({
  BottomBar: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  BottomBarItem: {
    height: 50,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  }
})