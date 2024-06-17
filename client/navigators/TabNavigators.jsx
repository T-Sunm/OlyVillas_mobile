import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ExploreScreens from '../screens/ExploreScreens'
import Whistlist from '../screens/Whistlist'
import Trips from '../screens/Trips/Trips'
import Inbox from '../screens/Inbox'
import Profile from '../screens/Profile'
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
const Tab = createBottomTabNavigator()

const TabNavigators = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.White,
                    borderTopWidth: 0,
                    height: SPACING.space_10 * 6
                },
                tabBarLabelStyle: {
                    fontFamily: FONTFAMILY.poppins_regular
                },
                tabBarActiveTintColor: COLORS.primary
            }}
        >
            <Tab.Screen
                name='explore'
                component={ExploreScreens}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color}
                    />

                }}
            />
            <Tab.Screen
                name='whistlist'
                component={Whistlist}
                options={{
                    tabBarLabel: 'Whistlist',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name='trips'
                component={Trips}
                options={{
                    tabBarLabel: 'Trips',
                    tabBarIcon: ({ color, size }) => <FontAwesome6 name="airbnb" size={size} color={color} />
                }}
            />
            {/* <Tab.Screen
                name='inbox'
                component={Inbox}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color, size }) => <FontAwesome6 name="message" size={size} color={color} />
                }}
            /> */}
            <Tab.Screen
                name='profile'
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />
                }} />
        </Tab.Navigator>
    )
}

export default TabNavigators

const styles = StyleSheet.create({})