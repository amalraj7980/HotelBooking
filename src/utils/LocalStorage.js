/* eslint-disable no-unused-vars */
import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserInformation = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getUserInformation = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};
const retrieveData = async () => {
  try {
    const jsonValue = await getDeviceInformation('deviceDetails');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export {
  setUserInformation,
  getUserInformation,
  removeItemValue,
  retrieveData,
};
