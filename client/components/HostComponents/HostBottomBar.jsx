import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTFAMILY } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'

const HostBottomBar = ({data ,isDisable, navigationTarget}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.nextButton, {opacity: isDisable ? 0.5 : 1}]} disabled={isDisable} onPress={() => navigation.navigate(navigationTarget, {data})}>
            <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default HostBottomBar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopColor: 'grey',
        borderWidth: 0.5,
        borderOpacity: 0.5,
        backgroundColor: '#FDFFFF',
    },
    backButton: {
        fontFamily: FONTFAMILY.poppins_medium,
        textDecorationLine: 'underline',
        fontSize: 14,
        marginLeft: 10,
    },
    nextButton: {
        fontSize: 14,
        backgroundColor: '#222222',
        paddingHorizontal: 26,
        paddingVertical: 12,
        borderRadius: 8,
        marginRight: 10,
    },
    nextButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: '#fff',
    }
})