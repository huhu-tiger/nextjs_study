
import { Input,Button,Checkbox } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { TodoItem } from './index_types'
function Header(props: { addTodo: (todo: TodoItem) => void }) {

    const inputRef = useRef<HTMLInputElement>(null)

    const handleAddTodo = () => {
        if (inputRef.current) {
            props.addTodo({
                id: Date.now(),
                title: inputRef.current.value,
                completed: false
            })
            inputRef.current.value = ''
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
        {/* <Checkbox onChange={() => props.toggleSelect(props.todoList, true)} /> */}
        <Input ref={inputRef} placeholder='请输入 任务名称' style={{display: 'inline-block', marginRight: '10px'}} />
        <Button onClick={handleAddTodo} style={{display: 'inline-block'}}>添加</Button>
        </div>)
}

export default Header