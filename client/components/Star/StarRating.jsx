import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
const StarRating = ({ rating, onRating }) => {
    const [hover, setHover] = useState(null);
    return (
        <View style={styles.ratingContainer}>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onRating(currentRating)}
                        onPressIn={() => setHover(currentRating)}
                        onPressOut={() => setHover(null)}
                    >
                        <FontAwesome
                            name="star"
                            size={30}
                            color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default StarRating

const styles = StyleSheet.create({
    ratingContainer: {
        flexDirection: 'row',
        gap: 5
    },
})