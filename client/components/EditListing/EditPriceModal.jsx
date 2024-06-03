import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
    KeyboardAvoidingView,
    Platform,
  TextInput,
} from "react-native";
import { FONTFAMILY } from "../../theme/theme";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const EditPriceModal = ({ modalVisible, setModalVisible, value, setValue }) => {
  const handleChangeText = (text) => {
    // Remove any non-numeric characters
    let numericValue = text.replace(/[^0-9]/g, "");

    // Check if the input is not just zeros
    if (numericValue !== "0") {
      // If the input starts with multiple zeros, keep only one zero
      numericValue = numericValue.replace(/^0+/, "");
    } else {
      numericValue = numericValue.replace(/^0+/, "0");
    }

    // Format the value with thousand separators
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Update the state with the formatted value
    setValue(formattedValue);
  };

  const handleBlur = () => {
    // If the input is empty or does not contain a digit, set the value to $0
    if (!value || !/\d/.test(value)) {
      setValue("0");
    }
  };


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
            Edit Price
          </Text>
        </View>
        <View style={styles.container}>
            <View style={styles.TitleContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: FONTFAMILY.poppins_semibold,
            marginBottom: 5,
          }}
        >
          Change your price
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTFAMILY.poppins_regular,
            color: "#8a8a8a",
          }}
        >
          You can change it anytime.
        </Text>
      </View>
          <KeyboardAvoidingView
            style={{padding: 20, backgroundColor: "#fdffff" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
           
            <View style={styles.inputContainer}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    fontFamily: FONTFAMILY.poppins_semibold,
                  }}
                >
                  $
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onBlur={handleBlur}
                  onChangeText={handleChangeText}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};

export default EditPriceModal;

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
      marginTop: 40,
    //   marginBottom: 70,
    paddingHorizontal: 20,
  },
  TitleContainer: {},
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  input: {
    fontSize: 40,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});
