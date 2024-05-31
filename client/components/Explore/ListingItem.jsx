import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Animated, { FadeInRight, FadeOutLeft, useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { FavouritesResidency } from '../../api/Residency'
import useUserStore from '../../store/User'
import { Ionicons } from '@expo/vector-icons'
import { BORDERRADIUS, COLORS, FONTFAMILY, SPACING } from '../../theme/theme'
import { starts } from '../../utils/calculateStar'
import { hasFavorited } from '../../utils/FavoriteResidency'

const AnimatedImage = Animated.createAnimatedComponent(Image)

const { width: ScreenWidth } = Dimensions.get('window')
const ListingItem = ({ item }) => {

    const { userData, setFavResidenciesId } = useUserStore()

    const handleFavorite = async (id) => {
        const data = FavouritesResidency(id, userData?.email)
        setFavResidenciesId(id)
    }

    const navigation = useNavigation()
    const [idOndoubleTab, setIdDoubleTab] = useState()
    // ----------------------------------Animation-----------------------------

    // khi lồng Double trong Single , nhấn cả double thì single nó cũng chạy theo 
    // nên tạo 1 doubleRef để ưu tiên double chạy trước tránh trường hợp single chạy cùng
    const doubleRef = useRef()
    const scaleHeart = useSharedValue(0)
    const opacityDes = useSharedValue(1);

    // khi lồng Double trong Single , nhấn cả double thì single nó cũng chạy theo 
    // --> cần tạo biến isDoubleTab và xài thêm setTimeOut để hoàn singleTab
    const isDoubleTap = useRef(false);
    const rStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: Math.max(scaleHeart.value, 0) }
        ]
    }))

    const rDesStyle = useAnimatedStyle(() => ({
        opacity: opacityDes.value,
    }));

    const onDoubleTab = useCallback(async (itemId) => {
        isDoubleTap.current = true;// Đánh dấu đã xảy ra double tap
        if (!hasFavorited(itemId, userData)) {
            setIdDoubleTab(itemId)
            scaleHeart.value = withSpring(1, undefined, (isFinished) => {
                if (isFinished) {
                    scaleHeart.value = withDelay(500, withSpring(0));
                }
            });
        }
        setTimeout(() => { isDoubleTap.current = false; }, 300); // Reset cờ sau một khoảng thời gian
        await handleFavorite(itemId)
    }, [])

    const onSingleTap = useCallback((itemId) => {
        // withTiming được sử dụng để tạo một animation cho thuộc tính opacity
        // opacityDes.value = withTiming(0, undefined, (isFinished) => {
        //     if (isFinished) {
        //         opacityDes.value = withDelay(500, withTiming(1));
        //     }

        // });

        // hoãn lại để ưu tiên doubleTab chạy trước
        setTimeout(() => {
            if (!isDoubleTap.current) {
                navigation.navigate('listingdetails', { id: itemId });
            }
        }, 300);
    }, []);

    return (
        <Animated.View key={item?.id} style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
            <TapGestureHandler
                waitFor={doubleRef}
                numberOfTaps={1}
                onActivated={() => onSingleTap(item?.id)}
            >
                <TapGestureHandler
                    maxDelayMs={250}
                    ref={doubleRef}
                    numberOfTaps={2}
                    onActivated={() => onDoubleTab(item?.id)}
                >
                    <Animated.View style={[rDesStyle]}>
                        <ImageBackground source={{ uri: item.photos[0].url }} style={styles.image} >
                            {idOndoubleTab == item?.id &&
                                <AnimatedImage source={require('../../assets/image/heart.png')} style={[styles.image, {},
                                    rStyle
                                ]} resizeMode='center' />
                            }
                        </ImageBackground>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => handleFavorite(item?.id)}>
                            {hasFavorited(item?.id, userData) ?
                                <Ionicons name="heart" size={24} color={COLORS.primary} />
                                : <Ionicons name='heart-outline' size={24} color={COLORS.Black} />
                            }
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: 16 }}>
                                    {item.title}
                                </Text>
                                <View style={{ flexDirection: "row", gap: 4 }}>
                                    <Ionicons name='star' size={16} color={COLORS.Yellow} />
                                    <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>{starts(item?.Rating)}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontFamily: FONTFAMILY.poppins_regular }} >{item.mapData?.region ? item?.mapData?.region + ", " + item?.mapData?.country : item?.mapData?.place + ", " + item?.mapData?.country}</Text>
                                <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                                    {item?.locationType?.name}
                                </Text>
                                <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }} >
                                    {item?.price}$ <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>night</Text>
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                </TapGestureHandler>
            </TapGestureHandler>
        </Animated.View>

    )
}

export default ListingItem

const styles = StyleSheet.create({
    listing: {
        gap: 10,
        marginVertical: SPACING.space_16,
        alignItems: "center"
    },
    image: {
        width: ScreenWidth * 0.9,
        height: 300,
        borderRadius: BORDERRADIUS.radius_10
    },
    info: {
        textAlign: "center",
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 16,
        marginTop: 4,
    },
    ripple: {
        width: "100%",
        overflow: "hidden",
        borderRadius: BORDERRADIUS.radius_10,
    },
})