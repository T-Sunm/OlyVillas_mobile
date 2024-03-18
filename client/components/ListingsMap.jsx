import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { COLORS, FONTFAMILY, defaultStyles } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../environment'
import MapView from "react-native-map-clustering";
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
                style={styles.container}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={INITIAL_REGION}
                provider={PROVIDER_GOOGLE}
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
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>
                                ${item?.price}
                            </Text>
                        </View>
                    </Marker>
                })}
            </MapView>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    styles={{ textInput: styles.input }}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: GOOGLE_API_KEY,
                        language: 'en',
                    }}
                />
            </View>
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
        borderWidth: 1
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
    }
});