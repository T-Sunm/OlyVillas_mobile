import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import {
    LineChart
} from "react-native-chart-kit";
import useUserStore from '../../store/User';
import { GetEarningWithYear } from '../../api/Reservation';
const LineChartEarning = ({ year }) => {
    const { userData } = useUserStore()
    const aggregateDataByMonth = (data) => {
        const monthlySum = data.reduce((acc, item) => {
            const date = new Date(item?.startDate)
            const month = date.getMonth()
            acc[month] += item.price;
            return acc;
        }, Array(12).fill(0));
        return monthlySum
    };
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const dataYear = await GetEarningWithYear(year, userData?.email)
            const transformData = aggregateDataByMonth(dataYear?.reservations)
            setData(transformData)
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        fetchData()
    }, [year])

    if (loading && data.length === 0) {
        return <ActivityIndicator />;
    }

    // Nếu không đang tải và có dữ liệu, hiển thị LineChart
    if (!loading && data.length > 0) {
        return (
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{ data: data }]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#ff4081",
                    backgroundGradientFrom: "#ff4081",
                    backgroundGradientTo: "#ff80ab",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ff80ab"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        );
    }
}

export default LineChartEarning

const styles = StyleSheet.create({})