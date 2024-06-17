import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTFAMILY, defaultStyles } from "../../theme/theme";
import { Ionicons } from "@expo/vector-icons";

const CardProfile = ({
  onCaptureImage,
  onSaveUser,
  userData,
  setEdit,
  edit,
  user,
}) => {
  const [firstName, setFirstName] = useState(
    userData?.firstName ? userData?.firstName : ""
  );
  const [lastName, setLastName] = useState(
    userData?.lastName ? userData?.lastName : ""
  );
  const [email, setEmail] = useState(userData?.email ? userData?.email : "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email); // Chắc chắn rằng đây là tên thuộc tính chính xác
        } else {
          setFirstName("");
          setLastName("");
          setEmail(""); // Chắc chắn rằng đây là tên thuộc tính chính xác
        }
      } catch (e) {
        console.log("file Profile hàng 32", e);
      }
    };

    fetchData();
  }, [userData]);
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onCaptureImage}>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {edit ? (
          <View style={styles.editRow}>
            <TextInput
              placeholder="First Name"
              value={firstName || ""}
              onChangeText={setFirstName}
              style={[defaultStyles.inputField, { width: 100 }]}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName || ""}
              onChangeText={setLastName}
              style={[defaultStyles.inputField, { width: 100 }]}
            />
            <TouchableOpacity onPress={onSaveUser}>
              <Ionicons
                name="checkmark-outline"
                size={24}
                color={COLORS.dark}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editRow}>
            <Text style={{ fontFamily: FONTFAMILY.poppins_bold }}>
              {firstName} {lastName}
            </Text>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Ionicons name="create-outline" size={24} color={COLORS.dark} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text>{email}</Text>
      <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.Grey,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
