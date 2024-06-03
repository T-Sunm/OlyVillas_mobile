import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FONTFAMILY } from "../../theme/theme";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { MAP_KEY } from "../../environment";
import axios from "axios";
import DropdownComponent from "../../components/EditListing/DropdownComponent"

const EditMapData = ({
  modalVisible,
  setModalVisible,
  mapData,
  locationData,
  setMapData,
  setLocationData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const streetAddressInputRef = useRef(null);

  async function getLocationDetail(id) {
    const response = await axios.get(
      `https://rsapi.goong.io/Place/Detail?api_key=${MAP_KEY}&place_id=${id}`
    );
    return response.data.result;
  }

  useEffect(() => {
    if (searchTerm !== "") {
      const delayDebounceFn = setTimeout(() => {
        axios
          .get(
            `https://rsapi.goong.io/Place/AutoComplete?api_key=${MAP_KEY}&input=${encodeURIComponent(
              searchTerm
            )}`
          )
          .then((response) => {
            setSearchResults(response.data.predictions);
          });
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        streetAddressInputRef.current && streetAddressInputRef.current.blur();
      }}>
        <View style={styles.ModalContainer}>
          <View style={styles.ModalHeader}>
            <Pressable
              style={{ position: "absolute", top: 4, left: 20, padding: 5 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome6 name="chevron-left" size={20} color="black" />
            </Pressable>
            <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 20 }}>
              Edit Location
            </Text>
          </View>
          <View style={styles.container}>
            <DropdownComponent data={mapData} setData={setMapData}/>
            <View
              style={{
                marginHorizontal: 24,
                marginTop: 24,
                borderColor: "gray",
                borderWidth: 0.5,
                borderRadius: 8,
              }}
            >
              <View
                  style={{
                    position: "absolute",
                    top: 60,
                    width: "100%",
                    zIndex: 10,
                    backgroundColor: "#fdffff",
                    borderBlockColor: "gray",
                    borderWidth: 0.5,
                    display: searchResults.length > 0 ? "flex" : "none",
                  }}
                >
                  {searchResults.length > 0 &&
                    searchResults.map((result, index) => (
                      <Pressable
                        key={index}
                        style={styles.searchResult}
                        onPress={async () => {
                          const loc = await getLocationDetail(result.place_id);
                          
                          setMapData({
                            address_extra: "",
                            country: "",
                            district: loc.compound.district,
                            street_address: loc.name,
                            place: loc.compound.province,
                            postcode: "",
                          });
                          setLocationData({
                            lat: loc.geometry.location.lat,
                            lng: loc.geometry.location.lng,
                          });
                          setSearchResults([]);
                        }}
                      >
                        <FontAwesome6 name="building" size={18} color="black" />
                        <View>
                          <Text>{result.structured_formatting.main_text}</Text>
                          <Text style={{ fontSize: 12 }}>
                            {result.structured_formatting.secondary_text}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                </View>
              <View style={styles.inputContainer}>
                <Text
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 7,
                    fontFamily: FONTFAMILY.poppins_light,
                    fontSize: 12,
                  }}
                >
                  Street address
                </Text>
                <TextInput
                  ref={streetAddressInputRef}
                  style={styles.input}
                  value={mapData.street_address}
                  onChangeText={(text) => {
                    setMapData({
                      ...mapData,
                      street_address: text,
                    });
                    setSearchTerm(text);
                  }}
                  onBlur={() => {setSearchResults([])}}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Flat, Floor (if applicable)"
                  style={styles.input}
                  value={mapData.address_extra}
                  onChangeText={(text) => {
                    setMapData({
                      ...mapData,
                      address_extra: text,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 7,
                    fontFamily: FONTFAMILY.poppins_light,
                    fontSize: 12,
                  }}
                >
                  City/town/village
                </Text>
                <TextInput
                  style={styles.input}
                  value={mapData.district}
                  onChangeText={(text) => {
                    setMapData({
                      ...mapData,
                      district: text,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 7,
                    fontFamily: FONTFAMILY.poppins_light,
                    fontSize: 12,
                  }}
                >
                  Town/country/area
                </Text>
                <TextInput
                  style={styles.input}
                  value={mapData.place}
                  onChangeText={(text) => {
                    setMapData({
                      ...mapData,
                      place: text,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Postcode (if applicable)"
                  value={mapData.postcode}
                  onChangeText={(text) => {
                    setMapData({
                      ...mapData,
                      postcode: text,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditMapData;

const styles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    backgroundColor: "#fdffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: "rgba(80, 80, 80, 0.7)",
    borderWidth: 1,
  },
  ModalHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    marginTop: 20,
  },
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fdffff",
  },
  inputContainer: {
    position: "relative",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
  },
  input: {
    padding: 14,
    paddingTop: 20,
    color: "black",
  },
  searchResult: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(235, 235, 235)",
  },
});
