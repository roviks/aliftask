import { combineReducers } from "redux";
import { todosReducer, usersReducer } from "./reducers";

export const rootReducer = combineReducers({
  users: usersReducer,
  todos: todosReducer,
});
