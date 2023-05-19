import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import oppService from "../services/opps";
import "../App.css";

const TaskEdit = ({ text, task }) => {
  const [taskEdit, setTaskEdit] = useState(text);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);
  const onChange = (event) => setTaskEdit(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && isInputHidden === false) {
      setIsInputHidden(true);
    }
  };

  const blurHandler = (event) => {
    const taskObject = { ...task, task: taskEdit };
    if (taskEdit !== text) {
      oppService.updateStatus(taskObject, task.opp)
        setIsInputHidden(true);
        setTaskEdit(taskEdit)
      } else {
      setIsInputHidden(true);
    }
  };

  useEffect(() => {
    if (!isInputHidden) {
      inputRef.current.focus();
    }
  }, [isInputHidden]);

  return (
    <>
      <TextField
        type="text"
        value={taskEdit}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={blurHandler}
        onClick={() => setIsInputHidden(false)}
        inputProps={{ ref: (input) => (inputRef.current = input) }}
        size="small"
        className={`inline-edit ${isInputHidden ? "hidden" : ""}`}
        multiline
        sx={{ width: "80%" }}
      />

      <span
        style={{ fontWeight: "initial" }}
        onClick={() => setIsInputHidden(false)}
        tabIndex={0}
        onFocus={() => {
          setIsInputHidden(false);
        }}
        hidden={!isInputHidden}
      >
        {taskEdit}
      </span>
    </>
  );
};

export default TaskEdit;
