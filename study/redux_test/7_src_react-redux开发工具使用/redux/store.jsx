import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import countReducer from "./reducers/count";
import personReducer from "./reducers/person";
import { combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
// 使用 applyMiddleware 应用 thunk 中间件
// const store = createStore(
//     combineReducers({
//         count: countReducer,
//         persons: personReducer
//     }),
//     applyMiddleware(thunk)
// )



// 使用 redux-devtools-extension 应用 redux-devtools-extension 中间件
const store = createStore(
    combineReducers({
        count: countReducer,
        persons: personReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)


export default store;