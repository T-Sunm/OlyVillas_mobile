import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth, useClerk } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { removeValueStorage } from '../../utils/data/AsyncStorage';
import useUserStore from '../../store/User';

const LogoutLoginBtn = ({ isSignedIn, typeLogin }) => {
    const { setIsSignIn, setUserData } = useUserStore()
    const { signOut } = useClerk();
    const navigation = useNavigation()
    const handleSignOut = async () => {
        try {
            if (typeLogin == "normal") {
                removeValueStorage("userInfo")
                setIsSignIn(false)
                setUserData(null)
            } else {
                await signOut();
                removeValueStorage("userInfo")
                setUserData(null)
                setIsSignIn(false)
            }
            // Thông báo hoặc hành động sau khi đăng xuất thành công
            console.log("Đã đăng xuất thành công.");
        } catch (error) {
            // Xử lý lỗi đăng xuất
            console.error("Lỗi khi đăng xuất: ", error);
        }
    };
    const handleLogin = () => {
        navigation.navigate("login")
    }
    return (
        <TouchableOpacity onPress={isSignedIn ? handleSignOut : handleLogin}>
            <Text>{isSignedIn ? "Đăng xuất" : "Đăng nhập"}</Text>
        </TouchableOpacity>
    )
}

export default LogoutLoginBtn

const styles = StyleSheet.create({})