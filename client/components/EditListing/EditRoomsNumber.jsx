import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { FONTFAMILY } from "../../theme/theme";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const EditRoomsNumber = ({
  modalVisible,
  setModalVisible,
  placeSpace,
  setPlaceSpace,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.ModalContainer}>
        <View style={styles.ModalHeader}>
          <Pressable
            style={{ position: "absolute", top: 4, left: 20, padding: 5 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <FontAwesome6 name="chevron-left" size={20} color="black" />
          </Pressable>
          <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 20 }}>
            Edit Rooms and Spaces
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.counterContainer}>
            <View style={styles.counterElement}>
              <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                Bedrooms
              </Text>
              <View style={styles.buttonsContainer}>
                <Pressable
                  style={[
                    styles.button,
                    { opacity: placeSpace.bedrooms.quantity === 0 ? 0.3 : 1 },
                  ]}
                  disabled={placeSpace.bedrooms.quantity === 0 ? true : false}
                  onPress={() =>
                    setPlaceSpace(
                      prevState => ({ ...prevState, bedrooms: { quantity: prevState.bedrooms.quantity - 1, status: "Shared" } })
                    )
                  }
                >
                  <Text>-</Text>
                </Pressable>
                <Text>{placeSpace.bedrooms.quantity}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    setPlaceSpace(
                      prevState => ({ ...prevState, bedrooms: { quantity: prevState.bedrooms.quantity + 1, status: "Shared" } })
                    )
                  }
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.counterElement}>
              <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                Beds
              </Text>
              <View style={styles.buttonsContainer}>
                <Pressable
                  style={[
                    styles.button,
                    { opacity: placeSpace.beds.quantity === 0 ? 0.4 : 1 },
                  ]}
                  disabled={placeSpace.bedrooms.quantity === 0 ? true : false}
                  onPress={() =>
                    setPlaceSpace(prevState => ({ ...prevState, beds: { quantity: prevState.beds.quantity - 1, status: "Shared" } }))
                  }
                >
                  <Text>-</Text>
                </Pressable>
                <Text>{placeSpace.beds.quantity}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    setPlaceSpace(prevState => ({ ...prevState, beds: { quantity: prevState.beds.quantity + 1, status: "Shared" } }))
                  }
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.counterElement}>
              <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                Bathroom
              </Text>
              <View style={styles.buttonsContainer}>
                <Pressable
                  style={[
                    styles.button,
                    { opacity: placeSpace.bathrooms.quantity === 0 ? 0.4 : 1 },
                  ]}
                  disabled={placeSpace.bathrooms.quantity === 0 ? true : false}
                  onPress={() =>
                    setBathrooms(
                      prevState => ({ ...prevState, bathrooms: { quantity: prevState.bathrooms.quantity - 1, status: "Shared" } })
                    )
                  }
                >
                  <Text>-</Text>
                </Pressable>
                <Text>{placeSpace.bathrooms.quantity}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    setPlaceSpace(
                        prevState => ({ ...prevState, bathrooms: { quantity: prevState.bathrooms.quantity + 1, status: "Shared" } })
                    )
                  }
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.counterElement}>
              <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                Guests
              </Text>
              <View style={styles.buttonsContainer}>
                <Pressable
                  style={[
                    styles.button,
                    { opacity: placeSpace.guetsts.quantity === 0 ? 0.4 : 1 },
                  ]}
                  disabled={placeSpace.guetsts.quantity === 0 ? true : false}
                  onPress={() =>
                    setPlaceSpace(
                      prevState => ({ ...prevState, guetsts: { quantity: prevState.guetsts.quantity - 1 } })
                    )
                  }
                >
                  <Text>-</Text>
                </Pressable>
                <Text>{placeSpace.guetsts.quantity}</Text>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    setPlaceSpace(
                      prevState => ({ ...prevState, guetsts: { quantity: prevState.guetsts.quantity + 1 } })
                    )
                  }
                >
                  <Text>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditRoomsNumber;

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
    flex: 1,
    marginTop: 40,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    //   marginTop: 40,
    //   marginBottom: 70,
    paddingHorizontal: 20,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
},
counterContainer: {
  width: "100%",
  display: "flex",
},
counterContainer: {
  width: "100%",
  display: "flex",
},
counterElement: {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: 20,
  borderBottomWidth: 1,
  borderBottomColor: "#e0e0e0",
  marginBottom: 15,
},
buttonsContainer: {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

});
