import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';

const useResidenciesStore = create(subscribeWithSelector((set) => ({
    residencies: [],
    setResidencies: (residencies) => set({ residencies: residencies }),

})));

export default useResidenciesStore
