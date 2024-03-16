import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { defaultStyles } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'
const ListingsMap = ({ items }) => {
    const navigation = useNavigation()
    const INITIAL_REGION = {
        latitude: 16.0544,
        longitude: 108.2022,
        latitudeDelta: 0.1, // Giá trị này có thể điều chỉnh tùy theo độ phóng đại bạn muốn
        longitudeDelta: 0.1, // Tương tự như latitudeDelta
    };
    const onMarkerSelected = (item) => {
        navigation.navigate('listingdetails', { listing: item })
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={INITIAL_REGION}
            >
                {items?.map((item) => {
                    console.log(item?.id)
                    return <Marker
                        key={item?._id}
                        coordinate={{
                            latitude: +item?.locationData.lat,
                            longitude: +item?.locationData.lng
                        }}
                        onPress={() => onMarkerSelected(item)}
                    />
                })}
            </MapView>
        </View>
    )
}

export default ListingsMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});