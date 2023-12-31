import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import RightArrow from '../../../assets/icons/right-arrow-next.png'
import CategoryIcon from '../../../assets/icons/category.png'
import { Styles } from '../../Styles'
import ThemeContext from '../Context/ThemeContext'
import { useNavigation } from '@react-navigation/native'

export default function CategoryBox({data}) {
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const progress = data.monthly.percentage
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={[styles.container]} onPress={()=>{navigation.navigate("Category", {id: data.id, name: data.name})}}>
      <View style={[styles.account_box, {backgroundColor: data.color}]}>
        <View style={[styles.details]}>
          <View style={[styles.row1]}>
            {/* <Image source={CategoryIcon} style={{height: 25, width: 25}}/> */}
            <View style={{}}><Text style={[styles.name, theme.c3]}>{data.name}</Text></View>
          </View>
          <View style={{height: 25, justifyContent: 'center', alignItems: 'center'}}><Text style={[theme.c3, {fontSize: 13, fontWeight: '500'}]}>Spent: <Text style={{fontWeight: '600', fontSize: 14}}>₹ {data.monthly.formatted_spent}</Text></Text></View>
          <View style={{height: 25, justifyContent: 'center', alignItems: 'center'}}><Text style={[theme.c3, {fontSize: 13, fontWeight: '500'}]}>Budget: <Text style={{fontWeight: '600', fontSize: 14}}>₹ {data.monthly.formatted_budget}</Text></Text></View>
          
          <View style={[styles.row2, theme.bg3]}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.progress_bar}>
                <View style={[{width: progress, height: 20, backgroundColor: data.color}]}></View>
                <View style={[{width: 100-progress, height: 20, opacity: 0.5, backgroundColor: data.color}]}></View>
              </View>
              <Text style={{color: data.color, fontWeight: '700', fontSize: 12, paddingLeft: 3}}>{data.monthly.percentage}%</Text>
            </View>
          </View>
        </View>
      </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: 'hidden',
    borderRadius: 10,
  },
  account_box: {
    flexDirection: 'row',
    marginVertical: 6,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  details: {
    width: 140,
    height: 125
  },
  arrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row1: {
    flexDirection: 'row',
    // paddingLeft: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontWeight: '700',
    fontSize: 15
  },
  row2: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  balance_label: {
    fontSize: 12,
    fontWeight: '400'
  },
  amount: {
    fontSize: 14,
    fontWeight: '700'
  },
  progress_bar: {
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden'
  }
})