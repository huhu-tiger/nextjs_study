
import { HStack, VStack, Input, Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { persist, createJSONStorage } from "zustand/middleware";
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react'
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton
} from "@chakra-ui/react";
import {
    Stat,
    StatLabel,
} from '@chakra-ui/react'


// 自定义存储
const createCustomStorage = () => {
    const sessionKeys = ['name', 'age'];

    return {
        getItem: (name: string) => {
            const sessionData = JSON.parse(sessionStorage.getItem(name) || '{}');
            const localData = JSON.parse(localStorage.getItem(name) || '{}');
            return JSON.stringify({ ...localData, ...sessionData });
        },
        setItem: (name: string, value: string) => {
            const data = JSON.parse(value);

            // 分离 session 和 local 数据
            const sessionData = Object.fromEntries(
                Object.entries(data.state).filter(([key]) => sessionKeys.includes(key))
            );
            const localData = Object.fromEntries(
                Object.entries(data.state).filter(([key]) => sessionKeys.includes(key))
            );
            /*
              Object.entries(data.state)
              假设 data.state = { name: "张三", age: 25, source: "web", chatId: "123" }
              返回: [["name", "张三"], ["age", 25], ["source", "web"], ["chatId", "123"]]
            
              .filter(([key]) => sessionKeys.includes(key))
              filter() 方法过滤数组
              ([key]) 是数组解构语法
              等价于 (item) => item[0]，但更简洁
            */


            // 分别存储
            if (Object.keys(sessionData).length > 0) {
                sessionStorage.setItem(name, JSON.stringify({ state: sessionData, version: 0 }));
            }
            if (Object.keys(localData).length > 0) {
                localStorage.setItem(name, JSON.stringify({ state: localData, version: 0 }));
            }
        },
        removeItem: (name: string) => {
            sessionStorage.removeItem(name);
            localStorage.removeItem(name);
        }
    };
};


type TuseStore = {
    name: string,
    setname: (value: string) => void,
    age: number
    setage: (value: number) => void,
    // reset: () =>void,
    nominal_age: number,
    setnominal_age: () => void
}


const useStore = create<TuseStore>()(
    devtools(
        persist(
            immer(
                (set, get) => (
                    {
                        name: '自定义姓名',
                        setname: ((value) => set((state) => ({ name: value }))),
                        age: 0,
                        setage: ((value) => set((state) => ({ age: value }))),
                        nominal_age: 0,
                        setnominal_age: (() => set((state) => ({ nominal_age: get().age + 1 })))

                    }
                )
            ),
            { // 持久化存储
                name: "custom-storage",
                // storage: createJSONStorage(()=>localStorage)
                storage: createJSONStorage(createCustomStorage)
            }
        ),
    )
)


const ZustandStore: React.FC = () => {
    const { name, setname, age, setage, nominal_age, setnominal_age } = useStore()

    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log(name, age)
    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setname(e.target.value)

    }
    const ageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setage(parseInt(e.target.value))
        setnominal_age()
    }

    return (
        <SimpleGrid columns={1} spacing={10}>
            <Box height='80px' display='flex' alignItems='center' justifyContent='center'>
                <Stat>
                    <StatLabel fontSize='xl' fontWeight='bold' textAlign='center'>优化从localStorage中读取数据</StatLabel>
                </Stat>
            </Box>
            <Box height='80px' display='flex' alignItems='center' justifyContent='center'>
                <Button onClick={onOpen}>使用Zustand传递数据</Button>

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>年龄</FormLabel>
                                <Input type='text' onChange={ageChange} />
                                <FormHelperText>{`${age}`}</FormHelperText>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            <Box height='80px' display='flex' alignItems='center'>
                <HStack spacing={8} align='center'>


                    <FormControl>
                        <FormLabel>姓名</FormLabel>
                        <Input type='text' onChange={nameChange} value={name}/>
                        <FormHelperText>{`当前姓名:${name}`}</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>年龄</FormLabel>
                        <Input type='text' onChange={ageChange} value={age}/>
                        <FormHelperText>{`当前年龄:${age}`}</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel>虚岁</FormLabel>
                        {/* <Input type='text' onChange={ageChange}/> */}
                        <FormHelperText>{`虚岁:${nominal_age}`}</FormHelperText>
                    </FormControl>
                </HStack>
            </Box>
        </SimpleGrid>



    )
}

export default ZustandStore