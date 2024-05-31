import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const No_DataMessage = ({ message }) => {
    return (
        <View style={styles.noDataContainer}>
            <View style={styles.noDataContent}>
                <MaterialCommunityIcons name="calendar-check" size={24} color="black" />
                <Text style={styles.noDataText}>{message}</Text>
            </View>
        </View>
    )
}

export default No_DataMessage

const styles = StyleSheet.create({
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
    },
    noDataContent: {
        width: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 24,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 14,
    },
})