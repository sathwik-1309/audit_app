import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import { getAuthToken } from '../../util'
import axios from 'axios'
import EditIcon from '../../../assets/icons/edit.png'
import CancelIcon from '../../../assets/icons/cancel.png'
import { useNavigation } from '@react-navigation/native'
import DeleteIcon from '../../../assets/icons/delete.png'
import YesNoModal from '../YesNoModal'
import ColorPalette from '../../../assets/icons/color-palette.png'

function DetailBox1({data, category_name, id, setHeader}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(category_name)
  const [monthLimit, setMonthLimit] = useState(data.details.monthly_limit)
  const [yearLimit, setYearLimit] = useState(data.details.yearly_limit)
  const handleSave = async () => {
    const payload = {
      name: name,
      monthly_limit: monthLimit,
      yearly_limit: yearLimit,
    }
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/sub_categories/${id}/update?auth_token=${authToken}`
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
  return(
    <View style={[theme.bg1, styles.container]}>
        <View style={[theme.bg2, styles.header]}>
          <Text style={[theme.c3, styles.header_text]}>Subcategory Details</Text>
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
            <View style={{width: 70, paddingLeft: 10}}><Text style={{fontWeight: '600', fontSize: 12, color: Styles.lightgray}}>Budget (M)</Text></View>
            {
              edit ? 
              <TextInput
                value={monthLimit && monthLimit.toString()}
                style={styles.edit_border}
                keyboardType="numeric"
                onChangeText={(monthLimit) => setMonthLimit(monthLimit)}
              /> :
              <Text style={[styles.value, theme.c3]}>₹ {data && data.details.formatted_monthly_limit}</Text>
            }
            
          </View>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={{fontWeight: '600', fontSize: 12, color: Styles.lightgray}}>Budget (Y)</Text></View>
            {
              edit ? 
              <TextInput
                value={yearLimit && yearLimit.toString()}
                style={styles.edit_border}
                keyboardType="numeric"
                onChangeText={(yearLimit) => setYearLimit(yearLimit)}
              /> :
              <Text style={[styles.value, theme.c3]}>₹ {data && data.details.formatted_yearly_limit}</Text>
            }
            
          </View>
          <View style={{flexDirection: 'row', height: 40, alignItems: 'center', marginBottom: 10}}>
            <Image source={ColorPalette} style={styles.img_style}/>
            <View style={{width: 120, height: 35, backgroundColor: data.details.color.color, justifyContent: 'center', alignItems: 'center', borderRadius: 6}}><Text style={[theme.c3, {fontWeight: '600', fontSize: 14}]}>{data.details.color.name}</Text></View>
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
  )
}

export default function SubcategoryDetails({id, category_name, setHeader, drag}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [name, setName] = useState(category_name)
  const [data, setData] = useState(null)
  const [reload, setReload] = useState(0)
  const navigation = useNavigation()
  const handleReload = () => {
    setReload(reload+1)
  }
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/sub_categories/${id}/details?auth_token=${authToken}`
      const response = await axios.get(url)
      setData(response.data)
      console.log(response.data)
    };

    fetchData()
  }, [reload, drag])

  const [isModalVisible, setModalVisible] = useState(false);

  async function handleYes () {
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/sub_categories/${id}/delete?auth_token=${authToken}`
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

  console.log(data)

  return (
    <View>
      {
        data &&
        <DetailBox1 data={data} category_name={name} id={id} setHeader={setHeader}/>
      }
      {
        data &&
        <View style={[styles.container, theme.bg1]}>
        <View style={[{marginBottom: 10}]}>
          <View style={[styles.header, theme.bg2]}><Text style={[styles.header_text, theme.c3]}>Monthly Budget</Text></View>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Target</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data.monthly.formatted_budget}</Text>
          </View>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={[styles.label]}>Spent</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data.monthly.formatted_spent}</Text>
          </View>
        </View>
        
        <View style={[styles.row2, theme.bg3, {paddingVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.progress_bar}>
            <View style={[{width: data.monthly.percentage*2, height: 25}, theme.bg1]}></View>
            <View style={[{width: (100-data.monthly.percentage)*2, height: 25, opacity: 0.5}, theme.bg1]}></View>
          </View>
          <View style={{justifyContent: 'center'}}><Text style={[{fontWeight: '700', fontSize: 14, paddingLeft: 7}, theme.c1]}>{data.monthly.percentage}%</Text></View>
        </View>
        </View>
        </View>
      }
      {
        data &&
        <View style={[styles.container, theme.bg1]}>
        <View style={[{marginBottom: 10}]}>
          <View style={[styles.header, theme.bg2]}><Text style={[styles.header_text, theme.c3]}>Yearly Budget</Text></View>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={styles.label}>Target</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data.yearly.formatted_budget}</Text>
          </View>
          <View style={[styles.input_box, theme.bg1]}>
            <View style={{width: 70, paddingLeft: 10}}><Text style={[styles.label]}>Spent</Text></View>
            <Text style={[styles.value, theme.c3]}>₹ {data.yearly.formatted_spent}</Text>
          </View>
        </View>
        
        <View style={[styles.row2, theme.bg3, {paddingVertical: 10}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.progress_bar}>
            <View style={[{width: data.yearly.percentage*2, height: 25}, theme.bg1]}></View>
            <View style={[{width: (100-data.yearly.percentage)*2, height: 25, opacity: 0.5}, theme.bg1]}></View>
          </View>
          <View style={{justifyContent: 'center'}}><Text style={[{fontWeight: '700', fontSize: 14, paddingLeft: 7}, theme.c1]}>{data.yearly.percentage}%</Text></View>
        </View>
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
          message="Are you sure you want to delete the Subcategory?"
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
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    color: 'white',
    paddingLeft: 5
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
    marginLeft: 20,
    marginRight: 20
  },
  select_btn_text: {
    fontWeight: '500',
    fontSize: 15
  },
  row2: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress_bar: {
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden'
  }
})