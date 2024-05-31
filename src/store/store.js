import {combineReducers, createStore} from "redux"

import cartReducer from "../reducers/cartReducer"
const configStore = ()=>{
    const store = createStore(combineReducers({
        cartItems:cartReducer
    }))
    return store
}


export default configStore;

