import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../../theme/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { differenceInDays, formatDateRange } from '../../utils/getDate'
import { useNavigation } from '@react-navigation/native'
import Ripple from '../Animation/Ripple'

const CardReservation = ({ item }) => {
    const navigation = useNavigation()

    const dateRangeText = formatDateRange(item?.startDate, item?.endDate);
    const flexBasisValue = dateRangeText.length > 17 ? '30%' : '20%';
    const flexBasisValueDescription = dateRangeText.length > 17 ? '70%' : '80%';

    const handleNavigation = () => {
        navigation.navigate("TripsDetails", { id: item?.id })
    }

    return (
        <Ripple style={styles.card} onTap={handleNavigation}>
            <Image
                source={{ uri: item?.Residency?.photos[0]?.url }}
                style={styles.image}
            />
            <Text style={styles.checkOutText}>Checkout in {differenceInDays(new Date().toISOString(), item?.endDate)} days</Text>

            <View style={{ padding: 20 }}>
                <View style={styles.containTitle}>
                    <Text style={styles.title}>{item?.Residency?.title}</Text>
                    <Text style={styles.subTitle}>{item?.Residency?.placeType?.type} {item?.Residency?.locationType?.name.toLowerCase()} hosted by {item?.Residency?.owner?.lastName} {item?.Residency?.owner?.firstName}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.details}>
                    <View
                        style={{ flexBasis: flexBasisValue, borderRightWidth: 1, borderRightColor: COLORS.DarkGrey }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_regular }}>{dateRangeText}</Text>
                    </View>
                    <View style={{ flexBasis: flexBasisValueDescription, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_regular }}>{item?.Residency?.mapData?.street_address} {item?.Residency?.mapData?.district}</Text>
                        <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_regular }}>{item?.Residency?.mapData?.place}</Text>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>{item?.Residency?.mapData?.country}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.detailsButton} >
                <View style={styles.iconDetails}>
                    <MaterialIcons name="menu-book" size={24} color="white" />
                </View>
                <View style={{ width: "80%" }}>
                    <Text numberOfLines={2} style={styles.detailsText}><Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>Your check in details:</Text> Getting
                        there, getting inside, and wifi.</Text>
                </View>
            </TouchableOpacity>
        </Ripple>

    )
}

export default CardReservation

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 4,
        backgroundColor: '#fff',
    },
    image: {
        width: "100%",
        height: 180
    },
    checkOutText: {
        position: "absolute",
        backgroundColor: COLORS.White,
        top: 7,
        left: 7,
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_semibold,
        borderRadius: 5
    },
    containTitle: {

    },
    title: {
        fontSize: 27,
        fontFamily: FONTFAMILY.poppins_semibold
    },
    subTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.WhiteGrey
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.Grey,
        marginVertical: 15
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    detailsButton: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 20,
        marginBottom: 10
    },
    iconDetails: {
        backgroundColor: COLORS.Grey,
        borderRadius: 99,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    detailsText: {

    }
})