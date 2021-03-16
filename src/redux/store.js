import { combineReducers, createStore, } from "redux";
import reducer from "./reducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['reducer']
}

const reducers = combineReducers({
    reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store)
window.store = store


export default { store, persistor }