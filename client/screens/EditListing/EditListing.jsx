import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTFAMILY } from "../../theme/theme";
import { getResidency } from "../../api/Residency";
import { SvgAllAmenities } from "../../utils/data/allAmenities";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'


const EditListing = ({ route }) => {
  const { id } = route.params;
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);

  const getSvgPathByName = (name) => {
    const amenity = SvgAllAmenities.find((item) => item.name === name);
    return amenity ? amenity.svgPath : null;
  };
  const getAllAmenities = (amenities) => {
    let allAmenities = [];
    Object.values(amenities).forEach((amenityArray) => {
      allAmenities = [...allAmenities, ...amenityArray];
    });
    return allAmenities;
  };

  useEffect(() => {
    async function getData() {
      const data = await getResidency(id);
      setListing(data);
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: 30 }}>
        {/* photos */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Photos</Text>
          <Text style={[styles.cardContent, { color: "grey" }]}>
            {loading ? "" : listing.photos.length + " photos"}
          </Text>
          <View
            style={[
              styles.cardContent,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: -70,
                marginBottom: 30,
              },
            ]}
          >
            {loading
              ? ""
              : listing.photos.slice(0, 3).map((photo, index) => (
                  <View key={index}>
                    <Image
                      source={{ uri: photo.url }}
                      style={{
                        width: index === 1 ? 150 : 110,
                        height: index === 1 ? 150 : 110,
                        borderRadius: 8,
                        marginHorizontal: 10,
                        zIndex: index === 1 ? 4 : 0,
                        transform: [
                          {
                            rotate: `${
                              index === 1
                                ? "0deg"
                                : index === 0
                                ? "-10deg"
                                : "10deg"
                            }`,
                          },
                        ],
                      }}
                    />
                  </View>
                ))}
          </View>
        </TouchableOpacity>
        {/* title */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Title</Text>
          <Text
            style={[
              styles.cardContent,
              {
                fontSize: 20,
                fontFamily: FONTFAMILY.poppins_semibold,
                opacity: 0.5,
              },
            ]}
          >
            {loading ? "" : listing.title}
          </Text>
        </TouchableOpacity>

        {/* description */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Description</Text>
          <Text
            style={[
              styles.cardContent,
              {
                color: "grey",
              },
            ]}
          >
            {listing.description}
          </Text>
        </TouchableOpacity>
        {/* property type */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Property Type</Text>
          <Text
            style={[
              styles.cardContent,
              {
                color: "grey",
              },
            ]}
          >
            {loading
              ? ""
              : listing.placeType.type + " • " + listing.locationType.name}
          </Text>
        </TouchableOpacity>
        {/* number of guests */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Number of Guests</Text>
          <Text
            style={[
              styles.cardContent,
              {
                color: "grey",
              },
            ]}
          >
            {loading ? "" : listing.placeSpace.guetsts.quantity + " guests"}
          </Text>
        </TouchableOpacity>
        {/* amentities */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Amenities</Text>
          <View
            style={[
              styles.cardContent,
              {
                color: "grey",
                gap: 10,
              },
            ]}
          >
            {loading
              ? ""
              : getAllAmenities(listing.placeAmeneties)
                  .slice(0, 3)
                  .map((amenity, index) => (
                    <View style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start'}} key={index}>
                      {getSvgPathByName(amenity)}
                      <Text>{amenity}</Text>
                    </View>
                  ))}
            <Text style={{ color: "grey" }}>
              {loading
                ? ""
                : `+ ${getAllAmenities(listing.placeAmeneties).length - 3} more`}
            </Text>
          </View>
        </TouchableOpacity>
        {/* location */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardHeader}>Location</Text>
          <View style={styles.mapContainer}>
          {loading ? "" : <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: "100%", height: "100%"}}
              initialRegion={{
                latitude: listing.locationData.lat,
                longitude: listing.locationData.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              scrollEnabled={false}
              zoomEnabled={false} 
            >
              {loading ? (
                ""
              ) : (
                <Marker
                  coordinate={{
                    latitude: listing.locationData.lat,
                    longitude: listing.locationData.lng,
                  }}
                />
              )}
            </MapView>}
          </View>
          <Text
            style={[
              styles.cardContent,
              {
                color: "grey",
                marginVertical: 10,
              },
            ]}
          >
            {loading
              ? ""
              : `${listing.mapData.street_address}, ${listing.mapData.district}, ${listing.mapData.place}, ${listing.mapData.country}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdffff",
    paddingTop: 30,
  },
  card: {
    display: "flex",
    flexDirection: "column",

    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#fdffff",
    marginHorizontal: 25,

    shadowColor: "# 000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,

    elevation: 9,
  },
  cardHeader: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 20,
    marginTop: 20,
    marginLeft: 30,
  },
  cardContent: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  mapContainer: {
    height: 200,
    width: "100%",
    paddingHorizontal: 30,
    borderRadius: 20, // Thiết lập đường viền cong
    overflow: 'hidden', // Bắt buộc để borderRadius hoạt động
  },
});
