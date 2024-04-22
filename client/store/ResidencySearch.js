import { create } from 'zustand'

const useResidenciesSearchStore = create((set) => ({
    residencies: [],
    setResidenciesSearch: (residencies) => set({ residencies: residencies }),
}));

export default useResidenciesSearchStore