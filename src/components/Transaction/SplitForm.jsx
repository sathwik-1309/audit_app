import React, { useContext, useState } from 'react'
import { View, Text, TextInput, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import MultiSelect from 'react-native-multiple-select'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'
import ColorIcon from '../ColorIcon'
import SelectDropdown from 'react-native-select-dropdown'
import DatePicker from 'react-native-date-picker'
import { HOST_IP } from '../../config'
import axios from 'axios'
import { getAuthToken } from '../../util'

function MultiSelectItem({item, onPress, selected}){
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return(
    <Pressable style={[{borderRadius: 6, marginBottom: 2, height: 35, width: 180, alignItems: 'center', justifyContent: 'center'}, selected.map((item)=>item.id).includes(item.id) ? theme.bg1 : theme.bg3]} onPress={()=>onPress(item)}>
      <Text style={[theme.c1, selected.map((item)=>item.id).includes(item.id) ? theme.c3 : theme.c1]}>{item.name}</Text>
    </Pressable>
  )
}

function PartyInputBox({data, selectedItems, setSelectedItems}){
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [amount, setAmount] = useState(null)
  const gray = {
    color: Styles.gray
  }
  const handleChange = (amount) => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.map((item) => {
        if (item.id === data.id) {
          item.amount = amount
        }
        return item
      })
    })
  }
  return(
    <View style={[{flexDirection: 'row', height: 40, width: 180, alignItems: 'center'}, theme.bg2, styles.party_input_box]}>
      <View style={{width: 120, paddingLeft: 20}}><Text style={[theme.c3]}>{data.name}</Text></View>
      <TextInput 
        placeholder="     ₹"
        value={amount}
        keyboardType="numeric"
        onChangeText={handleChange}
        style={[ theme.c3, styles.bold, {width: 60}]}
        />  
    </View>
  )
}

export default function SplitForm({data, close}){
  const [selectedItems, setSelectedItems] = useState([])
  const [openSelect, setOpenSelect] = useState(false)
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
  const [userAmount, setUserAmount] = useState(null)
  const handleSelect = (item) => {
    if (selectedItems.map((item)=> item.id).includes(item.id)){
      setSelectedItems(selectedItems.filter(x => x.id != item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }
  async function handleSave () {
    if (!amount){
      setError("Please enter total amount")
      return
    }
    if (paymentType=='account' && account==null){
      setError("Please select an Account")
      return
    }
    if (paymentType=='card' && card==null){
      setError("Please select a Card")
      return
    }
    const sum = selectedItems.map((item)=>item.amount).reduce((acc, currentValue) => acc + parseInt(currentValue, 10), 0) + parseInt(userAmount,10)
    
    if (amount != sum){
      setError(`Total Amount (${amount}) does not match the split ${sum}`)
      return
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/transactions/split?auth_token=${authToken}`
    let payload = {
      amount: amount,
      date: date
    }

    if (account) {
      payload.account_id = account.id
    }else if (card){
      payload.card_id = card.id
    }

    if (category!=null) payload.sub_category_id = category.id
    if (comments!='') payload.comments = comments
    if (mop!=null) payload.mop_id = mop.id
    const temp_arr = selectedItems.map((item)=>{
      return ({
        party: item.id,
        amount: item.amount
      })
    })
    const split = [...temp_arr, {
      user: true,
      amount: userAmount
    }]
    payload.transactions = split
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
  let mops = account ? account.mops : []
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  console.log(selectedItems)
  
  return(
    <Pressable style={[theme.bg3, styles.container]}>
      <View style={[{flexDirection: 'row'}, theme.bg2, {marginVertical: 5, padding: 4, borderRadius: 4}]}>
        <Pressable style={[paymentType == 'account' ? theme.bg1 : theme.bg2, styles.payment_btn]} onPress={()=>{setPaymentType('account')}}><Text style={[theme.c3, styles.payment_btn_text]}>Account</Text></Pressable>
        <Pressable style={[paymentType == 'card' ? theme.bg1 : theme.bg2, styles.payment_btn]} onPress={()=>{setPaymentType('card')}}><Text style={[theme.c3, styles.payment_btn_text]}>Card</Text></Pressable>
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
        paymentType == 'account' ?
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
      </View> :

      <View style={[styles.input_box_select_option, styles.border_width, card==null ? {borderColor: theme.c1.color} : {borderColor: 'white'}]}>
      <ColorIcon icon='card' style={styles.img_style}/>
      <SelectDropdown
        data={data.cards}
        onSelect={(selectedItem, index) => {
          setCard(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name
        }}
        rowTextForSelection={(item, index) => {
          return item.name
        }}
        defaultButtonText='Select Card        '
        buttonStyle={[styles.select_btn, theme.bg3]}
        buttonTextStyle={[styles.select_btn_text, card ? theme.c1 : gray]}
        selectedRowStyle={theme.bg1}
        selectedRowTextStyle={theme.c3}
        showsVerticalScrollIndicator
        rowStyle={{height: 50}}
        rowTextStyle={{fontSize: 14, fontWeight: '600'}}
      />
      </View>

      }
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
      <View style={{}}>
        {
          openSelect ? 
          <View style={[ theme.bg3, {paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}]} contentContainerStyle={{flex: 1}}>
            <View style={[{height: 30, width: 160, justifyContent: 'center', alignItems: 'center', borderRadius: 6, marginBottom: 2}, theme.bg2]}><Text style={[theme.c3, {fontWeight: '600'}]}>Parties</Text></View>
          {
            data.parties.map((item, index)=>{
              return(
              <MultiSelectItem item={item} key={index} onPress={handleSelect} selected={selectedItems}/>
              )
            })
          }
          <TouchableOpacity style={[theme.bg2, {height: 30, width: 180, borderRadius: 6, alignItems: 'center', justifyContent: 'center'}]} onPress={()=>{setOpenSelect(false)}}><Text style={[{fontWeight: '500', fontSize: 13}, theme.c3]}>Submit</Text></TouchableOpacity>
        </View> :

        <Pressable style={[{height: 40, width: 180, alignItems: 'center', flexDirection: 'row'}]} onPress={()=>{setOpenSelect(true)}}>
          <ColorIcon icon='user' style={{height: 25, width: 25}}/>
          <Text style={[theme.c1, styles.label_text]}>Edit Parties</Text>
        </Pressable>
        }
        
      </View>
      <View style={[{flexDirection: 'row', height: 40, width: 180, alignItems: 'center'}, theme.bg2, styles.party_input_box]}>
        <View style={{width: 120, paddingLeft: 20}}><Text style={[theme.c3]}>Myself</Text></View>
        <TextInput 
          placeholder="     ₹"
          value={userAmount}
          keyboardType="numeric"
          onChangeText={(userAmount) => setUserAmount(userAmount)}
          style={[ theme.c3, styles.bold, {width: 60}]}
          />  
      </View>
      {
        selectedItems.map((item, index)=>{
          return(<PartyInputBox data={item} key={index} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>)
        })
      }
      <View style={styles.btn_row}>
        <TouchableOpacity style={[styles.save_btn, theme.bg1]} onPress={handleSave}>
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
  label_text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 10
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
    width: 70,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  payment_btn_text: {
    fontWeight: '400',
    fontSize: 13
  },
  party_input_box :{
    borderRadius: 10,
    marginBottom: 2
  }
}
)