import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { getAuthToken } from '../../util';
import { HOST_IP } from '../../config';
import axios from 'axios';
import ThemeContext from '../Context/ThemeContext';
import { Styles } from '../../Styles';

function SubcategoryBox({data}){
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[styles.box, {backgroundColor: data.color}]}>
      <View style={{height: 35, justifyContent: 'center'}}><Text style={[theme.c3, styles.box_label]}>{data.name}</Text></View>
      <View style={{flexDirection: 'row', height: 35, alignItems: 'center'}}>
        <View style={{width: 110, alignItems: 'center'}}><Text style={[{fontWeight: '500', fontSize: 12}, theme.c3]}>Spent: <Text style={{fontSize: 14, fontWeight: '600'}}>₹ {data.monthly.spent}</Text></Text></View>
        <View style={{width: 110, alignItems: 'center'}}><Text style={[{fontWeight: '500', fontSize: 12}, theme.c3]}>Budget: <Text style={{fontSize: 14, fontWeight: '600'}}>₹ {data.monthly.budget}</Text></Text></View>
      </View>
      <View style={[styles.row2, theme.bg3]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.progress_bar}>
            <View style={[{width: data.monthly.percentage*1.8, height: 25, backgroundColor: data.color}]}></View>
            <View style={[{width: (100-data.monthly.percentage)*1.8, height: 25, opacity: 0.5, backgroundColor: data.color}]}></View>
          </View>
          <View style={{justifyContent: 'center'}}><Text style={{color: data.color, fontWeight: '700', fontSize: 14, paddingLeft: 7}}>{data.monthly.percentage}%</Text></View>
        </View>
      </View>
    </View>
  )
}

export default function SubcategoryList({id}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/categories/${id}/sub_categories?auth_token=${authToken}`
      const response = await axios.get(url)
      setData(response.data)
      console.log(response.data)
    };

    fetchData()
  }, [])
  return (
    <View style={[styles.container]}>
      <View><Text style={[theme.c1, {fontWeight: '600', fontSize: 14}]}>Subcategories</Text></View>
      {
        data && data.map((sub, index)=>{
          return(<SubcategoryBox data={sub} key={index}/>)
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 240,
    borderRadius: 8,
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 5,
    marginVertical: 10
  },
  box_label: {
    fontWeight: '600',
    fontSize: 15,
  },
  row2: {
    height: 35,
    width: 240,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progress_bar: {
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden'
  }
})