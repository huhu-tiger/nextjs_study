import React, { useState, createContext, useContext } from "react";
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

interface TodoContextType {
  todos: Itodo[];
  addTodo: (context: string) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, context: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

const Task: React.FC = () => {
  const { todos, deleteTodo, editTodo } = useTodoContext();
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
    editTodo(editid, editContext)
    seteditid(-1)
    seteditContext("")
  }

  const delclick = (id: number) => {
    deleteTodo(id)
  }

  return (
    <UnorderedList>
      {todos.map((item) => (
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

const TodoContextComponent: React.FC = () => {
  const [todos, setTodos] = useState<Itodo[]>(initialState)
  const [addContext, setaddContext] = useState<string>('')

  const addTodo = (context: string) => {
    if (context) {
      const nextid = todos[todos.length - 1].id + 1
      setTodos([...todos, { id: nextid, context }])
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  const editTodo = (id: number, context: string) => {
    setTodos(todos.map(item => 
      item.id === id ? { id, context } : item
    ))
  }

  const addClick = () => {
    addTodo(addContext)
    setaddContext("")
  }

  const contextValue: TodoContextType = {
    todos,
    addTodo,
    deleteTodo,
    editTodo
  }

  return (
    <TodoContext.Provider value={contextValue}>
      <VStack>
        <HStack spacing={4} align="stretch">
          <Input
            value={addContext}
            onChange={(e) => setaddContext(e.target.value)}
            size="sm"
            placeholder="请输入标题"
            autoFocus
          />
          <Button onClick={addClick}>add</Button>
        </HStack>
        <Box>
          <Task />
        </Box>
      </VStack>
    </TodoContext.Provider>
  )
}

export default TodoContextComponent
