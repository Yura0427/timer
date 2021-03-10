import { combineReducers, createStore, } from "redux";
import reducer from "./reducer";

let reducers = combineReducers({
    reducer,
})
let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.store = store

export default store