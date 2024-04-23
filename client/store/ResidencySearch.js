import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';

const useResidenciesSearchStore = create(subscribeWithSelector((set) => ({
    residencies: [],
    setResidenciesSearch: (residencies) => set({ residencies: residencies }),
})));

export default useResidenciesSearchStore