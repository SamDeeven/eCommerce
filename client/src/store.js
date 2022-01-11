import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsReducer } from './reducers/productReducers'

const reducer = combineReducers({
    products: productsReducer


})


// contains all data that we put in the state
let initialState = {}

const middleware = [thunk]

const product = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default product