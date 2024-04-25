import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import useReserveStore from '../../store/reserveStore';
import { DatePickerModal } from 'react-native-paper-dates'
import { COLORS, FONTFAMILY } from '../../theme/theme';
import { convertISOToFormattedDates } from '../../utils/getDate';

const YourTripComponent = ({ onSnapPress }) => {
    const { setRangeDate } = useReserveStore()
    const { rangeDate, Guests } = useReserveStore(state => state)
    const [openDate, setOpenDate] = useState(false);


    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setRangeDate({ startDate, endDate });
            setOpenDate(false);
            console.log(startDate, endDate)
        },
        [setOpenDate]
    );

    const onDismiss = useCallback(() => {
        setOpenDate(false);
    }, [setOpenDate]);

    return (
        <>
            <View style={styles.infoHouse} >
                <Text style={{ fontSize: 19, fontFamily: FONTFAMILY.poppins_semibold }}>
                    Your trip
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <View>
                            <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_semibold }}>
                                Dates
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>
                                {convertISOToFormattedDates(rangeDate.startDate, rangeDate.endDate)}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setOpenDate(true)}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View>
                        <View>
                            <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_semibold }}>
                                Guest
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular }}>
                                {Guests.Adults + Guests.Children} guest
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onSnapPress(1)}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DatePickerModal
                locale="en"
                mode="range"
                visible={openDate}
                startDate={rangeDate.startDate}
                endDate={rangeDate.endDate}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
            />

        </>

    )
}

export default YourTripComponent

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