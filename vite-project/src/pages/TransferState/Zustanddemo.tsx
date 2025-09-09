
import {HStack, Input} from '@chakra-ui/react'
import React from 'react'
import { Button,Box,VStack } from '@chakra-ui/react'
import {
    Stat,
    StatLabel,
} from '@chakra-ui/react'
import { create } from 'zustand'


type TuseStore={
    count:number,
    increment: () =>void,
    decrement: () =>void,
    reset: () =>void,
}

type Istate ={
    count:number
}

const useStore = create<TuseStore>()(
    (set)=>(
            {
                count:0,
                increment: ()=>(set((state:Istate)=>({count:state.count+1}))),
                decrement: ()=>(set((state:Istate)=>({count:state.count-1}))),
                reset: ()=>set({count:0})
            }
    )
)


const ZustandDemo:React.FC=()=>{
    const {count,increment,decrement,reset} = useStore()


    console.log(count)
    return (
        <VStack >
            <HStack >
                <Stat>
                    <StatLabel>{count}</StatLabel>
                </Stat>
                <Button onClick={increment}>+</Button>
                <Button onClick={decrement}>-</Button>
                <Button onClick={reset}>reset</Button>
            </HStack>

        </VStack>



    )
}

export default ZustandDemo