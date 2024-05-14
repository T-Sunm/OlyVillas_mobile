import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { iconBnbs } from "../../../utils/iconBnb";
import HostBottomBar from "../../../components/HostComponents/HostBottomBar";
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from "react-native-reanimated";
import { FONTFAMILY } from "../../../theme/theme";

const SelectLocationType = () => {
  const [selectedType, setSelectedType] = useState({name: "", parentId: 0});
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1); 
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => setSelectedType({name: item.name, parentId: item.parentId})}
        style={{
          display: "flex",
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: "50%",
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.typeCard,
            { borderColor: selectedType.name == item.name ? "#222222" : "#dddddd",
            backgroundColor: selectedType.name == item.name ? "#f7f7f7" : "#fdffff"
            },
            selectedType.name == item.name ? animatedStyle : null,
          ]}
        >
          {item.icon}
          <Text>{item.name}</Text>
        </Animated.View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 25, fontFamily: FONTFAMILY.poppins_semibold, marginBottom: 20 }}>
            Which of these best describes your place?
        </Text>
      <FlatList
        data={iconBnbs}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.name}
      />
      <HostBottomBar data={{LocationType: {name: selectedType.name, parentId: selectedType.parentId}}} navigationTarget={'SelectPlaceType'} isDisable={selectedType.name == "" ? true : false}/>
    </View>
  );
};

export default SelectLocationType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#FDFFFF",
    flexDirection: "column",
    paddingBottom: 100,
  },
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
