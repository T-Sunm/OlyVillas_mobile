import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Link } from '@react-navigation/native'
import { COLORS, FONTFAMILY, SPACING, categories } from '../../theme/theme'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { iconBnbsMini } from '../../utils/iconBnb';
import useSearchStore from '../../store/searchStore';
const ExploreHeader = ({ navigation, onCategoryChanged }) => {

    const categorizesRef = useRef([])
    const scrollRef = useRef()
    const [activeIndex, setActiveIndex] = useState(0)
    const { setLocationType } = useSearchStore(state => state)

    const onSelectCategory = (index, nameType) => {
        const selected = categorizesRef.current[index]
        console.log(selected)
        setActiveIndex(index)
        setLocationType(nameType)
    }

    return (
        <SafeAreaView style={{}}>
            <View style={styles.container} >
                <View style={styles.actionRow} >
                    <TouchableOpacity onPress={() => navigation.navigate('bookings')} style={styles.searchBtn}>
                        <Ionicons name="search" size={24} color="black" />
                        <View>
                            <Text style={{ fontFamily: FONTFAMILY.poppins_semibold }}>
                                Where to?
                            </Text>
                            <Text>
                                Anywhere · AnyWeek
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                    alignItems: "center",
                    gap: 30,
                    paddingHorizontal: 12,
                    paddingTop: 25
                }}>
                    {iconBnbsMini.map((item, index) => (
                        <TouchableOpacity
                            onPress={() => onSelectCategory(index, item.name)}
                            key={index}
                            ref={(el) => (categorizesRef.current[index] = el)}
                            style={[activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn]}
                        >
                            {item.icon}
                            <Text style={[activeIndex === index ? styles.categoryTextActive : styles.categoryText]} >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

export default ExploreHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.White,
        height: 175,
        paddingTop: 40,
        paddingHorizontal: SPACING.space_24,

    },
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },
    // khi thêm padding thì nó cx sẽ kéo dãn height ra cho phù hợp
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.Grey,
        borderRadius: 24
    },
    searchBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.space_10,
        borderColor: COLORS.WhiteRGBA15,
        borderWidth: StyleSheet.hairlineWidth,

        elevation: 7,
        padding: SPACING.space_10,
        marginBottom: SPACING.space_8,
        borderRadius: 30,
        // phải nhớ thêm backgroundColor cả bị màu của elevation chiếm
        backgroundColor: COLORS.White,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.WhiteGrey
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.Black
    },
    categoriesBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: COLORS.Black,
        borderBottomWidth: 2,
        paddingBottom: 8
    }
})