import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Styles } from '../../Styles'
import PieChart from 'react-native-pie-chart'
import { HOST_IP } from '../../config'
import DetailBox from './DetailBox'
import { getAuthToken } from '../../util'

export default function HomePie({reload}) {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/transactions/pie?auth_token=${authToken}`
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, [reload])
  const theme = Styles.light
  return (
    <View style={styles.pie_chart}>
      <View style={styles.pie_header}><Text style={[theme.c1, styles.pie_header_text]}>Category Split</Text></View> 
      {
        data && 
        <>
        {
          data.length > 0 ?
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
          </> :
          <>
          <PieChart
            widthAndHeight={250}
            series={[1]}
            sliceColor={['gray']}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
          <View style={{marginTop: 20}}>
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