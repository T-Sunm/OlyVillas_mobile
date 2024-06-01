import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from '../../theme/theme'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useUserStore from '../../store/User'

const { width: ScreenWidth } = Dimensions.get('window')
const ReservationItem = ({ item }) => {
    const { userData } = useUserStore()
    const navigation = useNavigation()

    const handleNavigation = () => {
        navigation.navigate("TripsDetails", { id: item?.id, isAdmin: userData?.email === item?.Residency?.owner?.email })
    }
    return (
        <View style={{ width: ScreenWidth * 0.8 }} >
            <Image source={{ uri: item?.Residency?.photos[0].url }} style={styles.image} />
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: 16 }}>
                        {item?.Residency?.title}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons name='star' size={16} color={COLORS.Yellow} />
                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                        {item?.Residency?.locationType?.name}
                    </Text>
                    <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }} >
                        {item?.Residency?.price}$ <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>night</Text>
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.detailsButton} onPress={handleNavigation} >
                <View style={styles.iconDetails}>
                    <MaterialIcons name="menu-book" size={24} color="white" />
                </View>
                <View style={{ width: "80%" }}>
                    <Text numberOfLines={2} style={styles.detailsText}><Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>Your check in details:</Text> Getting
                        there, getting inside, and wifi.</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ReservationItem

const styles = StyleSheet.create({
    listing: {
        gap: 10,
        marginVertical: SPACING.space_16,
        alignItems: "center"
    },
    image: {
        width: ScreenWidth * 0.8,
        height: 300,
        borderRadius: BORDERRADIUS.radius_10
    },
    info: {
        textAlign: "center",
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        marginTop: 4,
    },
    detailsButton: {
        flexDirection: "row",
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
})