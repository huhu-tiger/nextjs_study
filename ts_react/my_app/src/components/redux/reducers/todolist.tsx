import { TodoItem, TodoListMethods, SelectType, TodoState } from '../index_types'



const initState: TodoState = {
    alltodolist: [],
    todolist: [],
    SelectType: "all"
}

function todolistReducer(preState = initState, action: { type: TodoListMethods; data: any }): TodoState {
    const { type, data } = action
    const { alltodolist, SelectType } = preState
    
    switch (type) {
        case "addobj":
            // const newTodo = { ...data, id: Date.now() }
            const newTodo: TodoItem = data as TodoItem
            return { 
                alltodolist: [...alltodolist, newTodo], 
                todolist: SelectType === "true" ? alltodolist.filter(item => item.completed) :
                         SelectType === "false" ? alltodolist.filter(item => !item.completed) :
                         [...alltodolist, newTodo],
                SelectType 
            }
            
        case "deleteobj":
            const newAllList = typeof data === "string" || typeof data === "number" ?
                alltodolist.filter(item => item.id !== data) :
                alltodolist.filter(item => !data.includes(item.id))
                
            return { 
                alltodolist: newAllList,
                todolist: SelectType === "true" ? newAllList.filter(item => item.completed) :
                         SelectType === "false" ? newAllList.filter(item => !item.completed) :
                         newAllList,
                SelectType 
            }
            
        case "toggleobj":
            const toggledList = alltodolist.map(item => 
                item.id === data ? { ...item, completed: !item.completed } : item
            )
            
            return { 
                alltodolist: toggledList,
                todolist: SelectType === "true" ? toggledList.filter(item => item.completed) :
                         SelectType === "false" ? toggledList.filter(item => !item.completed) :
                         toggledList,
                SelectType 
            }
            
        case "select_all":
            return { alltodolist, todolist: alltodolist, SelectType: "all" }
            
        case "select_false":
            return { 
                alltodolist, 
                todolist: alltodolist.filter(item => !item.completed), 
                SelectType: "false" 
            }
            
        case "select_true":
            return { 
                alltodolist, 
                todolist: alltodolist.filter(item => item.completed), 
                SelectType: "true" 
            }
            
        default:
            return preState
    }
}

export default todolistReducer