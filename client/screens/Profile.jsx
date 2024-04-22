import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTFAMILY, defaultStyles } from '../theme/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Profile = () => {
    const { signOut, isSignedIn } = useAuth()
    const { user } = useUser()
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (!user) return
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user?.emailAddresses[0].emailAddress)
    }, [user])

    const onCaptureImage = async () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //     allowsEditing: true,
        //     quality: 0.75,
        //     base64: true,
        // });
    }
    // Update Clerk user data
    const onSaveUser = async () => {
        try {
            await user?.update({
                firstName: firstName,
                lastName: lastName,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setEdit(false);
        }
    };

    return (
        <View style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>
                <Ionicons name='notifications-outline' size={26} />
            </View>
            {user && (
                <View style={styles.card}>
                    <TouchableOpacity onPress={onCaptureImage}>
                        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        {edit ? (
                            <View style={styles.editRow}>
                                <TextInput
                                    placeholder="First Name"
                                    value={firstName || ''}
                                    onChangeText={setFirstName}
                                    style={[defaultStyles.inputField, { width: 100 }]}
                                />
                                <TextInput
                                    placeholder="Last Name"
                                    value={lastName || ''}
                                    onChangeText={setLastName}
                                    style={[defaultStyles.inputField, { width: 100 }]}
                                />
                                <TouchableOpacity onPress={onSaveUser}>
                                    <Ionicons name="checkmark-outline" size={24} color={COLORS.dark} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.editRow}>
                                <Text style={{ fontFamily: FONTFAMILY.poppins_bold }}>
                                    {firstName} {lastName}
                                </Text>
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons name='create-outline' size={24} color={COLORS.dark} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <Text>
                        {email}
                    </Text>
                    <Text>
                        Since {user?.createdAt?.toLocaleDateString()}
                    </Text>
                </View>
            )}
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        padding: 24,
        paddingTop: 40,
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerText: {
        fontSize: 24,
        fontFamily: FONTFAMILY.poppins_bold
    },
    card: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: 'center',
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
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    }
})