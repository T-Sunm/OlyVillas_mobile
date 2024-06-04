import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import { COLORS, FONTFAMILY } from "../../../theme/theme";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Color from "color";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DropdownItems = ({ item, index, isExpanded, dropdownItemsCount }) => {
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  const DropdownListItemHeight = 60;
  const Margin = 10;
  const fullDropDownHeight =
    dropdownItemsCount * (DropdownListItemHeight + Margin);

  const collapsedTop = fullDropDownHeight / 2 - DropdownListItemHeight;
  const expandedTop = (DropdownListItemHeight + Margin) * index;

  const expandedScale = 1;
  const collapseScale = 1 - index * 0.03;

  const expandedBackgroundColor = "#f8f8f8";
  const collapsedBackgroundColor = Color(expandedBackgroundColor)
    .darken(index * 0.05)
    .hex();

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isExpanded.value ? expandedBackgroundColor : collapsedBackgroundColor
      ),
      top: withSpring(isExpanded.value ? expandedTop : collapsedTop),
      transform: [
        {
          scale: isExpanded.value ? expandedScale : collapseScale,
        },
        {
          translateY: isExpanded.value
            ? fullDropDownHeight / 1.5
            : fullDropDownHeight / 2 + 205,
        },
      ],
    };
  }, []);

  const isHeader = index === 0;

  const rHeaderArrowIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isHeader && isExpanded.value ? "90deg" : "0deg"),
        },
      ],
    };
  });

  const rLeftIconOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isHeader ? 1 : isExpanded.value ? 1 : 0),
    };
  }, [isHeader]);

  return (
    <Animated.View
      onTouchEnd={() => {
        if (isHeader) isExpanded.value = !isExpanded.value;
      }}
      style={[
        {
          // header (index = 0) sẽ là zIndex = N,ví trí thứ 2 sẽ là N-1 , và sau đó...
          zIndex: dropdownItemsCount - index,
          position: "absolute",
          width: windowWidth * 0.95,
          height: DropdownListItemHeight,
          left: 10,
          borderRadius: 10,
        },
        rStyle,
      ]}
    >
      <Pressable style={styles.container} onPress={() => {
        if (!isHeader) navigation.navigate(item.navigationName);
      }}>

        <Animated.View
          style={[
              isHeader ? styles.iconContainerHeader : styles.iconContainer,
              rLeftIconOpacityStyle,
              {
                  left: 15,
                },
            ]}
            >
          {item.icon}
        </Animated.View>
        <Text style={isHeader ? styles.labelHeader : styles.label}>
          {item?.label}
        </Text>
        <Animated.View
          style={[
              isHeader ? styles.iconContainerHeader : styles.iconContainer,
              rHeaderArrowIconStyle,
              {
                  right: 15,
                },
            ]}
            >
          <MaterialIcons name="arrow-forward" size={25} color={"black"} />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default DropdownItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelHeader: {
    fontSize: 18,
    letterSpacing: 1.2,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  label: {
    fontSize: 15,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  iconContainerHeader: {
    position: "absolute",
    width: 45,
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#a0a0a0",
    borderWidth: 1,
  },
  iconContainer: {
    position: "absolute",
    width: 45,
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
