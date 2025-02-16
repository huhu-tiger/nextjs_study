import { INCREMENT, DECREMENT } from './contant'

// 同步action，就是指action的值为Object类型的一般对象
const increment = (data) => ({type: INCREMENT, data})
const decrement = (data) => ({type: DECREMENT, data})


export {increment, decrement}