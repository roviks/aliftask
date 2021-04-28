import React, { useEffect, useState } from "react";
import { Button, Form, Modal, InputGroup, Toast } from "react-bootstrap";

function Filter({ show, setShow, users, setFilteredTodos, filteredTodos }) {
  const handleClose = () => setShow(false);
  const [inputName, setInputName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!statusText) {
      setShowToast(false);
    } else {
      setShowToast(true);
    }
  }, [statusText]);
  const findUser = () => {
    if (inputName.length > 3) {
      const user = users.find(
        (user) =>
          user.name
            .toLowerCase()
            .trim()
            .indexOf(inputName.toLowerCase().trim()) !== -1
      );
      console.log(user);
      if (user) {
        setStatusText(`Такой исполнитель существует: ${user.name}`);
      }
    } else {
      setStatusText("Введите более чем 3 символа");
    }
  };

  const onValueChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filter = (key, value) => {
    console.log(filteredTodos, key, value);
    const newTodos = filteredTodos.filter((todo) => todo[key] === value);
    console.log(newTodos);
    setFilteredTodos(newTodos);
    return newTodos;
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

  const apply = () => {
    setShow(false);
    const completed = selectedOption === "completed" ? true : false;

    if (selectedOption !== null) {
      filter("completed", completed);
    }
    if (inputName) {
      filter("userId", getUserId(inputName));
    }
    setSelectedOption(null);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Фильтр</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>По статусу</Form.Label>
            <Form.Check
              type="radio"
              label="Выполнено"
              value="completed"
              checked={selectedOption === "completed"}
              name="completed"
              onChange={onValueChange}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Не выполнено"
              value="notcompleted"
              checked={selectedOption === "notcompleted"}
              name="completed"
              onChange={onValueChange}
            ></Form.Check>
          </Form.Group>
          <Form.Group>
            <Form.Label>По исполнителю</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Введите имя исполнителя"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                aria-label="Введите имя исполнителя"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={findUser}>
                  Найти
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Toast
              style={{
                position: "absolute",
                top: 0,
                right: "-60%",
              }}
              delay={2000}
              show={showToast}
              autohide
              onClose={() => {
                setShowToast(false);
                setStatusText("");
              }}
            >
              <Toast.Header>
                <strong className="mr-auto">Уведомление</strong>
              </Toast.Header>
              <Toast.Body>{statusText}</Toast.Body>
            </Toast>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={apply}>
          Применить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Filter;
