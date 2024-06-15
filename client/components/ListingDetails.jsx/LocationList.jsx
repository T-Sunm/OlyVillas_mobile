import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
// import MapView from 'react-native-map-clustering'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme'

const LocationList = ({ mapLocation, mapData }) => {
    const mapRef = useRef(null)
    console.log(mapLocation)

    const initialLoaction = {
        latitude: mapLocation?.lat != null ? +mapLocation?.lat : 16.4637,
        longitude: mapLocation?.lng != null ? +mapLocation?.lng : 107.5909,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    }

    return (
        <View style={[defaultStyles.container, { marginVertical: 50 }]}>
            <Text style={{ fontSize: 25, fontFamily: FONTFAMILY.poppins_semibold, marginBottom: 0 }}>
                Where you'll will be
            </Text>
            <Text style={{ fontSize: 15, fontFamily: FONTFAMILY.poppins_regular, marginBottom: 20 }}>
                {mapData?.street_address}, {mapData?.district}, {mapData?.place}
            </Text>
            <MapView
                ref={mapRef}
                style={styles.container}
                region={initialLoaction}
                provider={PROVIDER_GOOGLE}
            >
                <Marker coordinate={{
                    latitude: mapLocation?.lat != null ? +mapLocation?.lat : 16.4637,
                    longitude: mapLocation?.lng != null ? +mapLocation?.lng : 107.5909
                }} >
                    <View style={styles.marker}>
                        <Text style={styles.markerText}>You here</Text>
                        <View>

                        </View>
                    </View>
                </Marker>
            </MapView>
        </View>
    )
}

export default LocationList

const styles = StyleSheet.create({
    container: {
        width: '100%', // You can also use a fixed number like 300
        height: 350, // For example, give a fixed height
    },
    marker: {
        backgroundColor: COLORS.White,
        padding: 6,
        borderRadius: 12,
        elevation: 5,
        alignItems: 'center',
        justifyContent: "center"
    },
    markerText: {
        fontSize: 14,
        fontFamily: FONTFAMILY.poppins_semibold
    },
})