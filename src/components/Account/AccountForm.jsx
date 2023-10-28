import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Wallet from '../../../assets/icons/wallet.png'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import axios from 'axios'
import { getAuthToken } from '../../util'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AccountForm({reload, close}) {
  const theme = Styles.light
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [error, setError] = useState('')
 
  async function handleSubmit() {
    if (name == ''){
      setError("Enter Account Name")
      return
    }
    if (balance == '') {
      setError("Enter Opening Balance")
      return
    }


    const payload = {
      name: name,
      balance: balance
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/accounts/create?auth_token=${authToken}`
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
      setError(error)
    }
    
  }
  return (
    <View>
      {
        error &&
        <Text style={styles.error}>{error}</Text>
      }
      <View style={styles.input_box}>
        <Image source={Wallet} style={{height: 25, width: 25}}/>
        <TextInput 
        placeholder="Account Name"
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.input_text}
        />
      </View>
      <View style={styles.input_box}>
        <View style={styles.rupee}><Text style={[styles.rupee_text, theme.c3]}>₹</Text></View>
        <TextInput 
        placeholder="Opening Balance"
        value={balance}
        keyboardType="numeric"
        onChangeText={(balance) => setBalance(balance)}
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
  input_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_text: {
    width: 200,
    paddingLeft: 10
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
  }
  
})