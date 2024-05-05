import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const StarReservation = ({ star }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 5 }}>
            {[...Array(5)].map((_, index) => {
                return (
                    <View key={index}>
                        {star >= index + 1 ? (
                            <FontAwesome name="star" size={30} color={"#ffc107"} />
                        ) : (
                            <FontAwesome name="star-o" size={30} color='#e4e5e9' />
                        )}
                    </View>
                );
            })}
        </View>
    )
}

export default StarReservation

const styles = StyleSheet.create({})