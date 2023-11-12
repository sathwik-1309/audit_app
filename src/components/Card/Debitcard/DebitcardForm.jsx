import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import CardIcon from '../../../../assets/icons/card.png'
import Wallet from '../../../../assets/icons/wallet.png'
import { Styles } from '../../../Styles'
import { HOST_IP } from '../../../config'
import axios from 'axios'
import { getAuthToken } from '../../../util'
import ThemeContext from '../../Context/ThemeContext'

function OptionItem({data, select, selected}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  let text_color = selected && data.id == selected.id ? theme.c3 : theme.c1
  let bg_color = selected && data.id == selected.id ? theme.bg1 : theme.bg3
  return (
    <TouchableOpacity style={[styles.option_item, bg_color]} onPress={()=>{select(data)}}>
      <Text style={[styles.option_item_text, text_color]}>{data.name}</Text>
    </TouchableOpacity>
  )
}

export default function DebitcardForm({reload, close, accounts}) {
  const [account, setAccount] = useState(null)
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  
  async function handleSubmit() {
    if (name == ''){
      setError("Enter Card Name")
      return
    }
    if (account == null){
      setError("Select Account")
      return
    }
    
    const payload = {
      name: name,
      ctype: 'debitcard',
      account_id: account.id
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/cards/create?auth_token=${authToken}`
    try {
      const response = await axios.post(url, payload)
      if(response.status == 200){
        reload()
        setError('')
        close()
      }else if (response.status == 202){
        setError(response.data.message)
      }else {
        setError("Some other error")
      }
    }catch(error){
      setError(error)
    }
    
  }
  const selectAccount = (account) => {
    setAccount(account)
  }
  return (
    <View style={{flex: 1}}>
      {
        error &&
        <Text style={styles.error}>{error}</Text>
      }
      <View style={styles.input_box}>
        <Image source={CardIcon} style={{height: 25, width: 25}}/>
        <TextInput 
        placeholder="Card Name"
        placeholderTextColor={Styles.lightgray}
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.input_text}
        />
      </View>
      <View style={styles.input_box} onPress={()=>{setOptionOpen(!optionOpen)}}>
        <Image source={Wallet} style={{height: 25, width: 25}}/>
        <Text style={[{paddingLeft: 10}, theme.c3]}>{account ? account.name : 'Select Account'}</Text>
      </View>
      <ScrollView style={styles.options} contentContainerStyle={styles.optionsContent} horizontal>
          {
            accounts &&
            accounts.map((item)=>{
              return (<OptionItem data={item} key={item.id} selected={account} select={selectAccount}/>)
            })
          }
        </ScrollView>
      <View style={styles.button_row}>
        <TouchableOpacity style={[styles.button, theme.bg3]} onPress={handleSubmit}>
          <Text style={[styles.button_text, theme.c1]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input_box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  input_text: {
    width: 200,
    paddingLeft: 10,
    color: 'white'
  },
  rupee: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
  },
  rupee_text: {
    fontSize: 20,
  },
  button_row: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 35
  },
  button_text: {
    fontWeight: '700',
    fontSize: 14
  },
  error: {
    color: 'white'
  },
  option_item: {
    height: 35,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4
  },
  option_item_text: {
    fontWeight: '500'
  },
  options: {
    paddingVertical: 10
  },
  optionsContent: {
    padding: 2
  }
  
})