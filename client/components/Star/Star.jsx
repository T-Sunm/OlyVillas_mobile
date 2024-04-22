import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Star = ({ star }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {[...Array(5)].map((_, index) => {
                return (
                    <View key={index}>
                        {star >= index + 1 ? (
                            <FontAwesome name="star" size={15} color="black" />
                        ) : (
                            <FontAwesome name="star-o" size={15} color="black" />
                        )}
                    </View>
                );
            })}
        </View>
    )
}

export default Star

const styles = StyleSheet.create({})