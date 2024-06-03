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
import AmentitesConst from "../../utils/EditAmenities";

const EditAmentitiesModal = ({
  modalVisible,
  setModalVisible,
  amentites,
  setAmentites,
}) => {

    function toggleAmentites(item, child) {
        if (amentites[item].includes(child)) {
          setAmentites((prev) => ({
            ...prev,
            [item]: prev[item].filter((i) => i !== child),
          }));
        } else {
          setAmentites((prev) => ({
            ...prev,
            [item]: [...prev[item], child],
          }));
        }
      }

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
            Edit Amentities
          </Text>
        </View>
        <ScrollView style={styles.container}>
          {AmentitesConst.map((item, index) => (
            <View key={index}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONTFAMILY.poppins_medium,
                  flex: 1,
                  marginTop: 20,
                }}
              >
                {item.title}
              </Text>
              {item.children.map((child, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 20,
                      borderBottomColor: "rgba(80, 80, 80, 0.2)",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: FONTFAMILY.poppins_regular,
                      }}
                    >
                      {child.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Pressable
                      onPress={() => toggleAmentites(item.key, child.title)}
                        style={[
                          { paddingVertical: 8,paddingHorizontal: 10, borderRadius: 15 },
                          {
                            backgroundColor: amentites[item.key].includes(
                              child.title
                            )
                              ? "white"
                              : "black",
                          },
                        ]}
                      >
                        <FontAwesome6 name="x" size={15} color={amentites[item.key].includes(child.title) ? "black" : "white"} />
                      </Pressable>
                      <Pressable
                      onPress={() => toggleAmentites(item.key, child.title)}
                        style={[
                            { paddingVertical: 8,paddingHorizontal: 10, borderRadius: 15 },
                          {
                            backgroundColor: amentites[item.key].includes(
                              child.title
                            )
                              ? "black"
                              : "white",
                          },
                        ]}
                      >
                        <FontAwesome6 name="check" size={15} color={amentites[item.key].includes(child.title) ? "white" : "black"} />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditAmentitiesModal;

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
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    //   marginTop: 40,
    //   marginBottom: 70,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {},
});
