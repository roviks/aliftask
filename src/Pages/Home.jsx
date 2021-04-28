import React, { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CreateTodo from "../components/Home/CreateTodo";
import Filter from "../components/Home/Filter";
import Search from "../components/Home/Search";
import Task from "../components/Home/Task";
import { getTodos, getUsers } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const users = useSelector((state) => state.users.users);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);

  React.useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);
  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <Container>
      <Row>
        <Col>
          <h1>Работа с пользователями</h1>
          <div>
            <Button variant="primary" onClick={() => setShowModalFilter(true)}>
              Фильтр
            </Button>
            <Button className="ml-3" onClick={() => setFilteredTodos(todos)}>
              Сбросить
            </Button>
            <Button className="ml-3" onClick={() => setShowModalSearch(true)}>
              Поиск по задачам
            </Button>
            <Button
              className="ml-3"
              onClick={() => setShowModalCreate(!showModalCreate)}
            >
              Создать задачу
            </Button>
          </div>
          <Table className="mt-4" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Статус</th>
                <th>Исполнитель</th>
                <th>Название задачи</th>
                <th>Операции</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((task, index) => (
                <Task
                  key={`task${task.id}_${index}`}
                  id={task.id}
                  task={task}
                  users={users}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <CreateTodo setShow={setShowModalCreate} show={showModalCreate} />
      <Filter
        show={showModalFilter}
        setShow={setShowModalFilter}
        todos={todos}
        users={users}
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
      />
      <Search
        setShow={setShowModalSearch}
        show={showModalSearch}
        setFilteredTodos={setFilteredTodos}
      />
    </Container>
  );
}

export default Home;
