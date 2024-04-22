import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import { COLORS, FONTFAMILY } from '../../theme/theme'
import { Ionicons } from '@expo/vector-icons'

const FilterWhoComponent = ({ headerText, groups, setGroups }) => {
    return (
        <>
            <Animated.Text style={styles.cardHeader} entering={FadeIn}>
                {headerText}
            </Animated.Text>
            <Animated.View style={styles.cardBody}>
                {groups.map((item, index) => (
                    <View key={index} style={styles.guestItem}>
                        <View>
                            <Text>
                                {item.name}
                            </Text>
                            <Text>
                                {item.text}
                            </Text>
                        </View>
                        <View style={styles.editNumberContain}>
                            <TouchableOpacity
                                onPress={() => {
                                    const newGroups = [...groups];
                                    newGroups[index].count =
                                        newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;

                                    setGroups(newGroups);
                                }}>
                                <Ionicons
                                    name="remove-circle-outline"
                                    size={26}
                                    color={groups[index].count > 0 ? COLORS.Grey : '#cdcdcd'}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontFamily: FONTFAMILY.poppins_regular,
                                    fontSize: 16,
                                    minWidth: 18,
                                    textAlign: 'center',
                                }}>
                                {item.count}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    const newGroups = [...groups];
                                    newGroups[index].count++;
                                    setGroups(newGroups);
                                }}>
                                <Ionicons name="add-circle-outline" size={26} color={COLORS.Grey} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </Animated.View>
        </>
    )
}

export default FilterWhoComponent

const styles = StyleSheet.create({
    cardHeader: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.Grey,
    },
    editNumberContain: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})