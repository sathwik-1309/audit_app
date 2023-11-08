import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'

export default function TransactionBox({data, index}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={[styles.box, theme.bg1]}>
      {/* <View style={[styles.ttype,  data.ttype == 'credit' ? styles.credit : styles.debit]}><Text style={[theme.c3, styles.ttype_text]}>{data.ttype.toUpperCase()}</Text></View> */}
      <View style={styles.amount}><Text style={[styles.amount_text, theme.c3]}>{data.signed_amount}</Text></View>
      <View style={[styles.date]}><Text style={[styles.date_text]}>{data.date}</Text></View>
      <View style={[styles.category]}>
        {
          data.category &&
          <View style={[{backgroundColor: data.category.color}, styles.category_tag]}>
            <Text style={[styles.category_text, theme.c3]}>{data.category.sub_category}</Text>
          </View>
        }
        </View>
      {/* <View style={styles.date}><Text style={[styles.date_text, theme.c2]}>{data.date}</Text></View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 30,
    borderRadius: 6,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5
  },
  ttype: {
    borderRadius: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    marginHorizontal: 5,
    elevation: 0
  },
  ttype_text: {
    fontWeight: '600',
    fontSize: 10
  },
  debit: {
    backgroundColor: '#cc1824'
  },
  credit: {
    backgroundColor: '#3a9e41'
  },
  debit_c: {
    color: '#cc1824'
  },
  credit_c: {
    color: '#3a9e41'
  },
  date: {
    width: 70
  },
  date_text: {
    fontSize: 11,
    fontWeight: '600'
  },
  amount: {
    width: 110,
    paddingLeft: 10
  },
  amount_text: {
    fontWeight: '700',
    fontSize: 14
  },
  category: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  category_text: {
    fontWeight: '600',
    fontSize: 10
  },
  category_tag: {
    width: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 0,
    borderStyle: 'solid'
  }
})