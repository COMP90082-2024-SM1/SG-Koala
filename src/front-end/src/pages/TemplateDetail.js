import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { TypographyParagraph } from "../components/Typography/Typography";
import { Button } from "../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  createTemplate,
} from "../api/TemplateAPI";
import { getChecklistById, updateChecklistById } from "../api/BookingAPI";
import "../styles/TemplateDetail.css";

const Item = ({
  index,
  task,
  isChecklist = false,
  onTaskUpdate,
  onTaskRemove,
}) => {
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
    if (isChecklist) {
      onTaskUpdate(index, name, link, 0);
    } else {
      onTaskUpdate(index, name, link);
    }
  };

  const openLink = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="templateDetailItem">
      <input
        value={name}
        onChange={handleChange(setName)}
        onBlur={updateTask}
        className="templateDetailInput"
        placeholder="task name"
        data-testid={`task-name-${index}`}
      />
      <input
        value={link}
        onChange={handleChange(setLink)}
        onBlur={updateTask}
        className="templateDetailInput"
        placeholder="link (optional)"
        data-testid={`task-link-${index}`}
      />
      {link && (
        <button
          onClick={openLink}
          className="templateDetailButton templateDetailLinkButton"
        >
          <FontAwesomeIcon icon={faLink} style={{ fontSize: "15px" }} />
        </button>
      )}
      <button
        onClick={() => onTaskRemove(index)}
        className="templateDetailButton templateDetailDeleteButton"
      >
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
      </button>
    </div>
  );
};

const TemplateDetail = ({ checklistId }) => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState("");
  const [newLink, setNewLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({ name: "New Template", task: [] });
  const [oldDetails, setOldDetails] = useState({
    name: "New Template",
    task: [],
  });
  const navigate = useNavigate();
  const [checkedState, setCheckedState] = useState(
    new Array(details.task.length).fill(false)
  );

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      if (id === "create-new") {
        setLoading(false);
      } else if (checklistId) {
        setLoading(true);
        try {
          const data = await getChecklistById(checklistId);
          setDetails(data);
          setOldDetails(data);
          setCheckedState(
            data.task.map((task) => {
              return task.status === 1;
            })
          );
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          const data = await getTemplateById(id);
          setDetails(data);
          setOldDetails(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [id, checklistId]);

  const handleNameChange = (e) => {
    setDetails((prevDetails) => ({ ...prevDetails, name: e.target.value }));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObject = { name: newTask, link: newLink || undefined };
    setDetails((prevDetails) => ({
      ...prevDetails,
      task: [...prevDetails.task, newTaskObject],
    }));
    setNewTask("");
    setNewLink("");
  };

  const handleTaskRemove = (indexToRemove) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      task: prevDetails.task.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleTaskUpdate = (index, name, link, status = -1) => {
    setDetails((prevDetails) => {
      const updatedtask = [...prevDetails.task];
      if (status > -1) {
        updatedtask[index] = { ...updatedtask[index], name, link, status };
        checkedState[index] = status === 0 ? false : true;
      } else {
        updatedtask[index] = { ...updatedtask[index], name, link };
      }
      return { ...prevDetails, task: updatedtask };
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
    const listClone = [...details.task];
    const draggedItemContent = listClone[dragItem.current];
    listClone.splice(dragItem.current, 1);
    listClone.splice(draggedOverItem.current, 0, draggedItemContent);
    setDetails((prevDetails) => ({ ...prevDetails, task: listClone }));
    setCheckedState(
      listClone.map((task) => {
        return task.status === 1;
      })
    );
  };

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "https:" || "http";
  };

  const validateDetails = (details, oldDetails) => {
    if (JSON.stringify(details) === JSON.stringify(oldDetails)) {
      alert("[WARNING] No changes were made.");
      return false;
    }
    if (!details.name) {
      alert("[WARNING] Template name cannot be empty.");
      return false;
    }
    for (let index = 0; index < details.task.length; index++) {
      const task = details.task[index];
      if (!task.name) {
        alert(`[WARNING] Task name cannot be empty for ITEM ${index + 1}.`);
        return false;
      }
      if (task.link && !isValidHttpUrl(task.link)) {
        alert(`[WARNING] Invalid HTTPS URL for ITEM ${index + 1}.`);
        return false;
      }
    }
    return true;
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTemplate(id);
      setLoading(false);
      alert("[SUCCESS] Template deletion successful!");
      navigate("/templates");
    } catch (error) {
      alert(`[ERROR] ${error}`);
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    navigate("/templates");
  };

  const handleCreate = async () => {
    try {
      if (!validateDetails(details, oldDetails)) return;
      setLoading(true);
      const response = await createTemplate(details);
      const templateId = response._id;
      console.log(templateId);
      setLoading(false);
      alert("[SUCCESS] Template created successfully!");
      navigate(`/templates/${templateId}`);
    } catch (error) {
      alert(`[ERROR] ${error}`);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!validateDetails(details, oldDetails)) return;
      setLoading(true);
      if (checklistId) {
        const response = await updateChecklistById(checklistId, details);
      } else {
        const response = await updateTemplate(id, details);
      }
      setLoading(false);
      alert("[SUCCESS] Update successfully!");
    } catch (error) {
      alert(`[ERROR] ${error}`);
      setLoading(false);
      navigate(0);
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <>
      {!checklistId && <Header>Template - {id}</Header>}
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="templateDetailWrapper">
          <input
            type="text"
            value={details.name}
            onChange={handleNameChange}
            className="templateDetailName"
            placeholder="Template Name"
          />
          <div className="templateDetailContainer">
            {details.task?.length === 0 ? (
              <TypographyParagraph>
                No tasks yet. Add your first task below!
              </TypographyParagraph>
            ) : (
              details.task.map((task, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="checkbox-wrapper">
                    <label>
                      {checklistId && (
                        <input
                          type="checkbox"
                          id={`checkbox-${index}`}
                          name={task}
                          value={task}
                          checked={checkedState[index]}
                          onChange={() => {
                            handleTaskUpdate(
                              index,
                              task.name,
                              task.link,
                              !checkedState[index] === true ? 1 : 0
                            );
                            handleOnChange(index);
                          }}
                        />
                      )}

                      <Item
                        index={index}
                        task={task}
                        isChecklist={() => !checklistId}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskRemove={handleTaskRemove}
                      ></Item>
                    </label>
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={onSubmit} className="templateDetailAddItem">
            <button
              className="templateDetailButton templateDetailAddButton"
              type="submit"
              aria-label="Add Task"
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
            {id === "create-new" ? (
              <Button onClick={handleCreate} type="save">
                Create
              </Button>
            ) : (
              <Button onClick={handleSave} type="save">
                SAVE
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateDetail;
