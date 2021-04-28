import {
  CREATE_TASK,
  CREATE_USER,
  GET_USERS,
  REMOVE_TASK,
  GET_TASKS,
  EDIT_TASK,
} from "./types";

export const todosReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, todos: [...state.todos, action.payload] };
    case REMOVE_TASK:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case EDIT_TASK:
      return {
        ...state,
        todos: state.todos.map((task) => {
          if (task.id === action.payload.id) {
            console.log(task, action.payload);
            return action.payload;
          }
          return task;
        }),
      };
    case GET_TASKS:
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };
    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
