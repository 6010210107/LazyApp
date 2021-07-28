import { ADD_TODO, UPDATE_TODO, DELETE_TODO, HIGHLIGHT_TODO } from "./action";
// import { todos } from "./state";

export const reducer = (state = [], action) => {
  let newTodo;
  let doHighlightElement;
  let dontHighlightElement;
  switch (action.type) {
    case ADD_TODO:
      newTodo = [...state];
      newTodo.push(action.payload);
      return newTodo;

    case UPDATE_TODO:
      newTodo = state.map((todo) => {
        todo.content =
          todo.id === action.payload.id
            ? (todo.content = action.payload.content)
            : todo.content;

        return todo;
      });
      return newTodo;

    case HIGHLIGHT_TODO:
      newTodo = state.map((todo) => {

        todo.highlight =
          todo.id === action.payload
            ? (!todo.highlight)
            : todo.highlight;

        return todo;
      });

      doHighlightElement = state.filter((todo) => todo.highlight === true).sort((a,b)=> a.id > b.id ? 1 : -1);
      dontHighlightElement = state.filter((todo) => todo.highlight === false);
      newTodo = [...doHighlightElement, ...dontHighlightElement];
      return newTodo;

    case DELETE_TODO:
      newTodo = [...state];
      newTodo = state.filter((todo) => {
        return todo.id !== action.payload;
      });
      return newTodo;

    default:
      doHighlightElement = state.filter((todo) => todo.highlight === true);
      dontHighlightElement = state.filter((todo) => todo.highlight === false);
      newTodo = [...doHighlightElement, ...dontHighlightElement];
      return newTodo;
  }
};
