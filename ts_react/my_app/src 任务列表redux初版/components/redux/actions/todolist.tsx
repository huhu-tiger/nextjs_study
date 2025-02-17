import { TodoListMethods, TodoItem, SelectType } from '../index_types'

const addobj = (data: TodoItem) => ({type: "addobj", data})
const deleteobj = (data: string | number | (string|number)[]) => ({type: "deleteobj", data})
const toggleobj = (data: string | number) => ({type: "toggleobj", data})
const select_all = (data: SelectType) => ({type: "select_all", data})
const select_false = (data: SelectType) => ({type: "select_false", data})
const select_true = (data: SelectType) => ({type: "select_true", data})

export {addobj, deleteobj, toggleobj, select_all, select_false, select_true}