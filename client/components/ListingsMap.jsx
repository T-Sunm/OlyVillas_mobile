import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { COLORS, FONTFAMILY, defaultStyles } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environment'
import MapView from "react-native-map-clustering";
import MapSearchInput from './Input/MapSearchInput'
import useSearchStore from '../store/searchStore'
import { getAllProperties } from '../api/Residency'
import useResidenciesSearchStore from '../store/ResidencySearch'

const ListingsMap = ({ items }) => {
    const { setLocationData, setMapData, locationData } = useSearchStore()
    const [loading, setLoading] = useState()
    const navigation = useNavigation()
    const mapRef = useRef(null)

    const zoomToLocation = (coord) => {
        const newRegion = {
            latitude: coord.lat,
            longitude: coord.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        };
        if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion);
        }
    };

    const selectLocation = (loca) => {
        setTimeout(() => {
            let mapData = {
                place: loca.compound.province,
            };
            useSearchStore.setState((state) => ({
                mapData: {
                    place: loca.compound.province,
                },
                locationData: {
                    latitude: loca.coord.lat,
                    longitude: loca.coord.lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }
            }));
        }, 1000)

        zoomToLocation(loca.coord)

    };

    const onMarkerSelected = (item) => {
        navigation.navigate('listingdetails', { id: item?.id })
    };

    return (
        <View style={defaultStyles.container}>
            <MapView
                ref={mapRef}
                style={styles.container}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={locationData}
                provider={PROVIDER_GOOGLE}
            >
                {/* {locationData && <Marker coordinate={{ latitude: locationData.lat, longitude: locationData.lng }} />} */}
                {items?.map((item) => {
                    return <Marker
                        key={item?.id}
                        coordinate={{
                            latitude: +item?.locationData.lat,
                            longitude: +item?.locationData.lng
                        }}
                        onPress={() => onMarkerSelected(item)}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                ${item?.price}
                            </Text>
                        </View>
                    </Marker>
                })}
            </MapView>
            {/* search */}
            <MapSearchInput styles={styles} onSetLocation={selectLocation} />
        </View>
    )
}

export default ListingsMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        position: "absolute",
        width: "90%",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: 20,
        left: 20
    },
    input: {
        borderColor: "#888",
        borderWidth: 1,
        padding: 8,
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
});