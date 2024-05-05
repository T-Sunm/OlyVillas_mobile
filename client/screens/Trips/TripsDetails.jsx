import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme';
import { Fontisto } from '@expo/vector-icons';
import Infants from '../../assets/svg/human/Infants';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { formatDateRange2 } from '../../utils/getDate';
import Animated, { SlideInDown } from 'react-native-reanimated';
import StarRating from '../../components/Star/StarRating';
import { getDetailsReservation } from '../../api/Reservation';
import useUserStore from '../../store/User';
import { createRating } from '../../api/Rating';
import Star from '../../components/Star/Star';
import StarReservation from '../../components/Star/StarReservation';
import BottomSheetRating from '../../components/Trips/BottomSheetRating';

const Guests = [
    {
        title: "Adults",
        icon: <MaterialIcons name="emoji-people" size={40} color="black" />,
        quantity: 0,
        styles: { marginRight: 10 }
    },
    {
        title: "Children",
        icon: <FontAwesome6 name="children" size={30} color="black" />,
        quantity: 0,
        styles: { marginRight: 10 }
    },
    {
        title: "Infants",
        icon: <Infants />,
        quantity: 0,
        styles: { marginRight: 5 }
    }
]

const TripsDetails = ({ route }) => {
    const { id } = route.params;

    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState()
    const { userData } = useUserStore()
    const [rating, setRating] = useState()
    const [comment, setComment] = useState()

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getDetailsReservation(id);

            setItem(data);
            setRating(data?.Rating[0]?.stars)
            setComment(data?.Rating[0]?.comment)
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        fetchData(true);
    };



    const handleRating = async (rating, comment) => {
        const data = {
            userId: userData.id,
            ResidencyId: item?.ResidencyId,
            ReservationId: id,
            stars: rating,
            comment: comment
        }
        setLoading(true);
        const result = await createRating(data);
        setRating(rating)
        setComment(comment)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }


    const formattedDates = useMemo(() => formatDateRange2(item?.startDate, item?.endDate), [item]);
    if (item) {
        Guests.forEach(guest => {
            const title = guest.title;
            if (item?.tripInfo[title] !== undefined) {
                guest.quantity = item?.tripInfo[title];
            }
        });
    }
    return (
        <>
            <ScrollView
                style={{ flex: 1, paddingHorizontal: 30, marginBottom: 80 }}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{ alignItems: "center", marginBottom: 40, marginTop: 50 }}>
                    <View style={{ backgroundColor: COLORS.Black, width: 80, height: 80, alignItems: "center", justifyContent: "center", borderRadius: 99, marginBottom: 15 }}>
                        <Text style={{ color: COLORS.White, fontSize: 40 }}>
                            {item?.Residency?.owner?.firstName.charAt(0)}
                        </Text>
                    </View>
                    <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: 15 }}>
                        Your host, {item?.Residency?.owner?.lastName} {item?.Residency?.owner?.firstName}
                    </Text>
                    <View style={{ justifyContent: 'center', alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                        <Text style={{ textAlign: "center", lineHeight: 20, fontFamily: FONTFAMILY.poppins_medium, color: COLORS.WhiteGrey }}>
                            Have a question about your reservation? The best way to get information is to ask your host directly
                        </Text>
                    </View>
                    <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20, width: "80%", marginTop: 10 }]} >
                        <Text style={defaultStyles.btnText}>
                            Message Host
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", gap: 10, marginVertical: 20, alignItems: "center" }}>
                        <Fontisto name="email" size={24} color={COLORS.WhiteGrey} />
                        <Text style={{ fontSize: 20, color: COLORS.Turquoise }} >
                            {item?.Residency?.owner?.email}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 20, color: COLORS.Turquoise }}>
                        Send or request money
                    </Text>
                </View>

                <View style={styles.divider} />

                {/* ----------GUESTS-------- */}
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Guests
                    </Text>
                    <View style={{ width: "100%" }}>
                        {Guests.map((item, index) => (
                            <View key={index} style={styles.guestItem}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={[styles.iconContainer, item.styles]}>
                                        {item.icon}
                                    </View>
                                    <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={styles.editNumberContain}>
                                    <Text
                                        style={{
                                            fontFamily: FONTFAMILY.poppins_regular,
                                            fontSize: 16,
                                            minWidth: 18,
                                            textAlign: 'center',
                                        }}>
                                        {item.quantity}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* CHECKIN - CHECKOUT */}
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                    <View style={{ flexBasis: "40%" }}>
                        <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_semibold, textAlign: "center" }}>
                            Check In
                        </Text>
                        <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_medium, textAlign: "center" }} numberOfLines={2}>
                            {formattedDates.checkIn}
                        </Text>
                    </View>
                    <View style={{ flexBasis: "40%" }}>
                        <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_semibold, textAlign: "center" }}>
                            Check Out
                        </Text>
                        <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_medium, textAlign: "center" }} numberOfLines={2}>
                            {formattedDates.checkOut}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />
                {/* Address */}
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Address
                    </Text>
                    <View style={{ paddingHorizontal: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_medium }}>{item?.Residency?.mapData?.street_address} {item?.Residency?.mapData?.district}</Text>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_medium }}>{item?.Residency?.mapData?.place}</Text>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_medium }}>{item?.Residency?.mapData?.country}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.Turquoise, fontSize: 15 }}>
                                Get directions
                            </Text>
                        </TouchableOpacity>
                        <View style={{
                            width: StyleSheet.hairlineWidth,
                            backgroundColor: COLORS.Grey,
                            marginHorizontal: 15,
                            height: "100%"
                        }}></View>
                        <TouchableOpacity >
                            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, color: COLORS.Turquoise, fontSize: 15 }}>
                                View listing
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.divider} />

                {/* Price */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                                Total
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                                (
                                <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>
                                    USD
                                </Text>
                                )
                            </Text>

                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                            ${item?.price}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {item?.Status == "Pending" && (
                <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)} >
                    <View style={{}}>
                        <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 10 }]}>
                            <Text style={defaultStyles.btnText}>
                                Cancel reserve
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {item?.Status === "Success" &&
                <BottomSheetRating onRating={handleRating} rating={rating} comment={comment} />
            }
        </>
    )
}

export default TripsDetails

const styles = StyleSheet.create({
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.Grey,
        marginVertical: 15
    },
    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.Grey,
    },
    editNumberContain: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})