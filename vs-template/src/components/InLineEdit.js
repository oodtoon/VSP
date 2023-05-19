import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import oppService from "../services/opps";
import "../App.css";

const InLineEdit = ({ text, keyToEdit, obj }) => {
  const [textEdit, setTextEdit] = useState(text);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);
  const onChange = (event) => setTextEdit(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && isInputHidden === false) {
      setIsInputHidden(true);
    }
  };

  const blurHandler = (event) => {
    if (keyToEdit === "task") {
      const taskObject = { ...obj, task: textEdit };
      if (textEdit !== text) {
        oppService.updateStatus(taskObject, obj.opp);
        setIsInputHidden(true);
        setTextEdit(textEdit);
      } else {
        setIsInputHidden(true);
      }
    } else {
      const oppObject = {
        [keyToEdit]: textEdit,
      };
      if (textEdit !== text) {
        oppService.update(oppObject, obj.id).then((returnedOpp) => {
          setIsInputHidden(true);
          setTextEdit(returnedOpp[keyToEdit]);
        });
      } else {
        setIsInputHidden(true);
      }
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
        value={textEdit}
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
        {textEdit}
      </span>
    </>
  );
};

export default InLineEdit;
