import { useState,useEffect, useRef } from "react";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { createContext, useContext } from 'react';
import type {ThemeTypings} from '@chakra-ui/react'


// 两个Context
const ThemeContext = createContext('teal');
const SizeContext = createContext('xs');

const Child:React.FC=()=>{
    const theme:ThemeTypings["colorSchemes"] = useContext(ThemeContext)
    const size:string = useContext(SizeContext)

    return (
        <Stack spacing={4} direction='row' align='center'>
        <Button colorScheme={theme} size={size}>
            Button
        </Button>
        <Button colorScheme={theme} size={size}>
            Button
        </Button>
        <Button colorScheme={theme}  size={size}>
            Button
        </Button>
        <Button colorScheme={theme}  size={size}>
            Button
        </Button>
        </Stack>
    )

}

const ContextUse:React.FC=()=> {
    const [theme, settheme] = useState('1')
    const [size, setsize] = useState('xs')
    
    const handleChange=(value:string)=>{
        settheme((prev:string)=>{
                return value
                })
    }

    const handleChangeSize=(value:string)=>{
        setsize((prev:string)=>{
            return value

        })
    }
    // 两个Context
    return (
        <ThemeContext.Provider value={theme}>
            <SizeContext.Provider value={size}>
                <VStack spacing={4} align="stretch">
                    <RadioGroup onChange={handleChange} value={theme}>
                        <Stack direction='row'>
                            <Radio value='gray'>gray</Radio>
                            <Radio value='teal'>teal</Radio>
                            <Radio value='red'>red</Radio>
                        </Stack>
                        </RadioGroup>

                        <RadioGroup onChange={handleChangeSize} value={size}>
                        <Stack direction='row'>
                            <Radio value='xs'>xs</Radio>
                            <Radio value='sm'>sm</Radio>
                            <Radio value='md'>md</Radio>
                        </Stack>
                        </RadioGroup>
                    <Child></Child>
                </VStack>
            </SizeContext.Provider>
        </ThemeContext.Provider>
    )

}
export default ContextUse