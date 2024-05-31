import { Dimensions, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, runOnJS, useAnimatedStyle, withTiming, useAnimatedRef, measure } from 'react-native-reanimated';



const Ripple = ({ style, onTap, children }) => {
    const centerX = useSharedValue(0)
    const centerY = useSharedValue(0)
    const scale = useSharedValue(0)
    const width = useSharedValue(0)
    const height = useSharedValue(0)
    const rippleOpacity = useSharedValue(1);

    const aRef = useAnimatedRef()

    const tapGesture = Gesture.Tap()

        .onBegin((tapEvent) => {

            // sài measure có thể lấy được animation từ lớp cha , lúc đó width ,height phụ thuộc vào lớp cha chứ kh cần code cứng
            const layout = measure(aRef)
            width.value = layout?.width ?? 0;
            height.value = layout?.height ?? 0;

            centerX.value = tapEvent.x
            centerY.value = tapEvent.y

            rippleOpacity.value = 1
            scale.value = 0
            scale.value = withTiming(1, { duration: 1000 }, (isFinished) => {
                if (isFinished) {
                    rippleOpacity.value = withTiming(0, { duration: 10 });
                }
            })
        })
        .onTouchesUp(() => {
            if (onTap) runOnJS(onTap)();
        })
        .onEnd(() => {

        })

    const rStyle = useAnimatedStyle(() => {
        // tạo width,height trên này , mỗi lần nhấn là nó sẽ bắt đầu từ initial
        // phóng to circleRadius có bán kính là bằng cạnh huyền trong tam giác vuông
        const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
        const translateX = centerX.value - circleRadius
        const translateY = centerY.value - circleRadius
        return {
            width: circleRadius * 2,
            height: circleRadius * 2,
            borderRadius: circleRadius,
            backgroundColor: 'rgba(0,0,0,0.1)',
            position: "absolute",
            opacity: rippleOpacity.value,
            top: 0,
            left: 0,
            transform: [
                // Áp dụng scale
                { translateX },          // Di chuyển hình tròn theo x
                { translateY },
                // scale phải đặt ở cuối , để nó translateX,Y xong mới phóng to
                { scale: scale.value },            // Di chuyển hình tròn theo y
            ]
        }
    })
    return (
        <View ref={aRef} collapsable={false}>
            <GestureDetector gesture={tapGesture}>
                <Animated.View style={[style]}>
                    {children}
                    <Animated.View style={[rStyle]} />
                </Animated.View>
            </GestureDetector>
        </View>
    )
}

export default Ripple

const styles = StyleSheet.create({})