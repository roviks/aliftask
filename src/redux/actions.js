import axios from "axios";
import {
  CREATE_TASK,
  CREATE_USER,
  EDIT_TASK,
  GET_TASKS,
  GET_USERS,
  REMOVE_TASK,
} from "./types";

export function createTodo(task) {
  return {
    type: CREATE_TASK,
    payload: task,
  };
}

export function createUser(user) {
  return {
    type: CREATE_USER,
    payload: user,
  };
}

export function removeTask(id) {
  return {
    type: REMOVE_TASK,
    payload: id,
  };
}

export function editTask(task) {
  console.log(task);
  return {
    type: EDIT_TASK,
    payload: task,
  };
}

export function getTodos() {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/todos");
    dispatch({ type: GET_TASKS, payload: response.data });
  };
}

export function getUsers() {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/users");
    dispatch({ type: GET_USERS, payload: response.data });
  };
}
