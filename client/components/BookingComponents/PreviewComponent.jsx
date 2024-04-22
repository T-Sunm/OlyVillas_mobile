import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { COLORS, FONTFAMILY } from '../../theme/theme'


const AnimatedTouchbleOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const PreviewComponent = ({ onOpen, previewData, previewText }) => {

    return (
        <AnimatedTouchbleOpacity onPress={onOpen} style={styles.cardPreiview} entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>
                {previewText}
            </Text>
            <Text style={styles.previewdData}>
                {previewData}
            </Text>
        </AnimatedTouchbleOpacity>
    )
}

export default PreviewComponent

const styles = StyleSheet.create({

    cardPreiview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    previewText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 14,
        color: COLORS.Grey,
    },
    previewdData: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 14,
        color: COLORS.dark,
    },
})