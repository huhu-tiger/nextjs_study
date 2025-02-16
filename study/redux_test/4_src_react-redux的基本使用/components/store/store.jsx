import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import countReducer from "./reduder";

// 使用 applyMiddleware 应用 thunk 中间件
const store = createStore(
    countReducer,
    applyMiddleware(thunk)
)

export default store