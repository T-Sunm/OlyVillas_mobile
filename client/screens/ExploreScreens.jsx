import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ExploreHeader from '../components/Explore/ExploreHeader'
import Listings from '../components/Listings'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListingsMap from '../components/ListingsMap'
import { getAllProperties, getAllResidencies_forMap } from '../api/Residency'
import ListingBottomSheet from '../components/ListingBottomSheet'
import useSearchStore from '../store/searchStore'
import useResidenciesSearchStore from '../store/ResidencySearch'
import useResidenciesStore from '../store/residencyStore'
import axios from 'axios'
const Stack = createNativeStackNavigator();
const ExploreScreens = ({ navigation }) => {
    const Stack = createNativeStackNavigator();
    const { setResidenciesSearch, setCurrentPage } = useResidenciesSearchStore()
    const { setResidencies, residencies } = useResidenciesStore()
    const resetState = useSearchStore(state => state.resetState);
    const [loadingPage, setLoadingPage] = useState(false)
    const [category, setCategory] = useState('Tiny homes')

    const onDataChange = (category) => {
        setCategory(category)
    }

    const handleRefreshData = async () => {
        try {
            setLoadingPage(true)
            resetState()
            setLoadingPage(false)
        } catch (error) {
            console.log(error)
        }
    }

    // tải all data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingPage(true)
                const data = await getAllResidencies_forMap()
                // mặc định ban đầu sẽ tải hết dữ liệu
                setResidencies(data)
                setTimeout(() => {
                    setLoadingPage(false)
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
            items={residencies}
            category={category}
            onDataChange={onDataChange}
            onHandleRefresh={handleRefreshData}
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

const ExploreScreenContent = ({ items, category, onHandleRefresh }) => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ListingsMap items={items} />
                    <ListingBottomSheet category={category} onHandleRefresh={onHandleRefresh} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({})