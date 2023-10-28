import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Wallet from '../../assets/icons/wallet.png'
import Owed from '../../assets/icons/owed.png'
import Home from '../../assets/icons/home.png'
import Category from '../../assets/icons/category.png'
import Card from '../../assets/icons/card.png'
import Setting from '../../assets/icons/setting.png'


export default function Icon({icon, size}) {
  const size_ = size ? size : 30
  const size_style = {
    height: size_,
    width: size_
  }
  let image;
  switch(icon) {
    case 'wallet':
      image = <Image source={Wallet} style={size_style}/>
      break;
    case 'settings':
        image = <Image source={Setting} style={{height: 28, width: 28}}/>
        break;
    case 'user':
      image = <Image source={Owed} style={size_style}/>
      break;
    case 'home':
      image = <Image source={Home} style={{height: 25, width: 25}}/>
      break;
    case 'category':
        image = <Image source={Category} style={size_style}/>
        break;
    case 'card':
      image = <Image source={Card} style={size_style}/>
      break;
    default: 
      image = <Image source={Wallet} style={size_style}/>
      break;
  }
  return (
    <View style={styles.image_container}>
      {image}
    </View>
  )
}

const styles = StyleSheet.create({
  image_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})