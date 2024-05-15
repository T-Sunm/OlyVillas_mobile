import { FlatListComponent, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";
import { FONTFAMILY } from "../../../theme/theme";
import ImagePickerComponent from "../../../components/HostComponents/ImagePickerComponent";

const AddPhotos = ({ route }) => {
  const { data } = route.params;
  const [images, setImages] = useState([]);
  React.useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.TitleContainer}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: FONTFAMILY.poppins_semibold,
              marginBottom: 5,
            }}
          >
            Add some photos of your house
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.poppins_regular,
              color: "#8a8a8a",
            }}
          >
            You'll need 5 photos to get started. You can add more or make
            changes later.
          </Text>
        </View>
        <View style={styles.ImageContainer}>
          <ImagePickerComponent images={images} setImages={setImages} />
        </View>
      </View>
      <HostBottomBar
        data={{
          ...data,
          photos: images.map(
            (img) => `data:${img.mimeType};base64,${img.base64}`
            // (img) => img.fileName
          ),
        }}
        isDisable={images.length < 5 ? true : FlatListComponent}
        navigationTarget={"AddTitle"}
      />
    </View>
  );
};

export default AddPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdffff",
    paddingHorizontal: 20,
  },
  ImageContainer: {},
});
