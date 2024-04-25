import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateFavourites } from '../utils/FavoriteResidency';
import { storeDataObj } from '../utils/data/AsyncStorage';

const useUserStore = create((set, get) => ({
    userData: null,
    isSignedIn: false, // Mặc định là false
    setUserData: (userData) => set({ userData }),
    setIsSignIn: (isSignedIn) => set({ isSignedIn }),
    checkSignedIn: async () => {
        const userData = await AsyncStorage.getItem('userInfo');
        if (userData) {
            // Cập nhật trạng thái người dùng dựa trên dữ liệu từ AsyncStorage
            set({ userData: JSON.parse(userData), isSignedIn: true });
        }
    },
    setFavResidenciesId: async (residencyId) => {
        const state = get()
        const newFavResidencies = updateFavourites(residencyId, state.userData?.favResidenciesID)
        const newUserData = {
            ...state.userData,
            favResidenciesID: newFavResidencies
        };
        // Cập nhật trạng thái và lưu vào AsyncStorage
        set({ userData: newUserData })
        storeDataObj("userInfo", newUserData)
        console.log(newUserData);
    }
}));

// Hàm khởi tạo để kiểm tra đăng nhập ngay khi store được tạo
useUserStore.getState().checkSignedIn();

export default useUserStore;