import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import StackNavigator from './navigators/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enGB, registerTranslation } from 'react-native-paper-dates'
import { verifyEmail } from './api/User';
import { getDataInStorage, removeValueStorage } from './utils/data/AsyncStorage';
import * as React from 'react';
import { navigationRef, navigate } from './utils/RootNavigation';
import Toast from 'react-native-toast-message';

// const toastCfg = {
//   error: (props) => 
// }

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return err;
    }
  },
  async saveToken(key, value) {

    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return err;
    }
  },

};



// bắt buộc phải có hàng này trước cả bị lỗi AuthContext not found
const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const navigation = useNavigation();
  const { user } = useUser()
  useEffect(() => {

    const authenticate = async () => {

      const userAsyncStorage = await getDataInStorage("userInfo");

      if (isLoaded && !isSignedIn) {
        if (userAsyncStorage?.typeLogin == "normal") {
          return <StackNavigator />
        }
        removeValueStorage("userInfo")
        // bởi vì lúc khởi động thì navigation chạy chưa xong mà mình đã chuyển hướng thì sẽ lỗi
        // nên là mình phải custom navigate 2 đoạn này để lúc navigationRef.isReady() thì mới điều hướng
        navigate('login');
      }
      if (!userAsyncStorage) {
        navigate('login');
      }
    };
    // Gọi hàm async
    authenticate();
  }, [isSignedIn, user])

  if (!isLoaded) return null
  return <StackNavigator />
}

export default function App() {

  registerTranslation('en', {
    save: 'Save',
    selectSingle: 'Select date',
    selectMultiple: 'Select dates',
    selectRange: 'Select period',
    notAccordingToDateFormat: (inputFormat) =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'Day is not allowed',
    previous: 'Previous',
    next: 'Next',
    typeInDate: 'Type in date',
    pickDateFromCalendar: 'Pick date from calendar',
    close: 'Close',
  })

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('./assets/fonts/Poppins-BlackItalic.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('./assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('./assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('./assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('./assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('./assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('./assets/fonts/Poppins-ThinItalic.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    console.log("lõi font")
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_c2hhcmluZy1zZXJ2YWwtODUuY2xlcmsuYWNjb3VudHMuZGV2JA' >
          <StatusBar style="auto" />
          <InitialLayout />
        </ClerkProvider>
        <Toast />
      </GestureHandlerRootView>
    </NavigationContainer>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

