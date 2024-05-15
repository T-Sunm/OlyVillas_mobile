import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { FONTFAMILY } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { createResidency } from "../../api/Residency";
import useUserStore from "../../store/User";
import axios from "axios";

const FinishUp = ({ route }) => {
  const { data } = route.params;
  const { userData, isSignedIn } = useUserStore()
  React.useEffect(() => {
    console.log(data);
  }, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();

  const createResidencyHandler = async () => {
    try {
      setIsLoading(true);
      const res = await createResidency({...data, userEmail: userData.email});
      // const res = await axios.post("https/api/user/createResidency", {data: {...data, userEmail: userData.email}});
      console.log(res);
      setIsLoading(false);
      navigation.navigate("profile");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Khai báo biến animated opacity
  const opacity = useSharedValue(0);

  // Tạo animated style dựa trên giá trị opacity
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 2000 }), // Hiệu ứng fade-in với thời gian 1000ms
    };
  });

  // Khi component mount, thay đổi giá trị opacity để kích hoạt hiệu ứng fade-in
  React.useEffect(() => {
    opacity.value = 1;
  }, []);

  return (
    <View style={styles.container}>
      {/* Sử dụng Animated.View và áp dụng animated style */}
      <Animated.View style={[styles.contentContainer, animatedStyle]}>
        <View>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/image/app-logo.png")}
          />
        </View>
        <View>
          <Text style={{ fontFamily: FONTFAMILY.poppins_bold, fontSize: 20 }}>
            Congratulations!
          </Text>
          <Text style={{ fontFamily: FONTFAMILY.poppins_medium }}>
            Thank you for sharing your home and helping to create incredible
            experiences for our guests.
          </Text>
        </View>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={createResidencyHandler}
          style={{
            width: "100%",
            backgroundColor: "#e51d53",
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: FONTFAMILY.poppins_semibold,
              }}
            >
              Let's Get Started
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FinishUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdffff",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 14,
    borderWidth: 2,
    borderBlockColor: "rgba(80, 80, 80, 0.3)",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    paddingHorizontal: 20,
    borderRightWidth: 0,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 20,
    rowGap: 40,
  },
});
