
import { create } from 'zustand'


interface Istate {
    count: number
}
interface Istore {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
}

const useStore = create<Istore>((set) => ({
    count: 0,
    increment: () => set((state:Istate) => ({ count: state.count + 1 })),
    decrement: () => set((state:Istate) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}))

export default useStore;