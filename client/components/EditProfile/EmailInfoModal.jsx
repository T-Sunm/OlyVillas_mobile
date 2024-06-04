import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    TextInput,
    ActivityIndicator
  } from "react-native";
  import { FONTFAMILY } from "../../theme/theme";
  import React, { useState } from "react";
  import { FontAwesome6 } from "@expo/vector-icons";
  import useUserStore from "../../store/User";
  import { EditEmail } from "../../api/User";
  import axios from "axios";
import { API_HOST } from "../../environment";
  
  const EmailInfoModal = ({ modalVisible, setModalVisible, data }) => {
    const { setUserData } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [oldEmail, setOldEmail] = useState(data.email);
    const [newEmail, setNewEmail] = useState("");
    const [isValid, setIsValid] = useState(data.typeLogin !== "google" || newEmail !== "");
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleNewEmailChange = (text) => {
      setNewEmail(text);
      setIsValid(validateEmail(text));
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
              Personal Information
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text
                style={{
                  position: "absolute",
                  left: 16,
                  top: 7,
                  fontFamily: FONTFAMILY.poppins_light,
                  fontSize: 12,
                  opacity: 0.4
                }}
              >
                Old Email
              </Text>
              <TextInput
                style={[styles.input, { backgroundColor: "grey", opacity: 0.4}]}
                value={oldEmail}
                // onChangeText={(text) => setOldEmail(text)}
                editable={false}
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
                New Email
              </Text>
              <TextInput
                style={styles.input}
                value={newEmail}
                onChangeText={handleNewEmailChange}
              />
              {isValid ? null : (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 10,
                    fontFamily: FONTFAMILY.poppins_light,
                    fontSize: 12,
                    color: "red",
                  }}
                >
                  Invalid email
                </Text>
              )}
              {newEmail === oldEmail ? (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 10,
                    fontFamily: FONTFAMILY.poppins_light,
                    fontSize: 12,
                    color: "red",
                  }}
                >
                  New email can't be the same as old email
                </Text>
              ) : null}
            </View>
            <Pressable
              style={{
                backgroundColor: "#222222" ,
                padding: 15,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                opacity: isValid ? 1 : 0.4,
              }}
              onPress={async () => {
                setIsLoading(true);
                const response = await axios.post(`${API_HOST}/api/user/editEmail`, {
                    newEmail: newEmail,
                    oldEmail: oldEmail,
                });
                if (response.status === 200) {
                  setUserData(response.data.user);
                  setModalVisible(!modalVisible);
                }
                setIsLoading(false);
            }
              }
              disabled={!isValid}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: FONTFAMILY.poppins_medium,
                    fontSize: 16,
                  }}
                >
                  Save
                </Text>
              )}
            </Pressable>
            {data.typeLogin === "google" && (
                <Text
                style={{
                  marginTop: 20,
                  fontFamily: FONTFAMILY.poppins_light,
                  fontSize: 12,
                  color: "red",
                }}
              >
                You can't change email if you login with Google
              </Text>
            )}
          </View>
        </View>
      </Modal>
    );
  };
  
  export default EmailInfoModal;
  
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
      marginTop: 40,
      paddingHorizontal: 25,
    },
    inputContainer: {
      position: "relative",
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      marginBottom: 10,
    },
    input: {
      padding: 14,
      paddingTop: 20,
      color: "black",
    },
  });
  