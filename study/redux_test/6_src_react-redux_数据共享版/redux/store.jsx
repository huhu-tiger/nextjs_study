import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import countReducer from "./reducers/count";
import personReducer from "./reducers/person";
import { combineReducers } from "redux";
// 使用 applyMiddleware 应用 thunk 中间件
const store = createStore(
    combineReducers({
        count: countReducer,
        persons: personReducer
    }),
    applyMiddleware(thunk)
)

export default store