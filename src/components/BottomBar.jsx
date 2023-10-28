import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Styles } from '../Styles'
import Icon from './Icon'
import { useNavigation } from '@react-navigation/native'


function BottomBarItem({data}) {
  const theme = Styles.light
  const navigation = useNavigation()
  let icon
  switch(data){
    case 'Home':
      icon = 'home'
      break
    case 'Accounts':
      icon = 'wallet'
      break
    case 'Categories':
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
  return (
    <TouchableOpacity style={styles.BottomBarItem} onPress={()=>{navigation.navigate(data)}}>
      <Icon icon={icon}/>
      <Text style={[styles.text, theme.c3]}>{data}</Text>
    </TouchableOpacity>
  )
}

export default function BottomBar() {
  const theme = Styles.light
  return (
    <View style={[styles.BottomBar, theme.bg1]}>
      <BottomBarItem data='Home'/>
      <BottomBarItem data='Accounts'/>
      <BottomBarItem data='Cards'/>
      <BottomBarItem data='Categories'/>
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
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
  },
  BottomBarItem: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  }
})