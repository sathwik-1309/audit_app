import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Styles } from '../Styles'
import BottomBar from '../components/BottomBar'
import AccountList from '../components/Account/AccountList'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemeContext from '../components/Context/ThemeContext'
import Owed from '../../assets/icons/owed.png'
import Wallet from '../../assets/icons/wallet.png'
import CardIcon from '../../assets/icons/card.png'
import { HOST_IP } from '../config'
import { getAuthToken } from '../util'
import axios from 'axios'

function ConfigItem({name, value, config, reload}){
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const val_text = value ? 'enabled' : 'disabled'
  async function handleUpdate () {
    let payload = {}
    payload[config] = value ? 'disabled' : 'enabled'
    console.log(payload)
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/v1/users/update_configs?auth_token=${authToken}`
    try {
      const response = await axios.put(url, payload)
      if(response.status == 200){
        reload()
      }else if (response.status == 202){
        console.log(response.data.message)
      }else {
        console.log("Some other error")
      }
    }catch(error){
      console.log(error.message)
    }
  }
  return (
    <View style={{flexDirection: 'row', height: 40, marginVertical: 5, alignItems: 'center', borderColor: 'lightgray', borderBottomWidth: 1}}>
      <View style={styles.ci_name}><Text style={[styles.ci_name_text, theme.c1]}>{name}</Text></View>
      <TouchableOpacity style={styles.ci_value} onPress={handleUpdate}><Text style={[styles.ci_value_text, theme.c1]}>{val_text}</Text></TouchableOpacity>
    </View>
  )
}

function ThemeChooserBox({data}) {
  const theme = data.style
  let {setThemeColor} = useContext(ThemeContext)
  const handleThemeChange = async (data) => {
    setThemeColor(data.name.toLowerCase())
    const authToken = await getAuthToken()
    const url = `${HOST_IP}/users/update?auth_token=${authToken}`
    const payload = {
      app_theme: data.name.toLowerCase()
    }
    try{
      const response = await axios.put(url, payload)
      if(response.status == 200){
      }else if (response.status == 202){
        console.log(response.data.message)
      }else {
        console.log("Some other error")
      }
    }catch(error){
      console.log(error)
    }
  }
  return(
    <TouchableOpacity style={[theme.bg2, styles.theme_chooser]} onPress={()=>handleThemeChange(data)}>
      <View style={{justifyContent: 'center', height: 40, alignItems: 'center'}}>
        <Text style={[theme.c3, {fontWeight: '600', fontSize: 13}]}>{data.name}</Text>
      </View>
      <View style={[styles.theme_item, theme.bg1]}>
        <Image source={Wallet} style={{width: 20, height: 20}}/>
        <Text style={[theme.c3, styles.theme_item_text]}>Account</Text>
      </View>
      <View style={[styles.theme_item, theme.bg1]}>
        <Image source={CardIcon} style={{width: 20, height: 20}}/>
        <Text style={[theme.c3, styles.theme_item_text]}>Cards</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Settings() {
  let { themeColor, setThemeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const navigation = useNavigation()
  const [reload, setReload] = useState(0)
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/users/configs?auth_token=${authToken}`
      const response = await axios.get(url)
      setData(response.data)
    };

    fetchData()
  }, [reload])

  async function removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}
  const handleLogout = () => {
    removeItemValue('auth_token')
    navigation.navigate('Login')
  }

  const midnight = Styles.midnight
  const sea = Styles.sea  
  const ruby = Styles.ruby
  const aqua = Styles.aqua
  const pink = Styles.pink
  const purple = Styles.purple
  const orange = Styles.orange
  const forest = Styles.forest
  const navy = Styles.navy
  const magenta = Styles.magenta
  const themes_array = [
    {
      style: midnight,
      name: 'Midnight'
    },
    {
      style: magenta,
      name: 'Magenta'
    },
    {
      style: ruby,
      name: 'Ruby'
    },
    {
      style: sea,
      name: 'Sea'
    },
    {
      style: orange,
      name: 'Orange'
    },
    {
      style: forest,
      name: 'Forest'
    },
    {
      style: purple,
      name: 'Purple'
    },
    {
      style: pink,
      name: 'Pink'
    },
    {
      style: navy,
      name: 'Navy'
    },
    {
      style: aqua,
      name: 'Aqua'
    },
  ]

  const handleReload = () => {
    setReload(reload+1)
  }
  console.log(data)
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <ScrollView>
        {
          data && 
          <View style={{alignItems: 'center', marginTop: 10}}>
            <View style={{height: 40}}><Text style={[{fontSize: 15, fontWeight: '700'}, theme.c1]}>User Configs</Text></View>
            <ConfigItem name='Decimals' value={data.amount_decimal} config='amount_decimal' reload={handleReload}/>
            <ConfigItem name='Commas' value={data.amount_commas} config='amount_commas' reload={handleReload}/>
          </View>
        }
        
        
        <View style={[styles.home]}>
          <Text style={[theme.c1, {fontWeight: '700', fontSize: 16, paddingBottom: 8}]}>Themes</Text>
          <ScrollView horizontal style={[styles.themes_container]}>
            <View style={{width: 20}}></View>
            {
              themes_array.map((theme, index)=>{
                return(<ThemeChooserBox data={theme} key={index}/>)
              })
            }
            <View style={{width: 40}}></View>
          </ScrollView>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logout_text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
    flexDirection: 'column'
  },
  home: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20
  },
  logout: {
    width: 80,
    backgroundColor: 'red',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  logout_text: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  },
  themes_container: {
    padding: 10,
    height: 186,
    minWidth: 400,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderBottomColor: 'black'
  },
  theme_chooser: {
    width: 140,
    borderRadius: 8,
    overflow: 'hidden',
    padding: 8,
    margin: 5,
  },
  theme_item: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    padding: 10,
    marginVertical: 3
  },
  theme_item_text: {
    fontSize: 12,
    fontWeight: '600',
    paddingLeft: 10
  },
  ci_name: {
    flex: 1,
    paddingLeft: 20,
  },
  ci_name_text: {
    fontSize: 14,
    fontWeight: '600'
  },
  ci_value: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ci_value_text: {
    fontSize: 14,
    fontWeight: '400'
  }
})