import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthToken = async (value) => {
  try {
    await AsyncStorage.setItem('auth_token', value)
  } catch (e) {
    console.log(e.message)
  }
}

export const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('auth_token')
    if (value !== null) {
      console.log(value)
      return value
    }
    return value
  } catch (e) {
    console.log(e.message)
  }
};