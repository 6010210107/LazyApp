import React, { useState } from "react";
import {  Col, Row, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../../../controller/redux/action";
import './TodoForm.css'
const TodoForm = () => {
  let todos = useSelector((state) => state);
  const [content, setContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  let dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    let reg = /^\s*$/;
    if (reg.test(content)) return;
    const id = todos[todos.length - 1]?.id + 1 || 1;
    const payload = {
      id: id,
      content: content.trim(),
      highlight:isChecked
    };
    dispatch(addTodo(payload));
    setContent("");
    setIsChecked(false);
  };

  return (
    <Form onSubmit={submitForm} className="todo-form">
      <Row>
        <Col xs={{ span: 12, offset: 0 }} sm={{ span: 6, offset: 2 }} md={{ span: 6, offset: 2 }}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add todo"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={2} className="d-flex align-items-center justify-content-center">
          <Form.Group className="mb-3 " controlId="formBasicCheckbox">
            <Form.Check
            className="font-weight-bold "
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              label="Highlight"
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={2} md={1} className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="submit-btn">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
