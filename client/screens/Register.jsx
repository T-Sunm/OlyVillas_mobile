import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomInput from '../components/Input/CustomInput'
import { useState } from 'react'
import { COLORS, FONTFAMILY, defaultStyles } from '../theme/theme'
import { useUser } from '@clerk/clerk-expo'
import { createUser } from '../api/User'
import { storeDataObj } from '../utils/data/AsyncStorage'
import { useNavigation } from '@react-navigation/native'

const Register = () => {
    const navigation = useNavigation()
    const { user } = useUser()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState(user ? user.emailAddresses[0].emailAddress : "")
    const [emailError, setEmailError] = useState()
    const [passwordError, setPassWordError] = useState()
    const [password, setPassword] = useState()

    const handleSignUp = async () => {

        if (!email || !password) {
            // Set error states and return to prevent createUser call
            setEmailError("Email is required");
            setPassWordError("Password is required");
            return;
        }

        try {
            const result = await createUser(email, password, firstName, lastName);
            if (result) {
                console.log(result)
                if (user && user.externalAccounts.length > 0) {
                    result.typeLogin = user.externalAccounts[0].provider;
                    await storeDataObj("userInfo", result);
                    navigation.navigate('explore')
                }

            } else {
                setEmailError("Failed to create user. Please check your details.");
            }
        } catch (error) {
            console.log("Error creating user:", error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.White, paddingHorizontal: 20, justifyContent: "center" }}>
            <View style={styles.wrapName} >
                <CustomInput placeholder={"First name"} onChangeText={setFirstName} type={"Name"} />
                <CustomInput placeholder={"Last name"} onChangeText={setLastName} type={"Name"} />
                <CustomInput placeholder={"Email"} onChangeText={setEmail} type={"Email"} error={emailError} setError={setEmailError} value={email} />
                <CustomInput placeholder={"Password"}
                    onChangeText={setPassword}
                    type={"Password"}
                    error={passwordError}
                    setError={setPassWordError}
                    secureTextEntry
                    email={email}
                />
            </View>
            <Text style={{ fontSize: 11, fontFamily: FONTFAMILY.poppins_regular, }}>
                By selecting <Text style={{ fontFamily: FONTFAMILY.poppins_semibold, textDecorationLine: "underline" }}>Agree and continue</Text>,
                I agree to Olyvillas <Text style={{ textDecorationLine: "underline", fontFamily: FONTFAMILY.poppins_medium }}>Terms of Service,Payments Terms of Service</Text>, and <Text style={{ textDecorationLine: "underline", fontFamily: FONTFAMILY.poppins_medium }}>Nondiscrimination Policy</Text> and acknowledge the <Text style={{ textDecorationLine: "underline", fontFamily: FONTFAMILY.poppins_medium }}>Privacy Policy</Text>.
            </Text>
            <TouchableOpacity style={[defaultStyles.btn, { marginTop: 10 }]} onPress={handleSignUp}>
                <Text style={defaultStyles.btnText}>Agree and continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    wrapName: {
        marginTop: 20,
        gap: 10,
        marginBottom: 30
    }
})