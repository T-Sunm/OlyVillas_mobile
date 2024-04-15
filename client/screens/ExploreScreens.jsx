import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeader from '../components/Explore/ExploreHeader'
import Listings from '../components/Listings'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListingsMap from '../components/ListingsMap'
import { getAllProperties } from '../api/Residency'
import ListingBottomSheet from '../components/ListingBottomSheet'

const Stack = createNativeStackNavigator();
const ExploreScreens = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const [items, setItems] = useState()
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('Tiny homes')
    const onDataChange = (category) => {
        setCategory(category)
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
    // Tạo một function component để truyền props
    const ExploreScreenComponent = () => (
        <ExploreScreenContent
            items={items}
            category={category}
            onDataChange={onDataChange}
        />
    );
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Explore"
                component={ExploreScreenComponent}
                options={{
                    header: () => <ExploreHeader navigation={navigation} onCategoryChanged={onDataChange} />,
                }}
            />
        </Stack.Navigator>

    )
}

export default ExploreScreens

const ExploreScreenContent = ({ items, category, onDataChange }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* <Listings items={items} /> */}
                <ListingsMap items={items} />
                <ListingBottomSheet listing={items} category={category} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({})