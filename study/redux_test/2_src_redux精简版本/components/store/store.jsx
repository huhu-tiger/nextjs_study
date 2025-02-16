import { createStore } from "redux";
import countReducer from "./reduder";

const store = createStore(countReducer)

export default store