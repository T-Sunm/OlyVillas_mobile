import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { COLORS, FONTFAMILY, defaultStyles } from '../theme/theme';
import Footer from '../components/BookingComponents/Footer';
import PreviewComponent from '../components/BookingComponents/PreviewComponent';
import { guestsGropus, initialPreviewData, places } from '../utils/data/places';
import FilterWhereComponent from '../components/BookingComponents/FilterWhereComponent';
import FilterWhenComponent from '../components/BookingComponents/FilterWhenComponent';
import FilterWhoComponent from '../components/BookingComponents/FilterWhoComponent';
import { convertISOToFormattedDates } from '../utils/getDate';
import useSearchStore from '../store/searchStore';


const Booking = ({ navigation }) => {

    const [previewData, setPreviewData] = useState(initialPreviewData);
    const [openCard, setOpenCard] = useState(0)
    const [selectedPlace, setSelectedPlace] = useState(0)
    const [range, setRange] = useState({ startDate: null, endDate: null });
    const [groups, setGroups] = useState(guestsGropus)
    const { setRangeDate, setGuestCount } = useSearchStore(state => state);

    const handleClearAll = () => {
        setRange({ startDate: null, endDate: null })
        setGroups(guestsGropus)
    };

    const handleSearch = () => {
        const totalGuest = groups.reduce((acc, item) => {
            if (item.name !== "Infants" && item.name !== "Pets") {
                return acc + item.count;
            }
            return acc;
        }, 0);
        setRangeDate(range.startDate, range.endDate)
        setGuestCount(totalGuest)
    }

    useEffect(() => {
        let newPreviewData = [...previewData];
        if (range.endDate != null && range.startDate != null) {
            newPreviewData[1].previewData = convertISOToFormattedDates(range.startDate, range.endDate);
        } else {
            newPreviewData[1].previewData = "Any week";
        }
        setPreviewData(newPreviewData);
    }, [range]);

    useEffect(() => {
        let newPreviewData = [...previewData];
        if (selectedPlace != 0) {
            newPreviewData[0].previewData = places[selectedPlace].title;
        } else {
            newPreviewData[0].previewData = "I'm flexible";
        }
        setPreviewData(newPreviewData);
    }, [selectedPlace]);

    return (
        // <BlurView blurType="light" // ví dụ: 'light', 'dark', etc.
        //     blurAmount={70}  // chọn một giá trị từ 1 đến 100
        //     experimentalBlurMethod="dimezisBlurView" // hoặc 'dimezisBlurView'
        //     style={styles.container}
        // >
        <View style={styles.container}>
            {previewData.map((item, i) => (
                <View key={i} style={styles.card}>
                    {openCard !== i ? (
                        <PreviewComponent
                            onOpen={() => setOpenCard(i)}
                            previewData={item.previewData}
                            previewText={item.previewText}
                            selectedPlace={selectedPlace}
                            range={range}
                        />
                    ) : item.previewText === 'Where' ? (
                        <FilterWhereComponent
                            setSelectedPlace={setSelectedPlace}
                            selectedPlace={selectedPlace}
                            headerText={item.headerText}
                        />
                    ) : item.previewText === 'When' ? (
                        <FilterWhenComponent
                            setRange={setRange}
                            range={range}
                            headerText={item.headerText}
                            previewData={item.previewData}
                            onOpen={setOpenCard}
                        />
                    ) : item.previewText === 'Who' ? (
                        <FilterWhoComponent
                            setSelectedPlace={setSelectedPlace}
                            selectedPlace={selectedPlace}
                            headerText={item.headerText}
                            groups={groups}
                            setGroups={setGroups}
                        />
                    ) : null
                    }
                </View>
            ))}
            {/* Footer */}
            <Footer onClearAll={handleClearAll} navigation={navigation} onSearch={handleSearch} />
        </View>
    )
}

export default Booking

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // pading để đẩy view chính xuống , kh xài margin
        paddingTop: 100,
        backgroundColor: COLORS.White
    },
    card: {
        backgroundColor: COLORS.White,
        borderRadius: 14,
        margin: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },

})