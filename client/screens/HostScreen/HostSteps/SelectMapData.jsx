import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FONTFAMILY } from "../../../theme/theme";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { MAP_KEY } from "../../../environment";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SelectMapData = ({ route }) => {
  const { data } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [location, setLocation] = useState({});

  const navigation = useNavigation()


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
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <KeyboardAvoidingView style={styles.ModalContainer}>
          <View style={styles.ModalHeader}>
            <Pressable
              style={{ position: "absolute", top: 4, left: 20, padding: 5 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <FontAwesome6 name="chevron-left" size={20} color="black" />
            </Pressable>
            <Text
              style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 20 }}
            >
              Enter your address
            </Text>
          </View>
          <View>
            <View
              style={{ width: "100%", marginTop: 40, paddingHorizontal: 40 }}
            >
              <View
                style={[
                  styles.TextInputContainer,
                  { borderWidth: isFocused ? 2 : 0 },
                ]}
              >
                <FontAwesome6 name="location-dot" size={16} color="black" />
                <TextInput
                  style={styles.InputButton}
                  placeholder="Search"
                  onFocus={() => setIsFocused(true)}
                  placeholderTextColor={"#222222"}
                  autoFocus={true}
                  onChangeText={(text) => setSearchTerm(text)}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            {searchResults.length > 0 &&
              searchResults.map((result, index) => (
                <Pressable
                  key={index}
                  style={styles.searchResult}
                  onPress={ async () => {
                    const loc = await getLocationDetail(result.place_id)
                    const data = {...data, mapData: {
                      address_extra: "",
                      country: "",
                      district: loc.compound.district,
                      street_address: loc.name,
                      place: loc.compound.province,
                      postcode: ""
                    },
                    locationData: {
                      lat: loc.geometry.location.lat,
                      lng: loc.geometry.location.lng,
                    }}
                    navigation.navigate("ConfirmLocation", {data})
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
        </KeyboardAvoidingView>
      </Modal>
      <View style={styles.TitleContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: FONTFAMILY.poppins_semibold,
            marginBottom: 5,
          }}
        >
          Where your place located ?
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTFAMILY.poppins_regular,
            color: "#8a8a8a",
          }}
        >
          Give us the location of your place on the map so that guests can find.
        </Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapContainer}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          provider={PROVIDER_GOOGLE}
        />
        <View style={styles.InputButtonContainer}>
          <TouchableOpacity
            style={styles.InputButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <FontAwesome6 name="location-dot" size={16} color="black" />
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_semibold,
                color: "#222222",
                opacity: 0.7,
                marginLeft: 10,
                marginTop: 4,
              }}
            >
              Enter your address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <HostBottomBar isDisable={true} />
    </View>
  );
};

export default SelectMapData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdffff",
    paddingBottom: 80,
    paddingTop: 10,
  },
  TitleContainer: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  InputButtonContainer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 40,
    position: "absolute",
  },

  InputButton: {
    backgroundColor: "#fdffff",
    padding: 15,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
  },
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
  TextInputContainer: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#222222",
    borderRadius: 30,
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
