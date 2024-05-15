import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";

export default function ImagePickerComponent({images,setImages}) {

  function removeImage(fileName) {
    setImages(images.filter((img) => img.fileName !== fileName));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages((prevState) => [...prevState, ...result.assets]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((img, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Pressable
              style={styles.button}
              onPress={() => removeImage(img.fileName)}
            >
              <Text style={{ color: "white" }}>x</Text>
            </Pressable>
            <Image source={{ uri: img.uri }} style={styles.image} />
          </View>
        ))}
        <Pressable
          style={[
            styles.image,
            {
              borderWidth: 2,
              borderColor: "grey",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderStyle: "dashed",
              marginTop: 25,
              marginLeft: 5,
            },
          ]}
          onPress={pickImage}
        >
          <FontAwesome6 name="plus" size={30} color="grey" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: 'center',
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    // position: 'absolute',
    // left: 5,
    // top: 25,
    // zIndex: 2,  // Ensure the button is above the image
    opacity: 0.8,
  },
});
