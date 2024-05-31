import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const initialState = {
    locationData: {
        latitude: 16.4637,
        longitude: 107.5909,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    },
    mapData: {},
    rangeDate: { startDate: null, endDate: null },
    guestCount: null,
    locationType: null
};

const useSearchStore = create(subscribeWithSelector((set) => ({
    ...initialState,
    setMapData: (mapData) => set({ mapData: mapData }),
    setLocationData: (locationData) => set({ locationData: locationData }),
    setRangeDate: (startDate, endDate) => set({ rangeDate: { startDate, endDate } }),
    setGuestCount: (guestCount) => set({ guestCount: guestCount }),
    setLocationType: (locationType) => set({ locationType: locationType }),
    resetState: () => set(initialState),
})));

export default useSearchStore;
