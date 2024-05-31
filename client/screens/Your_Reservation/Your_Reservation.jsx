import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import useUserStore from '../../store/User'
import { Ionicons } from '@expo/vector-icons'
import { FONTFAMILY } from '../../theme/theme'
import { your_reservation } from '../../utils/data/yourReservation'
import ReservationButton from '../../components/Your_reservation/ReservationButton'
import { differenceInDays, differenceInDays_for_YourReservation } from '../../utils/getDate'
import ReservationStatus from '../../components/Your_reservation/ReservationStatus'
import { getReservation } from '../../api/Reservation'

const Your_Reservation = () => {
    const { userData } = useUserStore()
    const [statusReservation, setStatusReservation] = useState('Pending')
    const [dataReservation, setDataReservation] = useState([])
    const [loading, setLoading] = useState()
    const params = {
        authorEmail: userData?.email
    };
    const message = useMemo(() => {
        const reservation = your_reservation.find(res => res.title === statusReservation);
        return reservation ? reservation.messages : "No message found for the given title.";
    }, [statusReservation]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getReservation(params)
                // mặc định ban đầu sẽ tải hết dữ liệu
                console.log(data)
                setDataReservation(data)

                setTimeout(() => {
                    setLoading(false)
                }, 100)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const FilteReservation = useMemo(() => {
        if (dataReservation) {
            let reservations = []
            if (statusReservation === "All reservation") {
                reservations = dataReservation
            }
            if (statusReservation === "Cancel Reservations") {
                reservations = dataReservation.filter((reservation) => {
                    return reservation?.Status === "Cancel Reservations"
                })
            }
            if (statusReservation === "Pending") {
                reservations = dataReservation.filter((reservation) => {
                    return reservation?.Status === "Pending"
                })
            }

            let filterreservations = dataReservation.filter((reservation) => {
                return reservation?.Status === "Success"
            })
            if (statusReservation === "Checking out") {
                const currentDate = new Date();
                reservations = filterreservations.filter((reservation) => {
                    const newDayCount = differenceInDays_for_YourReservation(reservation?.endDate, currentDate);
                    console.log(newDayCount >= 1 && newDayCount <= 2)
                    return newDayCount >= 1 && newDayCount <= 2
                })
            }
            if (statusReservation === "Currently hosting") {
                const currentDate = new Date();
                reservations = filterreservations.filter((reservation) => {
                    const startDayCount = differenceInDays_for_YourReservation(reservation?.startDate, currentDate.toISOString());
                    const endDayCount = differenceInDays_for_YourReservation(currentDate.toISOString(), reservation?.endDate);
                    return startDayCount >= 0 && endDayCount >= 0;
                })
            }

            return reservations
        } else {
            return []
        }
    }, [dataReservation, statusReservation])

    return (
        <View style={{ paddingHorizontal: 24 }}>
            <View style={styles.headerContainer}>
                <Ionicons name='notifications-outline' size={36} style={{ alignSelf: "flex-end", marginBottom: 15 }} />
                <View >
                    <Text style={{ fontSize: 24, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Welcome back,{userData?.firstName}
                    </Text>
                </View>
            </View>
            <View >
                <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.poppins_medium }}>
                    Your reservations
                </Text>
            </View>
            <View style={styles.container}>
                <ScrollView horizontal contentContainerStyle={{ gap: 8, marginBottom: 10 }} showsHorizontalScrollIndicator={false}>
                    {your_reservation.map(type => (
                        <ReservationButton
                            key={type.title}
                            title={type.title}
                            onPress={() => setStatusReservation(type.title)}
                            isActive={statusReservation === type.title}
                        />
                    ))}
                </ScrollView>
                <ReservationStatus status={message} filterReservation={FilteReservation} />
            </View>
        </View>
    )
}

export default Your_Reservation

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'column',
        paddingTop: 100,
        justifyContent: "space-between",
        marginBottom: 10
    },
})