import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomInput from '../Input/CustomInput'
import useReserveStore from '../../store/reserveStore'

const InfoUser = () => {
    const navigation = useNavigation()
    const [emailError, setEmailError] = useState('');
    const { infoUser, setName, setEmail } = useReserveStore();

    console.log(infoUser)

    return (
        <View style={styles.infoHouse} >
            <Text style={{ fontSize: 19, fontFamily: FONTFAMILY.poppins_semibold }}>
                Required for your trip
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flex: 0.7 }}>
                    <View>
                        <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_semibold }}>
                            Phone number {infoUser.Phone.formatted}
                        </Text>
                    </View>
                    <View  >
                        <Text style={{ fontSize: 13, fontFamily: FONTFAMILY.poppins_regular }} numberOfLines={2}>
                            Add and confirm your phone number to get trip updates.
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('PhoneScreen')}>
                    <Text style={{ textDecorationLine: 'underline', fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <View>
                    <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Name
                    </Text>
                </View>
                <CustomInput placeholder={"Name"} onChangeText={setName} type={"Name"} />
            </View>
            <View>
                <View>
                    <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Email
                    </Text>
                </View>
                <CustomInput placeholder={"Email"} onChangeText={setEmail} error={emailError} setError={setEmailError} type="Email" />
            </View>
        </View>
    )
}

export default InfoUser

const styles = StyleSheet.create({
    infoHouse: {
        flexDirection: "column",
        backgroundColor: COLORS.White,
        padding: 20,
        gap: 10,
        height: "auto"
    },
    btn: {
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: COLORS.White,
        borderWidth: 1
    }
})