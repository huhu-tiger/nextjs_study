import { ADD_PERSON } from '../contant'
const initState = []

const reducer = (preState=initState, action) => {
    const {type, data} = action
    console.log('type',type,'data',data)
    console.log('preState',preState)
    switch(type){
        case ADD_PERSON:    
            return [data, ...preState]
        default:
            return preState
    }
}

export default reducer