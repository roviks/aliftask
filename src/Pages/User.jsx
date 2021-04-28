import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
import { getTodos, getUsers } from "../redux/actions";
import { connect, useDispatch } from "react-redux";
import Task from "../components/Home/Task";

function User({ todos, users }) {
  let { id } = useParams();
  const dispatch = useDispatch();
  let newTodos = todos.filter((task) => task.userId === +id);
  const [user, setUser] = useState({});
  const getUser = (id) => {
    console.log(users);
    const user = users.filter((user) => user.id === +id);
    if (!user) return null;
    return user[0];
  };
  React.useEffect(() => {
    dispatch(getUsers());
    dispatch(getTodos());
    setUser(getUser(id));
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h1>
            <Link to="/">Назад</Link>
          </h1>
        </Col>
      </Row>
      <Row>
        {user && (
          <Col>
            <h1>{user.name}</h1>
            <h4>{user.username}</h4>
            <p>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </p>
            <p>
              <a href={`tel:+${user.phone}`}>{user.phone}</a>
            </p>
          </Col>
        )}
      </Row>
      <Row>
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
            {newTodos.map((task, index) => (
              <Task
                key={`task${task.id}_${index}`}
                id={task.id}
                task={task}
                users={users}
              />
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

const mapStateToDispatch = (state) => {
  return {
    todos: state.todos.todos,
    users: state.users.users,
  };
};

export default connect(mapStateToDispatch, null)(User);
