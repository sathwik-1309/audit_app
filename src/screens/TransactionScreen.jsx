import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Topbar from '../components/Topbar'
import ThemeContext from '../components/Context/ThemeContext'
import { Styles } from '../Styles'
import YesNoModal from '../components/YesNoModal'
import DeleteIcon from '../../assets/icons/delete.png'
import { getAuthToken } from '../util'
import { HOST_IP } from '../config'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

function TsItem({label, value}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={{flexDirection: 'row', height: 40, alignItems: 'center', marginVertical: 7}}>
      <View style={{width: 90}}><Text style={[theme.c2, styles.label_text]}>{label}</Text></View>
      <View><Text style={[theme.c1, styles.value_text]}>{value}</Text></View>
    </View>
  )
}

export default function TransactionScreen({route}) {
  const { data } = route.params
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  async function handleYes () {
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/transactions/${data.id}/delete?auth_token=${authToken}`
    try{
      const response = await axios.delete(url)
      if (response.status != 200){
        console.log(response.data)
      }
      else{
        navigation.pop()
        console.log('hello yws')
      }
    }catch(error){
      console.log(error)
    }
    setModalVisible(false)
  }

  const handleNo = () => {
    setModalVisible(false)
  }
  console.log(data)
  return (
    <SafeAreaView>
    <View style={[]}>
      <Topbar header='Transaction'/>
      <View style={[styles.details]}>
        <TsItem label='Date' value={data.date}/>
        <TsItem label='Amount' value={`${data.signed_amount}`}/>
        <TsItem label='Type' value={data.ttype}/>
        {
          data.balance_before != null &&
          <>
          <TsItem label='Balance Before' value={`₹ ${data.balance_before}`}/>
          <TsItem label='Balance After' value={`₹ ${data.balance_after}`}/>
          </>
        }
        {
          data.o_balance_before != null &&
          <>
          <TsItem label='Balance Before' value={`₹ ${data.o_balance_before}`}/>
          <TsItem label='Balance After' value={`₹ ${data.o_balance_after}`}/>
          </>
        }
        
        <TsItem label='Method' value={data.payment_symbol.symbol.toUpperCase()}/>
        {
          data.payment_symbol.symbol != 'cash' &&
          <TsItem label='Name' value={data.payment_symbol.name}/>
        }
        <TsItem label='Comments' value={data.comments}/>
        {
          data.category &&
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <View style={{width: 90, justifyContent: 'center'}}><Text style={[theme.c2, styles.label_text]}>Category</Text></View>
            <View style={[{backgroundColor: data.category.color}, styles.category]}>
              <Text style={[theme.c3, styles.category_text]}>{data.category.category}</Text>
            </View>
          </View>
        }
        {
          data.category &&
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <View style={{width: 90, justifyContent: 'center'}}><Text style={[theme.c2, styles.label_text]}>Sub Category</Text></View>
            <View style={[{backgroundColor: data.category.color}, styles.category]}>
              <Text style={[theme.c3, styles.category_text]}>{data.category.sub_category}</Text>
            </View>
          </View>
        }

        <View style={{alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity style={[{height: 40, width: 100, flexDirection: 'row', alignItems: 'center', borderRadius: 6}, theme.bg1]} onPress={() => setModalVisible(true)}>
            <View style={{width: 40, alignItems: 'center'}}><Image source={DeleteIcon} style={{height: 20, width: 20}}/></View>
            <View style={{width: 60, justifyContent: 'center'}}><Text style={[theme.c3, {fontWeight: '500', fontSize: 13}]}>DELETE</Text></View>
          </TouchableOpacity>
          <YesNoModal
            isVisible={isModalVisible}
            onYes={handleYes}
            onNo={handleNo}
            message="Are you sure you want to delete the Transaction?"
          />
        </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  details: {
    marginVertical: 20,
    marginLeft: 40
  },
  value_text :{
    fontSize: 15,
    fontWeight: '500'
  },
  label_text: {
    fontSize: 15,
    fontWeight: '700'
  },
  category: {
    width: 100,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  category_text: {
    fontSize: 15,
    fontWeight: '700'
  }
})