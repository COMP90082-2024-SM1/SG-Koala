import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import { TypographyH2 } from "../components/Typography/Typography";
import { Button } from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/TemplateDetail.css";

const Item = ({ index, task, onTaskUpdate, onTaskRemove }) => {
  const [name, setName] = useState(task.name);
  const [link, setLink] = useState(task.link);

  useEffect(() => {
    setName(task.name);
    setLink(task.link);
  }, [task.name, task.link]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const updateTask = () => {
    onTaskUpdate(index, name, link);
  };

  return (
    <div className="templateDetailItem">
      <input
        value={name}
        onChange={handleChange(setName)}
        onBlur={updateTask}
        className="templateDetailInput"
        placeholder="task name"
      />
      <input
        value={link}
        onChange={handleChange(setLink)}
        onBlur={updateTask}
        className="templateDetailInput"
        placeholder="link (optional)"
      />
      <button
        onClick={() => onTaskRemove(index)}
        className="templateDetailButton templateDetailDeleteButton"
      >
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
      </button>
    </div>
  );
};

const TemplateDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({
    id: 1,
    name: "Template 1",
    tasks: [
      { name: "Task 0", link: "https://google.com" },
      { name: "Task 1", link: "https://google.com" },
      { name: "Task 2", link: "https://google.com" },
      { name: "Task 3", link: "https://google.com" },
      { name: "Task 4", link: "https://google.com" },
    ],
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleDoubleClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setDetails((prevDetails) => ({ ...prevDetails, name: e.target.value }));
  };

  const finalizeEditName = () => {
    setIsEditingName(false);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObject = { name: newTask, link: newLink || undefined };
    setDetails((prevDetails) => ({
      ...prevDetails,
      tasks: [...prevDetails.tasks, newTaskObject],
    }));
    setNewTask("");
    setNewLink("");
  };

  const handleTaskRemove = (indexToRemove) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      tasks: prevDetails.tasks.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleTaskUpdate = (index, name, link) => {
    setDetails((prevDetails) => {
      const updatedTasks = [...prevDetails.tasks];
      updatedTasks[index] = { ...updatedTasks[index], name, link };
      return { ...prevDetails, tasks: updatedTasks };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  const dragItem = useRef();
  const draggedOverItem = useRef();

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    draggedOverItem.current = index;
  };

  const handleDragEnd = () => {
    const listClone = [...details.tasks];
    const draggedItemContent = listClone[dragItem.current];
    listClone.splice(dragItem.current, 1);
    listClone.splice(draggedOverItem.current, 0, draggedItemContent);
    setDetails((prevDetails) => ({ ...prevDetails, tasks: listClone }));
  };

  const handleDelete = () => {
    console.log("Save action triggered");
    console.log(details);
  };

  const handleDiscard = () => {
    console.log("Discard action triggered");
    console.log(details);
  };

  const handleSave = () => {
    console.log("Save action triggered");
    console.log(details);
  };
  return (
    <>
      <Header>Template - #{details.id}</Header>
      <div className="templateDetailWrapper">
        {isEditingName ? (
          <input
            type="text"
            value={details.name}
            onChange={handleNameChange}
            onBlur={finalizeEditName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                finalizeEditName();
              }
            }}
            className="templateDetialName"
            autoFocus
          />
        ) : (
          <div onDoubleClick={handleDoubleClick}>
            <TypographyH2>{details.name}</TypographyH2>
          </div>
        )}
        <div className="templateDetailContainer">
          {details.tasks.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <Item
                index={index}
                task={task}
                onTaskUpdate={handleTaskUpdate}
                onTaskRemove={handleTaskRemove}
              />
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="templateDetailAddItem">
          <button
            className="templateDetailButton templateDetailAddButton"
            type="submit"
          >
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: "30px" }} />
          </button>
          <input
            placeholder="task name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="templateDetailInput"
            style={{ borderBottom: "1px solid var(--white-color)" }}
          />
          <input
            placeholder="link (optional)"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="templateDetailInput"
            style={{ borderBottom: "1px solid var(--white-color)" }}
          />
        </form>
        <hr className="templateDetailHr" />
        <div className="templateDetailButtons">
          <Button onClick={handleDelete} type="delete">
            DELETE
          </Button>
          <Button onClick={handleDiscard} type="discard">
            DISCARD
          </Button>
          <Button onClick={handleSave} type="save">
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
};

export default TemplateDetail;
