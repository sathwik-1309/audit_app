import React, {useState, useEffect, useContext} from "react"
import ThemeContext from "../Context/ThemeContext"
import { Styles } from "../../Styles"
import { HOST_IP, MONTHS } from "../../config"
import MonthPicker from "../MonthPicker"
import { getAuthToken } from "../../util"
import axios from 'axios'
import TransactionsList from "./TransactionsList"

export function TransactionListWrapper({payload}) {
  const [data, setData]= useState(null)
  let { themeColor } = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const today = new Date()
  const [month, setMonth]= useState(MONTHS[today.getMonth()])
  const [year, setYear]= useState(today.getFullYear())
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/v1/transactions?auth_token=${authToken}&month=${month}&year=${year}`
      const response = await axios.get(url, {
        params: payload,
      })
      setData(response.data)
    };

    fetchData()
  }, [reload])

  const handleReload = () => {
    setReload(reload+1)
  }
  return(
    <>
    <MonthPicker month={month} setMonth={setMonth} year={year} setYear={setYear} onPress={handleReload}/>
    {
      data &&
      <TransactionsList transactions={data.transactions} colors={data.colors}/>
    }
    </>
    
  )
}