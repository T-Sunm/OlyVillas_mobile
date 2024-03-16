import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import StackNavigator from './navigators/StackNavigator';
import { useNavigation } from '@react-navigation/native';

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
  useEffect(() => {
    console.log('isSignedIn', isSignedIn)
    if (isLoaded && !isSignedIn) {
      navigation.navigate('login')
    }

  }, [isSignedIn])

  if (!isLoaded) return null
  return <StackNavigator />

}

export default function App() {

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
    console.log("hihi")
    return null;
  }


  return (

    <ClerkProvider tokenCache={tokenCache} publishableKey='pk_test_c2hhcmluZy1zZXJ2YWwtODUuY2xlcmsuYWNjb3VudHMuZGV2JA' >
      <StatusBar style="auto" />
      <NavigationContainer >
        <InitialLayout />
      </NavigationContainer>
    </ClerkProvider>

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
