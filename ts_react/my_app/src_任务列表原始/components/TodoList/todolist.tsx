import { TodoItem, TodoListProps } from './index_types'
import { Button, Checkbox } from '@chakra-ui/react'
import { useState } from 'react'



function TodoListArea(props: TodoListProps) {



    return <div>
        <ul>
            {props.items?.map((item) => (
                <li key={item.id}>{item.title}
                {/* <Checkbox checked={item.completed} onChange={() => props.setSelected?.(item)} /> */}
                <Button onClick={() => props.onDelete?.(item.id)}>删除</Button>
                <Button onClick={() => props.onToggle?.(item.id)}>完成</Button>
                </li>
            ))}
        </ul>
        </div>
}

export default TodoListArea