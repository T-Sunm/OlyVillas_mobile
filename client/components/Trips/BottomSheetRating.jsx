import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Keyboard } from 'react-native'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import StarRating from '../Star/StarRating';
import { COLORS, FONTFAMILY, defaultStyles } from '../../theme/theme';
import StarReservation from '../Star/StarReservation';
const BottomSheetRating = ({ onRating, rating, comment }) => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
        console.log('keyboard show')
    }
);
const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
        setKeyboardVisible(false); // or some other action
        console.log('keyboard unshow')
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    const snapPoints = useMemo(() => ['10%', '45%'], [])
    const bottomSheetRef = useRef(null)

    const [ratingLocal, setRatingLocal] = useState(rating)
    const [commentLocal, setCommentLocal] = useState(comment || '')

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>Rating</Text>
        </View>
    );

    const handleRating = () => {
        if (ratingLocal) {
            onRating(ratingLocal, commentLocal)
            bottomSheetRef.current.snapToIndex(0)
        } else {
            Alert.alert(
                'Incomplete Rating Information',
                'Please provide both a star rating and a comment.',
                [{ text: 'OK' }]
            );
        }
    }

    const Cancel = () => {
        setRatingLocal(rating)
        setCommentLocal(comment)
        bottomSheetRef.current.snapToIndex(0)
    }

    const handleTextChange = (text) => {
        if (text.length <= 231) {
            setCommentLocal(text);
        } else {
            return
        }
    };

    return (
        
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            >
        {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        > */}
            {renderHeader()}
            <View style={{ flex: 1, padding: 20, paddingBottom: 70 }}>
                {rating === undefined ? (
                    <View style={{ flex: 1, justifyContent: "space-between" }}>
                        <View style={{ alignItems: "center" }}>
                            <StarRating rating={ratingLocal} onRating={setRatingLocal} />
                            <TextInput value={commentLocal} multiline style={[styles.input, styles.multilineText]} placeholder='Share your stay, rate the way!' onChangeText={handleTextChange} />

                        </View>
                        <Text>
                            {commentLocal?.length}/231
                        </Text>
                    </View>
                ) : (
                    <View style={{ alignItems: "center", height: "100%" }}>
                        <StarReservation star={rating} />
                        <View style={styles.containerComment}>
                            <Text>
                                {comment || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                            </Text>
                        </View>
                    </View>
                )}

            </View>
            {/* </KeyboardAvoidingView> */}
            {rating === undefined && isKeyboardVisible == false && (
                <View style={defaultStyles.footer}>
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
                        <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20, backgroundColor: COLORS.Black }]} onPress={handleRating}>
                            <Text style={defaultStyles.btnText}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </BottomSheet>
    )
}

export default BottomSheetRating

const styles = StyleSheet.create({
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
    },
    input: {
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.WhiteGrey,
        borderRadius: 10,
        width: "100%",
        marginTop: 20,
        fontFamily: FONTFAMILY.poppins_regular
    },
    multilineText: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    containerComment: {
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.Black,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        height: "100%",
    },
})