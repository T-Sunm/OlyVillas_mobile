import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FONTFAMILY } from "../../../theme/theme";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";

const Step2 = ({ route }) => {
  const { data } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: "https://s4.ezgif.com/tmp/ezgif-4-18f6282d1e.gif" }}
          style={styles.img}
        />
      </View>
      <View>
        <Text style={styles.stepText}>Step 2</Text>
        <Text style={styles.titleText}>Make your place stand out</Text>
        <Text style={styles.descriptionText}>
          In this step, you’ll add some of the amenities your place offers, plus
          5 or more photos. Then you’ll create a title and description.
        </Text>
      </View>
      <HostBottomBar
        navigationTarget={"SelectAmetities"}
        data={{...data}}
        isDisable={false}
      />
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 160,
    paddingHorizontal: 20,
    backgroundColor: "#FDFFFF",
    flexDirection: "column",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 320,
    height: 320,
  },
  stepText: {
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 15,
    lineHeight: 25,
    color: "#222222",
  },
});
