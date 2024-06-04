import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import { FONTFAMILY } from "../theme/theme";
import useUserStore from "../store/User";
import PasswordModal from "../components/EditProfile/PasswordModal";
import Toast from "react-native-toast-message";


const LoginAndSecurity = () => {
  const { userData } = useUserStore();
  // console.log(userData);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  return (
    <View style={styles.container}>
        {<PasswordModal modalVisible={passwordModalVisible} setModalVisible={setPasswordModalVisible} data={userData}/>}
      <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 20 }}>
        Login and Security
      </Text>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#a0a0a0",
            borderBottomWidth: 0.5,
            paddingBottom: 15,
            marginBottom: 20,

          }}
        >
          <View>
            <Text
              style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 14 }}
            >
              Password
            </Text>
          </View>
          <Pressable 
          onPress={() => setPasswordModalVisible(!passwordModalVisible)}
          >
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_medium,
                fontSize: 14,
                color: "#18bc9c",
                textDecorationLine: "underline",
              }}
            >
              Edit
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginAndSecurity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
