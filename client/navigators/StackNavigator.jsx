import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import TabNavigators from './TabNavigators';
import Login from '../screens/Login';
import { FONTFAMILY } from '../theme/theme';
import Booking from '../screens/Booking';

import ModalHeaderText from '../components/ModalHeaderText';
import ListingDetails from '../screens/ListingScreen/ListingDetails';
import ListingAmenitiesDetails from '../screens/ListingScreen/ListingAmenitiesDetails';
import ReserveScreen from '../screens/ReserveScreen/ReserveScreen';
import PhoneScreen from '../screens/ReserveScreen/PhoneScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (

        <Stack.Navigator >
            <Stack.Screen name='tab' component={TabNavigators} options={{ animation: "default", headerShown: false }} />
            <Stack.Screen
                name='login'
                component={Login}
                options={({ navigation }) => ({
                    animation: "slide_from_bottom",
                    title: "Log in or sign up",
                    presentation: "modal",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontFamily: FONTFAMILY.poppins_semibold,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name='bookings'
                component={Booking}
                options={({ navigation }) => ({
                    animation: "fade",
                    presentation: "transparentModal",
                    headerTransparent: true,
                    header: () => <ModalHeaderText navigation={navigation} />,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name='ListingAmenitiesDetails' component={ListingAmenitiesDetails} options={{ headerTitle: '', headerTransparent: true }} />
            <Stack.Screen name='PhoneScreen' component={PhoneScreen} options={{ headerTitle: '', headerTransparent: true }} />
            <Stack.Screen name='listingdetails' component={ListingDetails} options={{ animation: "slide_from_right", headerTitle: '', headerTransparent: true }} />
            <Stack.Screen name='ReserveScreen' component={ReserveScreen} options={{ headerTitle: 'Confirm and pay ', headerTitleAlign: "center", animation: "slide_from_right" }} />
        </Stack.Navigator>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})