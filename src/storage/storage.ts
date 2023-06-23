import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveStorage(key: string, value: any) {
  try {
    const dataToStorage = JSON.stringify(value);

    await AsyncStorage.setItem(key, dataToStorage);
  } catch (error) {
    throw error;
  }
}

async function getStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    throw error;
  }
}

async function removeStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw error;
  }
}

export { saveStorage, getStorage, removeStorage };
