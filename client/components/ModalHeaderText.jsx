import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTFAMILY } from '../theme/theme'

const ModalHeaderText = ({ navigation }) => {

    const [active, setActive] = useState(0)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
                <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.containerText}>
                <TouchableOpacity onPress={() => setActive(0)} >
                    <Text style={[styles.textHeader, {
                        color: active === 0 ? COLORS.Black : COLORS.WhiteGrey,
                        textDecorationLine: active === 0 ? 'underline' : 'none'
                    }]}>
                        Stays
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActive(1)} >
                    <Text style={[styles.textHeader, {
                        color: active === 1 ? COLORS.Black : COLORS.WhiteGrey,
                        textDecorationLine: active === 1 ? 'underline' : 'none'
                    }]}>
                        Experiences
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconPlaceholder} />
        </View>
    )
}

export default ModalHeaderText

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        flex: 1
    },
    containerText: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
        gap: 7
    },
    textHeader: {
        fontSize: 18,
        fontFamily: FONTFAMILY.poppins_bold
    },
    icon: {
        borderColor: COLORS.Grey,
        borderRadius: 20,
        borderWidth: 1,
        padding: 4,
    },
    iconPlaceholder: {
        width: 24,
        height: 24,
    },
})