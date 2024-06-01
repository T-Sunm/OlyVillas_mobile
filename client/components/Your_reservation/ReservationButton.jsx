import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../theme/theme'

const ReservationButton = ({ title, onPress, isActive }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, isActive ? { borderColor: COLORS.Black } : { borderColor: COLORS.DarkGrey }]}
        >
            <Text style={[isActive ? { color: COLORS.Black } : { color: COLORS.DarkGrey }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ReservationButton

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 20
    }
})