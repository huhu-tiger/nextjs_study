import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import todolistReducer from "./reducers/todolist";
import { combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { TodoItem, SelectType } from './index_types';



// 使用 applyMiddleware 应用 thunk 中间件
// const store = createStore(
//     combineReducers({
//         count: countReducer,
//         persons: personReducer
//     }),
//     applyMiddleware(thunk)
// )

const allReducers = combineReducers({   
    todolist: todolistReducer
})

const store = createStore(
    todolistReducer,
    applyMiddleware(thunk)
)


export default store;