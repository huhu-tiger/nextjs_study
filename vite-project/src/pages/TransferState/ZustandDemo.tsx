
import {HStack, Input} from '@chakra-ui/react'
import useStore from './Store/ZustandStore'
import React from 'react'
import { Button,Box,VStack } from '@chakra-ui/react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'
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