import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { FONTFAMILY } from "../../theme/theme";
import React, {useState} from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_HOST } from "../../environment";
import { deleteImageResy, updateImageResy } from "../../api/Residency";


const EditPhotosModal = ({
  modalVisible,
  setModalVisible,
  images,
  setImages,
  ResidencyId
}) => {

  const [isLoading, setIsLoading] = useState(false);

  const removeImage = async (ResidencyId, public_id) => {
    const resp = await axios.delete(`${API_HOST}/api/user/updateResidency/${ResidencyId}/deleteImages`, {data: {idImage: public_id}})
    setImages(images.filter((img) => img.public_id !== public_id));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setIsLoading(true);
      const base64Img = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
      const resp = await axios.put(`${API_HOST}/api/user/updateResidency/${ResidencyId}/createImages`, {photo: base64Img})
      setIsLoading(false);
      setImages(prev => [...prev, resp.data[resp.data.length - 1]]);
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
          <Pressable
            style={{ position: "absolute", top: 4, right: 20, padding: 5, backgroundColor: 'lightgrey', borderRadius: 50, padding: 10 }}
            onPress={pickImage}
            >
              <FontAwesome6 name="plus" size={20} color="black" />
            </Pressable>
        </View>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: FONTFAMILY.poppins_semibold,
              fontSize: 24,
              marginLeft: 20,
            }}
          >
            Manage Photos
          </Text>
          <ScrollView contentContainerStyle={styles.imageContainer}>
            {images.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Pressable
                  style={styles.button}
                    onPress={() => removeImage(ResidencyId, img.public_id)}
                >
                  <Text style={{ color: "white" }}>x</Text>
                </Pressable>
                <Image source={{ uri: img.url }} style={styles.image} />
              </View>
            ))}
            {isLoading && <View style={styles.imageWrapper}>
            <View
            style={[styles.image,{ backgroundColor: 'grey', opacity: 0.8}]}></View>
            </View> }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditPhotosModal;

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
    marginBottom: 70,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginLeft: 25,
  },
  imageWrapper: {
    position: "relative",
    margin: 10,
  },
  image: {
    width: 155,
    height: 155,
    borderRadius: 10,
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
});
