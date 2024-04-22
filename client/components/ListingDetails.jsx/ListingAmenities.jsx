import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { SvgAllAmenities } from '../../utils/data/allAmenities';
import { FONTFAMILY } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

const ListingAmenities = ({ amenties }) => {
    const [toggle, setToggle] = useState(false)
    const navigation = useNavigation()

    const getSvgPathByName = (name) => {
        const amenity = SvgAllAmenities.find(item => item.name === name);
        return amenity ? amenity.svgPath : null;
    }

    const getAmenities = (obj) => {
        const resultArray = [];

        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                const arr = obj[key];
                resultArray.push(...arr);
            }
        }

        return resultArray;
    }

    const allAmenities = useMemo(() => {
        return getAmenities(amenties)
    }, [amenties])
    // console.log(allAmenities)

    return (
        <View>
            <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_semibold }}>
                What this place offers
            </Text>
            <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                {allAmenities.slice(0, 5).map((amenityName, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: 5 }}>
                        {getSvgPathByName(amenityName)}
                        <Text style={{ alignSelf: "center" }}>{amenityName}</Text>
                    </View>
                ))}
            </View>
            {allAmenities.length > 5 && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('ListingAmenitiesDetails', {
                        amenties: amenties
                    })}
                >
                    <Text style={styles.buttonText}>Show all {allAmenities.length} amenities</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ListingAmenities

const styles = StyleSheet.create({
    button: {
        paddingVertical: 13,
        paddingHorizontal: 23,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 24,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: FONTFAMILY.poppins_semibold
    }
})