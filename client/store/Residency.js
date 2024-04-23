import { create } from 'zustand'

const useResidenciesStore = create((set) => ({
    residencies: [],
    setResidencies: (residencies) => set({ residencies: residencies }),
}));
