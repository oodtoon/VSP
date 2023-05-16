import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import oppService from "../services/opps";
import "../App.css";

const InLineEdit = ({ text, keyToEdit, opportunity }) => {
  const [oppEdit, setOppEdit] = useState(text);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);
  const onChange = (event) => setOppEdit(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && isInputHidden === false) {
      setIsInputHidden(true);
    }
  };

  const blurHandler = (event) => {
    const oppObject = {
      [keyToEdit]: oppEdit,
    };
    if (oppEdit !== text) {
      oppService.update(oppObject, opportunity.id).then((returnedOpp) => {
        setIsInputHidden(true);
        setOppEdit(returnedOpp[keyToEdit]);
      });
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
        value={oppEdit}
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
        {oppEdit}
      </span>
    </>
  );
};

export default InLineEdit;
