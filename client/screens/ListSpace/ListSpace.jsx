import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAllProperties } from "../../api/Residency";
import useUserStore from "../../store/User";
import { FONTFAMILY, SPACING, BORDERRADIUS } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";

const ListSpace = () => {
  const { userData } = useUserStore();
  const [properties, setProperties] = useState([]);
    const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      const data = await getAllProperties({ authorEmail: userData?.email });
      setProperties(data);
    }
    getData();
  }, []);

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("EditListing", {id: item.id})}>
        <View style={styles.listing}>
          <Image source={{ uri: item.photos[0].url }} style={styles.image} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontFamily: FONTFAMILY.poppins_semibold, fontSize: 16 }}
            >
              {item.title}
            </Text>
            {/* <View style={{ flexDirection: "row", gap: 4 }}>
                            <Ionicons name='star' size={16} color={COLORS.Yellow} />
                            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>{starts(item?.Rating)}</Text>
                        </View> */}
          </View>
          <View>
            <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
              {item.mapData?.region
                ? item?.mapData?.region + ", " + item?.mapData?.country
                : item?.mapData?.place + ", " + item?.mapData?.country}
            </Text>
            <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
              {item?.locationType?.name}
            </Text>
            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>
              {item?.price}${" "}
              <Text style={{ fontFamily: FONTFAMILY.poppins_regular }}>
                night
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={renderRow}
        ListHeaderComponent={() => (
          <Text style={{ marginLeft: 20, fontFamily: FONTFAMILY.poppins_medium, fontSize: 30 }}>Your Listings</Text>
        )}
      />
    </View>
  );
};

export default ListSpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    backgroundColor: "#FDFFFF",
    paddingHorizontal: 5,
  },
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: SPACING.space_16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: BORDERRADIUS.radius_10,
  },
  info: {
    textAlign: "center",
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 16,
    marginTop: 4,
  },
});
