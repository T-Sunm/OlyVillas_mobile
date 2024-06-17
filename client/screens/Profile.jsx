import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONTFAMILY, defaultStyles } from '../theme/theme'
import LogoutLoginBtn from '../components/Profile/LogoutLoginBtn'
import useUserStore from '../store/User'
import CardProfile from '../components/Profile/CardProfile'
import DropdownProfile from '../components/Profile/DropdownProfile/DropdownProfile'
import { header, optionsHosting, optionsProfile, optionsSupport } from '../utils/data/optionsProfile'
import { useNavigation } from '@react-navigation/native'


const Profile = () => {
    const { user } = useUser()
    const { userData, isSignedIn } = useUserStore()
    const [edit, setEdit] = useState(false)
    const navigation = useNavigation()

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
            // await user?.update({
            //     firstName: firstName,
            //     lastName: lastName,
            // });
        } catch (error) {
            console.log(error);
        } finally {
            setEdit(false);
        }
    };




    return (
        <ScrollView style={[defaultStyles.container]}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>
                <Ionicons name='notifications-outline' size={36} />
            </View>
            {isSignedIn ? (
                <CardProfile userData={userData} user={user} onCaptureImage={onCaptureImage} onSaveUser={onSaveUser} setEdit={setEdit} edit={edit} />
            ) : (
                <CardProfile/>
            )}
            <DropdownProfile options={optionsProfile} header={header[0]} />

            <View style={{ height: 110 }} ></View>

            <View style={{ paddingHorizontal: 24 }}>
                <Text style={styles.labelHeader} >{header[1].label}</Text>
                <View style={{ marginTop: 10, gap: 20 }}>
                    {optionsHosting.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (item?.navigationName) {
                                    navigation.navigate(item.navigationName);
                                }
                            }}
                            key={index}
                            style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: COLORS.DarkGrey, paddingBottom: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                                {item.icon}
                                <Text style={{ fontFamily: FONTFAMILY.poppins_regular, fontSize: 15 }}>
                                    {item.label}
                                </Text>
                            </View>
                            <MaterialIcons name='arrow-forward' size={25} color={"black"} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={{ paddingHorizontal: 24, marginTop: 20, marginBottom: 10 }}>
                <Text style={styles.labelHeader} >{header[2].label}</Text>
                <View style={{ marginTop: 10, gap: 20 }}>
                    {optionsSupport.map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: COLORS.DarkGrey, paddingBottom: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                                {item.icon}
                                <Text style={{ fontFamily: FONTFAMILY.poppins_regular, fontSize: 15 }}>
                                    {item.label}
                                </Text>
                            </View>
                            <MaterialIcons name='arrow-forward' size={25} color={"black"} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <LogoutLoginBtn isSignedIn={isSignedIn} typeLogin={userData?.typeLogin} />
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        padding: 24,
        paddingTop: 100,
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: 24,

        fontFamily: FONTFAMILY.poppins_bold
    },
    labelHeader: {
        fontSize: 18,
        letterSpacing: 1.2,
        fontFamily: FONTFAMILY.poppins_semibold
    },

})