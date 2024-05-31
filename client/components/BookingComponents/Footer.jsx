import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme'

const Footer = ({ onClearAll, navigation, onSearch }) => {

    const handleSearch = () => {
        onSearch()
        navigation.goBack()
    }

    return (
        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={onClearAll} >
                    <Text style={styles.textFooter} >
                        Clear all
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[defaultStyles.btn, styles.btnSearch]} onPress={handleSearch} >
                    <Ionicons name='search-outline' size={24} style={{}} color={COLORS.White} />
                    <Text style={defaultStyles.btnText} >
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default Footer

const styles = StyleSheet.create({
    textFooter: {
        fontSize: 18,
        fontFamily: FONTFAMILY.poppins_semibold,
        textDecorationLine: 'underline'
    },
    btnSearch: {
        flexDirection: 'row',
        padding: 10,
        gap: 10
    },
})