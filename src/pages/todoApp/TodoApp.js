import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { TodoItem } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../../controller/redux/action";
import "./TodoApp.css";

const TodoApp = () => {
  let todos = useSelector((state) => state);
  let dispatch = useDispatch();

  const [content, setContent] = useState("");
  const submitForm = (e) => {
    
    e.preventDefault();
    let reg = /^\s*$/;
    if (reg.test(content)) return;
    const id = todos[todos.length - 1]?.id + 1 || 1;
    const payload = {
      id: id,
      content: content.trim(),
    };
    dispatch(addTodo(payload));
    setContent("");
  };
  return (
    <Container  className="min-vh-100 bg-gray-100 shadow-sm px-5 pt-5 mt-1">
      <Container className="todo-header">
        <h2>Todo App</h2>
      </Container>
      <Form onSubmit={submitForm} className="todo-form">
        <Row>
          <Col xs={{ span: 7, offset: 2 }}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Add todo"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </Form.Group>
          </Col>

          <Col xs={1}>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      {/* List of items */}
      {todos.length > 0
        ? todos.map((todo) => (
            <TodoItem key={todo.id} index={todo.id} content={todo.content} />
          ))
        : ""}
 
    </Container>
  );
};

export default TodoApp;
