import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Styles } from '../../Styles'
import PieChart from 'react-native-pie-chart'
import { HOST_IP } from '../../config'
import DetailBox from './DetailBox'

export default function HomePie() {
  const [data, setData] = useState(null)
  const authToken = 'RU1DXY3JdugqBy3yoWzy'
  const url = `${HOST_IP}/transactions/pie?auth_token=${authToken}`
  useEffect(() => {
    const fetchData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
    };

    fetchData();
  }, [])
  const theme = Styles.light
  return (
    <View style={styles.pie_chart}>
      <View style={styles.pie_header}><Text style={[theme.c1, styles.pie_header_text]}>Category Split</Text></View> 
      {
        data &&
        <>
        <PieChart
          widthAndHeight={250}
          series={data.map((hash)=>hash.expenditure)}
          sliceColor={data.map((hash)=>hash.color)}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
        <View style={{marginTop: 20}}>
          <DetailBox data={data}/>
        </View>
        </>
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  pie_chart:{
    marginTop: 30
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