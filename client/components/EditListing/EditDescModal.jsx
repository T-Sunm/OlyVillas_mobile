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
  
  const EditDescModal = ({ modalVisible, setModalVisible, desc, setDesc }) => {
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
              Edit Description
            </Text>
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              numberOfLines={2}
              value={desc}
              multiline={true}
              onChangeText={(text) => setDesc(text)}
              maxLength={500}
            />
            <Text
              style={{ fontFamily: FONTFAMILY.poppins_light, fontSize: 11.5 }}
            >
              <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>
                {500 - desc.length}
              </Text>{" "}
              characters available
            </Text>
          </View>
        </View>
      </Modal>
    );
  };
  
  export default EditDescModal;
  
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
    },
    button: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      // position: 'absolute',
      // left: 5,
      // top: -5,
      // zIndex: 10,  // Ensure the button is above the image
      opacity: 0.8,
    },
    input: {
      // borderColor: "#dddddd",
      // borderWidth: 2,
      marginTop: 20,
      borderRadius: 10,
      padding: 10,
      textAlignVertical: "top",
      fontFamily: FONTFAMILY.poppins_regular,
    },
  });
  