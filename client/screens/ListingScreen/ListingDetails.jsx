import { Dimensions, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { COLORS, FONTFAMILY, SPACING, defaultStyles } from '../../theme/theme';
import Animated, { SlideInDown, interpolate, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { starts } from '../../utils/calculateStar';
import { getDate } from '../../utils/getDate';
import { useNavigation } from '@react-navigation/native';
import ListingAmenities from '../../components/ListingDetails.jsx/ListingAmenities';
import LocationList from '../../components/ListingDetails.jsx/LocationList';
import { getResidency } from '../../api/Residency';
import ReviewListing from '../../components/ListingDetails.jsx/ReviewListing';

const { width } = Dimensions.get('window')
const ListingDetails = ({ route }) => {
    const { id } = route.params;
    const [listing, setListing] = useState()
    const [loading, setLoading] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getResidency(id)
                // mặc định ban đầu sẽ tải hết dữ liệu
                setListing(data)
                setTimeout(() => {
                    setLoading(false)
                }, 100)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [id])

    const scrollRef = useRef()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const navigation = useNavigation()
    const shareListing = async () => {
        try {
            await Share.share({
                title: listing.title,
                url: listing?.photos[2]?.url,
            });
        } catch (err) {
            console.log(err);
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => (
                <Animated.View style={[styles.header, headerAnimatedStyle]} />
            ),
            headerRight: () => (
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
                        <Ionicons name="share-outline" size={22} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundButton} >
                        <Ionicons name="heart-outline" size={22} color={'#000'} />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()} >
                    <Ionicons name="chevron-back" size={22} color={'#000'} />
                </TouchableOpacity>
            )
        })
    }, [])
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-300, 0, 300],
                        [-300 / 2, 0, 300 * 0.75]
                    )
                },
                {
                    scale: interpolate(scrollOffset.value, [-300, 0, 300], [2, 1, 1]),
                },
            ]
        }
    })
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, 300 / 1.5], [0, 1])
        }
    })
    return (
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 100 }} scrollEventThrottle={16}>
                <Animated.Image source={{ uri: listing?.photos[0]?.url }} style={[styles.image, imageAnimatedStyle]} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{listing?.title}</Text>
                    <Text style={styles?.location}>
                        {listing?.placeType?.type} in {listing?.mapData?.region ? listing?.mapData?.region + ", " + listing?.mapData?.country : listing?.mapData?.place + ", " + listing?.mapData?.country}
                    </Text>
                    <Text style={styles.rooms}>
                        {listing?.placeSpace?.guetsts?.quantity} guests · {listing?.placeSpace?.bedrooms?.quantity} bedrooms · {listing?.placeSpace?.beds?.quantity} bed ·{' '}
                        {listing?.placeSpace?.bathrooms?.quantity} bathrooms
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Ionicons name="star" size={16} />
                        <Text style={styles.ratings}>
                            {starts(listing?.Rating)} · {listing?.Rating?.length} reviews
                        </Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        <Image source={{ uri: listing?.photos[listing?.photos.length - 1].url }} style={styles.host} />

                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing?.userEmail}</Text>
                            <Text>Host since {getDate(listing?.createdAt)}</Text>
                        </View>
                    </View>


                    {/* Description */}
                    <View style={styles.divider} />

                    <Text style={styles.description}>{listing?.description}</Text>

                    {/* Amenities */}
                    <View style={styles.divider} />

                    <ListingAmenities amenties={listing?.placeAmeneties} />

                    {/* Map */}
                    <LocationList mapLocation={listing?.locationData} mapData={listing?.mapData} />

                    {/* Reviews */}
                    <View style={styles.divider} />
                    <ReviewListing ResidencyId={listing?.id} />

                </View>
            </Animated.ScrollView>
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>
                            ${listing?.price}{" "}
                            <Text style={{
                                fontSize: 15,
                                fontFamily: FONTFAMILY.poppins_medium,
                            }}>
                                night
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20 }]} onPress={() => navigation.navigate('ReserveScreen',
                        {
                            ResidencyId: listing?.id,
                            title: listing?.title,
                            locationType: listing?.locationType,
                            placeType: listing?.placeType,
                            Review: {
                                rating: starts(listing?.Rating),
                                lengthReview: listing?.Rating?.length
                            },
                            image: listing?.photos[0]?.url
                        }
                    )}>
                        <Text style={defaultStyles.btnText}>
                            Reserve
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

        </View>
    )
}

export default ListingDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.White,
    },
    image: {
        width: width,
        height: 300
    },
    infoContainer: {
        padding: SPACING.space_24,
        backgroundColor: COLORS.White,
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    location: {
        fontSize: 18,
        marginTop: SPACING.space_10,
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    rooms: {
        fontSize: 16,
        color: COLORS.Grey,
        marginVertical: 4,
        fontFamily: FONTFAMILY.poppins_regular,
    },
    ratings: {
        fontSize: 16,
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.Grey,
        marginVertical: 16,
    },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: COLORS.Grey,
    },
    hostView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    footerPrice: {
        fontSize: 18,
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.primary,
        borderWidth: StyleSheet.hairlineWidth
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    header: {
        backgroundColor: COLORS.White,
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLORS.Grey,
    },

    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: FONTFAMILY.poppins_regular,
    },
})