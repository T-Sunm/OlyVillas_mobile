import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeader from '../components/Explore/ExploreHeader'
import Listings from '../components/Listings'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListingsMap from '../components/ListingsMap'
import { getAllProperties } from '../api/Residency'
import ListingBottomSheet from '../components/ListingBottomSheet'
import useSearchStore from '../store/searchStore'
import useResidenciesSearchStore from '../store/ResidencySearch'
import useResidenciesStore from '../store/residencyStore'
import axios from 'axios'
const Stack = createNativeStackNavigator();
const ExploreScreens = ({ navigation }) => {
    const Stack = createNativeStackNavigator();


    const residencySearch = useResidenciesSearchStore(state => state.residencies)
    const { setResidenciesSearch } = useResidenciesSearchStore()
    const { setResidencies, residencies } = useResidenciesStore()

    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('Tiny homes')
    const onDataChange = (category) => {
        setCategory(category)
    }

    // tải all data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getAllProperties()
                // mặc định ban đầu sẽ tải hết dữ liệu
                setResidencies(data)
                setResidenciesSearch(data)
                // setTimeout(() => {
                //     setLoading(false)
                // }, 100)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])
    // Tạo một function component để truyền props
    const ExploreScreenComponent = () => (
        <ExploreScreenContent
            items={residencies}
            category={category}
            onDataChange={onDataChange}
            residencySearch={residencySearch}
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

const ExploreScreenContent = ({ items, category, onDataChange, residencySearch }) => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ListingsMap items={items} />
                <ListingBottomSheet listing={residencySearch} category={category} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({})