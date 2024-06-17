import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useWarmUpBrowser from '../hooks/useWarmUpBrowser'
import { COLORS, FONTFAMILY, SPACING, defaultStyles } from '../theme/theme'
import { Ionicons } from '@expo/vector-icons';
import { useOAuth, useSession, useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { login, verifyEmail } from '../api/User';
import { storeDataObj } from '../utils/data/AsyncStorage';
import { validateEmail, validatePassword } from '../utils/Validate';
import useUserStore from '../store/User';

const Strategy = {
    Google: "oauth_google",
    Facebook: "oauth_facebook"
}




const Login = () => {
    useWarmUpBrowser()
    const navigation = useNavigation()
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })
    const { user } = useUser()
    const { session } = useSession();

    const { setUserData, setIsSignIn } = useUserStore()



    // -------- Đăng nhập bằng clerk -----------
    const onSelectAuth = async (strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectedAuth()

            if (createdSessionId) {
                await setActive({ session: createdSessionId })
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const checkUserAndNavigate = async () => {
            if (session && user?.emailAddresses?.length > 0) {
                console.log('Session updated', session);
                try {
                    const isUsedEmail = await verifyEmail(user.emailAddresses[0].emailAddress);
                    console.log('Email verification result:', isUsedEmail);
                    if (!isUsedEmail?.user) {
                        navigation.navigate('register');
                    } else {
                        const userData = {
                            id: isUsedEmail?.infoUser?.id,
                            firstName: isUsedEmail?.infoUser?.firstName,
                            lastName: isUsedEmail?.infoUser?.lastName,
                            email: isUsedEmail?.infoUser?.email,
                            createdAt: isUsedEmail?.infoUser?.createdAt,
                            updatedAt: isUsedEmail?.infoUser?.updatedAt,
                            favResidenciesID: isUsedEmail?.infoUser?.favResidenciesID,
                            typeLogin: user.externalAccounts[0].provider
                        }
                        storeDataObj("userInfo", userData)
                        setUserData(userData)
                        setIsSignIn(true)
                        navigation.goBack();
                    }
                } catch (error) {
                    console.error('Error verifying email:', error);
                    // Xử lý lỗi nếu cần
                }
            }
        };

        checkUserAndNavigate();

    }, [session, user]);


    // -------- Đăng nhập bình thường -----------

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const handleEmailChange = (text) => {
        let errorMessage
        setEmail(text);
        errorMessage = validateEmail(text);
        if (errorMessage) {
            setEmailError(errorMessage);
        } else {
            setEmailError('');
        }
    }

    const handlePassWordChange = (text) => {
        let errorMessage
        setPassword(text);
        errorMessage = validatePassword(text);
        if (errorMessage) {
            setPasswordError(errorMessage);
        } else {
            setPasswordError('');
        }
    }

    const handleLoginByNormal = async () => {

        // lần đầu mount thì disable kh hoạt động , thêm 4 dòng nay để xử lý
        setPasswordError(validatePassword(password))
        setEmailError(validateEmail(email))
        if (email == '' || password == '') {
            return
        }


        try {
            console.log(email)
            const userInfo = await login(email, password);
            console.log('Email verification result:', userInfo);
            if (!userInfo) {
                return
            } else {
                const userData = {
                    id: userInfo?.id,
                    firstName: userInfo?.firstName,
                    lastName: userInfo?.lastName,
                    email: userInfo?.email,
                    createdAt: userInfo?.createdAt,
                    updatedAt: userInfo?.updatedAt,
                    favResidenciesID: userInfo?.favResidenciesID,
                    typeLogin: "normal"
                }
                storeDataObj("userInfo", userData)
                setUserData(userData)
                setIsSignIn(true)
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error verifying email:', error);
            // Xử lý lỗi nếu cần
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10, gap: 10 }}>
                <View>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Email'
                        style={[defaultStyles.inputField]}
                        onChangeText={handleEmailChange}
                    />
                    {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                </View>

                <View>
                    <TextInput
                        autoCapitalize='none'
                        placeholder='Password'
                        style={[defaultStyles.inputField]}
                        onChangeText={handlePassWordChange}
                    />
                    {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                </View>
            </View>
            <TouchableOpacity style={[defaultStyles.btn, (emailError !== '' || passwordError !== '') ? styles.disabledBtn : {}]}
                onPress={handleLoginByNormal} disabled={emailError !== '' || passwordError !== ''}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
                <View style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: -20}}>
                    <TouchableOpacity onPress={() => navigation.navigate('register')}>
                        <Text style={{color: COLORS.primary, fontFamily: FONTFAMILY.poppins_medium, textAlign: 'center'}}>Create an account</Text>
                    </TouchableOpacity>
                </View>
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
    },
    errorText: {
        marginTop: 5,
        fontSize: 14,
        color: 'red',
    },
    disabledBtn: {
        backgroundColor: 'gray'
    },
});