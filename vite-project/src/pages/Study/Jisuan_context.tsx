import React, { useState, useEffect, useReducer, useMemo } from "react";
import { Stack, HStack, VStack, list } from '@chakra-ui/react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Box,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'


let initialState = [
    { id: 1, context: "你好" },
    { id: 2, context: "你好呀" }
]

type Itodo = typeof initialState[0]


type global = {
    editid
}


const tasksReducer = (state: { List: Itodo[] }, action: { type: "add" | "edit"|"del" }) => {
    switch (action.type) {
        case "add":
            const nextid=state.List[state.List.length -1].id+1
            return [...state.List, { id: nextid, context: addContext }]
        case "edit":
            return { count: state.count - 1 }
        case "del":

        default:
            return state
    }

}

interface Iprops {
    setList: any
    List: Itodo[]
}

const Task: React.FC<Iprops> = (props: Iprops) => {
    const { List, setList } = props
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
                return (item.id === editid ? {id:item.id,context:editContext} : item)

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

const JisuanContext: React.FC = () => {

    const [addContext, setaddContext] = useState<string>('')
    const [List, setList] = useState<Itodo[]>(initialState)
    // let nextid = 3
    let nextid:number=0
    const addClick = () => {
        if (addContext) {
            nextid=List[List.length -1].id+1
            setList([...List, { id: nextid, context: addContext }])
            nextid=nextid+1
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
                <Button onClick={() => { addClick() }}>add</Button>

            </HStack>
            <Box>
                <Task List={List} setList={setList}></Task>
            </Box>

        </VStack>
    )
}


export default JisuanContext