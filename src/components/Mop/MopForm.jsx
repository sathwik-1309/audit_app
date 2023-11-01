import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Styles } from '../../Styles'
import ThemeContext from '../Context/ThemeContext'
import PaymentIcon from '../../../assets/icons/payment.png'
import { getAuthToken } from '../../util'
import axios from 'axios'
import { HOST_IP } from '../../config'

export default function MopForm({account_id, reload, close}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  async function handleSubmit () {
    if (name == ''){
      setError("Enter Account Name")
      return
    }
    const payload = {
      name: name,
      account_id: account_id
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/mops/create?auth_token=${authToken}`
    try {
      const response = await axios.post(url, payload)
      if(response.status == 200){
        close()
        reload()
        setError('')
      }else if (response.status == 202){
        setError(response.data.message)
      }else {
        setError("Some other error")
      }
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <View style={styles.container}>
      {
        error &&
        <Text style={styles.error}>{error}</Text>
      }
      <View style={styles.input_box}>
        <Image source={PaymentIcon} style={{height: 25, width: 25}}/>
        <TextInput 
        placeholder="Mode of Payment"
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.input_text}
        />
      </View>
      <View style={styles.button_row}>
        <TouchableOpacity style={[styles.button, theme.bg3]} onPress={handleSubmit}>
          <Text style={[styles.button_text, theme.c1]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10
  },
  input_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_text: {
    width: 200,
    paddingLeft: 10
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
  }
})