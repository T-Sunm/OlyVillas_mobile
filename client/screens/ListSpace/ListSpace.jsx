import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { getAllProperties, getAllResidencies_withAuthorEmail } from '../../api/Residency'
import useUserStore from '../../store/User'
import { ScrollView } from 'react-native-gesture-handler'
import ListItems from '../../components/HostResidencies/ListItems'
import { FONTFAMILY } from '../../theme/theme'

const ListSpace = () => {

    const { userData } = useUserStore()
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const scrollRef = useRef(null)


    const fetchData = async () => {
        const params = {
            authorEmail: userData?.email ? userData?.email : ""
        }
        try {
            setLoading(true)
            const data = await getAllResidencies_withAuthorEmail(params)
            setItems(data)
            // mặc định ban đầu sẽ tải hết dữ liệu

            setTimeout(() => {
                setLoading(false)
            }, 100)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [userData])

    const onRefresh = () => {
        fetchData(true);
    };


    return (
        <View style={styles.root}>
            <Text style={styles.headerText}>
                Your listing
            </Text>
            {/* xài ScrollView của gesture-handler để xử lý xung đột giữa ScrollView và GestureDetector
            // cụ thể : khi kéo 'xuống' mà trỏ chuột đang dính item đó -> nó chỉ kéo qua về (chiều ngang)
            // cách fix --> tạo scrollRef rồi truyền vào trong ListItem cho simultaneousWithExternalGesture xài 
            */}
            <ScrollView ref={scrollRef}>
                {items.map((item, index) => (
                    <ListItems key={index} listing={item} simultaneousHandlers={scrollRef} />
                ))}
            </ScrollView>
        </View>
    )
}

export default ListSpace

const styles = StyleSheet.create({
    root: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "white",
        paddingTop: 100,

    },
    headerText: {
        fontSize: 24,
        padding: 24,
        fontFamily: FONTFAMILY.poppins_bold
    },
})