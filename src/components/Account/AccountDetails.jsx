import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'

export default function AccountDetails({}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[styles.container, theme.bg2]}>
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 0
  }
})