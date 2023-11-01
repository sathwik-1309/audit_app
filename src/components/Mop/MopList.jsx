import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AddIcon from '../../../assets/icons/add.png'
import CancelIcon from '../../../assets/icons/cancel.png'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'
import MopForm from './MopForm'

function MopBox({mop}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return(
  <View style={[styles.mop_item, theme.bg1]}>
    <Text style={[theme.c3, {fontWeight: '500'}]}>{mop.name}</Text>
  </View>
  )
}

export default function MopList({data, account_id, reload}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [openForm, setOpenForm] = useState(false)
  const [iconSource, seticonSource] = useState(AddIcon)
  const handleForm = () => {
    setOpenForm(!openForm)
    if (iconSource == AddIcon) {
      seticonSource(CancelIcon)
    }else {
      seticonSource(AddIcon)
    }
  }
  const handleClose = () => {
    setOpenForm(false)
    seticonSource(AddIcon)
  }
  return (
    <View style={[styles.container, theme.bg1]}>
      <View style={[styles.header, theme.bg2]}>
        <View style={{width: 240, paddingLeft: 10}}><Text style={[theme.c3, styles.header_text]}>Mode of Payments</Text></View>
        <TouchableOpacity style={{width: 60, alignItems: 'center'}} onPress={handleForm}><Image source={iconSource} style={{width: 20, height: 20}}/></TouchableOpacity>
      </View>
      {
        openForm &&
        <MopForm account_id={account_id} reload={reload} close={handleClose}/>
      }
      {
        data.length > 0 ?
        data.map((mop, index)=>{
          return(<MopBox mop={mop} key={index}/>)
        }) :
        <View style={[theme.bg1, {height: 40, paddingLeft: 20, justifyContent: 'center'}]}><Text style={theme.c3}>None</Text></View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  header_text: {
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 10
  },
  mop_item: {
    height: 40,
    paddingLeft: 20,
    justifyContent: 'center'
  }
})