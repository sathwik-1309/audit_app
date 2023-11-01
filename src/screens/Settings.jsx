import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
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
  const lavender = Styles.lavender
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
      style: lavender,
      name: 'Lavender'
    },
    {
      style: aqua,
      name: 'Aqua'
    },
  ]
  return (
    <SafeAreaView style={[styles.safe_area_view, theme.bg3]}>
      <ScrollView>
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
  }
})