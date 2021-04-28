import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Search({ show, setShow, setFilteredTodos, filteredTodos }) {
  // const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.todos);
  const [searchText, setSearchText] = useState("");

  const findTask = (title) => {
    const newTasks = tasks.filter(
      (task) =>
        task.title.trim().toLowerCase().indexOf(title.trim().toLowerCase()) !==
        -1
    );
    if (!newTasks) return null;
    return newTasks;
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Поиск задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Название задачи</Form.Label>
            <Form.Control
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Введите название задачи"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setFilteredTodos(findTask(searchText));
            setShow(false);
          }}
        >
          Найти
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Search;
