import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeTask, editTask } from "../../../redux/actions";
import { Check, PencilSquare, TrashFill } from "react-bootstrap-icons";
import { connect } from "react-redux";

function Task({ task, users, removeTask, editTask }) {
  const getUserName = (id) => {
    if (!users) return "hello";
    const user = users.find((user) => user.id === id);
    if (!user) return "undefined";
    return user.name;
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

  const [isEditable, setIsEditable] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskUserName, setTaskUserName] = useState(getUserName(task.userId));
  const [taskCompleted, setTaskCompleted] = useState(task.completed);

  const onEdit = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      editTask({
        userId: getUserId(taskUserName),
        id: task.id,
        title: taskTitle,
        completed: taskCompleted,
      });
    }
  };

  return (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>
        {isEditable ? (
          <Form.Check
            type="checkbox"
            checked={taskCompleted}
            label={taskCompleted ? "Выполнено" : "Не выполнено"}
            onChange={(e) => setTaskCompleted(e.target.checked)}
          />
        ) : taskCompleted ? (
          "Выполнено"
        ) : (
          "Не выполнено"
        )}
      </td>
      <td>
        {isEditable ? (
          <Form.Control
            as="select"
            value={taskUserName}
            onChange={(e) => setTaskUserName(e.target.value)}
          >
            {users.map((user, index) => (
              <option key={index}>{user.name}</option>
            ))}
          </Form.Control>
        ) : (
          <Link to={`/user/${task.userId}`}>{getUserName(task.userId)}</Link>
        )}
      </td>
      <td>
        {isEditable ? (
          <Form.Control
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          ></Form.Control>
        ) : (
          taskTitle
        )}
      </td>
      <td style={{ display: "flex", flex: "1 2 100%", padding: 0 }}>
        <Button
          variant="success"
          style={{ color: "#fff", minHeight: "100%" }}
          onClick={onEdit}
        >
          {isEditable ? <Check size={25} /> : <PencilSquare size={25} />}
        </Button>
        {!isEditable && (
          <Button variant="danger" onClick={() => removeTask(task.id)}>
            <TrashFill size={25} />
          </Button>
        )}
      </td>
    </tr>
  );
}

const mapDispatchToState = {
  removeTask,
  editTask,
};

export default connect(null, mapDispatchToState)(Task);
