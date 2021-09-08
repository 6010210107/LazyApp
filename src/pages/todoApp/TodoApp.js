import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { TodoItem, TodoForm, Header } from "../../components";
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
    <div className="content-container">
      <Header contentHeader={"Todo App"} />

      <Container className="p-5">
        <TodoForm />

        {/* List of items */}
        {contentList}
      </Container>
    </div>
  );
};

export default TodoApp;
