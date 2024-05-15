import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { FONTFAMILY } from "../../../theme/theme";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";

const SetThePrice = ({ route }) => {
  const { data } = route.params;
  React.useEffect(() => {
    console.log(data);
  }, []);
  const [value, setValue] = useState("0");

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

  const handleConvertToNumber = (value) => {
    let numericValue = value.replace(/[^0-9]/g, "");
    const price = parseInt(numericValue);
    return price;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.TitleContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: FONTFAMILY.poppins_semibold,
            marginBottom: 5,
          }}
        >
          Now, set your price
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
            style={{ fontSize: 40, fontFamily: FONTFAMILY.poppins_semibold }}
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
      <HostBottomBar
        isDisable={value === "" || value == 0}
        data={{ ...data, price: handleConvertToNumber(value) }}
        navigationTarget={"FinishUp"}
      />
    </KeyboardAvoidingView>
  );
};

export default SetThePrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdffff",
  },
  TitleContainer: {},
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  input: {
    fontSize: 40,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});
