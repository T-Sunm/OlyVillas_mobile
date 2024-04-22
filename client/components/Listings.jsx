import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getAllProperties } from '../api/Residency'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import { starts } from '../utils/calculateStar'
import Animated from 'react-native-reanimated';
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
const Listings = ({ items, refresh }) => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const listRef = useRef(null)
    // useEffect(() => {
    //     if (refresh) {
    //         listRef.current?.scrollToOffset({ offset: 0, animated: true })
    //     }
    // }, [refresh])
    const renderRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('listingdetails', { id: item?.id })}>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{ uri: item.photos[0].url }} style={styles.image} />
                    <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30 }}>
                        <Ionicons name='heart-outline' size={24} color={COLORS.Black} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: 16 }}>
                            {item.title}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                            <Ionicons name='star' size={16} color={COLORS.Yellow} />
                            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>{starts(item?.Rating)}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_regular }} >{item.mapData?.region ? item?.mapData?.region + ", " + item?.mapData?.country : item?.mapData?.place + ", " + item?.mapData?.country}</Text>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                            {item?.locationType?.name}
                        </Text>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }} >
                            {item?.price}$ <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>night</Text>
                        </Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    return (
        <BottomSheetFlatList ref={listRef} renderItem={renderRow} data={loading ? [] : items} ListHeaderComponent={<Text style={styles.info}>{items?.length} home</Text>} />
    )
}

export default Listings

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: SPACING.space_16
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: BORDERRADIUS.radius_10
    },
    info: {
        textAlign: "center",
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        marginTop: 4
    }
})