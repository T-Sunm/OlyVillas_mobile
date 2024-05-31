import { ActivityIndicator, Button, Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FavouritesResidency, getAllProperties } from '../api/Residency'
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import useResidenciesSearchStore from '../store/ResidencySearch'
import ListingItem from './Explore/ListingItem'
import useSearchStore from '../store/searchStore';
import _ from 'lodash';
const Listings = ({ onHandleRefresh }) => {
    const { loading, setLoading } = useResidenciesSearchStore()
    const { mapData, rangeDate, guestCount, locationType } = useSearchStore(state => state)
    console.log(locationType)
    const [items, setItems] = useState([])

    // mỗi lần mapData thay đổi thì tất cả biến useState sẽ bị re-render và set lại về 1(bug này tôi cx chịu , kh hiểu sao sài setMapdata trong zustand thì bị re-render)
    // nếu xài lib global_state khác thì mỗi lần 'filter phải setCurrentPage về lại 1 
    const [currentPage, setCurrentPage] = useState(1)

    const [prevMapData, setPrevMapData] = useState();
    const [prevRange, setPrevRange] = useState({ startDate: null, endDate: null });
    const [prevGuestCount, setPrevGuestCount] = useState()
    const [prevPlaceType, setPrevPlaceType] = useState()

    const handleRefresh = () => {
        onHandleRefresh()
        setCurrentPage(1)
    }

    useEffect(() => {

        // tại vì bottomFlatList xài chung cho all Residency và Filter_Residencies
        //  nên luôn có 1 params mặc định ở đây , mỗi lần useEffect chạy nó sẽ check trong searchStore 
        //  + nếu kh filter thì params rỗng làm search thì nó fetch hết
        //  + nếu filter thì params sẽ được thêm vào sau từng lệnh if
        let params = {}
        if (mapData) {
            params.mapData = mapData
        }
        if (rangeDate.startDate && rangeDate.endDate) {
            params.startDate = rangeDate.startDate
            params.endDate = rangeDate.endDate
        }
        if (guestCount) {
            params.guestCount = guestCount
        }
        if (locationType) {
            params.locationType = locationType
        }
        const fetchData = async () => {

            // dữ liệu data này có thể allResidencies , có thể là filterResidency
            //  nên cần có bước check : 
            //  1. nếu mapData.place === prevMapData 
            //  --> 1.1: nó có thể là data của filter nhưng currentPage đã + thêm 1
            //  --> 1.2: nó có thể là data của all_Residencies nhưng currentPage đã + thêm 1
            //  --> nên 2 trường hợp này gộp vào phần else (vì đã có params ở trên phân loại data trả về cho từng cái rồi)
            const data = await getAllProperties(params, currentPage);
            try {
                if (mapData.place !== prevMapData ||
                    prevRange.startDate !== rangeDate.startDate ||
                    prevRange.endDate !== rangeDate.endDate ||
                    guestCount !== prevGuestCount ||
                    locationType !== prevPlaceType
                ) {
                    setItems(data);
                    setPrevMapData(mapData.place);
                    setPrevRange({ startDate: rangeDate.startDate, endDate: rangeDate.endDate })
                    setPrevGuestCount(guestCount)
                    setPrevPlaceType(locationType)
                } else {
                    setItems([...items, ...data]);
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [currentPage, mapData, rangeDate, guestCount, locationType])

    const renderRow = ({ item }) => {
        return (
            <ListingItem item={item} />
        )
    }

    const HeaderList = (ItemLength) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                <View style={{ flexGrow: 1, paddingLeft: 64 }}>
                    <Text style={{ fontSize: 14, fontFamily: FONTFAMILY.poppins_semibold, alignSelf: "center" }}>{ItemLength} home</Text>
                </View>
                <TouchableOpacity style={styles.headerListButton} onPress={handleRefresh} >
                    <Text>Refresh</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    }
    const renderFooter = () => {
        return (
            <Button title='Load more' onPress={handleLoadMore} />
        )
    }

    return (
        <BottomSheetFlatList
            showsVerticalScrollIndicator
            renderItem={renderRow}
            data={items ? items : []}
            ListHeaderComponent={() => HeaderList(items?.length)}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0}
            scrollEventThrottle={16}
        // contentContainerStyle={{ alignItems: "center" }}
        />
    )
}

export default Listings

const styles = StyleSheet.create({
    loader: {
        marginTop: 10,
        alignItems: "center"
    },
    headerListButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.Grey,
        borderRadius: 24
    }
})