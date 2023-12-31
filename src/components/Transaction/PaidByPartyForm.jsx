import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Styles } from '../../Styles'
import SelectDropdown from 'react-native-select-dropdown'
import PartyColor from '../../../assets/icons/owed-color.png'
import CategoryColor from '../../../assets/icons/category-color.png'
import CommentsColor from '../../../assets/icons/comments-color.png'
import DateColor from '../../../assets/icons/calendar-color.png'
import DatePicker from 'react-native-date-picker'
import { HOST_IP } from '../../config'
import axios from 'axios'
import { getAuthToken } from '../../util'
import ThemeContext from '../Context/ThemeContext'
import ColorIcon from '../ColorIcon'

export default function PaidByPartyForm({ close, reload, data}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [amount, setAmount] = useState('')
  const [party, setParty] = useState(null)
  const [category, setCategory] = useState(null)
  const [comments, setComments] = useState('')
  const [date, setDate] = useState(new Date())
  const [openDate, setOpenDate] = useState(false)
  const [error, setError] = useState('')
  const gray = {
    color: Styles.gray
  }

  async function handleCreate() {
    if (amount=='') {
      setError("Enter Amount")
      return
    }
    if (party==null) {
      setError("Select Party")
      return
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/transactions/paid_by_party?auth_token=${authToken}`
    let payload = {
      amount: amount,
      party: party.id,
      date: date
    }
    if (category!=null) payload.sub_category_id = category.id
    if (comments!='') payload.comments = comments
    try {
      const response = await axios.post(url, payload)
      if(response.status == 200){
        setError('')
        close('')
        reload()
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
    <Pressable style={[styles.container, theme.bg3]}>
      {
        error != '' &&
        <Text style={{color: 'red', fontWeight: '500'}}>{error}</Text>
      }
      <View style={[styles.input_box, styles.border_width, amount=='' ? {borderColor: theme.c1.color} : {borderColor: 'white'}]}>
        <View style={styles.rupee}><Text style={[styles.rupee_text, theme.c1]}>₹</Text></View>
        <TextInput 
        placeholder="   Amount"
        placeholderTextColor='gray'
        value={amount}
        keyboardType="numeric"
        onChangeText={(amount) => setAmount(amount)}
        style={[styles.input_text, theme.c1, styles.bold]}
        />  
      </View>
      <View style={[styles.input_box_select_option, styles.border_width, party==null ? {borderColor: theme.c1.color} : {borderColor: 'white'}]}>
        <ColorIcon icon='user' style={styles.img_style}/>
        <SelectDropdown
          data={data.parties}
          onSelect={(selectedItem, index) => {
            setParty(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name
          }}
          rowTextForSelection={(item, index) => {
            return item.name
          }}
          defaultButtonText='Select Party       '
          buttonStyle={[styles.select_btn, theme.bg3]}
          buttonTextStyle={[styles.select_btn_text, party ? theme.c1 : gray]}
          selectedRowStyle={theme.bg1}
          selectedRowTextStyle={theme.c3}
          showsVerticalScrollIndicator
          rowStyle={{height: 50}}
          rowTextStyle={{fontSize: 14, fontWeight: '600'}}
        />
      </View>
      <View style={[styles.input_box_select_option, category==null ? theme.b_red : theme.b_green]}>
        <ColorIcon icon='category' style={styles.img_style}/>
        <SelectDropdown
          data={data.sub_categories}
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
          buttonStyle={[styles.select_btn, theme.bg3]}
          buttonTextStyle={[styles.select_btn_text, category ? theme.c1 : gray]}
          selectedRowStyle={theme.bg1}
          selectedRowTextStyle={theme.c3}
          showsVerticalScrollIndicator
          rowStyle={{height: 50}}
          rowTextStyle={{fontSize: 14, fontWeight: '600'}}
        />
      </View>
      <View style={[styles.input_box]}>
        <ColorIcon icon='comments' style={[styles.img_style, {marginLeft: 10}]}/>
        <TextInput 
        placeholder="  Comments"
        placeholderTextColor='gray'
        value={comments}
        onChangeText={(comments) => setComments(comments)}
        style={[styles.input_text, theme.c1, styles.bold]}
        /> 
      </View>
      <Pressable style={[styles.input_box_select_option]} onPress={()=>{setOpenDate(!openDate)}}>
        <ColorIcon icon='calendar' style={styles.img_style}/>
        <View style={styles.date}><Text style={[styles.date_text, theme.c1]}>{date.toDateString()}</Text></View>
        <DatePicker date={date} onDateChange={setDate} modal={true} open={openDate}
        mode='date'
          onConfirm={(date) => {
            setOpenDate(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpenDate(false)
          }}
          />
      </Pressable>
      <View style={styles.btn_row}>
        {/* <TouchableOpacity style={[styles.deatailed_btn, theme.bg2]}>
          <Text style={[styles.deatailed_text, theme.c3]}>EXPAND</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={[styles.save_btn, theme.bg1]} onPress={handleCreate}>
          <Text style={[styles.deatailed_text, theme.c3]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    width: 200
  },
  input_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 15,
    width: 180,
    marginVertical: 3
  },
  input_box_select_option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 15,
    width: 180,
    marginVertical: 3
  },
  border_width: {
    borderWidth: 1,
    borderStyle: 'dashed'
  },
  input_text: {
    flex: 1,
    paddingLeft: 10,
    height: 40,
  },
  rupee: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
  },
  rupee_text: {
    fontSize: 20,
  },
  bold: {
    fontWeight: '600'
  },
  select_btn: {
    borderRadius: 8,
    height: 30,
    width: 140
  },
  img_style: {
    height: 20,
    width: 20
  },
  select_btn_text: {
    fontWeight: '500',
    fontSize: 15
  },
  btn_row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 200,
    marginVertical: 3
  },
  deatailed_btn: {
    paddingHorizontal: 15,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deatailed_text: {
    fontWeight: '700',
    fontSize: 12
  },
  save_btn: {
    paddingHorizontal: 15,
    height: 35,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140
  },
  date_text: {
    fontWeight: '500',
    fontSize: 14
  }
  
})