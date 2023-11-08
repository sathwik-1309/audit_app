import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Topbar from '../components/Topbar'

export default function TransactionScreen({route}) {
  const { data } = route.params
  console.log(data)
  return (
    <View>
      <Topbar header='Transaction'/>
      <View>
        <Text style={{color: 'black'}}>Yet to be done</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})