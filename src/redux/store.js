import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {placesReducer} from "./placesReducer";

const reducers = combineReducers({
    places: placesReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))