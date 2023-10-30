import React, { createContext, useEffect, useState } from 'react';
import { HOST_IP } from '../../config';
import { getAuthToken } from '../../util';
import axios from 'axios';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('orange')
  useEffect(()=>{
    const fetch = async () => {
      const authToken = await getAuthToken()
      const url = `${HOST_IP}/accounts/home?auth_token=${authToken}`
      try{
        const response = await axios.get(url)
        if(response.status == 200){
          setThemeColor(response.data.app_theme)
        }else{
          console.log(response)
        }
      }catch(error){
        console.log(error)
      }
      
    }
    fetch()
  }, [])
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext
