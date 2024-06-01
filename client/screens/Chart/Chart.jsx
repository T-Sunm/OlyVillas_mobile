import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LineChartEarning from '../../components/Chart/LineChartEarning';
import SelectInput from '../../components/SelectInput/SelectInput';
import { COLORS } from '../../theme/theme';
import useUserStore from '../../store/User';
import { GetEarning, GetEarningWithYear } from '../../api/Reservation';

const monthsArray = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 }
];
const yearsArray = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 },
    { label: '2026', value: 2026 },
    { label: '2027', value: 2027 },
    { label: '2028', value: 2028 },
    { label: '2029', value: 2029 },
    { label: '2030', value: 2030 },
    { label: '2031', value: 2031 },
    { label: '2032', value: 2032 },
    { label: '2033', value: 2033 },
    { label: '2034', value: 2034 },
    { label: '2035', value: 2035 }
];

const Chart = () => {
    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth() + 1)
    const [year, setYear] = useState(currentDate.getFullYear())
    const [earningsMonthandYear, setEarningsMonthandYear] = useState()
    const [loading, setLoading] = useState(false)
    const { userData } = useUserStore()

    const getMonthLabel = (value) => {
        const month = monthsArray.find(month => month.value === value);
        return month ? month.label : 'Value not found';
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const dataMonthandYear = await GetEarning(month, year, userData?.email)
            setEarningsMonthandYear(dataMonthandYear?.totalEarnings)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        fetchData()
    }, [month, year])

    return (
        <View style={{ flexDirection: 'column', flex: 1, paddingTop: 100, backgroundColor: COLORS.White }}>
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', marginBottom: 48, justifyContent: "center", gap: 5 }}>
                    <SelectInput title={"Select month"} data={monthsArray} value={month} setValue={setMonth} />
                    <SelectInput title={"Select year"} data={yearsArray} value={year} setValue={setYear} />
                </View>
                <View style={{ flexDirection: 'column', paddingHorizontal: 15 }}>
                    <Text style={styles.totalEarnings}>
                        {earningsMonthandYear?.toFixed(2)}
                    </Text>
                    <Text style={styles.bookedEarnings}>
                        Booked earnings for {getMonthLabel(month)}, {year}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.yearEarningsTitleContainer}>
                    <Text style={styles.yearEarningsTitle}>
                        {year} earnings chart
                    </Text>
                </View>
                <LineChartEarning year={year} />
            </View>
        </View>
    )
}

export default Chart

const styles = StyleSheet.create({
    totalEarnings: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#484848'
    },
    bookedEarnings: {
        fontSize: 16,
        fontFamily: 'monospace'
    },
    yearEarningsTitleContainer: {
        paddingVertical: 32
    },
    yearEarningsTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    }
});