import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme'

const RequestComponent = () => {
    return (
        <View style={styles.infoHouse}>
            <Text style={{ fontSize: 11, fontFamily: FONTFAMILY.poppins_regular, }}>
                By selecting the button below,
                I agree to the <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>Host's House Rules,</Text>
                <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}> Ground rules for guests,</Text>
                <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>Airbnb's Rebooking and Refund Policy</Text> and that Airbnb can <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>charge my payment method</Text> if I'm responsible for damage.
                I agree to pay the total amount shown if the Host accepts my booking request.
            </Text>
            <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20 }]} >
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