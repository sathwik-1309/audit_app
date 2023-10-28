import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.login_box}>
        <View>
          <TextInput 
          placeholder="Enter Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input_text}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#34495e'
  },
  login_box: {
    backgroundColor: '#2c3e50',
    padding: 10
  }
})