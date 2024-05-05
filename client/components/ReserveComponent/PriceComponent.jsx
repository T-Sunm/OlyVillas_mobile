import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { COLORS, FONTFAMILY } from '../../theme/theme'
import { differenceInDays } from '../../utils/getDate'
import useReserveStore from '../../store/reserveStore'

const PriceComponent = ({ price }) => {

    const { rangeDate, setPrice } = useReserveStore()

    const PriceDays = useMemo(() => {
        return (price * differenceInDays(rangeDate.startDate, rangeDate.endDate)).toFixed(2)
    }, [price, rangeDate])
    const Fees = useMemo(() => {
        return (price * differenceInDays(rangeDate.startDate, rangeDate.endDate) * 0.14).toFixed(2)
    }, [price])

    useEffect(() => {
        const totalPrice = parseFloat(Fees) + parseFloat(PriceDays);
        setPrice(parseFloat(totalPrice.toFixed(2)));
    }, [Fees, PriceDays]);
    return (
        <View style={styles.infoHouse}>
            <Text style={{ fontSize: 19, fontFamily: FONTFAMILY.poppins_semibold }}>Price details</Text>
            <View style={{ flexDirection: "column", borderBottomColor: COLORS.DarkGrey, borderBottomWidth: 1, paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>
                            ${price} x {differenceInDays(rangeDate.startDate, rangeDate.endDate).toFixed(0)} nights
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>
                            ${PriceDays}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>
                            OlyVillas service fee
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>
                            ${Fees}
                        </Text>
                    </View>
                </View>

            </View>
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
                        ${parseFloat(Fees) + parseFloat(PriceDays)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default PriceComponent

const styles = StyleSheet.create({
    infoHouse: {
        flexDirection: "column",
        backgroundColor: COLORS.White,
        padding: 20,
        gap: 10,
        height: "auto",
        marginTop: 10
    }
})