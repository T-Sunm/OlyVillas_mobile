import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FONTFAMILY } from "../../../theme/theme";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";

const RoomNumber = ({ route }) => {
  const { data } = route.params;
  React.useEffect(() => {
    console.log(data);
  }, []);

  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [guests, setGuests] = useState(4);

  return (
    <View style={styles.container}>
      <View style={styles.TitleContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: FONTFAMILY.poppins_semibold,
            marginBottom: 5,
          }}
        >
          Let's start with the basics
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTFAMILY.poppins_regular,
            color: "#8a8a8a",
          }}
        >
          You'll add more details later, such as bed types.
        </Text>
      </View>
      <View style={styles.counterContainer}>
        <View style={styles.counterElement}>
          <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
            Bedrooms
          </Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { opacity: bedrooms === 1 ? 0.3 : 1 }]}
              disabled={bedrooms === 1 ? true : false}
              onPress={() => setBedrooms((bedrooms) => bedrooms - 1)}
            >
              <Text>-</Text>
            </Pressable>
            <Text>{bedrooms}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setBedrooms((bedrooms) => bedrooms + 1)}
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.counterElement}>
          <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>Beds</Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { opacity: beds === 1 ? 0.4 : 1 }]}
              disabled={beds === 1 ? true : false}
              onPress={() => setBeds((beds) => beds - 1)}
            >
              <Text>-</Text>
            </Pressable>
            <Text>{beds}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setBeds((beds) => beds + 1)}
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.counterElement}>
          <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
            Bathroom
          </Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { opacity: bathrooms === 1 ? 0.4 : 1 }]}
              disabled={bathrooms === 1 ? true : false}
              onPress={() => setBathrooms((bathrooms) => bathrooms - 1)}
            >
              <Text>-</Text>
            </Pressable>
            <Text>{bathrooms}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setBathrooms((bathrooms) => bathrooms + 1)}
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.counterElement}>
          <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>Guests</Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { opacity: guests === 1 ? 0.4 : 1 }]}
              disabled={guests === 1 ? true : false}
              onPress={() => setGuests((guests) => guests - 1)}
            >
              <Text>-</Text>
            </Pressable>
            <Text>{guests}</Text>
            <Pressable
              style={styles.button}
              onPress={() => setGuests((guests) => guests + 1)}
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <HostBottomBar
        isDisable={
          bedrooms === 0 || beds === 0 || bathrooms === 0 || guests === 0
        }
        data={{
          ...data,
          placeSpace: {
            bedrooms: { quantity: bedrooms, status: "Shared" },
            beds: { quantity: beds, status: "Shared" },
            bathrooms: { quantity: bathrooms, status: "Shared" },
            guetsts: { quantity: guests },
          },
        }}
        navigationTarget={"Step2"}
      />
    </View>
  );
};

export default RoomNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdffff",
    paddingHorizontal: 20,
  },
  TitleContainer: {
    marginBottom: 20,
  },
  counterContainer: {
    width: "100%",
    display: "flex",
  },
  counterElement: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 15,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
