import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {HStack, Input} from '@chakra-ui/react'
import React from 'react'
import { Button,Box,VStack } from '@chakra-ui/react'
import {
    Stat,
    StatLabel,
} from '@chakra-ui/react'

interface State {
    count:number
    increment:(num: number) => void
    decrement:(num: number) => void
    reset:()=>void
}

// const useStore = create<State>((set)=>{
//     return{
//         count:0,
//         increment:(num: number)=>set((state)=>({count:state.count+num})),
//         decrement:(num: number)=>set((state)=>({count:state.count-num})),
//         reset:()=>set({count:0})
//     }
// })

const useStore = create<State>()(
    immer((set) => ({
        count: 0,
        increment: (num) =>
            set((state) => {
                state.count += num
            }),
        decrement: (num) =>
            set((state) => {
                state.count -= num
            }),
        reset: () =>
            set({
                count: 0,
            }),
    })),
)

const ZustandImmer:React.FC=()=>{
    const {count,increment,decrement,reset} = useStore()


    console.log(count)
    return (
        <VStack >
            <HStack >
                <Stat>
                    <StatLabel>{count}</StatLabel>
                </Stat>
                <Button onClick={()=>{increment(1)}}>+1</Button>
                <Button onClick={()=>{decrement(1)}}>-1</Button>
                <Button onClick={reset}>reset</Button>
            </HStack>

        </VStack>



    )
}

export default ZustandImmer