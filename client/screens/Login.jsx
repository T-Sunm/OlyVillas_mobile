import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useWarmUpBrowser from '../hooks/useWarmUpBrowser'
import { COLORS, FONTFAMILY, SPACING, defaultStyles } from '../theme/theme'
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

const Strategy = {
    Google: "oauth_google",
    Facebook: "oauth_facebook"
}

const Login = () => {
    useWarmUpBrowser()
    const navigation = useNavigation()
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

    const onSelectAuth = async (strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()

            if (createdSessionId) {
                console.log(createdSessionId)
                setActive({ session: createdSessionId })
                navigation.goBack()
            }
        } catch (error) {

        }

    }

    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 30 }]} />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: COLORS.Black,
                    borderBottomWidth: StyleSheet.hairlineWidth
                }} />
                <Text style={styles.separatorText} >
                    or
                </Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: COLORS.Black,
                    borderBottomWidth: StyleSheet.hairlineWidth
                }} />

            </View>
            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.bthOutline}>
                    <Ionicons name="call-outline" size={24} color="black" style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Phone
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bthOutline}>
                    <Ionicons name="logo-apple" size={24} color="black" style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Apple
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bthOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name="logo-google" size={24} color="black" style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText} >
                        Continue with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bthOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name="logo-facebook" size={24} color="black" style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>
                        Continue with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: SPACING.space_24
    },
    separatorView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    separatorText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.Black,
        marginVertical: 30
    },
    bthOutline: {
        backgroundColor: COLORS.White,
        borderWidth: 1,
        borderColor: COLORS.Grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    btnOutlineText: {
        color: COLORS.Black,
        fontSize: 16,
        fontFamily: FONTFAMILY.poppins_semibold
    }
});