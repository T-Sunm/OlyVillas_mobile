import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';

const useSearchStore = create(subscribeWithSelector((set) => ({
    locationData: {
        latitude: 16.4637,
        longitude: 107.5909,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    },
    mapData: undefined,
    setMapData: (mapData) => set({ mapData: mapData }),
    setLocationData: (locationData) => set({ locationData: locationData })
})));

export default useSearchStore