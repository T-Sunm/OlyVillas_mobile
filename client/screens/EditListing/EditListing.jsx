import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { FONTFAMILY } from "../../theme/theme";
import { getResidency, updateResidency } from "../../api/Residency";
import { SvgAllAmenities } from "../../utils/data/allAmenities";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import EditPhotosModal from "../../components/EditListing/EditPhotosModal";
import EditTitleModal from "../../components/EditListing/EditTitleModal";
import EditDescModal from "../../components/EditListing/EditDescModal";
import EditRoomsNumber from "../../components/EditListing/EditRoomsNumber";
import EditAmentitiesModal from "../../components/EditListing/EditAmentitiesModal";
import EditPropertyType from "../../components/EditListing/EditPropertyType";
import EditMapData from "../../components/EditListing/EditMapData";
import EditPriceModal from "../../components/EditListing/EditPriceModal";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../../store/User";
import axios from "axios";
import { API_HOST } from "../../environment";

const EditListing = ({ route }) => {
  const navigation = useNavigation();
  const { userData, isSignedIn } = useUserStore()
  const { id } = route.params;
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  
  // Data states
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [placeSpace, setPlaceSpace] = useState({});
  const [amentities, setAmentities] = useState({}); 
  const [locationType, setLocationType] = useState({});
  const [placeType, setPlaceType] = useState({});
  const [mapData, setMapData] = useState({});
  const [locationData, setLocationData] = useState({});
  const [price, setPrice] = useState("0");
  
  const [isValid, setIsValid] = useState(price != 0 && title != "" && desc != "" && photos.length != 0);
  useEffect(() => {
    setIsValid(!(price == 0 || title == "" || desc == "" || photos.length == 0));
  }, [price, title, desc, photos]);

  // Modal states
  const [photosModalVisible, setPhotosModalVisible] = useState(false);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const [descModalVisible, setDescModalVisible] = useState(false);
  const [placeSpaceModalVisible, setPlaceSpaceModalVisible] = useState(false);
  const [amentitiesModalVisible, setAmentitiesModalVisible] = useState(false);
  const [propertyTypeModalVisible, setPropertyTypeModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);


  
  
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
      setPhotos(data.photos);
      setTitle(data.title);
      setDesc(data.description);
      setPlaceSpace(data.placeSpace);
      setAmentities(data.placeAmeneties);
      setLocationType(data.locationType);
      setPlaceType(data.placeType);
      setMapData(data.mapData);
      setLocationData(data.locationData);
      setPrice(data.price.toString());
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
     {loading ? "" : <EditPhotosModal modalVisible={photosModalVisible} setModalVisible={setPhotosModalVisible} images={photos} setImages={setPhotos} ResidencyId={id}/>}
     {loading ? "" : <EditTitleModal modalVisible={titleModalVisible} setModalVisible={setTitleModalVisible} title={title} setTitle={setTitle}/>}
      {loading ? "" : <EditDescModal modalVisible={descModalVisible} setModalVisible={setDescModalVisible} desc={desc} setDesc={setDesc}/>}
      {loading ? "" : <EditRoomsNumber modalVisible={placeSpaceModalVisible} setModalVisible={setPlaceSpaceModalVisible} placeSpace={placeSpace} setPlaceSpace={setPlaceSpace}/>  }
      {loading ? "" : <EditAmentitiesModal modalVisible={amentitiesModalVisible} setModalVisible={setAmentitiesModalVisible} amentites={amentities} setAmentites={setAmentities}/>}
      {loading ? "" : <EditPropertyType modalVisible={propertyTypeModalVisible} setModalVisible={setPropertyTypeModalVisible} locationType={locationType} placeType={placeType} setLocationType={setLocationType} setPlaceType={setPlaceType}/>}
      {loading ? "" : <EditMapData modalVisible={locationModalVisible} setModalVisible={setLocationModalVisible} mapData={mapData} setMapData={setMapData} locationData={locationData} setLocationData={setLocationData}/>}
      {loading ? "" : <EditPriceModal modalVisible={priceModalVisible} setModalVisible={setPriceModalVisible} value={price} setValue={setPrice}/>}
      <View style={{ paddingBottom: 40 }}>
        {/* photos */}
        <TouchableOpacity style={styles.card} onPress={() => setPhotosModalVisible(!photosModalVisible)}>
          <Text style={styles.cardHeader}>Photos</Text>
          <Text style={[styles.cardContent, { color: "grey" }]}>
            {loading ? "" : photos.length + " photos"}
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
              : photos.slice(0, 3).map((photo, index) => (
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
        <TouchableOpacity style={styles.card} onPress={() => setTitleModalVisible(!titleModalVisible)}>
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
            {loading ? "" : title}
          </Text>
        </TouchableOpacity>

        {/* description */}
        <TouchableOpacity style={styles.card} onPress={() => setDescModalVisible(!descModalVisible)}>
          <Text style={styles.cardHeader}>Description</Text>
          <Text
            style={[
              styles.cardContent,
              {
                color: "grey",
              },
            ]}
          >
            {desc}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => setPriceModalVisible(!priceModalVisible)}>
          <Text style={styles.cardHeader}>Price</Text>
          <Text
            style={[
              styles.cardContent,
              {
                fontSize: 20,                
              },
            ]}
          >
            {`$${price}/night`}
          </Text>
        </TouchableOpacity>
        {/* property type */}
        <TouchableOpacity style={styles.card} onPress={() => setPropertyTypeModalVisible(!propertyTypeModalVisible)}>
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
              : placeType.type + " • " + locationType.name}
          </Text>
        </TouchableOpacity>
        {/* Rooms Number */}
        <TouchableOpacity style={styles.card} onPress={() => setPlaceSpaceModalVisible(!placeSpaceModalVisible)}>
          <Text style={styles.cardHeader}>Rooms and Spaces</Text>
          <Text
            style={[
              styles.cardContent,
              {
                color: "grey",
              },
            ]}
          >
            {loading ? "" : placeSpace.guetsts.quantity + " guests"}
            {loading ? "" : "\n" + placeSpace.bedrooms.quantity + " bedrooms"}
            {loading ? "" : "\n" + placeSpace.beds.quantity + " beds"}
            {loading ? "" : "\n" + placeSpace.bathrooms.quantity + " bathrooms"}
          </Text>
        </TouchableOpacity>
        {/* amentities */}
        <TouchableOpacity style={styles.card} onPress={() => setAmentitiesModalVisible(!amentitiesModalVisible)}>
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
              : getAllAmenities(amentities)
                  .slice(0, 3)
                  .map((amenity, index) => (
                    <View style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start'}} key={index}>
                      {getSvgPathByName(amenity)}
                      <Text>{amenity}</Text>
                    </View>
                  ))}
            <Text style={{ color: "grey" }}>
              {loading || getAllAmenities(amentities).length <= 3
                ? ""
                : `+ ${getAllAmenities(amentities).length - 3} more`}
            </Text>
          </View>
        </TouchableOpacity>
        {/* location */}
        <TouchableOpacity style={styles.card} onPress={() => setLocationModalVisible(!locationModalVisible)}>
          <Text style={styles.cardHeader}>Location</Text>
          <View style={styles.mapContainer}>
          {loading ? "" : <MapView
              provider={PROVIDER_GOOGLE}
              style={{ width: "100%", height: "100%"}}
              initialRegion={{
                latitude: locationData.lat,
                longitude: locationData.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              region={{
                latitude: locationData.lat,
                longitude: locationData.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
              }
              scrollEnabled={false}
              zoomEnabled={false} 
            >
              {loading ? (
                ""
              ) : (
                <Marker
                  coordinate={{
                    latitude: locationData.lat,
                    longitude: locationData.lng,
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
              : `${mapData.street_address}, ${mapData.district}, ${mapData.place}, ${mapData.country}`}
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 40, paddingHorizontal: 20, display: "flex", flexDirection: "row", gap: 10}}>
        <TouchableOpacity
          // onPress={createResidencyHandler}
          style={{
            flexBasis: "50%",
            backgroundColor: "red",
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: FONTFAMILY.poppins_semibold,
              }}
            >
              Delete
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setIsLoading(true);
           const resp = await axios.put(`${API_HOST}/api/user/updateResidency/${id}`, {
              title: title,
              description: desc,
              placeSpace: placeSpace,
              placeAmeneties: amentities,
              locationType: locationType,
              placeType: placeType,
              mapData: mapData,
              locationData: locationData,
              price: handleConvertToNumber(price),
              userEmail: userData.email
            });
            navigation.navigate("ListSpace");
            setIsLoading(false);
          }}
          style={{
            flexBasis: "50%",
            borderColor: "black",
            borderWidth: 1,
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 8,
            opacity: isValid ? 1 : 0.5,
          }}
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                // color: "white",
                fontFamily: FONTFAMILY.poppins_semibold,
              }}
            >
              Save
            </Text>
          )}
        </TouchableOpacity>
        </View>
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

const handleConvertToNumber = (value) => {
  let numericValue = value.replace(/[^0-9]/g, "");
  const price = parseInt(numericValue);
  return price;
};