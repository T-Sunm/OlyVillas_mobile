import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { validateEmail, validatePassword } from '../../utils/Validate';
import { Entypo } from '@expo/vector-icons';
const CustomInput = ({ containerStyle, placeholder, onChangeText, error, setError, type, ...props }) => {

    const [text, setText] = useState(props.value ? props.value : "")
    const [showPassword, setShowPassword] = useState(props.secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = useSharedValue(text ? 1 : 0);
    const labelAnimatedStyle = useAnimatedStyle(() => {
        return {
            top: interpolate(labelPosition.value, [0, 1], [12, 0]),
            left: interpolate(labelPosition.value, [0, 1], [12, 4]),
            fontSize: interpolate(labelPosition.value, [0, 1], [16, 14]),
            color: interpolateColor(labelPosition.value, [0, 1], ['gray', '#888']), // interpolateColor có thể cần phải được xử lý khác tùy thuộc vào thư viện bạn đang sử dụng
        };
    });
    const handleFocus = () => {
        setIsFocused(true);
        animatedLabel(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!text) {
            animatedLabel(0);
        }
    };
    const animatedLabel = (toValue) => {
        labelPosition.value = withTiming(toValue, {
            duration: 200
        });
    };

    const handleTextChange = (text) => {
        let errorMessage

        setText(text);
        if (onChangeText) {
            onChangeText(text);
        }

        if (type == "Email") {
            errorMessage = validateEmail(text);
        }
        if (type === "Password") {
            errorMessage = validatePassword(text, props.email);
        }
        if (setError) {
            if (errorMessage) {
                setError(errorMessage);
            } else {
                setError("");
            }
        }

        if (text) {
            animatedLabel(1);
        } else {
            animatedLabel(isFocused ? 1 : 0);
        }
    };

    return (
        <View>
            <View style={[styles.innerContainer, error && { borderColor: 'red' }]}>
                <Animated.Text style={[styles.label, labelAnimatedStyle]}>
                    {placeholder}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleTextChange}
                    value={text}
                    textAlignVertical="center"
                    textContentType={props.secureTextEntry ? 'newPassword' : props.secureTextEntry}
                    secureTextEntry={showPassword}

                />
                {props.secureTextEntry && !!text && (
                    <View>
                        <TouchableOpacity
                            style={{ width: 20, position: "absolute", right: 10, bottom: 15 }}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {!showPassword ? (
                                <Entypo name="eye" size={20} color="black" />
                            ) : (
                                <Entypo name="eye-with-line" size={20} color="black" />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

    )
}

export default CustomInput

const styles = StyleSheet.create({
    innerContainer: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
    },
    label: {
        position: 'absolute',
        color: 'gray',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: 50,
        marginTop: 10,
        paddingLeft: 10,
    },
    errorText: {
        marginTop: 5,
        fontSize: 14,
        color: 'red',
    },
})