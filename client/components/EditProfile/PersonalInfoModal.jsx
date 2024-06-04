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
import { EditUserInfo } from "../../api/User";

const PersonalInfoModal = ({ modalVisible, setModalVisible, data }) => {
  const { setUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
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
            Personal Infomation
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
              First Name
            </Text>
            <TextInput style={styles.input} 
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
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
              Last Name
            </Text>
            <TextInput style={styles.input} 
            value={lastName}
            onChangeText={(text) => setLastName(text)}
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
            }}
            onPress={async () => {
              setIsLoading(true);
              const response = await EditUserInfo(data.email, firstName, lastName);
              setIsLoading(false);
              if (response) {
                // console.log(response);
                setUserData(response.user);
                setModalVisible(!modalVisible);
              }
            }}
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
        </View>
      </View>
    </Modal>
  );
};

export default PersonalInfoModal;

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
