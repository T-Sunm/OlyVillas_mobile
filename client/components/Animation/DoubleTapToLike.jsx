import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import { BORDERRADIUS } from '../../theme/theme'
import { hasFavorited } from '../../utils/FavoriteResidency'


const { width: SIZE } = Dimensions.get('window')
const AnimatedImage = Animated.createAnimatedComponent(Image)
const DoubleTapToLike = ({ url, itemId, userData, onFav }) => {

    // khi lồng Double trong Single , nhấn cả double thì single nó cũng chạy theo 
    // nên tạo 1 doubleRef để ưu tiên double chạy trước tránh trường hợp single chạy cùng
    const doubleRef = useRef()
    const scale = useSharedValue(0)
    const opacity = useSharedValue(1);
    const rStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: Math.max(scale.value, 0) }
        ]
    }))

    const onDoubleTab = useCallback(() => {
        if (!hasFavorited(itemId, userData)) {
            scale.value = withSpring(1, undefined, (isFinished) => {
                if (isFinished) {
                    scale.value = withDelay(500, withSpring(0));
                }
            });
        }
        // onFav(itemId)


    }, [])

    const onSingleTap = useCallback(() => {
        // withTiming được sử dụng để tạo một animation cho thuộc tính opacity
        opacity.value = withTiming(0, undefined, (isFinished) => {
            if (isFinished) {
                opacity.value = withDelay(500, withTiming(1));
            }
        });

    }, []);

    return (
        <View style={styles.root}>
            <TapGestureHandler
                waitFor={doubleRef}
                numberOfTaps={1}
                onActivated={onSingleTap}
            >
                <TapGestureHandler
                    maxDelayMs={250}
                    ref={doubleRef}
                    numberOfTaps={2}
                    onActivated={onDoubleTab}
                >
                    <Animated.View>
                        <ImageBackground source={{ uri: url }} style={styles.image} >
                            {/* resize mode để nó thu nhỏ về trung tâm */}
                            <AnimatedImage source={require('../../assets/image/heart.png')} style={[styles.image, {
                                shadowOffset: { width: 0, height: 20 },
                                shadowOpacity: 0.35,
                                shadowRadius: 35,
                            },
                                rStyle
                            ]} resizeMode='center' />
                        </ImageBackground>
                    </Animated.View>
                </TapGestureHandler>
            </TapGestureHandler>
        </View>
    )
}

export default DoubleTapToLike

const styles = StyleSheet.create({
    image: {
        width: SIZE * 0.9,
        height: 300,
        borderRadius: BORDERRADIUS.radius_10
    },
})