import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import TabNavigators from './TabNavigators';
import Login from '../screens/Login';
import { FONTFAMILY } from '../theme/theme';
import Booking from '../screens/Booking';
import ListingDetails from '../screens/ListingDetails';

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
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen name='listingdetails' component={ListingDetails} options={{ animation: "slide_from_right", headerTitle: '', headerTransparent: true }} />
        </Stack.Navigator>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})