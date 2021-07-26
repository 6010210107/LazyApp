import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { updateTodo, deleteTodo } from "../../controller/redux/action";
import "./TodoItem.css";

const TodoItem = ({ index, content, action }) => {
  const [ediable, setEdiable] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [highlight, setHighlight] = useState(false);

  let dispatch = useDispatch();

  const onUpdateSubmit = (e) => {
    e.preventDefault();
    if (newContent === content) return;
    const payload = {
      id: index,
      content: newContent,
    };
    dispatch(updateTodo(payload));
  };

  return (
    <Form onSubmit={onUpdateSubmit}>
      <Container className="bg-gray-200 item-container" onClick={action}>
        <Container>
          <Row className="p-3 m-2 ">
            <Col xs={12} lg={1} className="d-flex-center">
              <h6>{index}</h6>
            </Col>
            <Col
              xs={12}
              lg={8}
              className={`item-content ${ediable ? "" : "d-flex-center"}`}
            >
              {ediable ? (
                <Form.Control
                  type="text"
                  value={newContent}
                  size="md"
                  className="item-form"
                  onChange={(e) => setNewContent(e.target.value)}
                />
              ) : (
                <p className="item-content-paragraph">{newContent}</p>
              )}
            </Col>
            <Col xs={12} sm={6} lg={1} className="item-btn-container">
              <Button
                // type={ediable ? "submit" : "button"}
                type="submit"
                variant="warning"
                className="item-btn"
                onClick={() => {
                  setEdiable(!ediable);
                  // onUpdateSubmit();
                }}
              >
                {ediable ? "Update" : "Edit"}
              </Button>
            </Col>
            <Col xs={12} sm={6} lg={1} className="item-btn-container">
              <Button
                variant="danger"
                className="item-btn"
                onClick={() => {
                  if (ediable) return setEdiable(!ediable);
                  dispatch(deleteTodo(index));
                }}
              >
                {ediable ? "Cancel" : "Delete"}
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </Form>
  );
};

export default TodoItem;
