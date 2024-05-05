import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/theme'
import DropdownItems from './DropdownItems'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const DropdownProfile = ({ header, options, positionTop }) => {

    const dropdownItems = [header, ...options]
    const isExpanded = useSharedValue(false);

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isExpanded.value ? 0.7 : 0, { duration: 300 })
        };
    }, [isExpanded]);
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.overlay, backgroundStyle]} pointerEvents={isExpanded.value ? 'auto' : 'none'} />
            {dropdownItems.map((item, index) => (
                <DropdownItems
                    key={index}
                    item={item}
                    index={index}
                    isExpanded={isExpanded}
                    dropdownItemsCount={dropdownItems.length}
                />
            ))}
        </View>
    )
}

export default DropdownProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: "#bebebe",
    }
})