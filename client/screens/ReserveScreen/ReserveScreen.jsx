import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { COLORS, FONTFAMILY } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import useReserveStore from '../../store/reserveStore';
import YourTripComponent from '../../components/ReserveComponent/YourTripComponent';
import BottomSheetGuest from '../../components/ReserveComponent/BottomSheetGuest';
import InfoUser from '../../components/ReserveComponent/InfoUser';
import PriceComponent from '../../components/ReserveComponent/PriceComponent';
import RequestComponent from '../../components/ReserveComponent/RequestComponent';



const windowHeight = Dimensions.get('window').height;
const ReserveScreen = ({ route }) => {
    const { ResidencyId, title, locationType, placeType, Review, image, price } = route.params;
    const [openGuest, setOpenGuest] = useState(false)

    const bottomSheetRef = useRef(null)
    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index)
        setOpenGuest(true)
    }, [])

    return (
        <>
            <ScrollView style={[styles.root, { opacity: openGuest ? 0.2 : 1 }]}>
                <View style={styles.infoHouse} >
                    <View>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                    <View>
                        <Text style={{ color: COLORS.WhiteGrey, fontFamily: FONTFAMILY.poppins_regular }}>
                            {placeType?.type} {locationType?.name}
                        </Text>
                        <View style={{ width: "80%" }}>
                            <Text style={{ flexBasis: "60%", fontSize: 20, fontFamily: FONTFAMILY.poppins_regular, flexWrap: "wrap" }}
                                numberOfLines={2}
                            >
                                {title}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ marginRight: 5 }} >
                                <Ionicons name="star" size={16} />
                            </View>
                            <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }} >
                                <View>
                                    <Text>
                                        {Review?.rating}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{ color: COLORS.WhiteGrey }}>
                                        ({Review?.lengthReview})
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <YourTripComponent onSnapPress={handleSnapPress} />
                <InfoUser />
                <PriceComponent price={price} />
                <RequestComponent />
            </ScrollView>
            <BottomSheetGuest setOpenGuest={setOpenGuest} bottomSheetRef={bottomSheetRef} />
        </>
    )
}

export default ReserveScreen

const styles = StyleSheet.create({
    root: {
        gap: 15,
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10
    },
    infoHouse: {
        flexDirection: "row",
        backgroundColor: COLORS.White,
        padding: 20,
        gap: 30,
        height: windowHeight * 0.18
    }
})