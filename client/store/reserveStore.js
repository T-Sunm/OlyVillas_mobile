import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware';
const useReserveStore = create(subscribeWithSelector((set) => ({
    rangeDate: {
        startDate: new Date(),
        endDate: new Date()
    },
    Guests: {
        "Adults": 1,
        "Children": 1,
        "Infants": 1
    },
    infoUser: {
        Phone: {
            normal: "",
            formatted: ""
        },
        Name: "",
        Email: "",
    },
    price: null,
    setRangeDate: (rangeDate) => set({ rangeDate: rangeDate }),
    setGuests: (Guests) => set({ Guests: Guests }),
    setName: (name) => set(state => ({ infoUser: { ...state.infoUser, Name: name } })),
    setEmail: (email) => set(state => ({ infoUser: { ...state.infoUser, Email: email } })),
    setPhone: (type, phone) => set(state => ({
        infoUser: {
            ...state.infoUser,
            Phone: {
                ...state.infoUser.Phone,
                [type]: phone,
            }
        }
    })),
    setPrice: (price) => set({ price: price }),
})));

export default useReserveStore