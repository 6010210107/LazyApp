import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import { TodoItem, TodoForm } from "../../components";
import { useSelector } from "react-redux";
import "./TodoApp.css";

const TodoApp = () => {
  let todos = useSelector((state) => state);
  const [contentList, setContentList] = useState(() =>
    todos.map((todo) => (
      <TodoItem
        key={todo.id}
        index={todo.id}
        content={todo.content}
        highlight={todo.highlight}
      />
    ))
  );

  useEffect(() => {

    setContentList(() =>
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          index={todo.id}
          content={todo.content}
          highlight={todo.highlight}
        />
      ))
    );
  }, [todos]);

  return (
    <Container className="min-vh-100 bg-gray-100 shadow-sm px-5 pt-5 mt-1">
      <Container className="todo-header">
        <h2>Todo App</h2>
      </Container>
      <TodoForm/>

      {/* List of items */}
      {contentList}
    </Container>
  );
};

export default TodoApp;
