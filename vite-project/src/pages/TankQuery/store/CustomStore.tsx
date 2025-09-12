import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

interface Store {
    sortBy: string
    setSortBy: (sortBy:string)=>void
    sortOrder: string
    setSortOrder: (sortOrder:string)=>void
}


export const CustomStore=create<Store>()(
    devtools(
        immer(
                (set)=>({
                    sortBy:"id",
                    setSortBy:((sortBy:string) => set((state) => ({ sortBy: sortBy }))),
                    sortOrder: "asc",
                    setSortOrder: ((sortOrder:string)=>set((state)=>({sortOrder:sortOrder})))

                })
        )
    ))