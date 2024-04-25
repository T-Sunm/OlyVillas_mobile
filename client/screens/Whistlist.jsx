import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import useResidenciesStore from '../store/residencyStore'
import { FavouritesResidency } from '../api/Residency'
import useUserStore from '../store/User'
import { useNavigation } from '@react-navigation/native'
import { starts } from '../utils/calculateStar'
import { hasFavorited } from '../utils/FavoriteResidency'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

const Whistlist = () => {
    const navigation = useNavigation()
    const { residencies } = useResidenciesStore()
    const { userData, setFavResidenciesId } = useUserStore()
    const [loading, setLoading] = useState(false)
    const handleFavorite = async (id) => {
        const data = FavouritesResidency(id, userData?.email)
        console.log(data)
        setFavResidenciesId(id)
    }

    const renderRow = ({ item }) => {
        if (hasFavorited(item?.id, userData)) {
            return <TouchableOpacity onPress={() => navigation.navigate('listingdetails', { id: item?.id })}>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{ uri: item.photos[0].url }} style={styles.image} />
                    <TouchableOpacity style={{ position: 'absolute', top: 30, right: 30 }} onPress={() => handleFavorite(item?.id)}>
                        {hasFavorited(item?.id, userData) ?
                            <Ionicons name="heart" size={24} color={COLORS.primary} />
                            : <Ionicons name='heart-outline' size={24} color={COLORS.Black} />
                        }
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: 16 }}>
                            {item.title}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                            <Ionicons name='star' size={16} color={COLORS.yellow} />
                            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>{starts(item?.Rating)}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_regular }} >
                            {item.mapData?.region ? item.mapData.region + ", " + item.mapData.country : item.mapData.place + ", " + item.mapData.country}
                        </Text>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                            {item.locationType.name}
                        </Text>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }} >
                            {item.price}$ <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>night</Text>
                        </Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        }

    };

    return (
        <View style={styles.root}>
            <Text style={{ fontSize: 30, fontFamily: FONTFAMILY.poppins_semibold }}>Wishlists</Text>
            <FlatList
                data={loading ? [] : residencies}
                renderItem={renderRow}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

export default Whistlist

const styles = StyleSheet.create({
    root: {
        paddingTop: 100,
        paddingHorizontal: 20
    },
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