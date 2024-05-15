import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";
import { FONTFAMILY } from "../../../theme/theme";
import { ListingType } from "../../../utils/iconBnb";

const SelectPlaceType = ({ route }) => {
  const { data } = route.params;
  React.useEffect(() => {
    console.log(data);
  }, []);
  const [selected, setSelected] = useState({ type: "", id: 0 });
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: FONTFAMILY.poppins_semibold,
          marginBottom: 20,
        }}
      >
        What type of place will guests have ?
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {ListingType.map((item, index) => (
          <Pressable style={{ width: "100%", marginBottom: 10 }} key={index}
          onPress={() => setSelected({type: item.data, id: item.id})}>
            <View
              key={index}
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                borderWidth: 2,
                borderColor: selected.type == item.data ? "#222222" : "#dddddd",
                backgroundColor: selected.type == item.data ? "#f7f7f7" : "#fdffff",
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 20,
                  maxWidth: "80%",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FONTFAMILY.poppins_regular,
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: FONTFAMILY.poppins_regular,
                    color: "#8a8a8a",
                    textAlign: "left",
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                }}
              >
                {item.icon}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
      <HostBottomBar data={{...data, placeType: {type: selected.type, id: selected.id}}} navigationTarget={'SelectMapData'} isDisable={selected.type === "" ? true : false}/>
    </View>
  );
};

export default SelectPlaceType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdffff",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
});
