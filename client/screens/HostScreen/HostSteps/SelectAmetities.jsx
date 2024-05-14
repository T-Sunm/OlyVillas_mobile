import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FONTFAMILY } from "../../../theme/theme";
import { SvgAllAmenities, convertAmentitiesData } from "../../../utils/data/allAmenities";
import { AmenetiesType } from "../../../utils/data/Amenities";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";

const SelectAmetities = ({route}) => {
  const { data } = route.params;
  const [amities, setAmities] = useState(convertAmentitiesData(SvgAllAmenities));
  const [isDisabled, setIsDisabled] = useState(true);


useEffect(() => {
    const areEmpty = Object.values(amities).every(amenitie => amenitie.length === 0);
    setIsDisabled(areEmpty);
}, [amities]);

  const addAmentity = (name, group) => {
    const updatedAmenities = [...amities[group], name];
    setAmities({ ...amities, [group]: updatedAmenities });
}
const removeAmentity = (name, group) => {
    const filteredAmenities = amities[group].filter(amenitie => amenitie !== name);
    setAmities({ ...amities, [group]: filteredAmenities })
}

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 70 }}>
        <View style={styles.TitleContainer}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: FONTFAMILY.poppins_semibold,
              marginBottom: 5,
            }}
          >
            Tell guests what your place has to offer
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.poppins_regular,
              color: "#8a8a8a",
            }}
          >
            You can add more amenities after you publish your listing.
          </Text>
        </View>

        <View>
          {AmenetiesType.map(({ type, data }, index) => {
            return (
              <View key={index}>
                <Text
                  style={{
                    paddingLeft: 12,
                    marginBottom: 10,
                    marginTop: 25,
                    fontFamily: FONTFAMILY.poppins_medium,
                  }}
                >
                  {(type === "advanced" &&
                    "Do you have any standout amenities?") ||
                    (type === "safety" &&
                      "Do you have any of these safety items?")}
                </Text>
                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {data.map((item, index) => (
                    <Pressable
                      key={index}
                      style={{
                        display: "flex",
                        flexGrow: 0,
                        flexShrink: 1,
                        flexBasis: "50%",
                      }}
                      onPress={() => amities[item.group].includes(item.name) 
                       ? removeAmentity(item.name, item.group)
                       : addAmentity(item.name, item.group)
                      }
                    >
                      <View style={[styles.typeCard,
                        {borderColor: amities[item.group].includes(item.name) ? "#222222" : "#dddddd",
                        backgroundColor: amities[item.group].includes(item.name) ? "#f7f7f7" : "#fdffff"}
                      ]}>
                        {item.svgPath}
                        <Text>{item.name}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <HostBottomBar isDisable={isDisabled} data={{...data, placeAmeneties: amities}} navigationTarget={"AddPhotos"}/>
    </View>
  );
};

export default SelectAmetities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fdffff",
  },
  TitleContainer: {},
  typeCard: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "column",
    padding: 20,
    margin: 5,
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 10,
  },
});
