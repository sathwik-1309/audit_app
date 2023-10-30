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
      <View style={[styles.ttype]}><Text style={[styles.ttype_text]}>{data.ttype.toUpperCase()}</Text></View>
      <View style={styles.amount}><Text style={[styles.amount_text, theme.c3]}>₹ {data.amount}</Text></View>
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
    alignItems: 'center'
  },
  ttype: {
    borderRadius: 10,
    width: 50,
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
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  date_text: {
    fontSize: 12,
    fontWeight: '600'
  },
  amount: {
    width: 110,
    alignItems: 'center'
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