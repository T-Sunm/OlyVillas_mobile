import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';

const useResidenciesSearchStore = create(subscribeWithSelector((set) => ({
    residencies: [],
    setResidenciesSearch: (residencies) => set({ residencies: residencies }),
    loading: false,
    setLoading: (isLoading) => set({ loading: isLoading }),
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page })
})));

export default useResidenciesSearchStore