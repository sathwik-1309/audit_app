import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from './Context/ThemeContext'
import { Styles } from '../Styles'

function NavigationBarItem({page, cur_page, setPage}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <TouchableOpacity style={[styles.navigation_bar_item, page.name == cur_page.name ? theme.bg1 : theme.bg2]} onPress={()=>{setPage(page)}}>
      <Text style={[styles.item_text, theme.c3]}>{page.name}</Text>
    </TouchableOpacity>
  )
}

export default function NavigationBar({pages, cur_page, setPage}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <ScrollView horizontal style={{marginHorizontal: 5}}>
    <View style={[styles.navigation_bar, theme.bg2]}>
      {
        pages.map((page, index)=>{
          // return(<Text>{page.name}</Text>)
          return(<NavigationBarItem page={page} key={index} cur_page={cur_page} setPage={setPage}/>)
        })
      }
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  navigation_bar: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  navigation_bar_item: {
    borderRadius: 4,
    width: 85 ,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
  },
  item_text: {
    fontWeight: '500',
    fontSize: 13
  }
})