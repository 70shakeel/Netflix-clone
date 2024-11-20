// app/store/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    // Define your initial state
    count: 0,

    // Define your actions
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

export default useStore;
