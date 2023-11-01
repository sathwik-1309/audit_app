import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import { getAuthToken } from '../../util'
import axios from 'axios'
import EditIcon from '../../../assets/icons/edit.png'
import CancelIcon from '../../../assets/icons/cancel.png'
import MopList from '../Mop/MopList'

export default function AccountDetails({id, acc_name, setHeader, drag}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(acc_name)
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(0)
  const handleReload = () => {
    setReload(reload+1)
  }
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/accounts/${id}/details?auth_token=${authToken}`
      const response = await axios.get(url)
      setData(response.data)
    };

    fetchData()
  }, [reload, drag])
  const handleSave = async () => {
    const payload = {
      name: name
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/accounts/${id}/update?auth_token=${authToken}`
    try{
      const response = await axios.put(url, payload)
      if (response.status != 200){
        console.log(response.data)
      }
      else{
        setEdit(false)
        setHeader(name)
      }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <View>
      <View style={[theme.bg1, styles.container]}>
        <View style={[theme.bg2, styles.header]}>
          <Text style={[theme.c3, styles.header_text]}>Account Details</Text>
          <TouchableOpacity onPress={()=>{setEdit(!edit)}} style={{alignItems: 'center', flex: 1}}><Image source={edit ? CancelIcon : EditIcon} style={{height: 15, width: 15}}/></TouchableOpacity>
        </View>
        <View style={[styles.body]}>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Name</Text></View>
            {
              edit ? 
              <TextInput 
                value={name}
                style={styles.edit_border}
                onChangeText={(name) => setName(name)}
              /> :
              <Text style={[styles.value, theme.c3]}>{name}</Text>
            }
            
          </View>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Balance</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data && data.details.balance}</Text>
          </View>
            {
              edit &&
              <View style={{alignItems: 'center', marginBottom: 10}}>
              <TouchableOpacity style={[styles.save_btn, theme.bg3]} onPress={handleSave}>
                <Text style={[styles.save_text, theme.c1]}>SAVE</Text>
              </TouchableOpacity>
              </View>
            }
          
        </View>
      </View>
      <View style={[theme.bg1, styles.container]}>
        <View style={[theme.bg2, styles.header]}>
          <Text style={[theme.c3, styles.header_text]}>Stats</Text>
        </View>
        <View style={[styles.body]}>
          <View style={[styles.input_box]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Income</Text></View>
              <Text style={[styles.value, theme.c3]}>₹ {data && data.stats.credit}</Text>
          </View>
          <View style={[styles.input_box]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Spent</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data && data.stats.debit}</Text>
          </View>
          <View style={[styles.input_box]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Net</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data && data.stats.net}</Text>
          </View>
        </View>
        
      </View>
      {
        data &&
        <MopList data={data.mops} account_id={id} reload={handleReload}/>
      }
      
    </View>

    
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 260,
    marginBottom: 30
  },
  header: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10
  },
  body: {
  },
  header_text: {
    fontSize: 14,
    fontWeight: '600',
    width: 200,
    paddingLeft: 10
  },
  input_box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 5,
    borderRadius: 6
  },
  label: {
    fontWeight: '600',
    fontSize: 14
  },
  value: {
    paddingLeft: 6,
    fontWeight: '700'
  },
  text_input: {

  },
  edit_border: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'white',
    width: 180
  },
  save_btn: {
    paddingHorizontal: 15,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: 80
  },
  save_text: {
    fontWeight: '600',
    fontSize: 13
  }
})