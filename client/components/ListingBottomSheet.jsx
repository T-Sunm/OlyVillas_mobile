import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListingsMap from './ListingsMap';
import Listings from './Listings';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';


const ListingBottomSheet = ({ category, onHandleRefresh }) => {
    const bottomSheetRef = useRef(null)
    // const [refresh, setRefresh] = useState(0)
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    const snapPoints = useMemo(() => ['10%', '100%'], [])
    const showMap = () => {
        bottomSheetRef.current?.collapse()
    }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            // Đây là index của snapPoint ban đầu mà bottom sheet sẽ hiển thị khi component được mount
            index={0}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: COLORS.Grey }}
            style={styles.sheetContainer}
        >
            <Listings onHandleRefresh={onHandleRefresh} />
            <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={styles.btn}>
                    <Text style={{ color: COLORS.White, fontFamily: FONTFAMILY.poppins_regular }} >Map</Text>
                    <Ionicons name='map' size={20} color={COLORS.White} />
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default ListingBottomSheet

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: COLORS.dark,
        padding: 16,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    sheetContainer: {
        backgroundColor: COLORS.White,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    }
})