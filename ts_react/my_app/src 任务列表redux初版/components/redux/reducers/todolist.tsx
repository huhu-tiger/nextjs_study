import { TodoItem, TodoListMethods, SelectType, TodoState } from '../index_types'



const initState: TodoState = {
    alltodolist: [],
    todolist: [],
    SelectType: "all"
}

function todolistReducer(preState = initState, action: { type: TodoListMethods; data: any }): TodoState {
    console.log(preState)
    console.log(action)
    const { type, data }: { type: TodoListMethods; data: any } = action
    const { alltodolist, todolist, SelectType } = preState
    let all_newlist: TodoItem[] = []
    let todo_list: TodoItem[] = []
    switch (type) {
        case "addobj":
            return { alltodolist: [...alltodolist, data], todolist: [...todolist, data], SelectType: SelectType }
        case "deleteobj":
            ({ all_newlist, todo_list } = deleteTodo(alltodolist, todolist, data))
            return { alltodolist: all_newlist, todolist: todo_list, SelectType: SelectType }
        case "toggleobj":
            ({ all_newlist, todo_list } = toggleTodo(alltodolist, todolist, data))
            return { alltodolist: all_newlist, todolist: todo_list, SelectType: SelectType }
        case "select_all":
            console.log(data)
            // todo_list = todolist.filter((item) => item.completed)
            return { alltodolist: alltodolist, todolist: alltodolist, SelectType: "all" }
        case "select_false":

            all_newlist = alltodolist.filter((item) => !item.completed)
            console.log(all_newlist)
            // todo_list = todolist.filter((item) => !item.completed)
            return { alltodolist: alltodolist, todolist: all_newlist, SelectType: "false" }
        case "select_true":
            all_newlist = alltodolist.filter((item) => item.completed)
            // todo_list = todolist.filter((item) => item.completed)
            return { alltodolist: alltodolist, todolist: all_newlist, SelectType: "true" }
        default:
            return preState
    }
}

const toggleTodo = (alltodolist: TodoItem[], todolist: TodoItem[], id: string | number): { all_newlist: TodoItem[]; todo_list: TodoItem[] } => {
    // 使用map遍历todoList数组
    // 对于每一项,判断其id是否等于传入的id
    // 如果相等,返回一个新对象,保留原对象所有属性(...item),但将completed取反(!item.completed)
    // 如果不相等,返回原对象item不做修改
    // 最后setTodoList更新状态
    let newlist = alltodolist.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    // setTodoList((prevState: TodoItem[]) => {
    //     return newlist
    // })
    // setAlltodolist(newlist)
    return { all_newlist: newlist, todo_list: newlist }
}

const deleteTodo = (alltodolist: TodoItem[], todolist: TodoItem[], id: string | number | (string | number)[]): { all_newlist: TodoItem[]; todo_list: TodoItem[] } => {
    let all_newlist: TodoItem[] = []
    let todo_list: TodoItem[] = []
    if (typeof id === "string" || typeof id === "number") {
        all_newlist = alltodolist.filter((item) => item.id !== id)
        todo_list = todolist.filter((item) => item.id !== id)

        //     let newlist=prevState.filter((item) => item.id !== id)
        //     return newlist
        // })
        // setAlltodolist(newlist)
        return { all_newlist, todo_list }

    } else {
        // console.log(id)
        // let newlist=alltodolist.filter((item) => !id.includes(item.id))
        // setTodoList((prevState: TodoItem[]) => {
      
        //     let newlist=prevState.filter((item) => !id.includes(item.id))
        //     return newlist
        // })
        // setAlltodolist(newlist)
        all_newlist = alltodolist.filter((item) => !id.includes(item.id))
        todo_list = todolist.filter((item) => !id.includes(item.id))
        return { all_newlist, todo_list }
    }

}

export default todolistReducer