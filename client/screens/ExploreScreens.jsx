import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeader from '../components/Explore/ExploreHeader'
import Listings from '../components/Listings'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListingsMap from '../components/ListingsMap'
import { getAllProperties } from '../api/Residency'

const ExploreScreens = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const [items, setItems] = useState()
    const [loading, setLoading] = useState(false)
    const onDataChange = (category) => {
        console.log(category)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getAllProperties()
                setItems(data)
                setTimeout(() => {
                    setLoading(false)
                }, 100)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ExploreHeader navigation={navigation} onCategoryChanged={onDataChange} />
            {/* <Listings items={items} /> */}
            <ListingsMap items={items} />
        </View>
    )
}

export default ExploreScreens

const styles = StyleSheet.create({})