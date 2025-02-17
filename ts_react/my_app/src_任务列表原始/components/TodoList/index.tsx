import { Grid, GridItem } from '@chakra-ui/react'
import Header from './header'
import TodoListArea from './todolist'
import Footer from './Footer'
import { useState, SetStateAction } from 'react'
import { TodoItem, TodoListProps, SelectType } from './index_types'


function TodoList() {
    const [alltodolist,setAlltodolist] = useState<TodoItem[]>([])

    const [todoList, setTodoList] = useState<TodoItem[]>([])
    const [selectType, setSelectType] = useState<SelectType>("all")

    // 切换选中状态
    const toggleSelect = (completed?: SelectType) => {
        console.log(completed)
        console.log(alltodolist)
        if(completed=="true"){
            let selectlist: TodoItem[] = alltodolist.filter(item => item.completed)
            setTodoList(selectlist)
        }
        if(completed=="false"){
            let selectlist: TodoItem[] = alltodolist.filter(item => !item.completed)
            setTodoList(selectlist)
        }
        if(completed=="all"){
            let selectlist:TodoItem[] = [...alltodolist]
            setTodoList(selectlist)
        }
        console.log(alltodolist)

    }

    const addTodo = (todo: TodoItem) => {
        let newlist=[...alltodolist, todo]
        setTodoList((prevState: TodoItem[]) => {
            return [...prevState, todo]
        })
        setAlltodolist(newlist)

    }

    const deleteTodo = (id: string | number | (string|number)[]) => {
        if(typeof id === "string" || typeof id === "number"){
            let newlist=alltodolist.filter((item) => item.id !== id)
            setTodoList((prevState: TodoItem[]) => {
    
                let newlist=prevState.filter((item) => item.id !== id)
                return newlist
            })
            setAlltodolist(newlist)
        }else{
            console.log(id)
            let newlist=alltodolist.filter((item) => !id.includes(item.id))
            setTodoList((prevState: TodoItem[]) => {
          
                let newlist=prevState.filter((item) => !id.includes(item.id))
                return newlist
            })
            setAlltodolist(newlist)
        }
    }

    const toggleTodo = (id: string | number) => {
        // 使用map遍历todoList数组
        // 对于每一项,判断其id是否等于传入的id
        // 如果相等,返回一个新对象,保留原对象所有属性(...item),但将completed取反(!item.completed)
        // 如果不相等,返回原对象item不做修改
        // 最后setTodoList更新状态
        let newlist=alltodolist.map((item) => item.id === id ? {...item, completed: !item.completed} : item)
        setTodoList((prevState: TodoItem[]) => {
            return newlist
        })
        setAlltodolist(newlist)
    }



    return (
    <div>
        <Grid
        templateAreas={`"header header"
                        "main main"
                        "footer footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        h='200px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
        >
        <GridItem pl='2' bg='orange.300' area={'header'}>
            <Header addTodo={addTodo} />
        </GridItem>

        <GridItem pl='2' bg='green.300' area={'main'}>
            <TodoListArea items={todoList} onDelete={deleteTodo} onToggle={toggleTodo}  selectType={selectType}/>
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
            <Footer items={todoList} onSelect={toggleSelect} selectType={selectType} onDelete={deleteTodo} setSelectType={setSelectType}/>
        </GridItem>
        </Grid>
    </div>)
}

export default TodoList