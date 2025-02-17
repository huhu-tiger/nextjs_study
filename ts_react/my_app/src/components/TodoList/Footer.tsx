import { Button, ButtonGroup } from '@chakra-ui/react'
import { TodoItem, SelectType } from '../redux/index_types'
import { TodoDispatchType } from '../redux/index_types'


function Footer(props: TodoDispatchType) {


    // const handleSelected = (selectType: SelectType) => {
    //     props.onSelect?.(selectType)
    // }

    // const handleClear = () => {
    //     const ids = props.items
    //         ?.filter(item => item.completed)
    //         .map(item => item.id)
    //     console.log(ids)
    //     if (ids?.length) {
    //         props.onDelete?.(ids)
    //     }
    // }


    return (<div>
        <ButtonGroup>
        <Button onClick={() => props.select_all("all")}>显示全部</Button>
            <Button onClick={() => props.select_false("false")}>显示未完成</Button>
            <Button onClick={() => props.select_true("true")}>显示已完成</Button>
            <Button onClick={() => props.deleteobj(props.TodoState.todolist?.filter((item) => item.completed).map((item) => item.id))}>清除已完成</Button>
        </ButtonGroup>

        <span>{props.TodoState.todolist?.filter((item) => item.completed).length}个已完成</span>/
        <span>{props.TodoState.todolist?.filter((item) => !item.completed).length}个未完成</span>
        </div>)
}

export default Footer