import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    ScrollView,
    Image,
    TextInput,
    ActivityIndicator
  } from "react-native";
  import { FONTFAMILY } from "../../theme/theme";
  import React, { useState } from "react";
  import { FontAwesome6 } from "@expo/vector-icons";
  import useUserStore from "../../store/User";
  import { editPassword } from "../../api/User";
  import Toast from "react-native-toast-message";
  


  const PasswordModal = ({ modalVisible, setModalVisible, data }) => {
    const { setUserData } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(data.typeLogin !== "google");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
   
    function showToast(message) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "bottom"
      })
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
              Password Update
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
                }}
              >
                Current Password
              </Text>
              <TextInput style={styles.input} 
              value={currentPassword}
              onChangeText={(text) => setCurrentPassword(text)}
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
                New Password
              </Text>
              <TextInput style={styles.input} 
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              />
            </View>
            <Pressable
              style={{
                backgroundColor: "#222222",
                padding: 15,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                opacity: isValid ? 1 : 0.5,
              }}
              onPress={async () => {
                setIsLoading(true);
                try {
                    const response = await editPassword(data.email, currentPassword, newPassword);
                    if (response) {
                        //   setUserData(response.user);
                        setModalVisible(!modalVisible);
                    }
                } catch (error) {
                    setModalVisible(!modalVisible);
                    showToast(error.response.data.message);   
                }
                setIsLoading(false);
              }}
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
            {data.typeLogin === "google" ? (
                <Text
                style={{
                  fontFamily: FONTFAMILY.poppins_light,
                  fontSize: 12,
                  color: "red",
                  marginTop: 10,
                }}
              >
                You are using google account to login, you can't change password
              </Text>
            ) : null
            }
          </View>
        </View>
      </Modal>
    );
  };
  
  export default PasswordModal;
  
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
  