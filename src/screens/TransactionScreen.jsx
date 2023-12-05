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
import SelectDropdown from 'react-native-select-dropdown'

function TsItem({label, value}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[styles.ts_item]}>
      <View style={[styles.ts_label, theme.bg1]}><Text style={[theme.c3, styles.label_text]}>{label}</Text></View>
      <View style={[styles.ts_value, theme.bg2]}><Text style={[theme.c3, styles.value_text]}>{value}</Text></View>
    </View>
  )
}

export default function TransactionScreen({route}) {
  const { data, colors } = route.params
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  const [edit, setEdit] = useState(false)
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  const [data2, setData2] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/categories/index?auth_token=${authToken}`
      const response = await axios.get(url)
      setData2(response.data)
    }

    fetchData()
  }, [])

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
  
  async function handleSave () {
    if (category == null){
      setError("Select a Category")
      return
    }
    if (subCategory == null) {
      setError("Select a Sub Category")
      return
    }
    const payload = {
      category_id: category.id,
      sub_category_id: subCategory.id
    }
    try{
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/transactions/${data.id}/update?auth_token=${authToken}`
      const response = await axios.put(url, payload)
      if (response.status == 200){
        setError('')
        setEdit(false)
      }else{
        console.log(response.data.message)
      }
    }catch(e){
      console.log(e.message)
    }
  }
  return (
    <SafeAreaView>
    <View style={[]}>
      <Topbar header='Transaction'/>
      <View style={[styles.details]}>
        <TouchableOpacity style={{alignItems: 'center', height: 30}} onPress={()=>{setEdit(!edit)}}><Text style={[theme.c1, {fontSize: 14, fontWeight: '600'}]}>EDIT</Text></TouchableOpacity>
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
          error != '' &&
          <View>
            <Text style={{color: 'red', fontWeight: '500'}}>{error}</Text>
          </View>
        }
        {
          data.category &&
          <>
          {
            edit ? 
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{width: 120, justifyContent: 'center'}}><Text style={[theme.c2, styles.label_text]}>Category</Text></View>
              <SelectDropdown
                data={data2.categories}
                onSelect={(selectedItem, index) => {
                  setCategory(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                  return item.name
                }}
                defaultButtonText='Select Category'
                buttonStyle={[styles.select_btn, theme.bg2]}
                buttonTextStyle={[styles.select_btn_text, theme.c3]}
                selectedRowStyle={theme.bg1}
                selectedRowTextStyle={theme.c3}
                showsVerticalScrollIndicator
                rowStyle={{height: 50}}
                rowTextStyle={{fontSize: 14, fontWeight: '600'}}
              />
            </View>   
             :
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{width: 120, justifyContent: 'center'}}><Text style={[theme.c2, styles.label_text]}>Category</Text></View>
              <TouchableOpacity style={[{backgroundColor: data.category.color}, styles.category]} onPress={()=>navigation.navigate("Category", {id: data.category.category_id, name: data.category.category})}>
                <Text style={[theme.c3, styles.category_text]}>{data.category.category}</Text>
              </TouchableOpacity>
            </View>             
          }
          </>
          
        }
        {
          data.category &&
          <>
          {
            edit ?
            <>
            {
              category && 
              <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{width: 120, justifyContent: 'center'}}><Text style={[theme.c2, styles.label_text]}>Sub Category</Text></View>
              <SelectDropdown
                data={category.sub_categories}
                onSelect={(selectedItem, index) => {
                  setSubCategory(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                  return item.name
                }}
                defaultButtonText='Select Sub Category'
                buttonStyle={[styles.select_btn, theme.bg2]}
                buttonTextStyle={[styles.select_btn_text, theme.c3]}
                selectedRowStyle={theme.bg1}
                selectedRowTextStyle={theme.c3}
                showsVerticalScrollIndicator
                rowStyle={{height: 50}}
                rowTextStyle={{fontSize: 14, fontWeight: '600'}}
              />
            </View>
            }
            </>
            :
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <View style={{width: 120, justifyContent: 'center'}}><Text style={[theme.c2, styles.label_text]}>Sub Category</Text></View>
              <TouchableOpacity style={[{backgroundColor: data.category.color}, styles.category]} onPress={()=>navigation.navigate("Subcategory", {id: data.category.id, name: data.category.sub_category})}>
                <Text style={[theme.c3, styles.category_text]}>{data.category.sub_category}</Text>
              </TouchableOpacity>
            </View>
          }
          </>
        }
        {
          edit &&
          <View style={{alignItems: 'center', marginBottom: 10}}>
          <TouchableOpacity style={[styles.save_btn, theme.bg1]} onPress={handleSave}>
            <Text style={[styles.save_text, theme.c3]}>SAVE</Text>
          </TouchableOpacity>
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
    fontSize: 13,
    fontWeight: '500'
  },
  label_text: {
    fontSize: 13,
    fontWeight: '600'
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
  },
  ts_item: {
    flexDirection: 'row', 
    height: 50, 
    alignItems: 'center', 
    marginVertical: 1, 
    borderRadius: 4, 
    overflow: 'hidden'
  },
  ts_label: {
    width: 100, 
    height: 50, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  ts_value: {
    width: 220, 
    height: 50, 
    paddingLeft: 10, 
    justifyContent: 'center', 
    borderTopRightRadius: 4, 
    borderBottomRightRadius: 4
  },
  save_btn: {
    marginTop: 10,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: 100
  },
  save_text: {
    fontWeight: '600',
    fontSize: 15
  },
})