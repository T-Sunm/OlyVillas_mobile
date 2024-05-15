import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import HostBottomBar from "../../../components/HostComponents/HostBottomBar";
  import { FONTFAMILY } from "../../../theme/theme";
  
  const AddDecs = ({ route }) => {
    const { data } = route.params;
    React.useEffect(() => {
      console.log(data);
    }, []);
    const [description, setDescription] = useState("");
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.TitleContainer}>
            <Text style={styles.titleText}>
              Create your description
            </Text>
            <Text style={styles.subtitleText}>
              Share what makes your place special.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              numberOfLines={8}
              multiline={true}
              onChangeText={(text) => setDescription(text)}
              maxLength={500}
            />
            <Text style={{fontFamily: FONTFAMILY.poppins_light, fontSize: 11.5}}>
              <Text style={{fontFamily: FONTFAMILY.poppins_semibold}}>{500 - description.length}</Text> characters available
            </Text>
          </View>
        </ScrollView>
        <HostBottomBar
          data={{ ...data, description: description }}
          isDisable={description.length < 1}
          navigationTarget="Step3"
        />
      </KeyboardAvoidingView>
    );
  };
  
  export default AddDecs;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fdffff",
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
    },
    TitleContainer: {
      marginTop: 20,
    },
    titleText: {
      fontSize: 25,
      fontFamily: FONTFAMILY.poppins_semibold,
      marginBottom: 5,
    },
    subtitleText: {
      fontSize: 16,
      fontFamily: FONTFAMILY.poppins_regular,
      color: "#8a8a8a",
    },
    inputContainer: {
      marginTop: 10,
    },
    input: {
      borderColor: "#dddddd",
      borderWidth: 2,
      borderRadius: 10,
      height: 190,
      padding: 10,
      textAlignVertical: "top",
    },
  });
  