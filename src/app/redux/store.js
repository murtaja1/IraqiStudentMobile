import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import FetchTokenReducer from "./reducers/FetchTokenReducer"

const initialValues = []

const store = createStore(FetchTokenReducer, applyMiddleware(thunk))
export default store
