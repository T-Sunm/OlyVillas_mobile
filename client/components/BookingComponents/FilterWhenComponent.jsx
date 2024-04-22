import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { COLORS, FONTFAMILY } from '../../theme/theme'
import { DatePickerModal } from 'react-native-paper-dates'

// import DatePicker from 'react-native-modern-datepicker';
const FilterWhenComponent = ({ range, setRange, onOpen }) => {

    const [open, setOpen] = useState(open);
    const onDismiss = useCallback(() => {
        setOpen(false);
        onOpen(null)
    }, [setOpen]);

    const onConfirm = useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
            onOpen(null)
            console.log(startDate, endDate)
        },
        [setOpen, setRange]
    );

    return (
        <>
            <DatePickerModal
                locale="en"
                mode="range"
                visible={open}
                startDate={range.startDate}
                endDate={range.endDate}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
            />
        </>
    )
}

export default FilterWhenComponent

const styles = StyleSheet.create({
    cardHeader: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: 24,
        padding: 20,
    },
})