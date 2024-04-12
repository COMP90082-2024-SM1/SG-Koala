import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import {
  TypographyH2,
  TypographyParagraph,
} from "../components/Typography/Typography";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import "../styles/TemplateDetail.css";
import { Button } from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const SortableItem = sortableElement(({ task, onTaskUpdate, onTaskRemove }) => {
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
    onTaskUpdate(name, link);
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
        onClick={() => onTaskRemove()}
        className="templateDetailButton templateDetailDeleteButton"
      >
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
      </button>
    </div>
  );
});

const SortableContainer = sortableContainer(({ children }) => {
  return <div className="container">{children}</div>;
});

const TemplateDetail = () => {
  const [details, setDetails] = useState({});
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newLink, setNewLink] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setName(details.name);
  }, [details.name]);

  const handleDoubleClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const finalizeEditName = () => {
    setIsEditingName(false);
    setDetails((prevDetails) => ({
      ...prevDetails,
      name: name,
    }));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = {
          id: 1,
          name: "Template 1",
          tasks: [
            { name: "Task 0", link: "https://google.com" },
            { name: "Task 1", link: "https://google.com" },
            { name: "Task 2", link: "https://google.com" },
            { name: "Task 3", link: "https://google.com" },
            { name: "Task 4", link: "https://google.com" },
          ],
        };

        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch template details:", error);
      }
    };

    fetchDetails();
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setDetails((prevDetails) => {
      const updatedTasks = Array.from(prevDetails.tasks);
      const [removedTask] = updatedTasks.splice(oldIndex, 1);
      updatedTasks.splice(newIndex, 0, removedTask);
      return {
        ...prevDetails,
        tasks: updatedTasks,
      };
    });
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObject = {
      name: newTask,
      link: newLink,
    };

    setDetails((prevDetails) => ({
      ...prevDetails,
      tasks: [...prevDetails.tasks, newTaskObject],
    }));
  };

  const handleTaskRemove = (indexToRemove) => {
    setDetails((prevDetails) => {
      const updatedTasks = prevDetails.tasks.filter(
        (_, index) => index !== indexToRemove
      );
      return { ...prevDetails, tasks: updatedTasks };
    });
  };

  const handleTaskUpdate = (index, name, link) => {
    setDetails((prevDetails) => {
      const updatedTasks = Array.from(prevDetails.tasks);
      updatedTasks[index].name = name;
      updatedTasks[index].link = link;
      return { ...prevDetails, tasks: updatedTasks };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTask();
    setNewTask("");
    setNewLink("");
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
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
            value={name}
            onChange={handleNameChange}
            onBlur={() => finalizeEditName()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                finalizeEditName();
              }
            }}
            autoFocus
          />
        ) : (
          <div onDoubleClick={handleDoubleClick}>
            <TypographyH2>{name}</TypographyH2>
          </div>
        )}
        {details.tasks ? (
          <>
            <SortableContainer onSortEnd={onSortEnd}>
              <div className="templateDetailContainer">
                {details.tasks.map((task, index) => (
                  <SortableItem
                    index={index}
                    task={task}
                    onTaskUpdate={(name, link) =>
                      handleTaskUpdate(index, name, link)
                    }
                    onTaskRemove={() => handleTaskRemove(index)}
                  />
                ))}
              </div>
            </SortableContainer>
            <form onSubmit={onSubmit} className="templateDetailItem">
              <button
                className="templateDetailButton templateDetailAddButton"
                type="submit"
              >
                <FontAwesomeIcon icon={faPlus} style={{ fontSize: "30px" }} />
              </button>
              <input
                placeholder="taks name"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="templateDetailInput"
                style={{ borderBottom: "1px solid #ffffff" }}
              />
              <input
                placeholder="link (optional)"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="templateDetailInput"
                style={{ borderBottom: "1px solid #ffffff" }}
              />
            </form>
          </>
        ) : (
          <div>Loading...</div>
        )}
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
