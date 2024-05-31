import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../../theme/theme'
import useUserStore from '../../store/User'
import { getReservation } from '../../api/Reservation'
import CardReservation from '../../components/ReserveComponent/CardReservation'
const Trips = () => {

    const { userData, isSignedIn } = useUserStore()
    const [yourTrips, setYourTrips] = useState()
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const params = { userId: userData.id };
        console.log(params);
        try {
            setLoading(true);
            const data = await getReservation(params);
            setYourTrips(data);
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
        fetchData();
    };

    const renderRow = ({ item }) => {
        return <CardReservation key={item?.id} item={item} />
    };

    return (
        <View style={styles.root}>
            <Text style={{ fontSize: 30, fontFamily: FONTFAMILY.poppins_semibold }}>Trips</Text>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
                data={loading ? [] : yourTrips}
                renderItem={renderRow}
                keyExtractor={item => item.id.toString()}
                style={{ flex: 1 }}
                contentContainerStyle={{ gap: 10, paddingBottom: 10 }}
            />
        </View>
    )
}

export default Trips

const styles = StyleSheet.create({
    root: {
        paddingTop: 100,
        paddingHorizontal: 20,
        flex: 1
    },

})