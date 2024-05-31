import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import Ripple from '../Animation/Ripple';
import { DeleteResidency } from '../../api/Residency';

const { width: ScreenWidth } = Dimensions.get('window')
const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = -ScreenWidth * 0.3;

const ListItems = ({ listing: items, simultaneousHandlers }) => {

    const translateX = useSharedValue(0)
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd(() => {

            //khi mình kéo qua phải thì translateX.value có giá trị âm và càng tăng , nếu nó hơn thì sẽ ...
            const shoulebeDismissed = translateX.value < TRANSLATE_X_THRESHOLD
            if (shoulebeDismissed) {
                translateX.value = withSpring(TRANSLATE_X_THRESHOLD)
            } else {
                translateX.value = withSpring(0)
            }
        })
        .simultaneousWithExternalGesture(simultaneousHandlers)

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value
            }
        ]
    }))

    const handleDelete = async (itemId) => {
        const data = await DeleteResidency(itemId)
        console.log(data)
    }


    const rIconContainerStyle = useAnimatedStyle(() => {
        // vì spring khi kéo qua làm item nó lắc qua lắc về làm gtri translateX.value tăng giảm ltuc trong 1 khoảng time ngắn
        // --> + 10 vào thresshold để opacity hoạt động tốt hơn
        const opacity = withTiming(
            translateX.value < TRANSLATE_X_THRESHOLD + 10 ? 1 : 0
        )
        return { opacity }
    })
    return (
        <View key={items.id} style={styles.listingContainer}>
            <TouchableWithoutFeedback onPress={() => handleDelete(items.id)} >
                <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                    <FontAwesome5
                        name={'trash-alt'}
                        size={LIST_ITEM_HEIGHT * 0.4}
                        color={'red'}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>


            <GestureDetector gesture={panGesture} >
                <Animated.View style={[styles.listing, rStyle]}>
                    <Ripple style={styles.ripple}  >
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.listingTitle}>{items?.title}</Text>
                        <Image source={{ uri: items?.photos[0]?.url }} style={styles.image} />
                    </Ripple>
                </Animated.View>

            </GestureDetector>


        </View>
    )
}

export default ListItems

const styles = StyleSheet.create({
    listingContainer: {
        width: "100%",
        alignItems: "center",
        marginVertical: 10,
    },
    ripple: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 10,
        paddingVertical: 5,
        overflow: "hidden"
    },
    listing: {
        width: "90%",
        height: LIST_ITEM_HEIGHT,


    },
    listingTitle: {
        fontSize: 16,
        width: "70%"
    },
    iconContainer: {
        width: LIST_ITEM_HEIGHT,
        height: LIST_ITEM_HEIGHT,
        position: "absolute",
        right: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: '20%',
        height: '100%'
    }
})