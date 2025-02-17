// 定义单个待办事项的类型
export interface TodoItem {
    id: string | number;
    title: string;
    completed: boolean;
}

export type SelectType = "all" | "true" | "false"


// 定义TodoList组件的props类型
export interface TodoListProps {
    items?: TodoItem[];
    selectType?: SelectType;
    onAdd?: (item: TodoItem) => void;
    onDelete?: (id: string | number | (string | number)[]) => void;
    onToggle?: (id: string | number) => void;
    onSelect?: (completed: SelectType) => void;
    setSelectType?: (selectType: SelectType) => void;
}

export type TodoListMethods = "addobj" | "deleteobj" | "toggleobj" | "select_all" | "select_false" | "select_true"

export type TodoState = {
    alltodolist: TodoItem[];
    todolist: TodoItem[];
    SelectType: SelectType;
}

export type TodoDispatch = {
    addobj: (data:TodoItem) => {type:TodoListMethods,data:TodoItem}
    // addobj = (data:TodoItem):{type:TodoListMethods,data:any} => ({type: "addobj", data})
    deleteobj: (data:(string | number | (string|number)[])) => {type:TodoListMethods,data:(string | number | (string|number)[])}
    // deleteobj: (data:TodoItem):{type:TodoListMethods,data:any} => ({type: "deleteobj", data})
    toggleobj: (data:string | number) => {type:TodoListMethods,data:string | number}
    // toggleobj: (data:TodoItem):{type:TodoListMethods,data:any} => ({type: "toggleobj", data})
    select_all: (data:SelectType) => {type:TodoListMethods,data:SelectType}
    // select_all: (data:TodoItem):{type:TodoListMethods,data:any} => ({type: "select_all", data})
    select_false: (data:SelectType) => {type:TodoListMethods,data:SelectType}
    // select_false: (data:TodoItem):{type:TodoListMethods,data:any} => ({type: "select_false", data})
    select_true: (data:SelectType) => {type:TodoListMethods,data:SelectType}
    // select_true: (data:TodoItem):{type:TodoListMethods,data:any} => ({type: "select_true", data})
}

export type TodoDispatchType = {
    addobj: (data:TodoItem) => {type:TodoListMethods,data:TodoItem}
    deleteobj: (data:(string | number | (string|number)[])) => {type:TodoListMethods,data:(string | number | (string|number)[])}
    toggleobj: (data:string | number) => {type:TodoListMethods,data:string | number}
    select_all: (data:SelectType) => {type:TodoListMethods,data:SelectType}
    select_false: (data:SelectType) => {type:TodoListMethods,data:SelectType}
    select_true: (data:SelectType) => {type:TodoListMethods,data:SelectType}
    TodoState: TodoState
}