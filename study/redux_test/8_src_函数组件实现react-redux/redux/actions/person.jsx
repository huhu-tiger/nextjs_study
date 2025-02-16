import { ADD_PERSON } from '../contant'

const addPerson = (personObj) => ({type: ADD_PERSON, data: personObj})

export {addPerson}