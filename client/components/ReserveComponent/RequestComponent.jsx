import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme'
import useReserveStore from '../../store/reserveStore'
import { createReservation } from '../../api/Reservation'
import useUserStore from '../../store/User'
import { useNavigation } from '@react-navigation/native'

const RequestComponent = ({ ResidencyId }) => {

    const { rangeDate, Guests, infoUser, price, setRangeDate, setGuests, setName, setEmail, setPhone, setPrice } = useReserveStore()
    const navigation = useNavigation()
    const { userData } = useUserStore()
    const customInfoUsers = {
        Adults: Guests.Adults,
        Children: Guests.Children,
        Infants: Guests.Infants,
        Phone: infoUser.Phone,
        Name: infoUser.Name,
        Email: infoUser.Email
    }

    const handleReserve = async () => {
        const isInfoComplete =
            customInfoUsers?.Adults > 0 &&
            customInfoUsers?.Phone.normal.trim() !== '' &&
            customInfoUsers?.Name.trim() !== '' &&
            customInfoUsers?.Email.trim() !== '';
        console.log(customInfoUsers?.Name.trim())
        if (isInfoComplete) {
            const data = await createReservation(userData?.id, ResidencyId, customInfoUsers, price, rangeDate.startDate, rangeDate.endDate)
            setRangeDate({ startDate: new Date(), endDate: new Date() });
            setGuests({ Adults: 1, Children: 1, Infants: 1 });
            setName('');
            setEmail('');
            setPhone('normal', '');
            setPhone('formatted', '');
            setPrice(null);
            navigation.goBack()
        } else {
            Alert.alert(
                'Incomplete Information',
                'Please provide all required information.',
                [{ text: 'OK' }]
            );
        }
    }
    return (
        <View style={styles.infoHouse}>
            <Text style={{ fontSize: 11, fontFamily: FONTFAMILY.poppins_regular, }}>
                By selecting the button below,
                I agree to the <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>Host's House Rules,</Text>
                <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}> Ground rules for guests,</Text>
                <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>Airbnb's Rebooking and Refund Policy</Text> and that Airbnb can <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>charge my payment method</Text> if I'm responsible for damage.
                I agree to pay the total amount shown if the Host accepts my booking request.
            </Text>
            <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20 }]} onPress={handleReserve} >
                <Text style={defaultStyles.btnText}>
                    Reserve
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default RequestComponent

const styles = StyleSheet.create({
    infoHouse: {
        flexDirection: "column",
        backgroundColor: COLORS.White,
        padding: 20,
        gap: 10,
        height: "auto",
        marginTop: 10
    }
})