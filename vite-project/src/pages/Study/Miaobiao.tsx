import { useState,useEffect, useRef } from "react";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'


export default function Miaobiao() {
    const [timeCount, setTimeCount] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(true)
    const jishi = useRef<NodeJS.Timeout | null>(null)
    
    const recodeClient=()=>{
         if (status){
            // 切换为停止 
            setStatus(false)
            
            const id = setInterval(() => {
            // timeCount =  10 + timeCount
            setTimeCount(prev => {
                const t = prev + 10
                return t
            })

        }, 10)
            jishi.current = id
            console.log(`save ${jishi.current}`)

         }else{
            //切换为开始
            setStatus(true)
            if (jishi.current) {
                console.log(`clear ${jishi.current}`)
                clearInterval(jishi.current)
                jishi.current = null
            }
         }
    }

    return (
        <VStack spacing={4} align="stretch">
            <Stat>
            <StatLabel>时间计时</StatLabel>
            <StatNumber>{(timeCount/1000).toFixed(3)}</StatNumber>
            </Stat>
            <ButtonGroup gap='4'>
            <Button colorScheme='red' onClick={recodeClient}>{status ? "开始" : "停止"}</Button>
            <Button colorScheme='teal' onClick={() => setTimeCount(0)}>清除</Button>

            </ButtonGroup>

        </VStack>
    )

}