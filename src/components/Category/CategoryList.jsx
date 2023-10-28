import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import AddIcon from '../../../assets/icons/add.png'
import CancelIcon from '../../../assets/icons/cancel.png'
import { Styles } from '../../Styles'
import { HOST_IP } from '../../config'
import CategoryForm from './CategoryForm'
import CategoryBox from './CategoryBox'

export default function CategoryList({categories}) {
  const [data, setData] = useState(null)
  const [visible, setVisible] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [reload, setReload] = useState(false)
  const [iconSource, seticonSource] = useState(AddIcon)
  const authToken = 'RU1DXY3JdugqBy3yoWzy'
  const url = `${HOST_IP}/categories/index?auth_token=${authToken}`
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
    };

    fetchData();
  }, [reload, authToken]);

  const handleForm = () => {
    setOpenForm(!openForm)
    if (iconSource == AddIcon) {
      seticonSource(CancelIcon)
    }else {
      seticonSource(AddIcon)
    }
    
  }

  const handleReload = () => {
    setReload(reload+1)
  }

  const theme = Styles.light
  return (
    <View style={[styles.container, theme.bg2]}>
      <View style={[styles.header]}>
        <View style={styles.header_col1}><Text style={[styles.header_text, theme.c3]}>CATEGORIES</Text></View>
        <TouchableOpacity style={styles.icon_container} onPress={handleForm}><Image source={iconSource} style={{height: 20, width: 20}}/></TouchableOpacity>
      </View>
      {
        openForm &&
        <CategoryForm reload={handleReload} close={handleForm} categories={data}/>
      }
      <View style={styles.body}>
        {
          data &&
          data.map((category)=>{
            return(<CategoryBox data={category}/>)
          })
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    borderRadius: 12,
    padding: 12
  },
  header: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  header_text: {
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 15
  },
  header_col1: {
    width: 260
  },
  icon_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  body: {
    marginTop: 10
  },
  
})