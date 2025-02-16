const initState = 0

function countReducer(preState = initState, action){
    console.log(preState, action)
    const {type, data} = action
    switch(type){
        case "increment":
            return preState + data*1
        case "decrement":
            return preState - data*1
        default:
            return preState
    }
}

export default countReducer