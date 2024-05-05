import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONTFAMILY } from '../../theme/theme'
import PhoneInput, { isValidNumber } from 'react-native-phone-number-input'
import useReserveStore from '../../store/reserveStore'
import { useNavigation } from '@react-navigation/native'

const PhoneScreen = () => {
    const { infoUser, setPhone } = useReserveStore();
    const [phoneError, setPhoneError] = useState(null);
    const [phoneLocal, setPhoneLocal] = useState(infoUser.Phone);
    const phoneInputRef = useRef(null);
    const navigation = useNavigation()

    console.log(infoUser.Phone)

    // let getNumberAfterPossiblyEliminatingZero = phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero();
    const handlePhoneChange = (text) => {
        setPhoneLocal(prevPhone => ({
            ...prevPhone,
            formatted: text
        }));

        if (isValidNumber(text)) {
            setPhoneError(null);
        } else {
            setPhoneError('Invalid phone number');
        }
    };

    const handlePhoneChangeNotFormat = (text) => {
        setPhoneLocal(prevPhone => ({
            ...prevPhone,
            normal: text
        }));
    }


    const handleAdd = () => {
        setPhone("normal", phoneLocal.normal)
        setPhone("formatted", phoneLocal.formatted)
        navigation.goBack()
    }

    return (

        <>
            <View style={{ flex: 1, backgroundColor: "white", paddingTop: 120, paddingHorizontal: 20, }}>
                <View style={{ width: "100%", marginBottom: 20 }} >
                    <View style={{ width: "60%" }}>
                        <Text style={{ fontSize: 24, fontFamily: FONTFAMILY.poppins_bold }}>
                            Enter a new phone number
                        </Text>
                    </View>
                    <Text style={{ fontSize: 17, fontFamily: FONTFAMILY.poppins_regular }}>
                        For notifications,reminders,and help logging in
                    </Text>
                </View>
                <View style={{}} >
                    <View >
                        <Text style={{ fontSize: 14, fontFamily: FONTFAMILY.poppins_semibold }}>
                            PHONE NUMBER
                        </Text>
                    </View>
                    <PhoneInput
                        ref={phoneInputRef}
                        defaultValue={infoUser.Phone.normal}
                        defaultCode='VN'
                        onChangeFormattedText={handlePhoneChange}

                        onChangeText={handlePhoneChangeNotFormat}
                    />
                    {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                </View>
                <TouchableOpacity disabled={!!phoneError} style={styles.btn} onPress={handleAdd}>
                    <Text style={{ textDecorationLine: 'underline', fontSize: 15, fontFamily: FONTFAMILY.poppins_semibold }}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default PhoneScreen

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        fontSize: 14,
        color: 'red',
        fontFamily: FONTFAMILY.poppins_regular
    },
    btn: {
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: COLORS.White,
        borderWidth: 1,
        marginTop: 20
    }
})