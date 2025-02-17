import { TodoItem, TodoDispatchType } from '../redux/index_types'
import { Button, Checkbox } from '@chakra-ui/react'
import { useState } from 'react'



function TodoListArea(props: TodoDispatchType) {



    return <div>
        <ul>
            {props.TodoState.todolist?.map((item) => (
                <li key={item.id}>{item.title}
                {/* <Checkbox checked={item.completed} onChange={() => props.setSelected?.(item)} /> */}
                <Button onClick={() => props.deleteobj?.(item.id)}>删除</Button>
                <Button onClick={() => props.toggleobj?.(item.id)}>完成</Button>
                </li>
            ))}
        </ul>
        </div>
}

export default TodoListArea