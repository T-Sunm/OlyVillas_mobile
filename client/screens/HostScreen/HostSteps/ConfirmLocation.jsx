import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState } from "react";
import DropdownComponent from "../../../components/HostComponents/DropdownComponent";
import { FONTFAMILY } from "../../../theme/theme";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";

const ConfirmLocation = ({ route }) => {
  
  const [data, setData] = useState(route.params.data);
  const [street_address, setStreetAddress] = useState(
    data.mapData.street_address
  );
  const [address_extra, setAddressExtra] = useState(data.mapData.address_extra);
  const [district, setDistrict] = useState(data.mapData.district);
  const [place, setPlace] = useState(data.mapData.place);
  const [postcode, setPostcode] = useState(data.mapData.postcode);
  const [country, setCountry] = useState(data.mapData.country || "Vietnam");
  React.useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View style={{ backgroundColor: "#fdffff", flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

      <ScrollView style={{ backgroundColor: "#fdffff" }}>
        <View style={styles.container}>
          <View style={styles.TitleContainer}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: FONTFAMILY.poppins_semibold,
                marginBottom: 5,
              }}
              >
              Confirm your address
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FONTFAMILY.poppins_regular,
                color: "#8a8a8a",
              }}
              >
              Give us the location of your place on the map so that guests can
              find.
            </Text>
          </View>
          <DropdownComponent data={data} value={country} setValue={setCountry} setData={setData}/>
          <View
            style={{
              marginHorizontal: 24,
              marginTop: 24,
              borderColor: "gray",
              borderWidth: 0.5,
              borderRadius: 8,
            }}
            >
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
                style={styles.input}
                value={street_address}
                onChangeText={(text) => {
                  setStreetAddress(text);
                  setData({
                    ...data,
                    mapData: { ...data.mapData, street_address: text },
                  });
                }}
                />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Flat, Floor (if applicable)"
                style={styles.input}
                value={address_extra}
                onChangeText={(text) => {
                  setAddressExtra(text);
                  setData({
                    ...data,
                    mapData: { ...data.mapData, address_extra: text },
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
                value={district}
                onChangeText={(text) => {setDistrict(text)
                  setData({
                    ...data,
                    mapData: { ...data.mapData, district: text },
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
                value={place}
                onChangeText={(text) => {setPlace(text)
                  setData({
                    ...data,
                    mapData: { ...data.mapData, place: text },
                  });
                }}
                />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Postcode (if applicable)"
                value={postcode}
                onChangeText={(text) => {setPostcode(text)
                  setData({
                    ...data,
                    mapData: { ...data.mapData, postcode: text },
                  });
                }}
                />
            </View>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <HostBottomBar
        isDisable={country === "" || street_address === "" || district === "" || place === ""}
        data={{ ...data }}
        navigationTarget={"RoomNumber"}
        />
    </View>
  );
};

export default ConfirmLocation;

const styles = StyleSheet.create({
  container: {
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
    flex: 1,
    padding: 14,
    paddingTop: 20,
  },
  mapContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 20,
  },
  TitleContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
