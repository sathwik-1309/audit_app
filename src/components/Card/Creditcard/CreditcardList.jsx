import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import CancelIcon from '../../../../assets/icons/cancel.png'
import AddIcon from '../../../../assets/icons/add.png'
import { Styles } from '../../../Styles'
import CreditcardBox from './CreditcardBox'
import CreditcardForm from './CreditcardForm'

export default function CreditcardList({data, reload, accounts}) {
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

  const theme = Styles.light
  return (
    <View style={[styles.container, theme.bg2]}>
      <View style={[styles.header]}>
        <View style={styles.header_col1}><Text style={[styles.header_text, theme.c3]}>CREDIT CARDS</Text></View>
        <TouchableOpacity style={styles.icon_container} onPress={handleForm}><Image source={iconSource} style={{height: 20, width: 20}}/></TouchableOpacity>
      </View>
      {
        openForm &&
        <CreditcardForm reload={reload} close={handleForm} accounts={accounts}/>
      }
      <View style={styles.body}>
        {
          data &&
          data.map((card)=>{
            return(<CreditcardBox data={card}/>)
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderRadius: 12,
    padding: 12,
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  header_text: {
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 15
  },
  header_col1: {
    width: 260
  },
  icon_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  body: {
    marginTop: 10
  }
})