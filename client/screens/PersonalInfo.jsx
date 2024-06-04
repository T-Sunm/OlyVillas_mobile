import { Pressable, StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import { FONTFAMILY } from "../theme/theme";
import useUserStore from "../store/User";
import PersonalInfoModal from "../components/EditProfile/PersonalInfoModal";
import EmailInfoModal from "../components/EditProfile/EmailInfoModal";

const PersonalInfo = () => {
  const { userData } = useUserStore();
  // console.log(userData);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      {<PersonalInfoModal modalVisible={infoModalVisible} setModalVisible={setInfoModalVisible} data={userData}/>}
      {<EmailInfoModal modalVisible={emailModalVisible} setModalVisible={setEmailModalVisible} data={userData}/>}
      <Text style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 20 }}>
        Personal Infomation
      </Text>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomColor: "#a0a0a0",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
            marginBottom: 20,
          }}
        >
          <View>
            <Text
              style={{ fontFamily: FONTFAMILY.poppins_medium, fontSize: 14 }}
            >
              Full Name
            </Text>
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_regular,
                fontSize: 12,
                color: "grey",
              }}
            >
              {userData?.firstName
                ? `${userData.firstName} ${userData.lastName}`
                : ""}
            </Text>
          </View>
          <Pressable onPress={() => setInfoModalVisible(!infoModalVisible)}>
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_medium,
                fontSize: 14,
                color: "black",
                textDecorationLine: "underline",
              }}
            >
              Edit
            </Text>
          </Pressable>
        </View>
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
              Email
            </Text>
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_regular,
                fontSize: 12,
                color: "grey",
              }}
            >
              {userData?.email}
            </Text>
          </View>
          <Pressable 
          onPress={() => setEmailModalVisible(!emailModalVisible)}
          >
            <Text
              style={{
                fontFamily: FONTFAMILY.poppins_medium,
                fontSize: 14,
                color: "black",
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

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
