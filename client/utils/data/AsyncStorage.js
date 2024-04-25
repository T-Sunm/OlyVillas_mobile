import AsyncStorage from '@react-native-async-storage/async-storage';

// store Data dữ liệu là object
export const storeDataObj = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log("In file asyncstorage hang 9", e)
    }
};

// get Data dữ liệu là object
export const getDataInStorage = async (myKey) => {
    try {
        const jsonValue = await AsyncStorage.getItem(myKey);
        console.log(jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("In file asyncstorage hang 19", e)
    }
};

export const removeValueStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("In file asyncstorage hang 27", e)
    }

    console.log('Done.')
}