import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { Styles } from '../../Styles'
import PieChart from 'react-native-pie-chart'
import { HOST_IP, MONTHS } from '../../config'
import DetailBox from './DetailBox'
import { getAuthToken } from '../../util'
import ThemeContext from '../Context/ThemeContext'
import axios from 'axios'
import MonthPicker from '../MonthPicker'

export default function HomePie({drag, url_add}) {
  const [data, setData] = useState(null)
  const today = new Date()
  const [month, setMonth]= useState(MONTHS[today.getMonth()])
  const [year, setYear]= useState(today.getFullYear())
  const [reload, setReload] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      let url = `${HOST_IP}/transactions/pie?auth_token=${authToken}&month=${month}&year=${year}`
      if (url_add) {
        url = url + url_add
      }
      const response = await axios.get(url)
      setData(response.data);
    };

    fetchData();
  }, [drag, reload])

  const handleReload = () => {
    setReload(reload+1)
  }

  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  return (
    <View style={styles.pie_chart}>
      <MonthPicker month={month} setMonth={setMonth} year={year} setYear={setYear} onPress={handleReload}/>
      <View style={styles.pie_header}><Text style={[theme.c1, styles.pie_header_text]}>Category Split</Text></View> 
      {
        data && 
        <>
        {
          data.length > 0 ?
          <>
            <View style={{paddingLeft: 25}}>
              <PieChart
                widthAndHeight={250}
                series={data.map((hash)=>hash.expenditure)}
                sliceColor={data.map((hash)=>hash.color)}
                coverRadius={0.45}
                coverFill={'#FFF'}
              />
            </View>
            <View style={{marginTop: 20}}>
              <DetailBox data={data}/>
            </View>
          </> :
          <>
            <View style={{paddingLeft: 25}}>
              <PieChart
                widthAndHeight={250}
                series={[1]}
                sliceColor={['gray']}
                coverRadius={0.45}
                coverFill={'#FFF'}
              />
            </View>
            <View style={{marginTop: 20, paddingLeft: 60}}>
              <Text style={theme.c1}>No Transactions to show yet</Text>
            </View>
          </>
        }
        </>
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  pie_chart:{
    
  },
  pie_header:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  pie_header_text:{
    fontWeight: '600',
    fontSize: 15
  },
})