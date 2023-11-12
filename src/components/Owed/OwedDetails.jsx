import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import { getAuthToken } from '../../util'
import axios from 'axios'
import EditIcon from '../../../assets/icons/edit.png'
import CancelIcon from '../../../assets/icons/cancel.png'
import CommentsIcon from '../../../assets/icons/comments.png'
import { useNavigation } from '@react-navigation/native'
import DeleteIcon from '../../../assets/icons/delete.png'
import YesNoModal from '../YesNoModal'
import { TransactionBoxItem } from '../Transaction/TransactionBoxItem'

function TransactionBox({drag, party}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [selected, setselected] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken();
      const url = `${HOST_IP}/v1/users/home?auth_token=${authToken}`;
      const response = await axios.get(url)
      setData(response.data)
    }

    fetchData();
  }, [drag]);

  return (
    <View style={[styles.tb_container, theme.bg2]}>
      <View style={[styles.tb_header]}>
        <Text style={[styles.tb_header_text, theme.c3]}>SETTLEMENTS</Text>
      </View>
      <View style={styles.tb_body}>
        <TransactionBoxItem type='SETTLED BY PARTY' theme={theme} setselected={setselected} selected={selected} data={data} party={party}/>
        <TransactionBoxItem type='SETTLED BY YOU' theme={theme} setselected={setselected} selected={selected} data={data} party={party}/>
      </View>
    </View>
  )
}

export default function OwedDetails({id, acc_name, setHeader, drag}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(acc_name)
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(0)
  const [amount, setAmount] = useState(null)
  const [amount2, setAmount2] = useState(null)
  const [comments, setComments] = useState(null)
  const [comments2, setComments2] = useState(null)
  const navigation = useNavigation()
  const handleReload = () => {
    setReload(reload+1)
  }
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/accounts/${id}/owed_details?auth_token=${authToken}`
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

  const [isModalVisible, setModalVisible] = useState(false);

  async function handleYes () {
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/accounts/${id}/delete?auth_token=${authToken}`
    try{
      const response = await axios.delete(url)
      if (response.status != 200){
        console.log(response.data)
      }
      else{
        navigation.pop()
      }
    }catch(error){
      console.log(error)
    }
    setModalVisible(false)
  }

  const handleNo = () => {
    setModalVisible(false)
  }

  return (
    <View>
      <View style={[theme.bg1, styles.container]}>
        <View style={[theme.bg2, styles.header]}>
          <Text style={[theme.c3, styles.header_text]}>Party Details</Text>
          <TouchableOpacity onPress={()=>{setEdit(!edit)}} style={{alignItems: 'center', flex: 1}}><Image source={edit ? CancelIcon : EditIcon} style={{height: 15, width: 15}}/></TouchableOpacity>
        </View>
        <View style={[styles.body, theme.bg1]}>
          <View style={[styles.input_box]}>
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
          <View style={[styles.input_box]}>
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

      <TransactionBox party={id}/>
      
      <View style={{alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity style={[{height: 40, width: 100, flexDirection: 'row', alignItems: 'center', borderRadius: 6}, theme.bg1]} onPress={() => setModalVisible(true)}>
          <View style={{width: 40, alignItems: 'center'}}><Image source={DeleteIcon} style={{height: 20, width: 20}}/></View>
          <View style={{width: 60, justifyContent: 'center'}}><Text style={[theme.c3, {fontWeight: '500', fontSize: 13}]}>DELETE</Text></View>
        </TouchableOpacity>
        <YesNoModal
          isVisible={isModalVisible}
          onYes={handleYes}
          onNo={handleNo}
          message="Are you sure you want to delete the Account?"
        />
      </View>
      
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
  tb_container: {
    width: 260,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tb_header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  tb_header_text: {
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 15,
  },
  tb_body: {
    marginTop: 10,
    alignItems: 'center',
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
    fontSize: 14,
    color: Styles.lightgray
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
    width: 180,
    height: 38,
    paddingLeft: 5,
    color: 'white'
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