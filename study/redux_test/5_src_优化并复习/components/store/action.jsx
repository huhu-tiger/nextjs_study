


const increment = (data) => ({type: "increment", data})
const decrement = (data) => ({type: "decrement", data})
const incrementAsync = (data, time) => {

    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(increment(data))
        }, time)
    }

}
export {increment, decrement,incrementAsync}