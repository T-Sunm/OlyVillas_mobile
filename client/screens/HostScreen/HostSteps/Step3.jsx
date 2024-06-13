import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FONTFAMILY } from "../../../theme/theme";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";

const Step3 = ({ route }) => {
  const { data } = route.params;
  React.useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../../../assets/image/step3.gif")}
          style={styles.img}
        />
      </View>
      <View>
        <Text style={styles.stepText}>Step 3</Text>
        <Text style={styles.titleText}>Finish up and publish</Text>
        <Text style={styles.descriptionText}>
        Finally, you’ll choose booking settings, set up pricing and publish your listing.
        </Text>
      </View>
      <HostBottomBar
        navigationTarget={"SetThePrice"}
        data={{...data}}
        isDisable={false}
      />
    </View>
  );
};

export default Step3;

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
