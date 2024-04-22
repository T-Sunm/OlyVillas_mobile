import { create } from 'zustand'

const useSearchStore = create((set) => ({
    locationData: {
        latitude: 16.4637,
        longitude: 107.5909,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    },
    mapData: undefined,
    setMapData: (mapData) => set({ mapData: mapData }),
    setLocationData: (locationData) => set({ locationData: locationData })
}));

export default useSearchStore