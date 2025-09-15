import React, { useState, useReducer } from "react";
import { HStack, VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {
  Box,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

let initialState = [
  { id: 1, context: "你好" },
  { id: 2, context: "你好呀" }
]

type Itodo = typeof initialState[0]

interface IactionAdd {
  context: string;
  type: "add"
}

interface IactionDel {
  type: "del"
  id: number
}

interface IactionEdit {
  type: "edit"
  editid: number
  context: string
}

type Iaction = IactionAdd | IactionDel | IactionEdit

const tasksReducer = (state: { List: Itodo[] }, action: Iaction) => {
  switch (action.type) {
    case "add":
      const nextid = state.List[state.List.length - 1].id + 1
      return { List: [...state.List, { id: nextid, context: action.context }] }
    case "edit":
      return {
        List: state.List.map((item: Itodo) => {
          return (item.id === action.editid ? { id: action.editid, context: action.context } : item)
        })
      }
    case "del":
      return {
        List: state.List.filter((item) => {
          return item.id != action.id
        })
      }

    default:
      return state
  }
}

interface Iprops {
  List: Itodo[]
  dispatch: React.Dispatch<Iaction>
}

const Task: React.FC<Iprops> = (props: Iprops) => {
  const { List, dispatch } = props
  const [editid, seteditid] = useState<number>(-1)
  const [editContext, seteditContext] = useState<string>()

  const modifyclick = (id: number) => {
    if (id) {
      seteditid(id)
    }
  }

  const saveEdit = () => {
    if (editid === -1 || !editContext) {
      return
    }
    dispatch({ type: "edit", editid: editid, context: editContext })
    seteditid(-1)
    seteditContext("")
  }

  const delclick = (id: number) => {
    dispatch({ type: "del", id: id })
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

const TodoReducer: React.FC = () => {
  const [state, dispatch] = useReducer(tasksReducer, { List: initialState })
  const [addContext, setaddContext] = useState<string>('')

  const addClick = () => {
    if (addContext) {
      dispatch({ type: "add", context: addContext })
    }
    setaddContext("")
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
        <Task List={state.List} dispatch={dispatch}></Task>
      </Box>
    </VStack>
  )
}

export default TodoReducer
