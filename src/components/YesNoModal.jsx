import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ThemeContext from './Context/ThemeContext';
import { Styles } from '../Styles';

const YesNoModal = ({ isVisible, onYes, onNo, message }) => {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <Modal isVisible={isVisible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{marginVertical: 30}}><Text style={styles.message_text}>{message}</Text></View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={onYes} style={[styles.btn, theme.bg1]}>
            <Text style={[styles.btn_text, theme.c3]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNo} style={[styles.btn, theme.bg3]}>
            <Text style={[styles.btn_text, theme.c1]}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default YesNoModal

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 6,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  btn_text: {
    fontWeight: '600',
    fontSize: 14
  },
  message_text :{
    fontWeight: '500',
    fontSize: 15
  }
})
