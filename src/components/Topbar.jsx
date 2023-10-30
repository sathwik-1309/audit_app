import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from './Context/ThemeContext'
import { Styles } from '../Styles'
import { useNavigation } from '@react-navigation/native'

export default function Topbar({header}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const navigation = useNavigation()
  return (
    <View style={styles.topbar}>
      <Pressable style={{width: 40, justifyContent: 'center', height: 40}} onPress={()=>navigation.pop()}><Text style={{color: 'black'}}>BACK</Text></Pressable>
      <View style={styles.header}><Text style={styles.header_text}>{header}</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  topbar: {
    height: 50,
    elevation: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'black'
  },
  header: {
    flex: 1,
    paddingLeft: 100
  },
  header_text: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black'
  }
})