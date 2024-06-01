import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import No_DataMessage from './No_DataMessage'
import ReservationItem from './ReservationItem'

const ReservationStatus = ({ status, filterReservation }) => {
    return (
        <View>
            {filterReservation.length === 0 && <No_DataMessage message={status} />}
            {filterReservation && (
                <ScrollView horizontal contentContainerStyle={{ gap: 8 }} showsHorizontalScrollIndicator={false}>
                    {filterReservation.map((reservation, index) => {
                        return <ReservationItem key={index} item={reservation} />
                    })}
                </ScrollView>
            )}
        </View>
    )
}

export default ReservationStatus

const styles = StyleSheet.create({})