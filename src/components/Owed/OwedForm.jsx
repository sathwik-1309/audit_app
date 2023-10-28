import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import OwedIcon from '../../../assets/icons/owed.png'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import axios from 'axios'
import { getAuthToken } from '../../util'

export default function OwedForm({reload, close}) {
  const theme = Styles.light
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  async function handleSubmit() {
    if (name == ''){
      setError("Enter Account Name")
      return
    }
    const payload = {
      name: name
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/accounts/create_owed?auth_token=${authToken}`
    try {
      const response = await axios.post(url, payload)
      console.log(response.status)
      console.log(response.data)
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
  return (
    <View>
      {
        error &&
        <Text style={styles.error}>{error}</Text>
      }
      <View style={styles.input_box}>
        <Image source={OwedIcon} style={{height: 25, width: 25}}/>
        <TextInput 
        placeholder="Party Name"
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