import React, {useState} from "react";
import {HStack, VStack} from '@chakra-ui/react'

import {Button,} from '@chakra-ui/react'
import {
    Box,
    ListItem,
    UnorderedList,
} from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'


let initialState = [
    {id: 1, context: "你好"},
    {id: 2, context: "你好呀"}
]

type Itodo = typeof initialState[0]


interface Iprops {
    setList: any
    List: Itodo[]
}

const Task: React.FC<Iprops> = (props: Iprops) => {
    const {List, setList} = props
    const [editid, seteditid] = useState<number>(-1)
    const [editContext, seteditContext] = useState<string>()

    const delclick = (id: number) => {
        // List.filter((item) => {
        //     return item.id != id
        // })
        setList(List.filter((item) => {
            return item.id != id
        }))
    }

    const modifyclick = (id: number) => {
        if (id) {
            seteditid(id)
        }

    }

    const saveEdit = () => {
        if (editContext) {
            console.log(editContext)
            console.log(editid)
            console.log(List)
            setList(List.map((item: Itodo) => {
                return (item.id === editid ? {id: item.id, context: editContext} : item)

            }))

            seteditid(-1)
        }
    }

    return (
        <UnorderedList>
            {List.map((item) => (

                (editid !== item.id) ? (

                        <ListItem key={item.id}>
                            <HStack spacing={4} align="stretch">
                                <Input
                                    defaultValue={item.context}
                                    disabled
                                    size="sm"
                                    autoFocus
                                />
                                <Button onClick={() => delclick(item.id)}> 删除 </Button>
                                <Button onClick={() => modifyclick(item.id)}> 修改 </Button>
                            </HStack>
                        </ListItem>
                    ) :
                    (
                        <ListItem key={item.id}>
                            <HStack spacing={4} align="stretch">
                                <Input
                                    defaultValue={item.context}
                                    onChange={(e) => seteditContext(e.target.value)}
                                    size="sm"
                                    autoFocus
                                />

                                <Button onClick={() => delclick(item.id)}> 删除 </Button>
                                <Button onClick={() => saveEdit()}> 保存 </Button>
                            </HStack>

                        </ListItem>
                    )

            ))}
        </UnorderedList>

    )
}

const Todo: React.FC = () => {

    const [addContext, setaddContext] = useState<string>('')
    const [List, setList] = useState<Itodo[]>(initialState)
    // let nextid = 3
    let nextid: number = 0
    const addClick = () => {
        if (addContext) {
            nextid = List[List.length - 1].id + 1
            setList([...List, {id: nextid, context: addContext}])
            nextid = nextid + 1
            setaddContext('')
        }

    }
    return (
        <VStack>
            <HStack spacing={4} align="stretch">

                <Input
                    value={addContext}
                    onChange={(e) => setaddContext(e.target.value)}
                    size="sm"
                    placeholder="请输入标题"
                    autoFocus
                />
                <Button onClick={() => {
                    addClick()
                }}>add</Button>

            </HStack>
            <Box>
                <Task List={List} setList={setList}></Task>
            </Box>

        </VStack>
    )
}


export default Todo