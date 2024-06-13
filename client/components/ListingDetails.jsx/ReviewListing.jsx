import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTFAMILY } from '../../theme/theme';
import { starts } from '../../utils/calculateStar';
import Star from '../Star/Star';
import { getRatingByResidency } from '../../api/Rating';

const ReviewListing = ({ ResidencyId }) => {

    const [reviews, setReviews] = useState()
    const [loading, setLoading] = useState()

    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    }, [ResidencyId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getRatingByResidency(ResidencyId)
                // mặc định ban đầu sẽ tải hết dữ liệu
                setReviews(data)
                console.log(data)
                setTimeout(() => {
                    setLoading(false)
                }, 100)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [ResidencyId])

    if (reviews == undefined) {
        return
    }

    const renderItem = ({ item }) => (
        <View style={styles.containerReview}>
            <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
                <Star star={item.stars} />
                <Text style={{ color: 'black' }}>
                    ·
                </Text>
                <Text style={{ fontFamily: FONTFAMILY.poppins_bold }}>
                    {formatDate(item.createdAt)}
                </Text>
            </View>
            <View style={{ flexBasis: 140 }}>
                <Text>
                    {item?.comment}
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <View style={styles.containerWriter}>
                    <Text style={styles.writer}>
                        {item.User?.firstName[0].toUpperCase()}
                    </Text>
                </View>
                <Text>
                    {item.User?.firstName} {item.User?.lastName}
                </Text>
            </View>
        </View>
    );


    return (
        <View>
            <Text style={{ marginVertical: 20 }} >
                <FontAwesome name="star" size={24} color="black" />
                <Text style={styles.title}>
                    {starts(reviews)} · {reviews?.length} reviews
                </Text>
            </Text>

            {/* <FlatList  /> */}
            <FlatList
                data={reviews}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    )
}

export default ReviewListing

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: FONTFAMILY.poppins_semibold
    },
    containerReview: {
        width: 300,
        height: 230,
        borderWidth: 1,
        borderColor: COLORS.Black,
        borderRadius: 20,
        padding: 20,
    },
    containerWriter: {
        width: 30,
        height: 30,
        borderRadius: 99,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.Black,

    },
    writer: {
        color: COLORS.White
    }
})