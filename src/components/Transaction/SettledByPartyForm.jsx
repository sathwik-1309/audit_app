import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Styles } from '../../Styles'
import SelectDropdown from 'react-native-select-dropdown'
import WalletColor from '../../../assets/icons/wallet-color.png'
import CategoryColor from '../../../assets/icons/category-color.png'
import CommentsColor from '../../../assets/icons/comments-color.png'
import DateColor from '../../../assets/icons/calendar-color.png'
import MopIcon from '../../../assets/icons/mop-color.png'
import DatePicker from 'react-native-date-picker'
import { HOST_IP } from '../../config'
import axios from 'axios'
import { getAuthToken } from '../../util'
import ThemeContext from '../Context/ThemeContext'
import ColorIcon from '../ColorIcon'

export default function SettledByPartyForm({ close, party, data}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const gray = {
    color: Styles.gray
  }
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState(null)
  const [card, setCard] = useState(null)
  const [category, setCategory] = useState(null)
  const [comments, setComments] = useState('')
  const [date, setDate] = useState(new Date())
  const [openDate, setOpenDate] = useState(false)
  const [error, setError] = useState('')
  const [mop, setMop] = useState(null)
  const [paymentType, setPaymentType] = useState('account')

  async function handleCreate() {
    if (amount=='') {
      setError("Enter Amount")
      return
    }
    if (paymentType == 'account' && account == null) {
      setError("Select an Account")
      return
    }
    
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/transactions/settled_by_party?auth_token=${authToken}`
    let payload = {
      amount: amount,
      date: date,
      party: party
    }

    if (account) {
      payload.account_id = account.id
    }else {
      payload.cash = true
    }

    if (category!=null) payload.sub_category_id = category.id
    if (comments!='') payload.comments = comments
    if (mop!=null) payload.mop_id = mop.id
    try {
      const response = await axios.post(url, payload)
      if(response.status == 200){
        setError('')
        close('')
        
      }else if (response.status == 202){
        setError(response.data.message)
      }else {
        setError("Some other error")
      }
    }catch(error){
      setError(error.message)
    }
  }

  let mops = account ? account.mops : []

  return (
    <Pressable style={[styles.container, theme.bg3]}>
      <View style={[{flexDirection: 'row'}, theme.bg2, {marginVertical: 5, padding: 4, borderRadius: 4}]}>
        <Pressable style={[paymentType == 'account' ? theme.bg1 : theme.bg2, styles.payment_btn]} onPress={()=>{setPaymentType('account')}}><Text style={[theme.c3, styles.payment_btn_text]}>Account</Text></Pressable>
        <Pressable style={[paymentType == 'cash' ? theme.bg1 : theme.bg2, styles.payment_btn]} onPress={()=>{setPaymentType('cash')}}><Text style={[theme.c3, styles.payment_btn_text]}>Cash</Text></Pressable>
      </View>
      {
        error != '' &&
        <Text style={{color: 'red', fontWeight: '500'}}>{error}</Text>
      }
      <View style={[styles.input_box, styles.border_width, amount=='' ? {borderColor: theme.c1.color} : {borderColor: 'white'}]}>
        <View style={styles.rupee}><Text style={[styles.rupee_text, theme.c1]}>₹</Text></View>
        <TextInput 
        placeholder="    Amount"
        placeholderTextColor={gray.color}
        value={amount}
        keyboardType="numeric"
        onChangeText={(amount) => setAmount(amount)}
        style={[styles.input_text, theme.c1, styles.bold]}
        />  
      </View>
      {
        paymentType == 'account' &&
        <View style={[styles.input_box_select_option, styles.border_width, account==null ? {borderColor: theme.c1.color} : {borderColor: 'white'}]}>
        <ColorIcon icon='wallet' style={styles.img_style}/>
        <SelectDropdown
          data={data.accounts}
          onSelect={(selectedItem, index) => {
            setAccount(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name
          }}
          rowTextForSelection={(item, index) => {
            return item.name
          }}
          defaultButtonText='Select Account'
          buttonStyle={[styles.select_btn, theme.bg3]}
          buttonTextStyle={[styles.select_btn_text, account ? theme.c1 : gray]}
          selectedRowStyle={theme.bg1}
          selectedRowTextStyle={theme.c3}
          showsVerticalScrollIndicator
          rowStyle={{height: 50}}
          rowTextStyle={{fontSize: 14, fontWeight: '600'}}
        />
      </View>
      }
      
      <View style={[styles.input_box]}>
        <ColorIcon icon='comments' style={[styles.img_style, {marginLeft: 10}]}/>
        <TextInput 
        placeholder="  Comments"
        placeholderTextColor={gray.color}
        value={comments}
        onChangeText={(comments) => setComments(comments)}
        style={[styles.input_text, theme.c1, styles.bold]}
        /> 
      </View>
      <Pressable style={[styles.input_box_select_option, account==null ? theme.b_red : theme.b_green]} onPress={()=>{setOpenDate(!openDate)}}>
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
      {
        account &&
        <View style={[styles.input_box_select_option]}>
        <ColorIcon icon='mop' style={styles.img_style}/>
        <SelectDropdown
          data={mops}
          onSelect={(selectedItem, index) => {
            setMop(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name
          }}
          rowTextForSelection={(item, index) => {
            return item.name
          }}
          defaultButtonText='Select Mode'
          buttonStyle={[styles.select_btn, theme.bg3]}
          buttonTextStyle={[styles.select_btn_text, mop ? theme.c1 : gray]}
          selectedRowStyle={theme.bg1}
          selectedRowTextStyle={theme.c3}
          showsVerticalScrollIndicator
          rowStyle={{height: 50}}
          rowTextStyle={{fontSize: 14, fontWeight: '600'}}
        />
      </View>
      }
      
      <View style={styles.btn_row}>
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
    paddingLeft: 15
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
  },
  payment_btn: {
    width: 60,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  payment_btn_text: {
    fontWeight: '500',
    fontSize: 12
  },
  
})