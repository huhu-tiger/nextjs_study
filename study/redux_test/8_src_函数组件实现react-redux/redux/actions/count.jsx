import { INCREMENT, DECREMENT } from '../contant'


const increment = (data) => ({type: INCREMENT, data})
const decrement = (data) => ({type: DECREMENT, data})
const incrementAsync = (data, time) => {

    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment(data))
        }, time)
    }

}


export {increment, decrement,incrementAsync}