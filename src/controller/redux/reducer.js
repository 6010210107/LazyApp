import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from "./action";
import { todos } from "./state";

export const reducer = (state = todos, action) => {
  let newTodo;
  switch (action.type) {
    case ADD_TODO:
      newTodo = [...state];
      newTodo.push(action.payload);
      return newTodo;

    case UPDATE_TODO:
      newTodo = state.map((todo) => {
        todo.name =
          todo.id === action.payload.id
            ? (todo.name = action.payload.name)
            : todo.name;
        return todo;
      });
      return newTodo;

      case DELETE_TODO:
        newTodo = [...state]
        newTodo = state.filter((todo) =>  todo.id !== action.payload)
        return newTodo

    default:
      return state;
  }
};
