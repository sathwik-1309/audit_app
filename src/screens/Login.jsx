import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useContext, useState} from 'react'
import { Styles } from '../Styles'
import { HOST_IP } from '../config'
import { useNavigation } from '@react-navigation/native'
import { saveAuthToken, getAuthToken } from '../util'
import axios from 'axios'
import ThemeContext from '../components/Context/ThemeContext'

export default function Login() {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  console.log(themeColor)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigation = useNavigation()
  async function handleLogin() {
    console.log(email=='')
    if (email=='') {
      console.log('email')
      setError("Please enter Email")
      return
    }
    console.log(password)
    if (password=='') {
      console.log('password')
      setError("Please enter Password")
      return
    }
    const url = `${HOST_IP}/users/check?email=${email}&password=${password}`
    
    try{
      const response = await axios.get(url)
      if(response.status == 200){
        setError('')
        saveAuthToken(response.data.auth_token)
        navigation.navigate("Home")
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
    <SafeAreaView style={styles.page}>
      <View style={styles.login_box}>
        <View style={styles.label}><Text style={[theme.c3, styles.lable_text]}>LOGIN</Text></View>
        <Text style={{color: 'red', fontWeight: '600'}}>{error}</Text>
        <View style={styles.input_box}>
          <TextInput 
          placeholder="Enter Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input_text}
          />
        </View>
        <View style={styles.input_box}>
          <TextInput 
          placeholder="Enter Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.input_text}
          secureTextEntry={true}
          />
        </View>
        <View style={[styles.flex_center, {marginTop: 20}]}>
          <TouchableOpacity style={[styles.btn, theme.bg3, styles.flex_center]} onPress={handleLogin}>
            <Text style={styles.btn_text}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text>Dont have an account?</Text>
          <Pressable onPress={()=>navigation.navigate('Signup')}><Text style={{color: 'lightblue'}}>Sign up</Text></Pressable>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login_box: {
    backgroundColor: '#2c3e50',
    padding: 30,
    borderRadius: 10
  },
  input_box: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 5,
    borderRadius: 10
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  lable_text: {
    fontSize: 16,
    fontWeight: '700'
  },
  flex_center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    height :40,
    borderRadius: 8,
    width: 80
  },
  btn_text: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '600'
  },
  input_text: {
    paddingLeft: 10
  }
})