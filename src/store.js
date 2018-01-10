import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import PostsReducer from "./reducers/Posts";

let preload = {};

if (typeof window !== "undefined") {
  preload = window.__redux_state__ || {};
}

const reducers = combineReducers({
  PostsReducer
});

const middlewares = applyMiddleware(Thunk);

const store = createStore(reducers, preload, middlewares);

export default store;
