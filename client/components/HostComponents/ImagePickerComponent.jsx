import React, { useState } from 'react';
import { View, Button, Image, ScrollView, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const ImagePickerComponent = () => {
  const [photos, setPhotos] = useState([]);
  const navigation = useNavigation();

  const navigateToPreview = () => {
    navigation.navigate('PreviewScreen', { photos });
  };

  return (
    <View style={styles.container}>
      <Button title="Select Photos" onPress={async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        console.log(result.assets[0].fileName);
      }} />
      <ScrollView horizontal>
        {photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo.uri }}
            style={styles.image}
          />
        ))}
      </ScrollView>
      {photos.length > 0 && (
        <Button title="Go to Preview" onPress={navigateToPreview} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default ImagePickerComponent;
