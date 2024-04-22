import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import data from '../../utils/EditAmenities'
import { SvgAllAmenities } from '../../utils/data/allAmenities'
import Animated, { interpolate, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTFAMILY } from '../../theme/theme'

const ListingAmenitiesDetails = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { amenties } = route.params;
    const scrollRef = useRef()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const getSvgPathByName = (name) => {
        const amenity = SvgAllAmenities.find(item => item.name === name);
        return amenity ? amenity.svgPath : null;
    }

    function getTitleByKey(data, searchKey) {
        for (let item of data) {
            if (item.key === searchKey) {
                return item.title;
            }
        }
        return null;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => (
                <Animated.View style={[styles.header, headerAnimatedStyle]} />
            ),
            headerLeft: () => (
                < TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()} >
                    <Ionicons name="chevron-back" size={22} color={'#000'} />
                </TouchableOpacity>
            )
        })
    }, [])
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, 300 / 1.5], [0, 1])
        }
    })
    return (
        <Animated.ScrollView style={styles.container} ref={scrollRef}>
            <Text style={{ fontSize: 25, fontFamily: FONTFAMILY.poppins_semibold, marginBottom: 20 }}>
                Amenities
            </Text>
            {Object.keys(amenties)
                .filter(keyAmenities => amenties[keyAmenities].length > 0)
                .map(keyAmenities => (
                    <View key={keyAmenities} style={styles.section}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {getTitleByKey(data, keyAmenities)}
                            </Text>
                        </View>
                        <View style={styles.list}>
                            {amenties[keyAmenities].map((amentie, index) => (
                                <View key={index} style={styles.item}>
                                    {getSvgPathByName(amentie)}
                                    <Text>{amentie}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))
            }
        </Animated.ScrollView >
    )
}

export default ListingAmenitiesDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 100,
        marginBottom: 50
    },
    header: {
        backgroundColor: COLORS.White,
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.Grey,
    },
    section: {
        flexDirection: 'column',
        paddingBottom: 10,
    },
    titleContainer: {
        paddingVertical: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
    },
    list: {
        flexDirection: 'column',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Use a lighter color for the border
    },
});