import React, { useState, useMemo } from "react";
import { VStack } from '@chakra-ui/react'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

interface Iprops  {
    value:number
}

const  Child:React.FC<Iprops>=(props:Iprops)=>{
    console.log(props)

    const squared = useMemo(()=>{
        return {
            pingfang: props.value**2,
            lifang:props.value**3

        }

    },[props.value])
    
    return (

            <StatGroup>
            <Stat>
                <StatLabel>平方</StatLabel>
                <StatNumber>{squared.pingfang.toFixed(3)}</StatNumber>
                <StatHelpText>
                <StatArrow type='increase' />
                 n*n
                </StatHelpText>
            </Stat>

            <Stat>
                <StatLabel>立方</StatLabel>
                <StatNumber>{squared.lifang.toFixed(3)}</StatNumber>
                <StatHelpText>
0                <StatArrow type='increase' />
                 n**3
                </StatHelpText>
            </Stat>
            </StatGroup>

    )
}



const  Jisuan:React.FC=()=> {

    const [value,setvalue] = useState<number>(0)

    const numChange=(valueAsString: string, valueAsNumber: number)=>{
        setvalue(valueAsNumber)
    }
    return (
        <VStack spacing={4} align="stretch">
            <Child value={value}></Child>

            <NumberInput defaultValue={value} precision={2} step={0.2} onChange={numChange}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
        </VStack>
    )
}



export default Jisuan