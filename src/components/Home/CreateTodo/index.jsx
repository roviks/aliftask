import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { createTodo, createUser } from "../../../redux/actions";

function CreateTodo({ show, setShow, createTodo, createUser, todos, users }) {
  const findUser = (userName) => {
    const user = users.filter(
      (user) => user.name.trim().toLowerCase() === userName.trim().toLowerCase()
    )[0];
    if (!user) return false;
    return true;
  };
  const getUserId = (userName) => {
    const user = users.filter(
      (user) =>
        user.name
          .trim()
          .toLowerCase()
          .indexOf(userName.trim().toLowerCase()) !== -1
    )[0];
    if (!user) return null;
    return user.id;
  };
  const handleClose = () => {
    if (taskName && userName) {
      if (findUser(userName)) {
        createTodo({
          userId: getUserId(userName),
          title: taskName,
          id: todos.length + 1,
          completed: false,
        });
      } else {
        console.log(findUser(userName));
        createUser({
          ...users[0],
          id: users.length + 1,
          name: userName,
        });
        createTodo({
          userId: users.length + 1,
          title: taskName,
          id: todos.length + 1,
          completed: false,
        });
      }
      setTaskName("");
      setUserName("");
    }
    setShow(false);
  };
  const [taskName, setTaskName] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Создать задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Название задачи</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
              placeholder="Введите название задачи"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Исполнитель</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              placeholder="Введите имя исполнителя"
              aria-label="Введите имя исполнителя"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapDispatchToProps = {
  createTodo,
  createUser,
};
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    todos: state.todos.todos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);
