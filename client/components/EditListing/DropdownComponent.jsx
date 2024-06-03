import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { countries } from "../../utils/data/countries";
import { FontAwesome6 } from "@expo/vector-icons";
import { FONTFAMILY } from "../../theme/theme";

const DropdownComponent = ({setData, data}) => {
  const countriesWithLabels = countries.map((country) => ({
    label: country,
    value: country,
  }));

  return (
    <View style={styles.container}>
      <Text style={{ position: "absolute", left: 16, top:7 , fontFamily: FONTFAMILY.poppins_light, fontSize: 12}}>Country/region</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={countriesWithLabels}
        placeholder="Select country"
        labelField="label"
        valueField="value"
        value={data.country}
        onChange={(item) => {
          setData({
            ...data,
            country: item.value,
          });
        }}
        renderRightIcon={() => {
          return <FontAwesome6 name="chevron-down" size={16} color="black" />;
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderColor: "gray",
    borderWidth: 0.5,
    marginHorizontal: 24,
    borderRadius: 8,
  },
  dropdown: {
    // flex: 1,
    padding: 14,
    paddingTop:20,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
