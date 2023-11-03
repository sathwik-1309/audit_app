import React, { useContext, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ThemeContext from '../Context/ThemeContext';
import { Styles } from '../../Styles';
import TransactionBox2 from './TransactionBox2';
import InvertIcon from '../../../assets/icons/invert.png'

export default function TransactionsList({ transactions, reload }) {
  const { themeColor } = useContext(ThemeContext);
  const theme = Styles[themeColor]
  const [invert, setInvert] = useState(false)
  const handleInvert = () => {
    setInvert(!invert)
  }

  return (
    <View style={[styles.container, theme.bg2]}>
      <View style={[styles.label]}>
        <View style={{width: 270, alignItems: 'center'}}><Text style={[styles.label_text, theme.c3]}>Transactions</Text></View>
        <TouchableOpacity onPress={handleInvert}><Image source={InvertIcon} style={{height: 20, width: 20}}/></TouchableOpacity>
      </View>
      {
        invert ? 
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <TransactionBox2 data={item} index={index}/>}
            scrollEnabled={false}
            contentContainerStyle={{}}
          /> :

          <FlatList
              data={[...transactions].reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <TransactionBox2 data={item} index={index}/>}
              scrollEnabled={false}
              contentContainerStyle={{}}
            />
      }
        
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    overflow: 'hidden',
    padding: 10,
    paddingBottom: 10,
    width: 320
  },
  label: {
    height: 35,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingTop: 2
  },
  label_text: {
    fontWeight: '600',
    fontSize: 15,
  },
  list: {},
});
