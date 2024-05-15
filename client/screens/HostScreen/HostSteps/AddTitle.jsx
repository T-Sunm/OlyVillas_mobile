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

const AddTitle = ({ route }) => {
  const { data } = route.params;
  React.useEffect(() => {
    console.log(data);
  }, []);
  const [title, setTitle] = useState("");
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.TitleContainer}>
          <Text style={styles.titleText}>
            Now, let's give your house a title
          </Text>
          <Text style={styles.subtitleText}>
            Short title works best. Have fun with it—you can always change it
            later.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            numberOfLines={4}
            multiline={true}
            onChangeText={(text) => setTitle(text)}
            maxLength={32}
          />
          <Text style={{fontFamily: FONTFAMILY.poppins_light, fontSize: 11.5}}>
            <Text style={{fontFamily: FONTFAMILY.poppins_semibold}}>{32 - title.length}</Text> characters available
          </Text>
        </View>
      </ScrollView>
      <HostBottomBar
        data={{ ...data, title: title }}
        isDisable={title.length < 1}
        navigationTarget="AddDecs"
      />
    </KeyboardAvoidingView>
  );
};

export default AddTitle;

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
    height: 100,
    padding: 10,
    textAlignVertical: "top",
  },
});
