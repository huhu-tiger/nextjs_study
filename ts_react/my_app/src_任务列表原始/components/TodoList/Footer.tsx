import { Button, ButtonGroup } from '@chakra-ui/react'
import { TodoItem, SelectType } from './index_types'
import { TodoListProps } from './index_types'


function Footer(props: TodoListProps) {


    const handleSelected = (selectType: SelectType) => {
        props.onSelect?.(selectType)
    }

    const handleClear = () => {
        const ids = props.items
            ?.filter(item => item.completed)
            .map(item => item.id)
        console.log(ids)
        if (ids?.length) {
            props.onDelete?.(ids)
        }
    }


    return (<div>
        <ButtonGroup>
        <Button onClick={() => handleSelected("all")}>显示全部</Button>
            <Button onClick={() => handleSelected("false")}>显示未完成</Button>
            <Button onClick={() => handleSelected("true")}>显示已完成</Button>
            <Button onClick={() => handleClear()}>清除已完成</Button>
        </ButtonGroup>

        <span>{props.items?.filter((item) => item.completed).length}个已完成</span>/
        <span>{props.items?.filter((item) => !item.completed).length}个未完成</span>
        </div>)
}

export default Footer