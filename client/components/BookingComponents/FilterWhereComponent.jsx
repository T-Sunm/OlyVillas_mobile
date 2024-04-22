import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'

import { COLORS, FONTFAMILY } from '../../theme/theme'
import { places } from '../../utils/data/places'

const FilterWhereComponent = ({ setSelectedPlace, selectedPlace, headerText }) => {
    return (
        <>
            <Animated.Text style={styles.cardHeader} entering={FadeIn}>
                {headerText}
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
                <View style={styles.searchSection}>
                    <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput style={styles.inputField} placeholder='Search destination' placeholderTextColor={COLORS.Grey} />
                </View>
                {/* cách để kh bị height của flatList cắt ngang => thêm padding dọc và alignItem */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 25, alignItems: "center", paddingVertical: 10 }}>
                    {places.map((image, indexImage) => (
                        <TouchableOpacity key={indexImage} onPress={() => setSelectedPlace(indexImage)}  >
                            <Image source={image.img} style={selectedPlace == indexImage ? styles.placeSelected : styles.place} />
                            <Text style={selectedPlace == indexImage ? styles.textSelected : styles.text}>
                                {image.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </>

    )
}

export default FilterWhereComponent

const styles = StyleSheet.create({
    cardHeader: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        marginBottom: 16,
    },
    inputField: {
        flex: 1,
        backgroundColor: COLORS.White,
        padding: 10
    },
    searchIcon: {
        padding: 10,

    },
    place: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: COLORS.Grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    text: {
        padding: 6,
        fontFamily: FONTFAMILY.poppins_regular,
    },
    textSelected: {
        padding: 6,
        fontFamily: FONTFAMILY.poppins_semibold,

    }
})