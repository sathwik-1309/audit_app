import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../Context/ThemeContext'
import { Styles } from '../../Styles'
import { getAuthToken } from '../../util'
import { HOST_IP } from '../../config'
import axios from 'axios'
import BarGraph from '../BarGraph'

export default function AnalyticsParent({drag, payload}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const [data, setData] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/transactions/analytics?auth_token=${authToken}`
      const response = await axios.get(url, {
        params: payload,
      })
      setData(response.data)
    };

    fetchData();
  }, [drag])
  
  return (
    <>
    {
      data &&
      <>
      <BarGraph data={data.last_7_days} header='LAST 7 DAYS' small={true}/>
      <BarGraph data={data.last_6_weeks} header='LAST 6 WEEKS' small={true}/>
      <BarGraph data={data.last_6_months} header='LAST 6 MONTHS'/>
      </>
    }
    </>
  )
}

const styles = StyleSheet.create({
  
})