import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import useReserveStore from '../../store/reserveStore';
import { AntDesign } from '@expo/vector-icons';
import { guestData } from '../../utils/data/guest';
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme';
import Animated, { SlideInDown } from 'react-native-reanimated';
const BottomSheetGuest = ({ bottomSheetRef, setOpenGuest }) => {
    const snapPoints = useMemo(() => ['1%', '50%'], [])
    const { Guests, setGuests } = useReserveStore();

    const [guestsLocal, setGuestLocal] = useState(Guests);
    const handleSetGuests = (guestType, isIncrement) => {
        setGuestLocal(prevGuests => ({
            ...prevGuests,
            [guestType]: isIncrement ? prevGuests[guestType] + 1 : Math.max(0, prevGuests[guestType] - 1)
        }));
        console.log(guestsLocal)
    };
    const Save = () => {
        setGuests(guestsLocal)
        setOpenGuest(false)
        bottomSheetRef.current.snapToIndex(0)
    }
    const Cancel = () => {
        setGuestLocal(Guests)
        bottomSheetRef.current.snapToIndex(0)
        setOpenGuest(false)
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={Cancel}>
                <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Guest</Text>

        </View>
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            // đặt này bằng true để xài được onClose
            enablePanDownToClose={true}
            onClose={() => setOpenGuest(false)}
        >
            {renderHeader()}
            <View style={{ flex: 1, padding: 20, justifyContent: "space-between", paddingBottom: 70 }}>
                {guestData.map((guest) => (
                    <View key={guest.title} style={styles.guestContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.titleText}>
                                {guest.title}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {guest.description}
                            </Text>
                        </View>
                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                onPress={() => handleSetGuests(guest.title, false)}
                                style={styles.button}>
                                <AntDesign name="minus" size={24} color={guestsLocal[guest.title] == 0 ? COLORS.BlackRGB10 : COLORS.Black} />
                            </TouchableOpacity>
                            <View style={styles.countDisplay}>
                                <Text style={{ textAlign: 'center' }}>
                                    {guestsLocal[guest.title]}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleSetGuests(guest.title, true)}
                                style={styles.button}>
                                <AntDesign name="plus" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)} >
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <TouchableOpacity style={styles.footerText} onPress={Cancel}>
                        <Text style={styles.footerPrice}>
                            <Text style={{
                                fontSize: 15,
                                fontFamily: FONTFAMILY.poppins_semibold,
                                textDecorationLine: "underline"
                            }}>
                                Cancel
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20, backgroundColor: COLORS.Black }]} onPress={Save}>
                        <Text style={defaultStyles.btnText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BottomSheet>
    )
}

export default BottomSheetGuest

const styles = StyleSheet.create({
    guestContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    infoContainer: {
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionText: {
        fontSize: 14,
        color: '#666'
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 140  // Được điều chỉnh theo nhu cầu
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 100, // Để tạo hình tròn hoàn chỉnh
        alignItems: 'center',
        justifyContent: 'center'
    },
    countDisplay: {
        width: 50,
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,  // Cho phép text chiếm đầy đủ không gian giữa để căn giữa
        textAlign: 'center',
        paddingRight: 20
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: 'center',  // Đảm bảo các thành phần trong header được căn giữa theo chiều dọc
        justifyContent: 'space-between',
        borderBottomColor: COLORS.DarkGrey,
        borderBottomWidth: 1,
        paddingBottom: 10
    }

})