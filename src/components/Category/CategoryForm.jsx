import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import CategoryIcon from '../../../assets/icons/category.png'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import axios from 'axios'
import SelectDropdown from 'react-native-select-dropdown'
import SubCatIcon from '../../../assets/icons/sub-category.png'

export default function CategoryForm({reload, close, categories}) {
  const theme = Styles.light
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [newCat, setNewCat] = useState(true)
  const [category, setCategory] = useState(null)
  const authToken = 'RU1DXY3JdugqBy3yoWzy'
  async function handleSubmit() {
    if (name == ''){
      setError("Enter Category Name")
      return
    }
    let payload = {
      name: name
    }
    if (!newCat) {
      if (category == null){
        setError("Select an Existing Category")
      return
      }
      payload.category_id = category.id
    }else {
      payload.force = true
    }
    
    const url = `${HOST_IP}/sub_categories/create?auth_token=${authToken}`
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
  return (
    <View>
      {
        error &&
        <Text style={styles.error}>{error}</Text>
      }
      <View style={styles.btn_row2}>
        <Pressable style={[styles.btn2, newCat ? theme.bg3 : theme.bg1]} onPress={()=>setNewCat(true)}><Text style={[styles.btn2_text, newCat ? theme.c1 : theme.c3]}>Category</Text></Pressable>
        <Pressable style={[styles.btn2, newCat ? theme.bg1 : theme.bg3]} onPress={()=>setNewCat(false)}><Text style={[styles.btn2_text, newCat ? theme.c3 : theme.c1]}>Subcategory</Text></Pressable>
      </View>
      {
        !newCat &&
        <View style={[styles.input_box_select_option]}>
        <Image source={CategoryIcon} style={styles.img_style}/>
        <SelectDropdown
          data={categories}
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
      }
      <View style={styles.input_box}>
        <Image source={newCat ? CategoryIcon : SubCatIcon} style={{height: 25, width: 25}}/>
        <TextInput 
        placeholder={`${newCat ? 'Category' : 'Subcategory'} Name`}
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
  },
  btn_row2: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  btn2: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  btn2_text: {
    fontWeight: '500',
    fontSize: 12
  },
  input_box_select_option: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    borderRadius: 15,
    marginVertical: 3
  },
  select_btn: {
    borderRadius: 8,
    height: 30,
    width: 140
  },
  img_style: {
    height: 25,
    width: 25,
  },
  select_btn_text: {
    fontWeight: '500',
    fontSize: 15
  },
  
})